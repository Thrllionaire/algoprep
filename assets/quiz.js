/* ==========================================================================
   algoprep — AlgoQuiz
   A reusable retrieval-practice widget. One question at a time, options
   shuffled on every load, answers locked once chosen, explanation shown
   immediately. Optional "commit first" gate blurs the options until the
   learner has generated an answer from memory, which is the point.

   Usage:
     <div id="my-quiz"></div>
     <script type="application/json" id="my-quiz-data">
       { "commit": "Name the complexity out loud before revealing.",
         "questions": [
           { "stem": "…", "given": "1 <= n <= 18",
             "options": [ {"text":"…", "correct": true}, {"text":"…"} ],
             "why": "<p>HTML explanation, shown after answering.</p>",
             "tag": "exponential" }
         ] }
     </script>
     <script src="../assets/quiz.js"></script>
     <script>AlgoQuiz.mount('my-quiz', 'my-quiz-data');</script>

   Depends on: assets/lesson.css, assets/widgets.css
   ========================================================================== */

(function (global) {
  'use strict';

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function Quiz(root, spec) {
    this.root = root;
    this.spec = spec;
    this.questions = spec.questions.map(function (q) {
      return { q: q, options: shuffle(q.options) };
    });
    this.index = 0;
    this.results = new Array(this.questions.length).fill(null); // true | false | null
    this.root.classList.add('widget');
    this.render();
  }

  Quiz.prototype.render = function () {
    this.root.innerHTML = '';
    this.root.appendChild(this.head());
    var body = el('div', 'widget-body');
    this.root.appendChild(body);
    if (this.index >= this.questions.length) this.renderScore(body);
    else this.renderQuestion(body);
  };

  Quiz.prototype.head = function () {
    var head = el('div', 'widget-head');
    head.appendChild(el('span', 'widget-title', this.spec.title || 'Retrieval practice'));
    var dots = el('div', 'q-dots');
    for (var i = 0; i < this.questions.length; i++) {
      var d = el('span', 'q-dot');
      if (this.results[i] === true) d.classList.add('ok');
      if (this.results[i] === false) d.classList.add('no');
      if (i === this.index) d.classList.add('now');
      dots.appendChild(d);
    }
    head.appendChild(dots);
    return head;
  };

  Quiz.prototype.renderQuestion = function (body) {
    var self = this;
    var item = this.questions[this.index];
    var q = item.q;

    var counter = el('div', 'widget-meta', 'Question ' + (this.index + 1) + ' of ' + this.questions.length);
    counter.style.marginBottom = '0.7rem';
    body.appendChild(counter);

    var stem = el('p', 'q-stem');
    stem.innerHTML = q.stem;
    body.appendChild(stem);

    if (q.given) {
      var given = el('div', 'q-given');
      given.textContent = q.given;
      body.appendChild(given);
    }

    var list = el('ul', 'q-options');
    var gated = !!this.spec.commit;
    if (gated) list.classList.add('is-locked');

    item.options.forEach(function (opt) {
      var li = el('li');
      var btn = el('button', 'q-opt');
      btn.type = 'button';
      btn.textContent = opt.text;
      btn.addEventListener('click', function () { self.answer(opt, item, list, body); });
      li.appendChild(btn);
      list.appendChild(li);
    });

    if (gated) {
      var gate = el('div', 'q-commit');
      var p = el('p');
      p.innerHTML = this.spec.commit;
      gate.appendChild(p);
      var reveal = el('button', 'btn btn-ghost');
      reveal.type = 'button';
      reveal.textContent = 'I have my answer — show the options';
      reveal.addEventListener('click', function () {
        list.classList.remove('is-locked');
        gate.remove();
      });
      gate.appendChild(reveal);
      body.appendChild(gate);
    }

    body.appendChild(list);
  };

  Quiz.prototype.answer = function (chosen, item, list, body) {
    var self = this;
    var correct = !!chosen.correct;
    this.results[this.index] = correct;

    var buttons = list.querySelectorAll('.q-opt');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var opt = item.options[i];
      btn.disabled = true;
      if (opt.correct) btn.classList.add('is-correct');
      else if (opt === chosen) btn.classList.add('is-wrong');
      else btn.classList.add('is-dim');
    }

    var verdict = el('div', 'q-verdict ' + (correct ? 'ok' : 'no'));
    verdict.appendChild(el('span', 'q-verdict-label', correct ? 'Right' : 'Not this one'));
    var why = el('div');
    why.innerHTML = item.q.why;
    verdict.appendChild(why);
    body.appendChild(verdict);

    var nav = el('div', 'q-nav');
    var next = el('button', 'btn');
    next.type = 'button';
    next.textContent = this.index + 1 < this.questions.length ? 'Next question' : 'See how you did';
    next.addEventListener('click', function () { self.index++; self.render(); });
    nav.appendChild(next);
    body.appendChild(nav);

    // refresh the progress dots in the head
    this.root.replaceChild(this.head(), this.root.firstChild);
    next.focus();
  };

  Quiz.prototype.renderScore = function (body) {
    var self = this;
    var right = this.results.filter(Boolean).length;
    var total = this.results.length;

    var score = el('div', 'q-score');
    score.appendChild(el('h4', null, 'Score'));
    score.appendChild(el('p', 'tally', right + ' / ' + total));

    var missed = this.questions
      .map(function (item, i) { return self.results[i] === false ? item.q : null; })
      .filter(Boolean);

    var msg = el('p');
    if (!missed.length) {
      msg.innerHTML = this.spec.perfect ||
        'Clean sweep. Come back to this in two days and do it again — the options reshuffle, ' +
        'so a second pass is real retrieval, not recall of where the right box sat.';
    } else {
      msg.innerHTML = 'Worth a second pass. These are the ones to re-read, then redo this quiz ' +
        'tomorrow rather than right now — the gap is what builds retention:';
    }
    score.appendChild(msg);

    if (missed.length) {
      var ul = el('ul');
      missed.forEach(function (q) {
        var li = el('li');
        li.innerHTML = '<strong>' + (q.tag || 'review') + '</strong> — ' + q.stem;
        ul.appendChild(li);
      });
      score.appendChild(ul);
    }

    var nav = el('div', 'q-nav');
    var again = el('button', 'btn');
    again.type = 'button';
    again.textContent = 'Run it again (reshuffled)';
    again.addEventListener('click', function () {
      self.questions = self.spec.questions.map(function (q) {
        return { q: q, options: shuffle(q.options) };
      });
      self.results = new Array(self.questions.length).fill(null);
      self.index = 0;
      self.render();
    });
    nav.appendChild(again);
    score.appendChild(nav);
    body.appendChild(score);
  };

  global.AlgoQuiz = {
    mount: function (rootId, dataId) {
      var root = document.getElementById(rootId);
      var data = document.getElementById(dataId);
      if (!root || !data) return null;
      var spec;
      try {
        spec = JSON.parse(data.textContent);
      } catch (e) {
        root.textContent = 'Quiz failed to load: ' + e.message;
        return null;
      }
      return new Quiz(root, spec);
    }
  };
})(window);
