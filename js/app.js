/* Island Words - app/UI/game logic (vanilla JS, no build). */
(function () {
  'use strict';
  var D = window.IW_DATA, G = window.IWGen;
  var KEY = 'islandwords.v1';
  var PALETTE = ['#FFB4A2', '#FFE08A', '#9BE3B4', '#8EE3EA', '#D9B8F2', '#FFC2D6', '#B3C8FA', '#FFD29A'];

  /* ---------- save data ---------- */
  var SAVE_V = 4; // v4: difficulty picker removed; everything plays at Medium. starsBy kept (flattened to .medium) for compatibility
  function defSave() { return { v: SAVE_V, coins: 50, stars: {}, starsBy: {}, settings: { sound: true, relax: false, large: false, islandView: 'map', boardZoom: 'auto', zoomBy: {} }, daily: { last: '', streak: 0, done: {} }, unlocked: {} }; }
  /* Older saves (no starsBy) were all played at the classic level: count them as Medium. */
  function migrateStarsBy(s) {
    var by = {}, st = s.stars || {}, id, d;
    if (s.starsBy && typeof s.starsBy === 'object') for (id in s.starsBy) { by[id] = {}; for (d in s.starsBy[id]) if (G.DIFFS[d]) by[id][d] = Math.max(0, Math.min(3, s.starsBy[id][d] | 0)); }
    for (id in st) if (st[id] > 0 && !(by[id] && Object.keys(by[id]).length)) by[id] = { medium: Math.min(3, st[id] | 0) };
    for (id in by) { var best = 0; for (d in by[id]) best = Math.max(best, d === 'easy' ? Math.min(2, by[id][d]) : by[id][d]); by[id] = best > 0 ? { medium: best } : {}; } // difficulty is gone: one best per puzzle
    return by;
  }
  /* v1 saves had no 'unlocked' list. Islands were unlocked by the old rules; keep them open after content updates. */
  var LEGACY = [['jamaica', 0, ['jm1', 'jm2', 'jm3', 'jm4']], ['bahamas', 6, ['bs1', 'bs2', 'bs3', 'bs4']], ['trinidad', 15, ['tt1', 'tt2', 'tt3', 'tt4']],
    ['barbados', 24, ['bb1', 'bb2', 'bb3']], ['dominican', 32, ['dr1', 'dr2', 'dr3']], ['stlucia', 40, ['lc1', 'lc2', 'lc3']]];
  /* v2 (65 puzzles, 16 sets): same idea with the thresholds shipped then, so newly inserted islands never re-lock anything. */
  var LEGACY2 = [['jamaica',0,['jm1','jm2','jm5','jm6','jm3','jm4','jm7']],['bahamas',6,['bs1','bs2','bs3','bs5','bs4']],['trinidad',14,['tt1','tt2','tt3','tt5','tt4','tt6']],['food',22,['fd1','fd2','fd3']],['barbados',30,['bb1','bb2','bb3','bb4']],['dominican',38,['dr1','dr2','dr4','dr3']],['legends',46,['lg1','lg2','lg3','lg4']],['stlucia',54,['lc1','lc2','lc4','lc3']],['cuba',62,['cu1','cu2','cu3','cu4']],['cricket',70,['cr1','cr2','cr3']],['grenada',78,['gr1','gr2','gr3','gr4']],['wildlife',86,['wl1','wl2','wl3']],['haiti',94,['ha1','ha2','ha3','ha4']],['festivals',102,['fe1','fe2','fe3']],['puertorico',110,['pr1','pr2','pr3','pr4']],['slang',118,['sl1','sl2','sl3']]];
  function migrateUnlocked(s) {
    var u = Object.assign({}, s.unlocked && typeof s.unlocked === 'object' ? s.unlocked : {}), st = s.stars || {}, tot = 0, k;
    for (k in st) tot += st[k] | 0;
    var prevN = 0, prevDone = 0;
    LEGACY.forEach(function (L) {
      if (L[1] === 0 || tot >= L[1] || prevDone >= prevN) u[L[0]] = true;
      prevN += L[2].length; L[2].forEach(function (id) { if (st[id] > 0) prevDone++; });
    });
    prevN = 0; prevDone = 0;
    LEGACY2.forEach(function (L) {
      if (L[1] === 0 || tot >= L[1] || prevDone >= prevN) u[L[0]] = true;
      prevN += L[2].length; L[2].forEach(function (id) { if (st[id] > 0) prevDone++; });
    });
    return u;
  }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && typeof s === 'object') { var d = defSave(); var out = { v: SAVE_V, coins: s.coins | 0, stars: s.stars || {}, starsBy: migrateStarsBy(s), settings: Object.assign(d.settings, s.settings), daily: Object.assign(d.daily, s.daily), unlocked: migrateUnlocked(s) };
        delete out.settings.difficulty; delete out.settings.askDifficulty;
        Object.keys(out.starsBy).forEach(function (id) { var b = out.starsBy[id].medium | 0; if (b > (out.stars[id] | 0)) out.stars[id] = b; }); // stars from any past difficulty keep counting toward unlocks
        if (out.settings.islandView !== 'list') out.settings.islandView = 'map';
        if (['auto', 'fit', '1.5', '2'].indexOf(out.settings.boardZoom) < 0) out.settings.boardZoom = 'auto';
        var zb = out.settings.zoomBy; if (!zb || typeof zb !== 'object' || Array.isArray(zb)) zb = {};
        Object.keys(zb).forEach(function (k) { var v = +zb[k]; if (k !== 'medium' || !isFinite(v)) delete zb[k]; else zb[k] = Math.max(1, Math.min(2.5, v)); });
        out.settings.zoomBy = zb;
        return out; }
    } catch (e) {}
    return defSave();
  }
  var save = load();
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) {} }

  /* ---------- helpers ---------- */
  function h(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') e.className = attrs[k]; else if (k === 'text') e.textContent = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k]; else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    for (var i = 2; i < arguments.length; i++) { var c = arguments[i]; if (c == null) continue; e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); }
    return e;
  }
  function $(id) { return document.getElementById(id); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dateKey(d) { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function yesterdayKey() { var d = new Date(); d.setDate(d.getDate() - 1); return dateKey(d); }
  function fmt(t) { return Math.floor(t / 60) + ':' + pad(t % 60); }
  function starsStr(n, max) { var s = ''; for (var i = 0; i < (max || 3); i++) s += i < n ? '\u2605' : '<span class="off">\u2605</span>'; return s; }
  function coinEl() { return h('span', { class: 'coin' }); }
  var toastT;
  function toast(msg) { var t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 2200); }

  function totalStars() { var n = 0; for (var k in save.stars) n += save.stars[k]; return n; }
  function completed() { var n = 0; for (var k in save.stars) if (save.stars[k] > 0) n++; return n; }
  function playerLevel() { return 1 + Math.floor(totalStars() / 3); }
  function islandUnlocked(i) {
    if (i === 0) return true;
    var prev = 0; for (var j = 0; j < i; j++) prev += D.islands[j].puzzles.length;
    var prevDone = 0; for (j = 0; j < i; j++) D.islands[j].puzzles.forEach(function (p) { if (save.stars[p.id] > 0) prevDone++; });
    var id = D.islands[i].id;
    if (save.unlocked && save.unlocked[id]) return true;
    var ok = totalStars() >= D.islands[i].starsReq || prevDone >= prev;
    if (ok && save.unlocked) { save.unlocked[id] = true; persist(); }
    return ok;
  }
  function puzzleUnlocked(isl, idx) {
    if (idx === 0 || save.stars[isl.puzzles[idx - 1].id] > 0) return true;
    for (var j = idx + 1; j < isl.puzzles.length; j++) if (save.stars[isl.puzzles[j].id] > 0) return true; // later puzzle already done (older save)
    return false;
  }
  function nextPuzzle() { // first unlocked-but-unfinished puzzle
    for (var i = 0; i < D.islands.length; i++) {
      if (!islandUnlocked(i)) continue;
      var isl = D.islands[i];
      for (var j = 0; j < isl.puzzles.length; j++) if (!(save.stars[isl.puzzles[j].id] > 0) && puzzleUnlocked(isl, j)) return { isl: isl, p: isl.puzzles[j] };
    }
    // everything finished: offer the puzzle with the fewest stars for a better score
    var best = null;
    D.islands.forEach(function (isl, i) { if (islandUnlocked(i)) isl.puzzles.forEach(function (p) { if (!best || (save.stars[p.id] || 0) < (save.stars[best.p.id] || 0)) best = { isl: isl, p: p }; }); });
    return best;
  }
  function dailyStreak() { var d = save.daily; return (d.last === dateKey() || d.last === yesterdayKey()) ? d.streak : 0; }

  /* ---------- sound ---------- */
  var actx = null;
  function beep(notes) {
    if (!save.settings.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      var t = actx.currentTime;
      notes.forEach(function (n, i) {
        var o = actx.createOscillator(), g = actx.createGain();
        o.type = n.type || 'sine'; o.frequency.value = n.f;
        var st = t + i * (n.gap || 0.11);
        g.gain.setValueAtTime(0.0001, st); g.gain.exponentialRampToValueAtTime(0.18, st + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, st + (n.d || 0.16));
        o.connect(g); g.connect(actx.destination); o.start(st); o.stop(st + (n.d || 0.16) + 0.02);
      });
    } catch (e) {}
  }
  var SND = {
    found: function () { beep([{ f: 660 }, { f: 880 }]); },
    done: function () { beep([{ f: 523 }, { f: 659 }, { f: 784 }, { f: 1047, d: 0.4 }]); },
    hint: function () { beep([{ f: 440, type: 'triangle' }]); },
    miss: function () { beep([{ f: 200, type: 'triangle', d: 0.1 }]); }
  };

  /* ---------- navigation ---------- */
  var current = 'menu', screens = ['menu', 'islands', 'island', 'game', 'store', 'settings'];
  function show(name) {
    current = name;
    screens.forEach(function (s) { $('screen-' + s).hidden = s !== name; });
    stopTimer();
    if (name === 'menu') renderMenu(); else if (name === 'islands') renderIslands();
    else if (name === 'store') renderStore(); else if (name === 'settings') renderSettings();
    document.body.classList.toggle('large', !!save.settings.large);
  }
  function header(title, back) {
    return h('div', { class: 'topbar' }, h('button', { class: 'icon-btn', 'aria-label': 'Back', onclick: back }, '\u2190'), h('h2', { text: title }),
      h('div', { class: 'pill' }, coinEl(), h('b', { text: String(save.coins) })));
  }

  /* ---------- menu ---------- */
  function renderMenu() {
    var el = $('screen-menu'); el.innerHTML = '';
    var lv = playerLevel(), into = totalStars() % 3;
    var streak = dailyStreak(), doneToday = save.daily.done[dateKey()] != null;
    el.appendChild(h('div', { class: 'menu-top' },
      h('div', { class: 'pill lvl', 'aria-label': 'Level ' + lv }, h('div', { class: 'row' }, h('span', { text: 'Level ' + lv }), h('span', { class: 'stars', text: '\u2605 ' + totalStars() })),
        h('div', { class: 'bar' }, h('i', { style: 'width:' + Math.round(into / 3 * 100) + '%' }))),
      h('div', { class: 'pill', 'aria-label': save.coins + ' coins' }, coinEl(), h('b', { id: 'm-coins', text: String(save.coins) }))));
    var tiles = h('div', { class: 'tiles', 'aria-hidden': 'true' }); 'CARIBBEAN'.split('').forEach(function (c) { tiles.appendChild(h('b', { text: c })); });
    el.appendChild(h('div', { class: 'logo' }, h('h1', { html: 'ISLAND<span>WORDS</span>' }), tiles, h('p', { text: D.tagline })));
    var nx = nextPuzzle();
    var play = h('button', { class: 'btn primary', id: 'btn-play', onclick: function () {
      var n = nextPuzzle(); if (n) choosePuzzle(n.p, { isl: n.isl, from: 'menu' }); else show('islands');
    } }, 'PLAY ISLAND ADVENTURE');
    var daily = h('button', { class: 'btn sun', id: 'btn-daily', onclick: function () { choosePuzzle(G.dailyPuzzle(dateKey()), { daily: dateKey(), from: 'menu' }); } },
      h('span', { text: 'Daily Puzzle' }), h('small', { text: doneToday ? 'Done today \u2713 \u00B7 streak ' + streak : (streak ? 'Streak ' + streak + ' day' + (streak > 1 ? 's' : '') : 'New every day') }));
    var explore = h('button', { class: 'btn palm', id: 'btn-islands', onclick: function () { show('islands'); } }, 'Explore Islands');
    var set = h('button', { class: 'btn turq', id: 'btn-settings', onclick: function () { show('settings'); } }, 'Settings');
    var store = h('button', { class: 'btn', id: 'btn-store', onclick: function () { show('store'); } }, 'Premium Store');
    el.appendChild(h('div', { class: 'menu-btns' }, play, h('div', { class: 'row2' }, daily, explore), h('div', { class: 'row2' }, set, store)));
  }

  /* ---------- islands: map view + list view ---------- */
  var mapView = { z: 1, tx: 0, ty: 0 }, curMap = null;
  function islandInfo(id) {
    var i = D.islands.findIndex(function (x) { return x.id === id; }), isl = D.islands[i], open = islandUnlocked(i), got = 0, done = 0;
    isl.puzzles.forEach(function (p) { got += save.stars[p.id] || 0; if (save.stars[p.id] > 0) done++; });
    return { i: i, isl: isl, open: open, got: got, max: isl.puzzles.length * 3, done: done, total: isl.puzzles.length, req: isl.starsReq, have: totalStars(),
      state: !open ? 'locked' : (done === isl.puzzles.length ? 'complete' : 'open') };
  }
  function openIsland(id) {
    var inf = islandInfo(id);
    if (inf.open) renderIslandPuzzles(inf.isl);
    else { var msg = 'Locked: ' + inf.isl.name + ' needs ' + inf.req + ' stars (you have ' + inf.have + ') or all earlier puzzles finished'; toast(msg); var n = $('map-note'); if (n) n.textContent = '\uD83D\uDD12 ' + msg; }
  }
  function setIslandView(v) { save.settings.islandView = v; persist(); renderIslands(); }
  function renderIslands() {
    var el = $('screen-islands'); el.innerHTML = ''; curMap = null;
    el.appendChild(header('Explore Islands', function () { show('menu'); }));
    var view = save.settings.islandView === 'list' ? 'list' : 'map';
    function tb(id, label, v) { return h('button', { class: 'seg-btn', id: id, role: 'radio', 'aria-checked': String(view === v), 'aria-label': label + ' view', onclick: function () { if (view !== v) setIslandView(v); } }, label); }
    el.appendChild(h('div', { class: 'view-toggle', role: 'radiogroup', 'aria-label': 'Island view' }, tb('view-map', '\uD83D\uDDFA Map', 'map'), tb('view-list', '\u2630 List', 'list')));
    if (view === 'list') return renderIslandList(el);
    var geo = window.IWMap.GEO, specials = D.islands.filter(function (x) { return !geo[x.id]; });
    var layout = h('div', { class: 'map-layout' });
    var box = h('div', { class: 'imap-box' });
    layout.appendChild(box);
    var side = h('div', { class: 'map-side' });
    var sp = h('div', { class: 'special', role: 'group', 'aria-label': 'Special sets (not places on the map)' }, h('h3', { text: 'Special Sets' }));
    var grid = h('div', { class: 'special-grid' });
    specials.forEach(function (isl) {
      var inf = islandInfo(isl.id);
      var b = h('button', { class: 'sp-tile ' + inf.state, 'data-island': isl.id, 'data-state': inf.state,
        'aria-label': isl.name + ', ' + (inf.open ? (inf.state === 'complete' ? 'completed, ' : 'unlocked, ') + inf.got + ' of ' + inf.max + ' stars' : 'locked, needs ' + inf.req + ' stars or all earlier puzzles finished'), onclick: function () { openIsland(isl.id); } },
        h('i', { class: 'sp-dot', style: 'background:' + (inf.open ? isl.color : '#8da4ad') }), h('span', { class: 'sp-name', text: isl.name }),
        h('span', { class: 'sp-sub', text: inf.open ? '\u2605 ' + inf.got + '/' + inf.max + (inf.state === 'complete' ? ' \u2713' : '') : '\uD83D\uDD12 ' + inf.req + '\u2605' }));
      grid.appendChild(b);
    });
    sp.appendChild(grid); side.appendChild(sp);
    side.appendChild(h('div', { class: 'map-note', id: 'map-note', role: 'status', 'aria-live': 'polite', text: 'Drag to pan, pinch to zoom. Tap an island to play.' }));
    layout.appendChild(side); el.appendChild(layout);
    var ctl = h('div', { class: 'imap-ctl' },
      h('button', { class: 'imap-btn', id: 'map-zin', 'aria-label': 'Zoom in', onclick: function () { curMap.zoomBy(1.6); } }, '+'),
      h('button', { class: 'imap-btn', id: 'map-zout', 'aria-label': 'Zoom out', onclick: function () { curMap.zoomBy(1 / 1.6); } }, '\u2212'),
      h('button', { class: 'imap-btn', id: 'map-fit', 'aria-label': 'Reset map view', onclick: function () { curMap.fit(); } }, '\u2316'));
    box.appendChild(ctl);
    box.appendChild(h('div', { class: 'imap-chips' },
      h('button', { class: 'imap-chip', id: 'map-la', onclick: function () { curMap.focusRegion('lesser'); } }, 'Lesser Antilles'),
      h('button', { class: 'imap-chip', id: 'map-ga', onclick: function () { curMap.focusRegion('greater'); } }, 'Greater Antilles')));
    curMap = window.IWMap.create(box, { islands: D.islands, view: mapView, info: islandInfo, open: openIsland,
      onAmbiguous: function () { var n = $('map-note'); if (n) n.textContent = 'Islands are close together here: zoomed in so you can pick one.'; } });
    curMap.update();
  }
  function renderIslandList(el) {
    var cards = h('div', { class: 'cards' });
    D.islands.forEach(function (isl, i) {
      var open = islandUnlocked(i), got = 0, max = isl.puzzles.length * 3;
      isl.puzzles.forEach(function (p) { got += save.stars[p.id] || 0; });
      var meta = h('div', { class: 'meta' }, h('h3', { text: isl.name }), h('p', { text: isl.blurb }));
      if (open) meta.appendChild(h('div', { class: 'stars', html: '\u2605 ' + got + '/' + max }));
      else meta.appendChild(h('div', { class: 'lockmsg', text: '\uD83D\uDD12 Earn ' + isl.starsReq + ' stars (you have ' + totalStars() + ') or finish all earlier puzzles' }));
      var b = h('button', { class: 'card' + (open ? '' : ' locked'), 'data-island': isl.id, onclick: function () {
        if (open) renderIslandPuzzles(isl); else toast('Locked: earn ' + isl.starsReq + ' stars or finish earlier islands');
      } }, h('div', { class: 'badge', style: 'background:' + isl.color, text: isl.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2) }), meta);
      cards.appendChild(b);
    });
    el.appendChild(cards);
  }
  function renderIslandPuzzles(isl) {
    var el = $('screen-island'); show('island'); el.innerHTML = '';
    el.appendChild(header(isl.name, function () { show('islands'); }));
    var cards = h('div', { class: 'cards' });
    isl.puzzles.forEach(function (p, idx) {
      var open = puzzleUnlocked(isl, idx), st = save.stars[p.id] || 0;
      var meta = h('div', { class: 'meta' }, h('h3', { text: p.title }),
        h('div', null, h('span', { class: 'chip', text: p.theme }), h('span', { class: 'chip', text: p.words.length + ' words' })));
      meta.appendChild(open ? h('div', { class: 'stars', html: starsStr(st) }) : h('div', { class: 'lockmsg', text: '\uD83D\uDD12 Finish the previous puzzle' }));
      cards.appendChild(h('button', { class: 'card' + (open ? '' : ' locked'), 'data-puzzle': p.id, onclick: function () {
        if (open) choosePuzzle(p, { isl: isl, from: 'island' }); else toast('Finish the previous puzzle first');
      } }, h('div', { class: 'badge', style: 'background:' + isl.color, text: String(idx + 1) }), meta));
    });
    el.appendChild(cards);
  }

  /* ---------- settings / store ---------- */
  function renderSettings() {
    var el = $('screen-settings'); el.innerHTML = '';
    el.appendChild(header('Settings', function () { show('menu'); }));
    var cards = h('div', { class: 'cards' });
    function row(id, label, desc, key) {
      var sw = h('button', { class: 'switch', id: id, role: 'switch', 'aria-checked': String(!!save.settings[key]), 'aria-label': label, onclick: function () {
        save.settings[key] = !save.settings[key]; persist(); sw.setAttribute('aria-checked', String(save.settings[key]));
        document.body.classList.toggle('large', !!save.settings.large); if (key === 'sound' && save.settings.sound) SND.found();
      } });
      return h('div', { class: 'card set-row' }, h('div', null, h('b', { text: label }), h('span', { class: 'sub', text: desc })), sw);
    }
    var zsel = h('div', { class: 'card set-diff' }, h('div', null, h('b', { text: 'Default board zoom' }), h('span', { class: 'sub', id: 'set-zoom-desc', text: 'Use the + / \u2212 / Fit buttons on the board any time.' })));
    var zgrp = h('div', { class: 'seg seg4', role: 'radiogroup', 'aria-label': 'Default board zoom' });
    [['auto', 'Auto'], ['fit', 'Fit'], ['1.5', '1.5\u00D7'], ['2', '2\u00D7']].forEach(function (o) {
      zgrp.appendChild(h('button', { class: 'seg-btn', id: 'set-zoom-' + o[0], role: 'radio', 'aria-checked': String(save.settings.boardZoom === o[0]), onclick: function () {
        save.settings.boardZoom = o[0]; save.settings.zoomBy = {}; persist();
        ['auto', 'fit', '1.5', '2'].forEach(function (j) { $('set-zoom-' + j).setAttribute('aria-checked', String(j === o[0])); });
      } }, o[1]));
    });
    zsel.appendChild(zgrp); cards.appendChild(zsel);
    cards.appendChild(row('set-sound', 'Sound', 'Beeps when you find words', 'sound'));
    cards.appendChild(row('set-relax', 'Relax mode', 'No timer, just play', 'relax'));
    cards.appendChild(row('set-large', 'Large text', 'Bigger text for easier reading', 'large'));
    cards.appendChild(h('button', { class: 'btn', id: 'set-reset', onclick: function () {
      if (window.confirm('Reset all coins, stars and streak?')) { save = defSave(); persist(); toast('Progress reset'); renderSettings(); }
    } }, 'Reset progress'));
    cards.appendChild(h('div', { class: 'sub', style: 'color:#fff;text-align:center', text: 'Island Words prototype \u00B7 works offline \u00B7 saved on this device' }));
    el.appendChild(cards);
  }
  function renderStore() {
    var el = $('screen-store'); el.innerHTML = '';
    el.appendChild(header('Premium Store', function () { show('menu'); }));
    el.appendChild(h('div', { class: 'banner', id: 'proto-banner', text: 'Prototype - purchases not active yet' }));
    var items = [
      ['Offline Adventure Bundle', '$4.99', 'Every island and puzzle ready to play offline, forever.'],
      ['Individual Island Pack', '$1.99', 'Unlock a single island of your choice with bonus puzzles.'],
      ['Remove Ads', '$2.99', 'Play without any ads. (No ads in this prototype.)'],
      ['Deluxe', '$9.99', 'Everything: all islands, no ads, bonus coins and future updates.']
    ];
    var cards = h('div', { class: 'cards' });
    items.forEach(function (it) {
      cards.appendChild(h('div', { class: 'card store-card' }, h('div', { class: 'meta' }, h('h3', { text: it[0] }), h('p', { text: it[2] })),
        h('div', null, h('div', { class: 'price', text: it[1] }), h('button', { class: 'btn sun', style: 'min-height:44px;padding:6px 12px;margin-top:6px', onclick: function () { toast('Prototype - purchases not active yet'); } }, 'Buy'))));
    });
    el.appendChild(cards);
  }

  /* ---------- modal ---------- */
  function openModal(node) { var m = $('modal-card'); m.innerHTML = ''; m.appendChild(node); $('modal').hidden = false; }
  function closeModal() { $('modal').hidden = true; }
  function confetti() {
    var app = $('app'), cols = ['#FF6B4A', '#FFC93C', '#14B8C4', '#2E9E5B', '#fff'];
    for (var i = 0; i < 40; i++) {
      var c = h('i', { class: 'confetti', style: 'left:' + Math.random() * 100 + '%;background:' + cols[i % 5] + ';animation-delay:' + Math.random() * 0.6 + 's;border-radius:' + (i % 2 ? '50%' : '2px') });
      app.appendChild(c); setTimeout(function (n) { n.remove(); }.bind(null, c), 3200);
    }
  }

  /* ---------- puzzle build (difficulty is internal: always Medium) ---------- */
  var buildCache = {};
  function buildFor(puz, dk, seed) { var k = puz.id + '|' + dk + '|' + seed; return buildCache[k] || (buildCache[k] = G.build(puz, dk, seed)); }
  function choosePuzzle(puz, opts) { startPuzzle(puz, opts || {}); } // no picker: always starts immediately

  /* ---------- game ---------- */
  var game = null, timerId = null;
  function startDaily() {
    var key = dateKey(), puz = G.dailyPuzzle(key);
    startPuzzle(puz, { daily: key, from: 'menu' });
  }
  function startPuzzle(puz, opts) {
    var seed = puz.seed != null ? puz.seed : G.hash('island-' + puz.id);
    var bld = buildFor(puz, 'medium', seed), gen = bld.gen;
    game = { puz: puz, gen: gen, words: bld.words, diff: bld.diff, opts: opts || {}, found: {}, foundCount: 0, hints: 0, elapsed: 0, relax: !!save.settings.relax, done: false, hintCells: {}, colorIdx: 0 };
    show('game');
    var isl = opts && opts.isl;
    $('g-name').textContent = opts && opts.daily ? 'Daily Puzzle' : puz.title;
    $('g-sub').textContent = (opts && opts.daily ? dateKey() : (isl ? isl.name : '')) + ' \u00B7 ' + gen.size + '\u00D7' + gen.size;
    $('g-timer').textContent = game.relax ? 'Relax' : '0:00';
    buildBoard(); buildWords(); updateStats();
    startTimer();
  }
  function startTimer() {
    stopTimer();
    if (!game || game.relax || game.done) return;
    timerId = setInterval(function () { if (!document.hidden && game && !game.done) { game.elapsed++; $('g-timer').textContent = fmt(game.elapsed); } }, 1000);
  }
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
  function updateStats() {
    $('g-coins').textContent = save.coins;
    $('g-count').textContent = game.foundCount + '/' + game.words.length + ' words';
    var d = game.diff, left = d.maxHints ? d.maxHints - game.hints : null;
    $('g-hint').innerHTML = 'Hint' + (left != null ? ' (' + left + ')' : '') + ' <small>' + d.hintCost + '</small><span class="coin"></span>';
    $('g-hint').setAttribute('aria-label', 'Hint, costs ' + d.hintCost + ' coins' + (left != null ? ', ' + left + ' left' : ''));
    $('g-hint').disabled = left === 0;
  }
  function buildBoard() {
    var b = $('board'), n = game.gen.size; b.innerHTML = ''; b.style.setProperty('--n', n);
    var g = h('div', { class: 'board-grid', id: 'board-grid' });
    var frag = document.createDocumentFragment();
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) frag.appendChild(h('div', { class: 'cell', 'data-r': r, 'data-c': c, text: game.gen.grid[r][c] }));
    g.appendChild(frag); b.appendChild(g);
    panMode = false; var pb = $('zoom-pan'); if (pb) pb.setAttribute('aria-pressed', 'false'); b.classList.remove('panmode');
    zoom = 1; applyZoom(initialZoom(), null, true); b.scrollLeft = b.scrollTop = 0; centerView();
  }
  /* ---------- board zoom ---------- */
  var ZMIN = 1, ZMAX = 2.5, ZSTEP = 0.5, COMFY = 22, zoom = 1, zoomAuto = true, panMode = false;
  function frameSize() { var b = $('board'); return b.clientWidth || 288; }
  function comfyZoom() { // zoom at which a cell is >= COMFY px
    var n = game.gen.size, bs = frameSize(); return Math.min(ZMAX, Math.max(1, Math.ceil(((COMFY * n + 16 + 3 * (n - 1)) / bs) * 20) / 20));
  }
  function initialZoom() {
    var d = game.diff.key, saved = save.settings.zoomBy && save.settings.zoomBy[d];
    zoomAuto = !(saved > 0);
    if (!zoomAuto) return Math.max(ZMIN, Math.min(ZMAX, saved));
    var m = save.settings.boardZoom;
    if (m === 'fit') return 1; if (m === '1.5') return 1.5; if (m === '2') return 2;
    return 1;
  }
  function centerView() { var b = $('board'); b.scrollLeft = (b.scrollWidth - b.clientWidth) / 2; b.scrollTop = (b.scrollHeight - b.clientHeight) / 2; }
  function cellPx() { var c = document.querySelector('#board-grid .cell'); return c ? c.getBoundingClientRect().width : 0; }
  function clampScroll() { var b = $('board'); b.scrollLeft = Math.max(0, Math.min(b.scrollWidth - b.clientWidth, b.scrollLeft)); b.scrollTop = Math.max(0, Math.min(b.scrollHeight - b.clientHeight, b.scrollTop)); }
  function applyZoom(z, anchor, quiet) { // anchor = client point that should stay put
    var b = $('board'); z = Math.max(ZMIN, Math.min(ZMAX, z)); var rect = b.getBoundingClientRect();
    var ax = anchor ? anchor.x - rect.left : b.clientWidth / 2, ay = anchor ? anchor.y - rect.top : b.clientHeight / 2;
    var fx = (b.scrollLeft + ax) / b.scrollWidth, fy = (b.scrollTop + ay) / b.scrollHeight;
    zoom = z; b.style.setProperty('--z', z); b.classList.toggle('zoomed', z > 1.001);
    b.scrollLeft = fx * b.scrollWidth - ax; b.scrollTop = fy * b.scrollHeight - ay; clampScroll();
    var lv = $('zoom-lvl'); if (lv) lv.textContent = (Math.round(z * 100) / 100) + '\u00D7';
    var bi = $('zoom-in'), bo = $('zoom-out'), bf = $('zoom-fit'); if (bi) { bi.disabled = z >= ZMAX - 0.001; bo.disabled = z <= ZMIN + 0.001; bf.disabled = z <= ZMIN + 0.001; }
  }
  function userZoom(z, anchor) { // explicit user change: remember per difficulty
    applyZoom(z, anchor); zoomAuto = false;
    save.settings.zoomBy[game.diff.key] = Math.round(zoom * 100) / 100; persist();
  }
  function stepZoom(dir) { var z = dir > 0 ? Math.floor((zoom + 0.001) / ZSTEP) * ZSTEP + ZSTEP : Math.ceil((zoom - 0.001) / ZSTEP) * ZSTEP - ZSTEP; userZoom(z); }
  function revealCell(r, c) { // scroll so cell (r,c) is centred in the frame
    var b = $('board'), g = $('board-grid'), n = game.gen.size, pad = 8, cw = (g.offsetWidth - 2 * pad) / n;
    b.scrollLeft = pad + (c + .5) * cw - b.clientWidth / 2; b.scrollTop = pad + (r + .5) * cw - b.clientHeight / 2; clampScroll();
  }
  function initZoomUI() {
    var b = $('board');
    $('zoom-in').addEventListener('click', function () { stepZoom(1); });
    $('zoom-out').addEventListener('click', function () { stepZoom(-1); });
    $('zoom-fit').addEventListener('click', function () { userZoom(1); });
    $('zoom-pan').addEventListener('click', function () {
      panMode = !panMode; this.setAttribute('aria-pressed', String(panMode)); b.classList.toggle('panmode', panMode);
      toast(panMode ? 'Pan mode: drag to move the board' : 'Select mode: swipe across letters');
    });
    b.addEventListener('wheel', function (e) {
      if (!game) return; e.preventDefault();
      var f = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0025)); userZoom(zoom * f, { x: e.clientX, y: e.clientY });
    }, { passive: false });
    ['gesturestart', 'gesturechange', 'gestureend'].forEach(function (t) { b.addEventListener(t, function (e) { e.preventDefault(); }); });
    window.addEventListener('resize', function () {
      if (!game || current !== 'game') return;
      if (zoomAuto) { applyZoom(initialZoom(), null, true); centerView(); } else { applyZoom(zoom); }
    });
  }
  function buildWords() {
    var ul = $('wordlist'); ul.innerHTML = '';
    game.words.slice().sort().forEach(function (w) { ul.appendChild(h('li', { 'data-word': w, text: w })); });
  }
  function cellEl(r, c) { return $('board-grid').children[r * game.gen.size + c]; }

  /* pointer selection */
  var sel = null;
  function snap(e) {
    var b = $('board-grid'), rect = b.getBoundingClientRect(), n = game.gen.size;
    var cs = getComputedStyle(b), pl = parseFloat(cs.paddingLeft), pt = parseFloat(cs.paddingTop);
    var cw = (rect.width - 2 * pl) / n, ch = (rect.height - 2 * pt) / n;
    var fx = (e.clientX - rect.left - pl) / cw, fy = (e.clientY - rect.top - pt) / ch;
    return { fx: fx, fy: fy, c: Math.max(0, Math.min(n - 1, Math.floor(fx))), r: Math.max(0, Math.min(n - 1, Math.floor(fy))) };
  }
  function lineCells(s, p) {
    var n = game.gen.size, dx = p.fx - (s.c + 0.5), dy = p.fy - (s.r + 0.5), cells = [[s.r, s.c]];
    if (Math.hypot(dx, dy) < 0.5) return cells;
    var oct = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)), vx = Math.round(Math.cos(oct * Math.PI / 4)), vy = Math.round(Math.sin(oct * Math.PI / 4));
    var len = Math.round((dx * vx + dy * vy) / (vx * vx + vy * vy));
    for (var i = 1; i <= len; i++) {
      var r = s.r + vy * i, c = s.c + vx * i;
      if (r < 0 || c < 0 || r >= n || c >= n) break; cells.push([r, c]);
    }
    return cells;
  }
  function paintSel(cells) {
    if (sel) sel.cells.forEach(function (rc) { cellEl(rc[0], rc[1]).classList.remove('sel'); });
    sel.cells = cells; cells.forEach(function (rc) { cellEl(rc[0], rc[1]).classList.add('sel'); });
  }
  function initBoardEvents() {
    var b = $('board'), ptrs = {}, nptr = 0, lock = false, panId = null, last = null, edgeT = null, lastPt = null;
    function pts() { return Object.keys(ptrs).map(function (k) { return ptrs[k]; }); }
    function metrics() { var p = pts(); return { d: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1, x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 }; }
    function cancelSel() { if (sel) { paintSel([]); sel = null; } stopEdge(); }
    function stopEdge() { if (edgeT) { clearInterval(edgeT); edgeT = null; } }
    function edgeScroll() { // while selecting, dragging near the frame edge pans the board
      if (!sel || !lastPt || zoom <= 1.001) return stopEdge();
      var r = b.getBoundingClientRect(), m = 26, sp = 9, dx = 0, dy = 0;
      if (lastPt.x < r.left + m) dx = -sp; else if (lastPt.x > r.right - m) dx = sp;
      if (lastPt.y < r.top + m) dy = -sp; else if (lastPt.y > r.bottom - m) dy = sp;
      if (dx || dy) { b.scrollLeft += dx; b.scrollTop += dy; paintSel(lineCells(sel.start, snap(lastPt))); }
    }
    b.addEventListener('pointerdown', function (e) {
      if (!game || game.done || (e.pointerType === 'mouse' && e.button !== 0)) return;
      e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (x) {}
      if (nptr === 0) lock = false;
      ptrs[e.pointerId] = { x: e.clientX, y: e.clientY }; nptr = Object.keys(ptrs).length;
      if (nptr >= 2) { lock = true; cancelSel(); panId = null; last = metrics(); return; }
      if (panMode) { panId = e.pointerId; return; }
      var p = snap(e); sel = { start: p, cells: [], id: e.pointerId }; paintSel([[p.r, p.c]]); lastPt = { clientX: e.clientX, clientY: e.clientY, x: e.clientX, y: e.clientY };
      stopEdge(); edgeT = setInterval(edgeScroll, 30);
    });
    b.addEventListener('pointermove', function (e) {
      if (!ptrs[e.pointerId]) return; e.preventDefault();
      var prev = ptrs[e.pointerId]; ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
      if (nptr >= 2) { // two-finger pinch + pan
        var m = metrics(); if (last) {
          applyZoom(zoom * m.d / last.d, { x: m.x, y: m.y }); b.scrollLeft -= m.x - last.x; b.scrollTop -= m.y - last.y; clampScroll();
        } last = m; return;
      }
      if (lock) return;
      if (panId === e.pointerId) { b.scrollLeft -= e.clientX - prev.x; b.scrollTop -= e.clientY - prev.y; return; }
      if (!sel || e.pointerId !== sel.id) return;
      lastPt = { clientX: e.clientX, clientY: e.clientY, x: e.clientX, y: e.clientY };
      paintSel(lineCells(sel.start, snap(e)));
    });
    function end(e, cancel) {
      var had = !!ptrs[e.pointerId]; delete ptrs[e.pointerId]; nptr = Object.keys(ptrs).length;
      if (had && last && nptr < 2) { last = null; userZoom(zoom); }
      if (panId === e.pointerId) panId = null;
      if (!sel || e.pointerId !== sel.id) return;
      stopEdge();
      var cells = sel.cells.slice(); paintSel([]); sel = null;
      cells.forEach(function (rc) { cellEl(rc[0], rc[1]).classList.remove('sel'); });
      if (!cancel) submit(cells);
    }
    b.addEventListener('pointerup', function (e) { end(e, false); });
    b.addEventListener('pointercancel', function (e) { end(e, true); });
    b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    ['touchstart', 'touchmove'].forEach(function (t) { b.addEventListener(t, function (e) { e.preventDefault(); }, { passive: false }); });
    initZoomUI();
  }
  function submit(cells) {
    if (cells.length < 2) return;
    var str = cells.map(function (rc) { return game.gen.grid[rc[0]][rc[1]]; }).join(''), rev = str.split('').reverse().join('');
    var hit = null;
    game.words.forEach(function (w) { if (!game.found[w] && (w === str || w === rev)) hit = w; });
    if (!hit) { SND.miss(); cells.forEach(function (rc) { var c = cellEl(rc[0], rc[1]); c.classList.add('miss'); setTimeout(function () { c.classList.remove('miss'); }, 300); }); return; }
    markFound(hit, cells);
  }
  function markFound(word, cells) {
    var color = PALETTE[game.colorIdx++ % PALETTE.length];
    game.found[word] = true; game.foundCount++;
    cells.forEach(function (rc) { var c = cellEl(rc[0], rc[1]); c.classList.remove('hint'); c.classList.add('found'); c.style.setProperty('--c', color); });
    var li = document.querySelector('#wordlist li[data-word="' + word + '"]'); li.classList.add('done'); li.style.setProperty('--c', color);
    var hc = game.hintCells[word]; if (hc) { cellEl(hc[0], hc[1]).classList.remove('hint'); delete game.hintCells[word]; }
    updateStats();
    if (game.foundCount === game.words.length) { game.done = true; stopTimer(); SND.done(); var gm = game; setTimeout(function () { if (game === gm && current === 'game') finish(); }, 650); } else SND.found();
  }
  function useHint() {
    if (!game || game.done) return;
    var left = game.gen.placements.filter(function (p) { return !game.found[p.word] && !game.hintCells[p.word]; });
    if (!left.length) { toast('A hint is already showing!'); return; }
    var d = game.diff;
    if (d.maxHints && game.hints >= d.maxHints) { toast('No hints left on ' + d.name); return; }
    if (save.coins < d.hintCost) { toast('Not enough coins (hint costs ' + d.hintCost + ')'); return; }
    var p = left[Math.floor(Math.random() * left.length)];
    save.coins -= d.hintCost; game.hints++; persist();
    game.hintCells[p.word] = [p.r, p.c]; cellEl(p.r, p.c).classList.add('hint'); SND.hint(); updateStats();
    toast('Hint: look for the pulsing letter');
  }

  function calcStars() {
    var s = 3, par = Math.round(G.LEVELS[game.puz.level].par * game.words.length * game.diff.parMult);
    if (!game.relax) { if (game.elapsed > par * 2) s -= 2; else if (game.elapsed > par) s -= 1; }
    if (game.hints > game.diff.freeHints) s -= 1;
    return Math.max(1, s);
  }
  function finish() {
    var puz = game.puz, o = game.opts, stars = calcStars(), coins = 0, first = false, bonusTxt = '', D_ = game.diff, mult = D_.coinMult, newBest = false, credit = Math.min(stars, D_.starCap);
    if (o.daily) {
      var d = save.daily;
      if (d.done[o.daily] == null) {
        first = true; d.done[o.daily] = stars;
        d.streak = d.last === yesterdayKey() ? d.streak + 1 : 1; d.last = o.daily;
        coins = Math.round((game.words.length * 5 + stars * 10 + 25 + 5 * Math.min(d.streak, 7)) * mult);
        bonusTxt = 'Daily bonus + ' + d.streak + '-day streak!';
      } else coins = Math.round(5 * mult);
    } else {
      var by = save.starsBy[puz.id] || (save.starsBy[puz.id] = {}), prevD = by[D_.key] || 0; first = prevD === 0;
      coins = Math.round((first ? game.words.length * 5 + stars * 10 : 5 + Math.max(0, stars - prevD) * 10) * mult);
      if (stars > prevD) { by[D_.key] = stars; newBest = !first; }
      if (credit > (save.stars[puz.id] || 0)) save.stars[puz.id] = credit; // unlock credit: best of any difficulty (Easy counts up to 2 stars)
    }
    save.coins += coins; persist();
    game.result = { stars: stars, coins: coins, time: game.elapsed };
    var big = h('div', { class: 'big-stars', 'aria-label': stars + ' of 3 stars' });
    for (var i = 0; i < 3; i++) big.appendChild(h('span', { class: i < stars ? '' : 'off', style: 'animation-delay:' + (0.2 + i * 0.25) + 's', text: '\u2605' }));
    var card = h('div', { id: 'complete' }, h('h2', { text: 'Puzzle Complete!' }), big,
      h('div', { class: 'earn' }, h('div', { class: 'pill' }, coinEl(), h('b', { id: 'earned', text: '+' + coins })), h('div', { class: 'pill', text: game.relax ? 'Relax mode' : 'Time ' + fmt(game.elapsed) })));
    card.appendChild(h('div', { class: 'sub', text: 'coins \u00D7' + mult + (newBest ? ' \u00B7 new best!' : '') }));
    if (bonusTxt) card.appendChild(h('div', { class: 'sub', style: 'font-weight:800;color:#2E9E5B', text: bonusTxt }));
    if (game.hints) card.appendChild(h('div', { class: 'sub', text: 'Hints used: ' + game.hints }));
    card.appendChild(h('div', { class: 'fact' }, h('b', { text: 'Fun fact: ' }), puz.fact));
    var btns = h('div', { class: 'modal-btns' }), nx = null;
    if (!o.daily) nx = nextAfter(o.isl, puz);
    if (nx) btns.appendChild(h('button', { class: 'btn primary', id: 'btn-next', style: 'min-height:60px;font-size:1.1em', onclick: function () { closeModal(); choosePuzzle(nx.p, { isl: nx.isl, from: o.from }); } }, 'Next Puzzle'));
    btns.appendChild(h('button', { class: 'btn sun', id: 'btn-replay', onclick: function () { closeModal(); startPuzzle(puz, o); } }, 'Play Again'));
    btns.appendChild(h('button', { class: 'btn', id: 'btn-done-menu', onclick: function () { closeModal(); backFromGame(); } }, 'Back'));
    card.appendChild(btns); openModal(card); confetti();
  }
  function nextAfter(isl, puz) {
    if (!isl) return null;
    var i = isl.puzzles.indexOf(puz);
    if (i >= 0 && i + 1 < isl.puzzles.length) return { isl: isl, p: isl.puzzles[i + 1] };
    var n = nextPuzzle(); return n && n.p !== puz ? n : null;
  }
  function backFromGame() {
    var o = game && game.opts; game = null;
    if (o && o.from === 'island' && o.isl) renderIslandPuzzles(o.isl); else show('menu');
  }

  /* ---------- init ---------- */
  function init() {
    initBoardEvents();
    $('g-back').addEventListener('click', function () { backFromGame(); });
    $('g-hint').addEventListener('click', useHint);
    document.addEventListener('visibilitychange', function () { if (current === 'game' && game && !game.done) startTimer(); });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    show('menu');
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    }
  }
  // test/debug hook
  window.IW = {
    get game() { return game; }, get save() { return save; }, G: G, D: D, dateKey: dateKey,
    choosePuzzle: choosePuzzle, openIsland: openIsland, islandInfo: islandInfo, get map() { return curMap; }, startPuzzle: startPuzzle, startDaily: startDaily, show: show, persist: persist,
    zoom: { get: function () { return zoom; }, set: function (z) { userZoom(z); }, step: stepZoom, reveal: revealCell, cellPx: cellPx, auto: function () { return zoomAuto; }, pan: function () { var b = $('board'); return [b.scrollLeft, b.scrollTop]; } },
    cellCenter: function (r, c) { var rc = cellEl(r, c).getBoundingClientRect(); return { x: rc.left + rc.width / 2, y: rc.top + rc.height / 2 }; }
  };
  init();
})();
