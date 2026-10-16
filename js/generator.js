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

  /* Generate with an explicit config {size, dirs}. */
  function generateCfg(words, cfg, seed, tries) {
    words.forEach(function (w) {
      if (!/^[A-Z]+$/.test(w)) throw new Error('bad word ' + w);
      if (w.length > cfg.size) throw new Error(w + ' too long for ' + cfg.size);
    });
    for (var a = 0; a < (tries || 500); a++) {
      var res = attempt(words, cfg, mulberry32((seed + a * 7919) >>> 0));
      if (res) { res.seed = seed; res.attempts = a + 1; res.words = words.slice(); return res; }
    }
    return null;
  }
  function generate(words, level, seed) {
    var cfg = LEVELS[level];
    if (!cfg) throw new Error('bad level ' + level);
    var res = generateCfg(words, cfg, seed, 500);
    if (!res) throw new Error('generation failed: ' + words.join(',') + ' L' + level);
    res.level = level; return res;
  }

  /* ---------- difficulty ----------
     Every puzzle (chapter) ships with its own word list per difficulty (see data.js), so a difficulty changes the grid and the rules:
     sizeDelta: grid size relative to the puzzle's level size (never smaller than the longest word / minSize, never above maxSize).
     dirs: allowed directions (null = by puzzle level). wordCount: words per puzzle (Easy 5, Medium 6, Hard +2 = 8, Expert +3 = 9).
     coinMult scales coin rewards, parMult scales the 3-star time allowance, starCap is the most stars that count toward island unlocks. */
  var DIFF_ORDER = ['easy', 'medium', 'hard', 'expert'];
  var DIFFS = {
    easy:   { key: 'easy',   name: 'Easy',   sizeDelta: -2, minSize: 6, maxSize: 15, dirs: ['E', 'S'], wordCount: 5, hintCost: 5,  maxHints: 0, freeHints: 1, parMult: 1.4, coinMult: 1,   starCap: 2,
      desc: 'Small grids (never below 6\u00D76), 5 short everyday words, read right or down only. Cheap hints (the first one is star-free).' },
    medium: { key: 'medium', name: 'Medium', sizeDelta: 0,  minSize: 6, maxSize: 15, dirs: null,       wordCount: 6, hintCost: 10, maxHints: 0, freeHints: 0, parMult: 1,   coinMult: 1.5, starCap: 3,
      desc: 'The classic game: 6 words, medium grids, and directions that grow from 4 to all 8 as you go.' },
    hard:   { key: 'hard',   name: 'Hard',   sizeDelta: 2,  minSize: 8, maxSize: 16, dirs: ALL,        wordCount: 8, hintCost: 20, maxHints: 3, freeHints: 0, parMult: 1.2, coinMult: 2,   starCap: 3,
      desc: 'Bigger grids, 8 longer words (2 more than Medium), all 8 directions (backwards and diagonal). Hints cost 20 and max 3.' },
    expert: { key: 'expert', name: 'Expert', sizeDelta: 3,  minSize: 9, maxSize: 17, dirs: ALL,        wordCount: 9, hintCost: 40, maxHints: 1, freeHints: 0, parMult: 1.4, coinMult: 3,   starCap: 3,
      desc: 'The biggest grids (auto-zoomed), 9 long, tricky words (3 more than Medium), all 8 directions. One hint per puzzle, costing 40.' }
  };
  function diffOf(k) { return DIFFS[k] || DIFFS.medium; }

  /* Build a playable puzzle for a difficulty: { gen, words, diff, size }. The puzzle's own words are used as given
     (each difficulty has its own list); every word is verified placed exactly once. */
  function build(puz, diffKey, seed) {
    var d = diffOf(diffKey), base = LEVELS[puz.level], words = puz.words.slice(), longest = 0;
    words.forEach(function (w) { longest = Math.max(longest, w.length); });
    var size0 = Math.max(longest, Math.min(d.maxSize, Math.max(d.minSize, base.size + d.sizeDelta)));
    for (var grow = 0; grow < 6; grow++) {
      var gen = generateCfg(words, { size: size0 + grow, dirs: d.dirs || base.dirs }, seed, 150);
      if (gen) { gen.level = puz.level; gen.diff = d.key; return { gen: gen, words: words, diff: d, size: gen.size }; }
    }
    throw new Error('generation failed: ' + d.key + ' ' + words.join(','));
  }

  /* All puzzles at one difficulty (default Medium), island by island. */
  function allPuzzles(dk) {
    var out = [];
    root.IW_DATA.islands.forEach(function (isl) { root.IW_DATA.puzzles(isl, dk || 'medium').forEach(function (p) { out.push(p); }); });
    return out;
  }
  /* Daily puzzle: deterministic from local date string 'YYYY-MM-DD' (or a numeric seed), drawn from the player's difficulty. */
  function dailyPuzzle(keyOrSeed, dk) {
    dk = DIFFS[dk] ? dk : 'medium';
    var seed = typeof keyOrSeed === 'number' ? keyOrSeed >>> 0 : hash('iw-daily-' + keyOrSeed);
    var list = allPuzzles(dk);
    var p = list[Math.floor(mulberry32(seed)() * list.length)];
    return { id: 'daily-' + keyOrSeed, title: 'Daily Puzzle', theme: p.theme, level: p.level, words: p.words, fact: p.fact, seed: seed, diff: dk };
  }

  var API = { DIFFS: DIFFS, DIFF_ORDER: DIFF_ORDER, diffOf: diffOf, build: build, generateCfg: generateCfg, DIRS: DIRS, ALL: ALL, LEVELS: LEVELS, hash: hash, mulberry32: mulberry32, findAll: findAll,
    generate: generate, dailyPuzzle: dailyPuzzle, allPuzzles: allPuzzles };
  root.IWGen = API;
  if (typeof module !== 'undefined') module.exports = API;
})(typeof globalThis !== 'undefined' ? globalThis : window);
