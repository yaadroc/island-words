/* Island Words - stylized inline-SVG Caribbean map with pan / pinch zoom. No external assets. */
(function (root) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg', VBW = 1200, VBH = 780, ZMAX = 10, HIT = 24; // HIT = marker hit radius in screen px (48px target)
  /* x,y: marker position in map units (approximate geography; Lesser Antilles spacing is exaggerated so markers can be told apart when zoomed).
     big: always show the name label. side: label side. shapes: e = ellipse [cx,cy,rx,ry,rot], p = polygon path, t = thick polyline. */
  var GEO = {
    cuba:       { x: 330, y: 236, big: 1, side: 'b', shapes: [{ t: [[120, 249], [192, 215], [268, 207], [344, 238], [420, 283], [496, 317], [526, 317]], w: 15 }] },
    jamaica:    { x: 409, y: 393, big: 1, side: 'b', shapes: [{ e: [409, 393, 32, 11, -6] }] },
    cayman:     { x: 266, y: 352, side: 't', shapes: [{ e: [258, 356, 10, 4, -10] }, { e: [302, 339, 9, 3.5, -10] }, { e: [318, 335, 6, 3, -10] }] },
    haiti:      { x: 566, y: 362, big: 1, side: 'b', shapes: [{ p: 'M515 340 L545 322 L580 335 L620 340 L622 386 L600 392 L585 372 L560 386 L535 381 L520 366 Z' }] },
    dominican:  { x: 690, y: 360, big: 1, side: 'b', shapes: [{ p: 'M622 340 L670 328 L725 335 L752 350 L745 372 L700 392 L650 392 L622 386 Z' }] },
    puertorico: { x: 819, y: 393, big: 1, side: 'b', shapes: [{ e: [819, 393, 32, 12, 0] }] },
    turkscaicos:{ x: 622, y: 254, side: 't', shapes: [{ e: [612, 260, 8, 5, 0] }, { e: [628, 252, 7, 4, 0] }, { e: [640, 250, 5, 3, 0] }] },
    bahamas:    { x: 432, y: 142, big: 1, side: 'r', shapes: [{ e: [402, 92, 22, 6, -15] }, { e: [448, 112, 16, 7, 30] }, { e: [385, 175, 10, 28, 10] }, { e: [446, 150, 18, 5, -30] },
      { e: [470, 188, 14, 5, 35] }, { e: [494, 214, 12, 4, 40] }, { e: [518, 238, 10, 4, 40] }, { e: [546, 258, 12, 5, 30] }, { e: [572, 288, 14, 8, 0] }] },
    bermuda:    { x: 1095, y: 160, big: 1, side: 'b', shapes: [{ e: [1095, 160, 36, 6, -28] }] },
    usvi:       { x: 850, y: 405, side: 'l', shapes: [{ e: [850, 405, 10, 5, 0] }] },
    bvi:        { x: 884, y: 388, side: 'l', shapes: [{ e: [884, 388, 9, 5, -20] }] },
    anguilla:   { x: 922, y: 372, side: 'l', shapes: [{ e: [922, 372, 11, 3.5, -25] }] },
    sintmaarten:{ x: 948, y: 390, side: 'r', shapes: [{ e: [948, 390, 8, 6, 0] }] },
    stbarths:   { x: 976, y: 404, side: 'r', shapes: [{ e: [976, 404, 6, 4, 0] }] },
    saba:       { x: 952, y: 424, side: 'l', shapes: [{ e: [952, 424, 5, 5, 0] }] },
    statia:     { x: 978, y: 438, side: 'r', shapes: [{ e: [978, 438, 5, 6, 0] }] },
    stkitts:    { x: 1004, y: 452, side: 'r', shapes: [{ e: [1004, 452, 7, 4, -40] }] },
    montserrat: { x: 998, y: 482, side: 'l', shapes: [{ e: [998, 482, 5, 7, 0] }] },
    antigua:    { x: 1040, y: 470, side: 'r', shapes: [{ e: [1040, 470, 9, 7, 0] }, { e: [1042, 450, 5, 6, 0] }] },
    guadeloupe: { x: 1004, y: 516, side: 'l', shapes: [{ e: [996, 514, 9, 8, 0] }, { e: [1014, 517, 8, 7, 0] }] },
    dominica:   { x: 1010, y: 548, side: 'r', shapes: [{ e: [1010, 548, 6, 10, 10] }] },
    martinique: { x: 1026, y: 580, side: 'r', shapes: [{ e: [1026, 580, 8, 10, 20] }] },
    stlucia:    { x: 1030, y: 610, side: 'r', shapes: [{ e: [1030, 610, 6, 10, 0] }] },
    stvincent:  { x: 1016, y: 640, side: 'l', shapes: [{ e: [1016, 640, 6, 9, 0] }, { e: [1012, 656, 4, 3, 0] }] },
    barbados:   { x: 1090, y: 625, side: 'r', shapes: [{ e: [1090, 625, 8, 11, 0] }] },
    grenada:    { x: 996, y: 672, side: 'l', shapes: [{ e: [996, 672, 6, 8, 0] }] },
    trinidad:   { x: 1020, y: 724, big: 1, side: 'r', shapes: [{ e: [1020, 724, 30, 17, -8] }, { e: [1072, 704, 9, 5, -30] }] },
    aruba:      { x: 660, y: 602, side: 't', shapes: [{ e: [660, 602, 8, 4, -30] }] },
    curacao:    { x: 712, y: 618, side: 't', shapes: [{ e: [712, 618, 14, 4, -25] }] },
    bonaire:    { x: 764, y: 622, side: 't', shapes: [{ e: [764, 622, 5, 9, 25] }] }
  };
  var MAINLAND = [
    { n: 'Florida', d: 'M236 0 L340 0 L352 56 L338 108 L318 100 L300 58 L256 34 Z', lx: 290, ly: 30 },
    { n: 'Mexico', d: 'M0 190 L68 210 L96 262 L72 302 L0 330 Z', lx: 30, ly: 262 },
    { n: 'Central America', d: 'M0 340 L62 370 L96 428 L122 478 L204 522 L268 566 L236 604 L140 592 L62 562 L0 610 Z', lx: 70, ly: 480 },
    { n: 'South America', d: 'M0 780 L0 692 Q200 704 400 682 Q560 652 700 668 Q860 690 944 716 L968 780 Z', lx: 330, ly: 745 }
  ];
  var SEAS = [['CARIBBEAN SEA', 520, 470], ['ATLANTIC OCEAN', 760, 150], ['GULF OF MEXICO', 150, 120]];
  var SPECIAL_NOTE = 'Special sets are not places on the map';

  function el(tag, attrs, kids) {
    var e = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (kids) kids.forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function darker(hex) { var n = parseInt(hex.slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; return 'rgb(' + (r * .55 | 0) + ',' + (g * .55 | 0) + ',' + (b * .55 | 0) + ')'; }
  function thickPath(pts) {
    var d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (var i = 1; i < pts.length - 1; i++) { var mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2; d += ' Q' + pts[i][0] + ' ' + pts[i][1] + ' ' + mx + ' ' + my; }
    var l = pts[pts.length - 1]; return d + ' L' + l[0] + ' ' + l[1];
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* create(container, opts): opts.islands = [{id,name,color}], opts.info(id) -> {state:'locked'|'open'|'complete', got, max, done, total, req, have}, opts.open(id), opts.view = persistent {z,tx,ty} */
  function create(container, opts) {
    var view = opts.view || { z: 1, tx: 0, ty: 0 };
    var svg = el('svg', { class: 'imap-svg', viewBox: '0 0 ' + VBW + ' ' + VBH, preserveAspectRatio: 'xMidYMid meet', role: 'group',
      'aria-label': 'Map of the Caribbean. Each island is a button. Use pinch or the zoom buttons to zoom, drag to pan. The List view is an alternative.' });
    var defs = el('defs', null, [
      el('linearGradient', { id: 'seaG', x1: 0, y1: 0, x2: 0, y2: 1 }, [el('stop', { offset: '0', 'stop-color': '#0f6d8c' }), el('stop', { offset: '1', 'stop-color': '#14B8C4' })]),
      el('pattern', { id: 'waveP', width: 80, height: 26, patternUnits: 'userSpaceOnUse' }, [el('path', { d: 'M0 13 Q20 1 40 13 T80 13', fill: 'none', stroke: '#fff', 'stroke-opacity': '.16', 'stroke-width': 2.2, 'stroke-linecap': 'round' })])
    ]);
    svg.appendChild(defs);
    var vp = el('g', { class: 'imap-vp' });
    svg.appendChild(vp);
    vp.appendChild(el('rect', { x: -1200, y: -800, width: 3600, height: 2400, fill: 'url(#seaG)' }));
    var waves = el('rect', { class: 'imap-waves', x: -1280, y: -800, width: 3680, height: 2400, fill: 'url(#waveP)' });
    vp.appendChild(waves);
    // shallow-water glow around the big islands
    MAINLAND.forEach(function (m) {
      vp.appendChild(el('path', { d: m.d, fill: '#E9D79A', stroke: '#9bd9d6', 'stroke-width': 10, 'stroke-opacity': .55, 'stroke-linejoin': 'round' }));
      vp.appendChild(el('path', { d: m.d, fill: '#CDBE80', stroke: '#8a7a3c', 'stroke-width': 2, 'stroke-linejoin': 'round' }));
      var t = el('text', { x: m.lx, y: m.ly, class: 'imap-land-t', 'text-anchor': 'middle', 'aria-hidden': 'true' }); t.textContent = m.n; vp.appendChild(t);
    });
    SEAS.forEach(function (s) { var t = el('text', { x: s[1], y: s[2], class: 'imap-sea-t', 'text-anchor': 'middle', 'aria-hidden': 'true' }); t.textContent = s[0]; vp.appendChild(t); });
    // Bermuda inset frame
    vp.appendChild(el('rect', { x: 1000, y: 92, width: 176, height: 138, rx: 14, class: 'imap-inset' }));
    var it = el('text', { x: 1088, y: 112, class: 'imap-inset-t', 'text-anchor': 'middle', 'aria-hidden': 'true' }); it.textContent = 'BERMUDA INSET'; vp.appendChild(it);
    var it2 = el('text', { x: 1088, y: 222, class: 'imap-inset-t2', 'text-anchor': 'middle', 'aria-hidden': 'true' }); it2.textContent = 'actually ~1,500 km NE'; vp.appendChild(it2);
    // compass rose
    var cr = el('g', { transform: 'translate(150,690)', 'aria-hidden': 'true', class: 'imap-compass' }, [
      el('circle', { r: 34, fill: 'rgba(255,255,255,.18)' }), el('path', { d: 'M0 -32 L7 0 L0 32 L-7 0 Z', fill: '#FF6B4A' }), el('path', { d: 'M-32 0 L0 -7 L32 0 L0 7 Z', fill: '#FFF6DC' }), el('circle', { r: 4, fill: '#0B3C5D' })]);
    var nt = el('text', { y: -40, 'text-anchor': 'middle', class: 'imap-n' }); nt.textContent = 'N'; cr.appendChild(nt); vp.appendChild(cr);
    var info = opts.info, byId = {}; opts.islands.forEach(function (i) { byId[i.id] = i; });
    // land
    Object.keys(GEO).forEach(function (id) {
      var isl = byId[id]; if (!isl) return; var g = GEO[id], c = isl.color, dk = darker(c), grp = el('g', { class: 'imap-land', 'data-land': id });
      g.shapes.forEach(function (s) {
        if (s.e) { var e = s.e, tf = 'rotate(' + e[4] + ' ' + e[0] + ' ' + e[1] + ')';
          grp.appendChild(el('ellipse', { cx: e[0], cy: e[1], rx: e[2] + 5, ry: e[3] + 5, transform: tf, fill: '#aee8e4', 'fill-opacity': .5, 'data-land': id }));
          grp.appendChild(el('ellipse', { cx: e[0], cy: e[1], rx: e[2], ry: e[3], transform: tf, fill: c, stroke: dk, 'stroke-width': 2, 'data-land': id })); }
        else if (s.p) { grp.appendChild(el('path', { d: s.p, fill: c, stroke: dk, 'stroke-width': 3, 'stroke-linejoin': 'round', 'data-land': id })); }
        else if (s.t) { var d = thickPath(s.t);
          grp.appendChild(el('path', { d: d, fill: 'none', stroke: '#aee8e4', 'stroke-opacity': .5, 'stroke-width': s.w + 12, 'stroke-linecap': 'round', 'data-land': id }));
          grp.appendChild(el('path', { d: d, fill: 'none', stroke: dk, 'stroke-width': s.w + 4, 'stroke-linecap': 'round', 'data-land': id }));
          grp.appendChild(el('path', { d: d, fill: 'none', stroke: c, 'stroke-width': s.w, 'stroke-linecap': 'round', 'data-land': id })); }
      });
      vp.appendChild(grp);
    });
    // markers
    var markers = {}, mlayer = el('g', { class: 'imap-markers' }); vp.appendChild(mlayer);
    Object.keys(GEO).forEach(function (id) {
      var isl = byId[id]; if (!isl) return; var g = GEO[id];
      var m = el('g', { class: 'mk', tabindex: 0, role: 'button', 'data-island': id }); if (g.big) m.setAttribute('data-big', '1');
      var vis = el('g', { class: 'mkv' });
      var hit = el('circle', { r: HIT, fill: 'transparent', class: 'mk-hit' });
      var ring = el('circle', { r: 17.5, fill: 'none', class: 'mk-ring', 'stroke-width': 4, transform: 'rotate(-90)' });
      var body = el('circle', { r: 13, class: 'mk-body', stroke: '#fff', 'stroke-width': 2.5 });
      var icon = el('text', { class: 'mk-icon', 'text-anchor': 'middle', y: 5 });
      var lock = el('g', { class: 'mk-lock', transform: 'translate(0,-1)' }, [
        el('path', { d: 'M-4 -1 V-4.5 A4 4 0 0 1 4 -4.5 V-1', fill: 'none', stroke: '#fff', 'stroke-width': 2.4, 'stroke-linecap': 'round' }),
        el('rect', { x: -6.5, y: -1, width: 13, height: 10, rx: 2.5, fill: '#fff' })]);
      vis.appendChild(ring); vis.appendChild(body); vis.appendChild(icon); vis.appendChild(lock);
      var lab = el('text', { class: 'mk-label', 'aria-hidden': 'true' });
      var l1 = el('tspan', { class: 'l1', x: 0 }), l2 = el('tspan', { class: 'l2', x: 0, dy: '1.15em' });
      lab.appendChild(l1); lab.appendChild(l2);
      m.appendChild(hit); m.appendChild(vis); m.appendChild(lab);
      mlayer.appendChild(m);
      markers[id] = { g: m, vis: vis, ring: ring, body: body, icon: icon, lock: lock, lab: lab, l1: l1, l2: l2, x: g.x, y: g.y, geo: g };
      m.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opts.open(id); } });
      m.addEventListener('focus', function () { ensureVisible(id); });
    });
    container.appendChild(svg);

    var W = 1, H = 1, S = 1, OX = 0, OY = 0;
    function measure() {
      var r = svg.getBoundingClientRect(); W = r.width || 1; H = r.height || 1; S = Math.min(W / VBW, H / VBH); OX = (W - VBW * S) / 2; OY = (H - VBH * S) / 2;
    }
    function clampView() {
      view.z = clamp(view.z, 1, ZMAX);
      var left = -OX / S, right = (W - OX) / S, top = -OY / S, bot = (H - OY) / S, z = view.z;
      view.tx = clamp(view.tx, left - z * VBW * 0.92, right - z * VBW * 0.08);
      view.ty = clamp(view.ty, top - z * VBH * 0.92, bot - z * VBH * 0.08);
    }
    function apply() {
      clampView();
      vp.setAttribute('transform', 'translate(' + view.tx + ' ' + view.ty + ') scale(' + view.z + ')');
      var k = 1 / (S * view.z), vis = clamp(0.5 + (view.z - 1) / 3.2 * 0.5, 0.5, 1);
      svg.classList.toggle('z-lbl', view.z >= 2.3); svg.classList.toggle('z-det', view.z >= 3.6);
      for (var id in markers) {
        var mk = markers[id];
        mk.g.setAttribute('transform', 'translate(' + mk.x + ' ' + mk.y + ') scale(' + k + ')');
        mk.vis.setAttribute('transform', 'scale(' + vis + ')');
        var side = mk.geo.side || 'r', off = 22 * vis + 6, lx = 0, ly = 0, anc = 'middle';
        if (side === 'r') { lx = off; ly = -4; anc = 'start'; } else if (side === 'l') { lx = -off; ly = -4; anc = 'end'; } else if (side === 't') { ly = -off - 14; } else { ly = off + 12; }
        mk.lab.setAttribute('transform', 'translate(' + lx + ' ' + ly + ')'); mk.lab.setAttribute('text-anchor', anc);
      }
      if (opts.onView) opts.onView(view);
    }
    function toVB(px, py) { return [(px - OX) / S, (py - OY) / S]; }
    function zoomAt(px, py, nz) {
      nz = clamp(nz, 1, ZMAX); var p = toVB(px, py), wx = (p[0] - view.tx) / view.z, wy = (p[1] - view.ty) / view.z;
      view.z = nz; view.tx = p[0] - nz * wx; view.ty = p[1] - nz * wy; apply();
    }
    function screenOf(id) { var mk = markers[id]; return [OX + S * (view.tx + view.z * mk.x), OY + S * (view.ty + view.z * mk.y)]; }
    function centerOn(wx, wy, z) {
      measure(); if (z) view.z = clamp(z, 1, ZMAX);
      view.tx = (W / 2 - OX) / S - view.z * wx; view.ty = (H / 2 - OY) / S - view.z * wy; apply();
    }
    function ensureVisible(id) {
      measure(); var p = screenOf(id), m = 30;
      if (p[0] < m || p[1] < m || p[0] > W - m || p[1] > H - m) centerOn(markers[id].x, markers[id].y);
    }
    function fit() { view.z = 1; view.tx = 0; view.ty = 0; measure(); apply(); }

    /* gestures */
    var ptrs = {}, gest = null;
    function pts() { return Object.keys(ptrs).map(function (k) { return ptrs[k]; }); }
    function local(e) { var r = svg.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    svg.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      measure(); try { svg.setPointerCapture(e.pointerId); } catch (x) {}
      var l = local(e); ptrs[e.pointerId] = { x: l[0], y: l[1] };
      var n = pts().length;
      if (n === 1) gest = { moved: false, sx: l[0], sy: l[1], t: Date.now(), target: e.target, tx0: view.tx, ty0: view.ty, multi: false };
      else if (n === 2 && gest) { gest.multi = true; gest.moved = true; var a = pts(); gest.d0 = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y) || 1; gest.z0 = view.z; gest.cx0 = (a[0].x + a[1].x) / 2; gest.cy0 = (a[0].y + a[1].y) / 2; gest.tx0 = view.tx; gest.ty0 = view.ty; }
    });
    svg.addEventListener('pointermove', function (e) {
      if (!ptrs[e.pointerId] || !gest) return;
      var l = local(e); ptrs[e.pointerId] = { x: l[0], y: l[1] }; var a = pts();
      if (a.length >= 2 && gest.multi) {
        var d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y), cx = (a[0].x + a[1].x) / 2, cy = (a[0].y + a[1].y) / 2;
        view.tx = gest.tx0; view.ty = gest.ty0; var zz = view.z; view.z = gest.z0; // restore start, then zoom about start centre, then pan by centre delta
        zoomAt(gest.cx0, gest.cy0, gest.z0 * d / gest.d0);
        view.tx += (cx - gest.cx0) / S; view.ty += (cy - gest.cy0) / S; apply();
      } else if (a.length === 1 && !gest.multi) {
        if (!gest.moved && Math.hypot(l[0] - gest.sx, l[1] - gest.sy) > 7) gest.moved = true;
        if (gest.moved) { view.tx = gest.tx0 + (l[0] - gest.sx) / S; view.ty = gest.ty0 + (l[1] - gest.sy) / S; apply(); svg.classList.add('panning'); }
      }
    });
    function up(e, cancel) {
      if (!ptrs[e.pointerId]) return; var l = local(e), g = gest; delete ptrs[e.pointerId];
      var left = pts().length;
      if (left === 0) { svg.classList.remove('panning'); gest = null; if (g && !g.moved && !g.multi && !cancel && Date.now() - g.t < 700) tap(l[0], l[1], g.target); }
      else if (left === 1 && g) { var r = pts()[0]; g.multi = true; g.moved = true; g.sx = r.x; g.sy = r.y; g.tx0 = view.tx; g.ty0 = view.ty; g.multi = false; }
    }
    svg.addEventListener('pointerup', function (e) { up(e, false); });
    svg.addEventListener('pointercancel', function (e) { up(e, true); });
    svg.addEventListener('wheel', function (e) { e.preventDefault(); measure(); var l = local(e); zoomAt(l[0], l[1], view.z * (e.deltaY < 0 ? 1.2 : 1 / 1.2)); }, { passive: false });
    ['touchstart', 'touchmove'].forEach(function (t) { svg.addEventListener(t, function (e) { e.preventDefault(); }, { passive: false }); });
    function tap(px, py, target) {
      var near = [];
      for (var id in markers) { var p = screenOf(id), d = Math.hypot(p[0] - px, p[1] - py); if (d <= HIT) near.push({ id: id, d: d }); }
      near.sort(function (a, b) { return a.d - b.d; });
      if (near.length > 1 && view.z < ZMAX - 0.01) { zoomAt(px, py, view.z * 2); if (opts.onAmbiguous) opts.onAmbiguous(); return; }
      if (near.length) return opts.open(near[0].id);
      var land = target && target.getAttribute && target.getAttribute('data-land');
      if (land) opts.open(land);
    }

    var ro = null;
    if (window.ResizeObserver) { ro = new ResizeObserver(function () { measure(); apply(); }); ro.observe(container); }
    measure(); apply();

    function update() {
      for (var id in markers) {
        var mk = markers[id], i = info(id), isl = byId[id], frac = i.max ? i.got / i.max : 0;
        mk.g.setAttribute('data-state', i.state);
        mk.g.setAttribute('aria-label', isl.name + ', ' + (i.state === 'locked' ? 'locked, needs ' + i.req + ' stars or all earlier puzzles finished' :
          (i.state === 'complete' ? 'completed, ' : 'unlocked, ') + i.got + ' of ' + i.max + ' stars, ' + i.done + ' of ' + i.total + ' puzzles done'));
        mk.g.setAttribute('class', 'mk ' + i.state); var lg = svg.querySelector('.imap-land[data-land="' + id + '"]'); if (lg) lg.setAttribute('opacity', i.state === 'locked' ? '.55' : '1');
        mk.body.setAttribute('fill', i.state === 'locked' ? '#8da4ad' : isl.color);
        var C = 2 * Math.PI * 17.5;
        mk.ring.setAttribute('stroke-dasharray', i.state === 'locked' ? '0 ' + C : (frac * C) + ' ' + C);
        mk.ring.setAttribute('stroke', i.state === 'complete' ? '#FFC93C' : '#fff');
        mk.icon.textContent = i.state === 'complete' ? '\u2713' : (i.state === 'open' ? '\u2605' : '');
        mk.lock.style.display = i.state === 'locked' ? '' : 'none';
        mk.l1.textContent = isl.name;
        mk.l2.textContent = i.state === 'locked' ? '\uD83D\uDD12 ' + i.req + '\u2605 needed' : '\u2605 ' + i.got + '/' + i.max;
      }
    }
    update();
    return { svg: svg, view: view, update: update, fit: fit, measure: measure,
      zoomBy: function (f) { measure(); zoomAt(W / 2, H / 2, view.z * f); },
      focusRegion: function (name) { // 'lesser' | 'greater' | id
        var m = markers[name]; if (m) return centerOn(m.x, m.y, 6);
        if (name === 'lesser') centerOn(990, 520, 3.4); else centerOn(520, 300, 1.6);
      },
      screenOf: function (id) { measure(); var p = screenOf(id), r = svg.getBoundingClientRect(); return { x: r.left + p[0], y: r.top + p[1] }; },
      ids: function () { return Object.keys(markers); },
      destroy: function () { if (ro) ro.disconnect(); if (svg.parentNode) svg.parentNode.removeChild(svg); } };
  }
  root.IWMap = { create: create, GEO: GEO, ZMAX: ZMAX, HIT: HIT };
})(window);
