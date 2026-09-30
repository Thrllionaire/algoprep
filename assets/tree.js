/* ==========================================================================
   algoprep — TreeTracer
   A step-through trace of a recursive walk over a rooted tree. The learner
   clicks the node the recursion deals with next — no options shown, so it is
   free retrieval of the traversal order rather than recognition of a phrasing.
   Each node that has been dealt with keeps the value it handed back, so the
   accumulation up the tree is visible rather than asserted.

   Generic over tree shape, traversal order and the value a node returns, so
   it is reusable for post-order (returns flowing up), pre-order (parameters
   flowing down), in-order on a binary tree, BFS by level, and DFS over a
   graph drawn as a tree of first-visits.

   Usage:
     <div id="my-trace"></div>
     <script type="application/json" id="my-trace-data">
       { "title": "…",
         "prompt": "HTML — the standing instruction, shown every turn",
         "returnLabel": "height",
         "nodes": [ {"id":"1","label":"1","x":50,"y":0,"parent":null} ],
         "sequence": [ {"id":"4","value":"0","why":"<p>HTML, shown after."} ],
         "closing": "<p>HTML shown on the final panel.</p>" }
     </script>
     <script src="../assets/tree.js"></script>
     <script>TreeTracer.mount('my-trace', 'my-trace-data');</script>

   `x` is 0–100 across the drawing; `y` is the row index, 0 at the root.
   `parent` draws the edge. Pass `edges: [["1","2"]]` to draw them yourself.

   Depends on: assets/lesson.css, assets/widgets.css
   ========================================================================== */

(function (global) {
  'use strict';

  var SVG = 'http://www.w3.org/2000/svg';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function svg(tag, cls) {
    var n = document.createElementNS(SVG, tag);
    if (cls) n.setAttribute('class', cls);
    return n;
  }

  /* Abstract drawing units. The SVG scales uniformly, so strokes and text
     keep their proportions at any width. */
  var PAD = 8, ROW = 22, R = 7;

  function Tracer(root, spec) {
    this.root = root;
    this.spec = spec;
    this.index = 0;
    this.results = new Array(spec.sequence.length).fill(null); // true | false | null
    this.byId = {};
    spec.nodes.forEach(function (n) { this.byId[n.id] = n; }, this);
    this.root.classList.add('widget');
    this.render();
  }

  Tracer.prototype.x = function (node) { return PAD + (100 - 2 * PAD) * node.x / 100; };
  Tracer.prototype.y = function (node) { return PAD + 4 + node.y * ROW; };

  /* ids the trace has already settled, mapped to the value each returned */
  Tracer.prototype.settled = function () {
    var done = {};
    for (var i = 0; i < this.index; i++) {
      done[this.spec.sequence[i].id] = this.spec.sequence[i].value;
    }
    return done;
  };

  Tracer.prototype.render = function () {
    this.root.innerHTML = '';
    this.root.appendChild(this.head());
    var body = el('div', 'widget-body');
    this.root.appendChild(body);
    if (this.index >= this.spec.sequence.length) this.renderClosing(body);
    else this.renderTurn(body);
  };

  Tracer.prototype.head = function () {
    var head = el('div', 'widget-head');
    head.appendChild(el('span', 'widget-title', this.spec.title || 'Trace the walk'));
    var dots = el('div', 'q-dots');
    for (var i = 0; i < this.spec.sequence.length; i++) {
      var d = el('span', 'q-dot');
      if (this.results[i] === true) d.classList.add('ok');
      if (this.results[i] === false) d.classList.add('no');
      if (i === this.index) d.classList.add('now');
      dots.appendChild(d);
    }
    head.appendChild(dots);
    return head;
  };

  /* `mode` is 'ask' before the click, 'show' after. In 'show', `picked` is the
     id clicked and `answer` the id that was right. */
  Tracer.prototype.tree = function (mode, picked, answer) {
    var self = this;
    var spec = this.spec;
    var done = this.settled();

    var rows = 0;
    spec.nodes.forEach(function (n) { rows = Math.max(rows, n.y); });
    var height = PAD * 2 + 8 + rows * ROW;

    var wrap = el('div', 'tr-wrap');
    var s = svg('svg', 'tr-svg');
    s.setAttribute('viewBox', '0 0 100 ' + height);
    s.setAttribute('role', 'group');
    s.setAttribute('aria-label', spec.title || 'tree');

    var edges = spec.edges || spec.nodes.filter(function (n) { return n.parent; })
      .map(function (n) { return [n.parent, n.id]; });

    edges.forEach(function (e) {
      var a = self.byId[e[0]], b = self.byId[e[1]];
      if (!a || !b) return;
      var line = svg('line', 'tr-edge');
      line.setAttribute('x1', self.x(a));
      line.setAttribute('y1', self.y(a));
      line.setAttribute('x2', self.x(b));
      line.setAttribute('y2', self.y(b));
      s.appendChild(line);
    });

    spec.nodes.forEach(function (n) {
      var cx = self.x(n), cy = self.y(n);
      var g = svg('g', 'tr-node');
      var isDone = Object.prototype.hasOwnProperty.call(done, n.id);
      var live = mode === 'ask' && !isDone;

      if (isDone) g.setAttribute('class', 'tr-node is-done');
      if (mode === 'show' && n.id === answer) g.setAttribute('class', 'tr-node is-answer');
      if (mode === 'show' && picked && picked !== answer && n.id === picked) {
        g.setAttribute('class', 'tr-node is-wrong');
      }

      var c = svg('circle');
      c.setAttribute('cx', cx);
      c.setAttribute('cy', cy);
      c.setAttribute('r', R);
      g.appendChild(c);

      var t = svg('text', 'tr-label');
      t.setAttribute('x', cx);
      t.setAttribute('y', cy + 2.9);
      t.textContent = n.label;
      g.appendChild(t);

      var value = isDone ? done[n.id]
                : (mode === 'show' && n.id === answer ? self.spec.sequence[self.index].value : null);
      if (value != null) {
        var v = svg('text', 'tr-value');
        v.setAttribute('x', Math.min(cx + R + 1.5, 99));
        v.setAttribute('y', cy - 3);
        v.textContent = value;
        g.appendChild(v);
      }

      if (live) {
        g.setAttribute('class', 'tr-node is-live');
        g.setAttribute('role', 'button');
        g.setAttribute('tabindex', '0');
        g.setAttribute('aria-label', 'node ' + n.label);
        g.addEventListener('click', function () { self.check(n.id); });
        g.addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); self.check(n.id); }
        });
      }

      s.appendChild(g);
    });

    wrap.appendChild(s);
    return wrap;
  };

  Tracer.prototype.renderTurn = function (body) {
    var spec = this.spec;
    var step = spec.sequence[this.index];

    var counter = el('div', 'widget-meta',
      'Step ' + (this.index + 1) + ' of ' + spec.sequence.length +
      '  ·  ' + this.index + ' of ' + spec.nodes.length + ' nodes settled');
    counter.style.marginBottom = '0.7rem';
    body.appendChild(counter);

    if (spec.prompt) {
      var p = el('div', 'wt-invariant');
      p.innerHTML = spec.prompt;
      body.appendChild(p);
    }

    var ask = el('p', 'wt-ask');
    ask.innerHTML = step.ask ||
      '<strong>Click the node the walk settles next.</strong> Nodes already settled carry the ' +
      (spec.returnLabel || 'value') + ' they handed back.';
    body.appendChild(ask);

    body.appendChild(this.tree('ask'));

    this.slot = el('div');
    body.appendChild(this.slot);
  };

  Tracer.prototype.check = function (pickedId) {
    var self = this;
    var spec = this.spec;
    var step = spec.sequence[this.index];
    var correct = pickedId === step.id;
    this.results[this.index] = correct;

    var body = this.root.querySelector('.widget-body');
    body.replaceChild(this.tree('show', pickedId, step.id), body.querySelector('.tr-wrap'));

    var verdict = el('div', 'q-verdict ' + (correct ? 'ok' : 'no'));
    verdict.appendChild(el('span', 'q-verdict-label',
      correct ? 'Right' : 'Not that node — ' + (this.byId[step.id] || {}).label + ' settles first'));

    var why = el('div');
    why.innerHTML =
      '<p>Node <strong>' + (this.byId[step.id] || {}).label + '</strong> returns <code>' +
      step.value + '</code>' + (spec.returnLabel ? ' as its ' + spec.returnLabel : '') +
      '.</p>' + (step.why || '');
    verdict.appendChild(why);
    this.slot.appendChild(verdict);

    var nav = el('div', 'q-nav');
    var next = el('button', 'btn');
    next.type = 'button';
    next.textContent = this.index + 1 < spec.sequence.length ? 'Next step' : 'See how you did';
    next.addEventListener('click', function () { self.index++; self.render(); });
    nav.appendChild(next);
    this.slot.appendChild(nav);

    this.root.replaceChild(this.head(), this.root.firstChild);
    next.focus();
  };

  Tracer.prototype.renderClosing = function (body) {
    var self = this;
    var right = this.results.filter(Boolean).length;
    var total = this.results.length;

    body.appendChild(this.tree('done'));

    var score = el('div', 'q-score');
    score.appendChild(el('h4', null, 'Nodes settled in the right order'));
    score.appendChild(el('p', 'tally', right + ' / ' + total));

    var msg = el('p');
    msg.innerHTML = right === total
      ? (this.spec.closing || '') +
        ' <strong>Every node in order.</strong> You were running the recursion, not recalling a rule.'
      : (this.spec.closing || '') +
        ' On the steps you missed, say the rule out loud before clicking: a node cannot settle' +
        ' until every one of its children has.';
    score.appendChild(msg);

    var nav = el('div', 'q-nav');
    var again = el('button', 'btn');
    again.type = 'button';
    again.textContent = 'Trace it again';
    again.addEventListener('click', function () {
      self.results = new Array(self.spec.sequence.length).fill(null);
      self.index = 0;
      self.render();
    });
    nav.appendChild(again);
    score.appendChild(nav);
    body.appendChild(score);
  };

  global.TreeTracer = {
    mount: function (rootId, dataId) {
      var root = document.getElementById(rootId);
      var data = document.getElementById(dataId);
      if (!root || !data) return null;
      var spec;
      try {
        spec = JSON.parse(data.textContent);
      } catch (e) {
        root.textContent = 'Trace failed to load: ' + e.message;
        return null;
      }
      return new Tracer(root, spec);
    }
  };
})(window);
