/* ==========================================================================
   algoprep — PrefixTracer
   A step-through trace of any complement-lookup sweep over a prefix array.
   Each turn advances the right endpoint j, then asks the learner to click
   EVERY earlier prefix cell that pairs with it to satisfy the target. That is
   free retrieval of the rearranged identity — the learner has to compute
   "what value am I looking for", not recognise a phrasing — and the
   multi-select makes the counting case visible: two partners means two
   subarrays, which is why the map stores counts rather than positions.

   Generic over the prefix statistic, so it is reusable for running sums,
   sums mod k, +1/-1 balance, and parity bitmasks: pass whatever values you
   like in `prefix` and label them with `keyLabel`.

   Usage:
     <div id="my-trace"></div>
     <script type="application/json" id="my-trace-data">
       { "title": "…",
         "array": [2, -1, 3],
         "prefix": [0, 2, 1, 4],
         "target": 1,
         "targetLabel": "x",
         "keyLabel": "prefix sum",
         "rule": "HTML — shown above every turn, on purpose",
         "turns": [
           { "j": 1, "need": 1, "matches": [], "total": 0, "state": "0:1",
             "why": "<p>HTML shown after checking.</p>" }
         ],
         "closing": "<p>HTML shown on the final panel.</p>" }
     </script>
     <script src="../assets/prefix.js"></script>
     <script>PrefixTracer.mount('my-trace', 'my-trace-data');</script>

   Depends on: assets/lesson.css, assets/widgets.css
   ========================================================================== */

(function (global) {
  'use strict';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    var s = a.slice().sort(function (x, y) { return x - y; });
    var t = b.slice().sort(function (x, y) { return x - y; });
    for (var i = 0; i < s.length; i++) if (s[i] !== t[i]) return false;
    return true;
  }

  function signed(v) { return v > 0 ? '+' + v : String(v); }

  function Tracer(root, spec) {
    this.root = root;
    this.spec = spec;
    this.index = 0;
    this.results = new Array(spec.turns.length).fill(null); // true | false | null
    this.picked = [];
    this.root.classList.add('widget');
    this.render();
  }

  Tracer.prototype.render = function () {
    this.root.innerHTML = '';
    this.root.appendChild(this.head());
    var body = el('div', 'widget-body');
    this.root.appendChild(body);
    if (this.index >= this.spec.turns.length) this.renderClosing(body);
    else this.renderTurn(body);
  };

  Tracer.prototype.head = function () {
    var head = el('div', 'widget-head');
    head.appendChild(el('span', 'widget-title', this.spec.title || 'Trace the lookup'));
    var dots = el('div', 'q-dots');
    for (var i = 0; i < this.spec.turns.length; i++) {
      var d = el('span', 'q-dot');
      if (this.results[i] === true) d.classList.add('ok');
      if (this.results[i] === false) d.classList.add('no');
      if (i === this.index) d.classList.add('now');
      dots.appendChild(d);
    }
    head.appendChild(dots);
    return head;
  };

  /* Two aligned rows: the prefix boundaries 0..n, and the array elements that
     sit between them. `mode` is 'ask' before checking, 'show' after. */
  Tracer.prototype.tape = function (turn, mode) {
    var self = this;
    var wrap = el('div', 'pt-tape');

    var top = el('div', 'pt-row');
    this.spec.prefix.forEach(function (v, i) {
      var cell = el('div', 'pt-cell');
      cell.appendChild(el('span', 'pt-idx', 'p' + i));
      cell.appendChild(el('span', 'pt-val', String(v)));

      if (i === turn.j) cell.classList.add('is-now');
      else if (i > turn.j) cell.classList.add('is-ahead');

      var reachable = i < turn.j;

      if (mode === 'ask' && reachable) {
        var btn = el('button', 'pt-hit');
        btn.type = 'button';
        btn.setAttribute('aria-pressed', self.picked.indexOf(i) >= 0 ? 'true' : 'false');
        btn.setAttribute('aria-label', 'prefix index ' + i + ', value ' + v);
        btn.addEventListener('click', function () { self.toggle(i); });
        cell.appendChild(btn);
        cell.classList.add('is-live');
        if (self.picked.indexOf(i) >= 0) cell.classList.add('is-picked');
      }

      if (mode === 'show' && reachable) {
        var isMatch = turn.matches.indexOf(i) >= 0;
        var wasPicked = self.picked.indexOf(i) >= 0;
        if (isMatch) cell.classList.add(wasPicked ? 'is-hit' : 'is-missed');
        else if (wasPicked) cell.classList.add('is-false');
      }

      top.appendChild(cell);
    });
    wrap.appendChild(top);

    var bottom = el('div', 'pt-row pt-arr');
    this.spec.array.forEach(function (v, k) {
      var cell = el('div', 'pt-el');
      cell.textContent = signed(v);
      if (k === turn.j - 1) cell.classList.add('is-now');
      else if (k >= turn.j) cell.classList.add('is-ahead');
      bottom.appendChild(cell);
    });
    wrap.appendChild(bottom);

    return wrap;
  };

  Tracer.prototype.toggle = function (i) {
    var at = this.picked.indexOf(i);
    if (at >= 0) this.picked.splice(at, 1);
    else this.picked.push(i);
    var body = this.root.querySelector('.widget-body');
    body.replaceChild(this.tape(this.spec.turns[this.index], 'ask'), body.querySelector('.pt-tape'));
    this.countLabel.textContent = this.picked.length === 0
      ? 'nothing selected — that is a legitimate answer'
      : this.picked.length + ' selected';
  };

  Tracer.prototype.renderTurn = function (body) {
    var self = this;
    var turn = this.spec.turns[this.index];
    var spec = this.spec;
    var pj = spec.prefix[turn.j];

    var counter = el('div', 'widget-meta',
      'Turn ' + (this.index + 1) + ' of ' + spec.turns.length +
      '  ·  right endpoint j = ' + turn.j +
      '  ·  running ' + (spec.keyLabel || 'prefix') + ' = ' + pj);
    counter.style.marginBottom = '0.7rem';
    body.appendChild(counter);

    if (spec.rule) {
      var rule = el('div', 'wt-invariant');
      rule.innerHTML = spec.rule;
      body.appendChild(rule);
    }

    var ask = el('p', 'wt-ask');
    ask.innerHTML =
      'The sweep has just taken in <code>' + signed(spec.array[turn.j - 1]) + '</code>, so <code>p' +
      turn.j + ' = ' + pj + '</code>. <strong>Click every earlier boundary that closes a subarray ' +
      'summing to ' + (spec.targetLabel || 'x') + ' = ' + spec.target + '.</strong> ' +
      'There may be none, one, or several.';
    body.appendChild(ask);

    body.appendChild(this.tape(turn, 'ask'));

    if (turn.state != null) {
      var st = el('div', 'wt-state');
      st.innerHTML = '<span>counts so far</span>' + turn.state;
      body.appendChild(st);
    }

    var nav = el('div', 'q-nav');
    var check = el('button', 'btn');
    check.type = 'button';
    check.textContent = 'Check';
    check.addEventListener('click', function () { self.check(turn); });
    nav.appendChild(check);
    this.countLabel = el('span', 'pt-count', 'nothing selected — that is a legitimate answer');
    nav.appendChild(this.countLabel);
    body.appendChild(nav);

    this.slot = el('div');
    body.appendChild(this.slot);
  };

  Tracer.prototype.check = function (turn) {
    var self = this;
    var spec = this.spec;
    var correct = sameSet(this.picked, turn.matches);
    this.results[this.index] = correct;

    var body = this.root.querySelector('.widget-body');
    body.replaceChild(this.tape(turn, 'show'), body.querySelector('.pt-tape'));
    body.querySelector('.q-nav').remove();

    var verdict = el('div', 'q-verdict ' + (correct ? 'ok' : 'no'));
    verdict.appendChild(el('span', 'q-verdict-label', correct ? 'Right' : 'Not that set'));

    var found = turn.matches.length
      ? turn.matches.map(function (i) {
          return '<code>arr[' + i + '..' + (turn.j - 1) + ']</code>';
        }).join(', ')
      : 'nothing';

    var why = el('div');
    why.innerHTML =
      '<p>You needed a boundary with value <strong>' + turn.need + '</strong>, because <code>p' +
      turn.j + ' &minus; ' + turn.need + ' = ' + spec.target + '</code>. Found: ' + found +
      '. Running total: <strong>' + turn.total + '</strong>.</p>' + (turn.why || '');
    verdict.appendChild(why);
    this.slot.appendChild(verdict);

    var nav = el('div', 'q-nav');
    var next = el('button', 'btn');
    next.type = 'button';
    next.textContent = this.index + 1 < spec.turns.length ? 'Next turn' : 'See how you did';
    next.addEventListener('click', function () {
      self.index++;
      self.picked = [];
      self.render();
    });
    nav.appendChild(next);
    this.slot.appendChild(nav);

    this.root.replaceChild(this.head(), this.root.firstChild);
    next.focus();
  };

  Tracer.prototype.renderClosing = function (body) {
    var self = this;
    var right = this.results.filter(Boolean).length;
    var total = this.results.length;

    var score = el('div', 'q-score');
    score.appendChild(el('h4', null, 'Lookups matched exactly'));
    score.appendChild(el('p', 'tally', right + ' / ' + total));

    var msg = el('p');
    msg.innerHTML = right === total
      ? (this.spec.closing || '') +
        ' <strong>Every lookup exact.</strong> You were computing the partner value, not recognising it.'
      : (this.spec.closing || '') +
        ' On the turns you missed, redo the one subtraction out loud before looking at the tape:' +
        ' the partner value is the running total minus the target, every time.';
    score.appendChild(msg);

    var nav = el('div', 'q-nav');
    var again = el('button', 'btn');
    again.type = 'button';
    again.textContent = 'Trace it again';
    again.addEventListener('click', function () {
      self.results = new Array(self.spec.turns.length).fill(null);
      self.index = 0;
      self.picked = [];
      self.render();
    });
    nav.appendChild(again);
    score.appendChild(nav);
    body.appendChild(score);
  };

  global.PrefixTracer = {
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
