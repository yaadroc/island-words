/* Island Words - seeded word search generator */
(function (root) {
  var DIRS = { E: [0, 1], S: [1, 0], SE: [1, 1], NE: [-1, 1], W: [0, -1], N: [-1, 0], NW: [-1, -1], SW: [1, -1] };
  var ALL = ['E', 'S', 'SE', 'NE', 'W', 'N', 'NW', 'SW'];
  var LEVELS = {
    1: { size: 6, dirs: ['E', 'S'], name: 'Starter', par: 15 },
    2: { size: 8, dirs: ['E', 'S', 'SE', 'NE'], name: 'Easy', par: 20 },
    3: { size: 10, dirs: ALL, name: 'Medium', par: 25 },
    4: { size: 12, dirs: ALL, name: 'Hard', par: 30 },
    5: { size: 15, dirs: ALL, name: 'Expert', par: 35 }
  };

  function hash(str) { // FNV-1a
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* All distinct placements of word in grid, any of 8 directions. */
  function findAll(grid, word) {
    var n = grid.length, res = [], seen = {};
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) {
      if (grid[r][c] !== word[0]) continue;
      for (var d = 0; d < 8; d++) {
        var v = DIRS[ALL[d]], ok = true, cells = [];
        for (var i = 0; i < word.length; i++) {
          var rr = r + v[0] * i, cc = c + v[1] * i;
          if (rr < 0 || cc < 0 || rr >= n || cc >= n || grid[rr][cc] !== word[i]) { ok = false; break; }
          cells.push(rr * n + cc);
        }
        if (!ok) continue;
        var key = cells.slice().sort(function (a, b) { return a - b; }).join(',');
        if (!seen[key]) { seen[key] = 1; res.push({ r: r, c: c, dr: v[0], dc: v[1], len: word.length }); }
      }
    }
    return res;
  }

  function attempt(words, cfg, rng) {
    var n = cfg.size, grid = [], r, c, i;
    for (r = 0; r < n; r++) { grid.push([]); for (c = 0; c < n; c++) grid[r].push(''); }
    var order = words.slice().sort(function (a, b) { return b.length - a.length; });
    var placements = [], used = {};
    for (var w = 0; w < order.length; w++) {
      var word = order[w], placed = false, opts = [], d, k;
      // enumerate every legal placement, then prefer rarely-used directions for variety
      for (d = 0; d < cfg.dirs.length; d++) {
        var dir = DIRS[cfg.dirs[d]], list = [];
        for (var sr = 0; sr < n; sr++) for (var sc = 0; sc < n; sc++) {
          var er = sr + dir[0] * (word.length - 1), ec = sc + dir[1] * (word.length - 1);
          if (er < 0 || ec < 0 || er >= n || ec >= n) continue;
          var ok = true;
          for (i = 0; i < word.length; i++) {
            var ch = grid[sr + dir[0] * i][sc + dir[1] * i];
            if (ch !== '' && ch !== word[i]) { ok = false; break; }
          }
          if (ok) list.push([sr, sc]);
        }
        if (list.length) opts.push({ dir: dir, name: cfg.dirs[d], list: list, wt: 1 / (1 + (used[cfg.dirs[d]] || 0)) });
      }
      if (opts.length) {
        var tot = 0; opts.forEach(function (o) { tot += o.wt; });
        var x = rng() * tot, pick = opts[opts.length - 1];
        for (k = 0; k < opts.length; k++) { x -= opts[k].wt; if (x <= 0) { pick = opts[k]; break; } }
        var pos = pick.list[Math.floor(rng() * pick.list.length)];
        for (i = 0; i < word.length; i++) grid[pos[0] + pick.dir[0] * i][pos[1] + pick.dir[1] * i] = word[i];
        placements.push({ word: word, r: pos[0], c: pos[1], dr: pick.dir[0], dc: pick.dir[1] });
        used[pick.name] = (used[pick.name] || 0) + 1; placed = true;
      }
      if (!placed) return null;
    }
    for (r = 0; r < n; r++) for (c = 0; c < n; c++)
      if (grid[r][c] === '') grid[r][c] = String.fromCharCode(65 + Math.floor(rng() * 26));
    // verify: every word appears exactly once (no accidental duplicates, incl. backwards/diagonal)
    for (i = 0; i < words.length; i++) if (findAll(grid, words[i]).length !== 1) return null;
    return { size: n, grid: grid, placements: placements };
  }

  function generate(words, level, seed) {
    var cfg = LEVELS[level];
    if (!cfg) throw new Error('bad level ' + level);
    words.forEach(function (w) {
      if (!/^[A-Z]+$/.test(w)) throw new Error('bad word ' + w);
      if (w.length > cfg.size) throw new Error(w + ' too long for ' + cfg.size);
    });
    for (var a = 0; a < 500; a++) {
      var res = attempt(words, cfg, mulberry32((seed + a * 7919) >>> 0));
      if (res) { res.level = level; res.seed = seed; res.attempts = a + 1; res.words = words.slice(); return res; }
    }
    throw new Error('generation failed: ' + words.join(',') + ' L' + level);
  }

  function allPuzzles() {
    var out = [];
    root.IW_DATA.islands.forEach(function (isl) { isl.puzzles.forEach(function (p) { out.push(p); }); });
    return out;
  }
  /* Daily puzzle: deterministic from local date string 'YYYY-MM-DD' (or a numeric seed). */
  function dailyPuzzle(keyOrSeed) {
    var seed = typeof keyOrSeed === 'number' ? keyOrSeed >>> 0 : hash('iw-daily-' + keyOrSeed);
    var list = allPuzzles();
    var p = list[Math.floor(mulberry32(seed)() * list.length)];
    return { id: 'daily-' + keyOrSeed, title: 'Daily Puzzle', theme: p.theme, level: p.level, words: p.words, fact: p.fact, seed: seed };
  }

  var API = { DIRS: DIRS, ALL: ALL, LEVELS: LEVELS, hash: hash, mulberry32: mulberry32, findAll: findAll,
    generate: generate, dailyPuzzle: dailyPuzzle, allPuzzles: allPuzzles };
  root.IWGen = API;
  if (typeof module !== 'undefined') module.exports = API;
})(typeof globalThis !== 'undefined' ? globalThis : window);
