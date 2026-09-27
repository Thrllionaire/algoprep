/* ==========================================================================
   algoprep — WindowTracer
   A step-through trace of any same-direction two-pointer sweep. Each turn
   advances the right pointer, then asks the learner to click the cell where
   the LEFT pointer comes to rest. That is free retrieval of the shrink
   condition rather than multiple choice, which is the point: the learner has
   to evaluate the predicate, not recognise a phrasing.

   Reusable for any sweep where both pointers only move forward — sliding
   window, the opposite-ends variant (pass reversed data), or a merge.

   Usage:
     <div id="my-trace"></div>
     <script type="application/json" id="my-trace-data">
       { "title": "…",
         "array": ["a","b","b"],
         "invariant": "HTML — shown above every turn, on purpose",
         "answerLabel": "best",
         "turns": [
           { "r": 0, "lFrom": 0, "lTo": 0, "state": "a:1",
             "best": 1, "why": "<p>HTML shown after answering.</p>" }
         ],
         "closing": "<p>HTML shown on the final panel.</p>" }
     </script>
     <script src="../assets/window.js"></script>
     <script>WindowTracer.mount('my-trace', 'my-trace-data');</script>

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

  function Tracer(root, spec) {
    this.root = root;
    this.spec = spec;
    this.index = 0;
    this.results = new Array(spec.turns.length).fill(null); // true | false | null
    this.answered = false;
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
    head.appendChild(el('span', 'widget-title', this.spec.title || 'Trace the window'));
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

  /* The tape of array cells. `mode` is 'ask' before answering, 'show' after. */
  Tracer.prototype.tape = function (turn, mode, picked) {
    var self = this;
    var tape = el('div', 'wt-tape');

    this.spec.array.forEach(function (v, i) {
      var cell = el('div', 'wt-cell');
      cell.appendChild(el('span', 'wt-idx', String(i)));
      cell.appendChild(el('span', 'wt-val', String(v)));

      if (i < turn.lFrom) cell.classList.add('is-gone');
      else if (i <= turn.r) cell.classList.add('is-win');
      else cell.classList.add('is-ahead');
      if (i === turn.r) cell.classList.add('is-r');

      // Only cells the left pointer could legally reach are clickable.
      var reachable = i >= turn.lFrom && i <= turn.r;

      if (mode === 'ask' && reachable) {
        var btn = el('button', 'wt-hit');
        btn.type = 'button';
        btn.setAttribute('aria-label', 'left stops at index ' + i);
        btn.addEventListener('click', function () { self.answer(i, turn); });
        cell.appendChild(btn);
        cell.classList.add('is-live');
      }

      if (mode === 'show') {
        if (i === turn.lTo) cell.classList.add('is-target');
        if (picked !== turn.lTo && i === picked) cell.classList.add('is-miss');
      }

      tape.appendChild(cell);
    });

    return tape;
  };

  Tracer.prototype.renderTurn = function (body) {
    var turn = this.spec.turns[this.index];
    var arr = this.spec.array;

    var counter = el('div', 'widget-meta',
      'Turn ' + (this.index + 1) + ' of ' + this.spec.turns.length +
      '  ·  right = ' + turn.r + '  ·  left was ' + turn.lFrom);
    counter.style.marginBottom = '0.7rem';
    body.appendChild(counter);

    if (this.spec.invariant) {
      var inv = el('div', 'wt-invariant');
      inv.innerHTML = this.spec.invariant;
      body.appendChild(inv);
    }

    var ask = el('p', 'wt-ask');
    ask.innerHTML = 'Right has just taken in <code>' + arr[turn.r] + '</code> at index ' +
      turn.r + '. <strong>Click the cell where left comes to rest.</strong> ' +
      'If it should not move at all, click where it already is.';
    body.appendChild(ask);

    body.appendChild(this.tape(turn, 'ask', null));

    if (turn.state != null) {
      var st = el('div', 'wt-state');
      st.innerHTML = '<span>window state</span>' + turn.state;
      body.appendChild(st);
    }

    this.slot = el('div');
    body.appendChild(this.slot);
  };

  Tracer.prototype.answer = function (picked, turn) {
    var self = this;
    var correct = picked === turn.lTo;
    this.results[this.index] = correct;

    // Re-draw the tape in 'show' mode, in place.
    var body = this.root.querySelector('.widget-body');
    var old = body.querySelector('.wt-tape');
    body.replaceChild(this.tape(turn, 'show', picked), old);

    var verdict = el('div', 'q-verdict ' + (correct ? 'ok' : 'no'));
    verdict.appendChild(el('span', 'q-verdict-label', correct ? 'Right' : 'Not there'));
    var why = el('div');
    why.innerHTML =
      '<p><strong>left = ' + turn.lTo + '</strong>, window <code>' +
      this.spec.array.slice(turn.lTo, turn.r + 1).join('') + '</code>, size ' +
      (turn.r - turn.lTo + 1) +
      (turn.best != null
        ? '. ' + (this.spec.answerLabel || 'best') + ' is now <strong>' + turn.best + '</strong>.'
        : '.') +
      '</p>' + (turn.why || '');
    verdict.appendChild(why);
    this.slot.appendChild(verdict);

    var nav = el('div', 'q-nav');
    var next = el('button', 'btn');
    next.type = 'button';
    next.textContent = this.index + 1 < this.spec.turns.length ? 'Next turn' : 'See how you did';
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

    var score = el('div', 'q-score');
    score.appendChild(el('h4', null, 'Shrink calls placed correctly'));
    score.appendChild(el('p', 'tally', right + ' / ' + total));

    var msg = el('p');
    msg.innerHTML = right === total
      ? (this.spec.closing || '') +
        ' <strong>Every shrink placed correctly.</strong> That is the invariant doing the work, not memory.'
      : (this.spec.closing || '') +
        ' The turns you missed are the ones to re-read: in each, ask what the invariant' +
        ' claims and how far left must travel to make it true again.';
    score.appendChild(msg);

    var nav = el('div', 'q-nav');
    var again = el('button', 'btn');
    again.type = 'button';
    again.textContent = 'Trace it again';
    again.addEventListener('click', function () {
      self.results = new Array(self.spec.turns.length).fill(null);
      self.index = 0;
      self.render();
    });
    nav.appendChild(again);
    score.appendChild(nav);
    body.appendChild(score);
  };

  global.WindowTracer = {
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
