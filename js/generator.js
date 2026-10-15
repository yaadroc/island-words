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
     Medium is the original game (the puzzle's own level). Others adjust grid size, directions, word count and hint rules.
     sizeDelta: grid size relative to the puzzle's level size (never smaller than the longest word / minSize, never above maxSize).
     coinMult scales coin rewards, parMult scales the 3-star time allowance, starCap is the most stars that count toward island unlocks. */
  var DIFF_ORDER = ['easy', 'medium', 'hard', 'expert'];
  var DIFFS = {
    easy:   { key: 'easy',   name: 'Easy',   sizeDelta: -2, minSize: 6, maxSize: 15, dirs: ['E', 'S'], keepFrac: 0.75, minWords: 3, extra: 0, hintCost: 5,  maxHints: 0, freeHints: 1, parMult: 1.4, coinMult: 1,   starCap: 2,
      desc: 'Smaller grid (never below 6\u00D76), fewer words, words read right or down only. Cheap hints (the first one is star-free).' },
    medium: { key: 'medium', name: 'Medium', sizeDelta: 0,  minSize: 6, maxSize: 15, dirs: null,       keepFrac: 1,    minWords: 3, extra: 0, hintCost: 10, maxHints: 0, freeHints: 0, parMult: 1,   coinMult: 1.5, starCap: 3,
      desc: 'The classic game: puzzle grid, all words, directions by puzzle level.' },
    hard:   { key: 'hard',   name: 'Hard',   sizeDelta: 2,  minSize: 8, maxSize: 16, dirs: ALL,        keepFrac: 1,    minWords: 3, extra: 2, hintCost: 20, maxHints: 3, freeHints: 0, parMult: 1.2, coinMult: 2,   starCap: 3,
      desc: 'Bigger grid, 2 bonus words, all 8 directions (backwards and diagonal). Hints cost 20 and max 3.' },
    expert: { key: 'expert', name: 'Expert', sizeDelta: 3,  minSize: 9, maxSize: 17, dirs: ALL,        keepFrac: 1,    minWords: 3, extra: 3, hintCost: 40, maxHints: 1, freeHints: 0, parMult: 1.4, coinMult: 3,   starCap: 3,
      desc: 'Largest grid, 3 bonus words, all 8 directions. One hint per puzzle, costing 40.' }
  };
  function diffOf(k) { return DIFFS[k] || DIFFS.medium; }

  function islandOfPuzzle(id) {
    var isl = root.IW_DATA.islands;
    for (var i = 0; i < isl.length; i++) for (var j = 0; j < isl[i].puzzles.length; j++) if (isl[i].puzzles[j].id === id) return isl[i];
    return null;
  }
  function rev(w) { return w.split('').reverse().join(''); }
  function pickWords(puz, d, seed) {
    var words = puz.words.slice(), n = words.length, i;
    if (d.keepFrac < 1) {
      var keep = Math.min(n, Math.max(d.minWords, Math.ceil(n * d.keepFrac)));
      var ranked = words.slice().sort(function (a, b) { return hash(seed + ':' + a) - hash(seed + ':' + b); }).slice(0, keep);
      words = words.filter(function (w) { return ranked.indexOf(w) >= 0; });
    }
    if (d.extra) {
      var isl = islandOfPuzzle(puz.id), pool = [], seen = {};
      function add(w) { if (!seen[w]) { seen[w] = 1; pool.push(w); } }
      if (isl) isl.puzzles.forEach(function (p) { if (p.id !== puz.id) p.words.forEach(add); });
      allPuzzles().forEach(function (p) { if (p.theme === puz.theme && p.id !== puz.id) p.words.forEach(add); });
      allPuzzles().forEach(function (p) { if (p.id !== puz.id) p.words.forEach(add); }); // last resort filler
      var cands = [];
      pool.forEach(function (w) { if (w.length >= 4 && w.length <= 10 && puz.words.indexOf(w) < 0) cands.push(w); });
      var firstPool = pool.length; // keep pool order priority (island, theme, rest) but shuffle within a stable seed
      cands = cands.map(function (w, idx) { return { w: w, k: Math.floor(idx / 12) * 1e10 + (hash(seed + '/' + w) % 1e9) }; })
        .sort(function (a, b) { return a.k - b.k; }).map(function (o) { return o.w; });
      var added = 0;
      for (i = 0; i < cands.length && added < d.extra; i++) {
        var w = cands[i], clash = false;
        for (var j = 0; j < words.length; j++) {
          var o = words[j];
          if (o.indexOf(w) >= 0 || w.indexOf(o) >= 0 || o.indexOf(rev(w)) >= 0 || w.indexOf(rev(o)) >= 0 || o === rev(w)) { clash = true; break; }
        }
        if (!clash) { words.push(w); added++; }
      }
    }
    return words;
  }
  /* Build a playable puzzle for a difficulty: { gen, words, diff, size }. Every word is verified placed exactly once. */
  function build(puz, diffKey, seed) {
    var d = diffOf(diffKey);
    if (d.key === 'medium') { var g0 = generate(puz.words, puz.level, seed); return { gen: g0, words: puz.words.slice(), diff: d, size: g0.size }; }
    var base = LEVELS[puz.level], words = pickWords(puz, d, seed), longest = 0;
    words.forEach(function (w) { longest = Math.max(longest, w.length); });
    var size0 = Math.max(longest, Math.min(d.maxSize, Math.max(d.minSize, base.size + d.sizeDelta)));
    for (var grow = 0; grow < 5; grow++) {
      var gen = generateCfg(words, { size: size0 + grow, dirs: d.dirs || base.dirs }, seed, 150);
      if (gen) { gen.level = puz.level; gen.diff = d.key; return { gen: gen, words: words, diff: d, size: gen.size }; }
    }
    throw new Error('generation failed: ' + d.key + ' ' + words.join(','));
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

  var API = { DIFFS: DIFFS, DIFF_ORDER: DIFF_ORDER, diffOf: diffOf, build: build, generateCfg: generateCfg, DIRS: DIRS, ALL: ALL, LEVELS: LEVELS, hash: hash, mulberry32: mulberry32, findAll: findAll,
    generate: generate, dailyPuzzle: dailyPuzzle, allPuzzles: allPuzzles };
  root.IWGen = API;
  if (typeof module !== 'undefined') module.exports = API;
})(typeof globalThis !== 'undefined' ? globalThis : window);
