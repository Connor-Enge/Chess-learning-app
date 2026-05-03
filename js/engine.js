// Stockfish.js engine wrapper.
// We fetch Stockfish.js and create a Blob-URL Worker so it works cross-origin (CDN).

const STOCKFISH_URL = 'https://cdn.jsdelivr.net/npm/stockfish.js@10.0.2/stockfish.js';

let worker = null;
let workerInitPromise = null;
let listeners = new Set();
let ready = false;
let pendingReady = null;
let initFailed = false;
let initError = null;

async function ensureWorker() {
  if (worker) return worker;
  if (workerInitPromise) return workerInitPromise;
  if (initFailed) throw initError;

  workerInitPromise = (async () => {
    try {
      // Fetch worker source and create a Blob URL so we can construct a worker cross-origin.
      const res = await fetch(STOCKFISH_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const src = await res.text();
      const blob = new Blob([src], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);
      worker = new Worker(blobUrl);
      worker.onmessage = (e) => {
        const line = typeof e.data === 'string' ? e.data : (e.data?.data || '');
        if (!line) return;
        if (line === 'uciok') {
          worker.postMessage('isready');
        } else if (line === 'readyok') {
          ready = true;
          if (pendingReady) { pendingReady(); pendingReady = null; }
        }
        for (const cb of listeners) cb(line);
      };
      worker.onerror = (e) => console.warn('Stockfish worker error', e);
      worker.postMessage('uci');
      return worker;
    } catch (e) {
      initFailed = true;
      initError = e;
      console.warn('Failed to load Stockfish:', e);
      throw e;
    }
  })();
  return workerInitPromise;
}

export const engine = {
  isReady: () => ready,
  isAvailable: () => !initFailed,

  async start() {
    if (ready) return;
    await ensureWorker();
    if (ready) return;
    return new Promise((resolve, reject) => {
      // Wait up to 8s for engine to become ready
      const timeout = setTimeout(() => reject(new Error('Stockfish startup timeout')), 8000);
      pendingReady = () => { clearTimeout(timeout); resolve(); };
    });
  },

  send(cmd) {
    if (worker) worker.postMessage(cmd);
  },

  onMessage(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },

  /**
   * Analyze a FEN to a given depth.
   * @returns {Promise<{eval: number, mate: number|null, pv: string[], depth: number, bestmove: string}>}
   */
  async analyze(fen, depth = 14) {
    await this.start();
    return new Promise((resolve) => {
      let last = { eval: 0, mate: null, pv: [], depth: 0 };
      const off = this.onMessage((line) => {
        if (line.startsWith('info ')) {
          const dMatch = line.match(/\bdepth (\d+)/);
          const cpMatch = line.match(/\bscore cp (-?\d+)/);
          const mateMatch = line.match(/\bscore mate (-?\d+)/);
          const pvMatch = line.match(/\bpv (.+?)(?: bmc | string |$)/);
          if (dMatch) last.depth = parseInt(dMatch[1], 10);
          if (cpMatch) { last.eval = parseInt(cpMatch[1], 10) / 100; last.mate = null; }
          if (mateMatch) { last.mate = parseInt(mateMatch[1], 10); last.eval = last.mate > 0 ? 99 : -99; }
          if (pvMatch) last.pv = pvMatch[1].trim().split(/\s+/);
        } else if (line.startsWith('bestmove')) {
          off();
          resolve({ ...last, bestmove: line.split(/\s+/)[1] });
        }
      });
      this.send('ucinewgame');
      this.send('position fen ' + fen);
      this.send('go depth ' + depth);
    });
  },

  async bestMove(fen, depth = 12) {
    const res = await this.analyze(fen, depth);
    return res.bestmove;
  },

  stop() { this.send('stop'); },
};
