/* ==========================================================================
   algoprep — ConstraintLadder
   Type the largest n from a problem's constraints; the widget names the
   slowest complexity you can still afford and the pattern families that
   survive at that budget. Rows above the hit are struck out as too slow.

   Ladder figures are from the USACO Guide's complexity table
   (https://usaco.guide/bronze/time-comp), which assumes a conservative
   10^8 simple operations per second. The pattern annotations are ours.

   Usage:
     <div id="ladder"></div>
     <script src="../assets/ladder.js"></script>
     <script>ConstraintLadder.mount('ladder');</script>

   Depends on: assets/lesson.css, assets/widgets.css
   ========================================================================== */

(function (global) {
  'use strict';

  var LADDER = [
    { max: 10,     nLabel: 'n ≤ 10',      big: 'O(n!)',                 families: 'Try every ordering. Permutation backtracking.' },
    { max: 20,     nLabel: 'n ≤ 20',      big: 'O(2ⁿ · n)',   families: 'Try every subset. Bitmask DP, subsets, backtracking.' },
    { max: 80,     nLabel: 'n ≤ 80',      big: 'O(n⁴)',            families: 'Four nested loops. Rare; usually a sign of a sloppy bound.' },
    { max: 400,    nLabel: 'n ≤ 400',     big: 'O(n³)',            families: 'Interval DP, Floyd–Warshall, matrix chain.' },
    { max: 7500,   nLabel: 'n ≤ 7·10³', big: 'O(n²)',    families: '2-D DP over two sequences or a grid. All-pairs comparison.' },
    { max: 70000,  nLabel: 'n ≤ 7·10⁴', big: 'O(n√n)',   families: 'Square-root decomposition, Mo’s algorithm. Almost never in interviews.' },
    { max: 500000, nLabel: 'n ≤ 5·10⁵', big: 'O(n log n)',    families: 'Sort first, heap, binary search on the answer, divide and conquer, ordered set.' },
    { max: 5000000, nLabel: 'n ≤ 5·10⁶', big: 'O(n)',         families: 'One pass: sliding window, prefix sum, two pointers, hash map, monotonic stack, greedy, Kadane.' },
    { max: Infinity, nLabel: 'n ≤ 10¹⁸', big: 'O(log n), O(1)', families: 'Binary search, closed-form maths, bit tricks, fast exponentiation.' }
  ];

  var PRESETS = [10, 20, 400, 1000, 100000, 1000000000];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function fmt(n) {
    if (n >= 1e6) {
      var e = Math.round(Math.log10(n));
      if (Math.abs(Math.pow(10, e) - n) < 1) return '10^' + e;
    }
    return n.toLocaleString('en-US');
  }

  function Ladder(root) {
    this.root = root;
    this.root.classList.add('widget');
    this.n = null;
    this.build();
    this.update();
  }

  Ladder.prototype.build = function () {
    var self = this;

    var head = el('div', 'widget-head');
    head.appendChild(el('span', 'widget-title', 'Constraint ladder'));
    head.appendChild(el('span', 'widget-meta', 'assumes ≈10⁸ ops/second'));
    this.root.appendChild(head);

    var body = el('div', 'widget-body');

    var inputRow = el('div', 'ladder-input');
    var label = el('label', null, 'Largest n in the constraints:');
    label.setAttribute('for', this.root.id + '-n');
    var input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'numeric';
    input.id = this.root.id + '-n';
    input.placeholder = 'e.g. 100000 or 1e5';
    input.addEventListener('input', function () {
      self.n = self.parse(input.value);
      self.update();
    });
    inputRow.appendChild(label);
    inputRow.appendChild(input);
    body.appendChild(inputRow);
    this.input = input;

    var chips = el('div', 'ladder-chips');
    PRESETS.forEach(function (p) {
      var chip = el('button', 'chip', fmt(p));
      chip.type = 'button';
      chip.addEventListener('click', function () {
        input.value = String(p);
        self.n = p;
        self.update();
      });
      chips.appendChild(chip);
    });
    body.appendChild(chips);

    var table = el('table', 'ladder-table');
    var thead = el('thead');
    var hr = el('tr');
    ['Up to', 'Slowest you can afford', 'What lives at that budget'].forEach(function (h) {
      hr.appendChild(el('th', null, h));
    });
    thead.appendChild(hr);
    table.appendChild(thead);

    var tbody = el('tbody');
    this.rows = LADDER.map(function (row) {
      var tr = el('tr');
      tr.appendChild(el('td', 'c-n', row.nLabel));
      tr.appendChild(el('td', 'c-big', row.big));
      tr.appendChild(el('td', null, row.families));
      tbody.appendChild(tr);
      return tr;
    });
    table.appendChild(tbody);
    body.appendChild(table);

    this.verdict = el('div', 'ladder-verdict');
    body.appendChild(this.verdict);

    this.root.appendChild(body);
  };

  Ladder.prototype.parse = function (raw) {
    var s = String(raw).trim().toLowerCase().replace(/[, _]/g, '');
    if (!s) return null;
    var m = s.match(/^(\d+(?:\.\d+)?)(?:e|\^|\*10\^|x10\^)(\d+)$/);
    if (m) return parseFloat(m[1]) * Math.pow(10, parseInt(m[2], 10));
    m = s.match(/^10\^(\d+)$/);
    if (m) return Math.pow(10, parseInt(m[1], 10));
    var v = parseFloat(s);
    return isFinite(v) && v > 0 ? v : null;
  };

  Ladder.prototype.update = function () {
    var self = this;
    var n = this.n;

    if (n == null) {
      this.rows.forEach(function (tr) { tr.className = ''; });
      this.verdict.innerHTML = 'Type the bound, or tap one above. The row you land on is your ' +
        '<strong>budget ceiling</strong>: the slowest thing that still finishes in time. ' +
        'Everything above that row is too slow, so it is eliminated before you have had a single idea.';
      return;
    }

    var hit = LADDER.length - 1;
    for (var i = 0; i < LADDER.length; i++) {
      if (n <= LADDER[i].max) { hit = i; break; }
    }

    this.rows.forEach(function (tr, i) {
      tr.className = i < hit ? 'dead' : (i === hit ? 'hit' : '');
    });

    var row = LADDER[hit];
    var tooSlow = hit > 0 ? LADDER[hit - 1].big : null;
    var html = 'With <code>n</code> up to ' + fmt(n) + ', aim for <strong>' + row.big + '</strong>. ';
    if (tooSlow) {
      html += 'A ' + tooSlow + ' idea is <strong>too slow</strong> — and so is everything ' +
              'struck out above it. ';
    }
    html += 'Surviving shapes: ' + row.families;
    this.verdict.innerHTML = html;
  };

  global.ConstraintLadder = {
    mount: function (rootId) {
      var root = document.getElementById(rootId);
      return root ? new Ladder(root) : null;
    },
    LADDER: LADDER
  };
})(window);
