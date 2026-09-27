/* ==========================================================================
   algoprep — DecisionGrid
   A reusable two-axis lookup table. Rows are one axis, columns another; each
   cell holds the technique that lives at that intersection. Clicking a cell
   opens a detail panel. Built for "shape x return type", but the data is
   generic, so any two-axis taxonomy can reuse it.

   Usage:
     <div id="shape-grid"></div>
     <script type="application/json" id="shape-grid-data">
       { "rowLabel": "Shape", "colLabel": "Return type",
         "cols": [ {"key":"opt","name":"Optimum"} ],
         "rows": [ {"key":"run","name":"Contiguous run","note":"n(n+1)/2 candidates"} ],
         "cells": { "run|opt": { "family": "Sliding window",
                                 "detail": "<p>HTML</p>", "example": "LC 3" } } }
     </script>
     <script src="../assets/grid.js"></script>
     <script>DecisionGrid.mount('shape-grid', 'shape-grid-data');</script>

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

  function Grid(root, spec) {
    this.root = root;
    this.spec = spec;
    this.root.classList.add('widget');
    this.build();
  }

  Grid.prototype.build = function () {
    var self = this;
    var spec = this.spec;

    var head = el('div', 'widget-head');
    head.appendChild(el('span', 'widget-title', spec.title || 'Decision grid'));
    head.appendChild(el('span', 'widget-meta', 'select a cell'));
    this.root.appendChild(head);

    var body = el('div', 'widget-body');

    var scroll = el('div', 'grid-scroll');
    var table = el('table', 'grid-table');

    var thead = el('thead');
    var hr = el('tr');
    var corner = el('th', 'grid-corner');
    corner.innerHTML = '<span>' + (spec.rowLabel || '') + '</span> ↓<br>' +
                       (spec.colLabel || '') + ' →';
    hr.appendChild(corner);
    spec.cols.forEach(function (c) { hr.appendChild(el('th', null, c.name)); });
    thead.appendChild(hr);
    table.appendChild(thead);

    var tbody = el('tbody');
    this.cells = [];
    spec.rows.forEach(function (r) {
      var tr = el('tr');
      var th = el('th', 'grid-rowhead');
      th.appendChild(el('span', 'grid-rowname', r.name));
      if (r.note) th.appendChild(el('span', 'grid-rownote', r.note));
      tr.appendChild(th);

      spec.cols.forEach(function (c) {
        var td = el('td');
        var data = spec.cells[r.key + '|' + c.key];
        if (!data) {
          td.className = 'grid-empty';
          td.textContent = '—';
        } else {
          var btn = el('button', 'grid-cell');
          btn.type = 'button';
          btn.textContent = data.family;
          btn.addEventListener('click', function () { self.select(r, c, data, btn); });
          td.appendChild(btn);
          self.cells.push(btn);
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    scroll.appendChild(table);
    body.appendChild(scroll);

    this.panel = el('div', 'grid-panel');
    this.panel.innerHTML = spec.hint ||
      'Pick any cell. The row fixes the size of the search space; the column fixes how you ' +
      'traverse it. The technique is what sits at the intersection.';
    body.appendChild(this.panel);

    this.root.appendChild(body);
  };

  Grid.prototype.select = function (row, col, data, btn) {
    this.cells.forEach(function (b) { b.classList.remove('is-on'); });
    btn.classList.add('is-on');

    this.panel.innerHTML = '';
    var crumb = el('p', 'grid-crumb');
    crumb.innerHTML = row.name + ' <span>+</span> ' + col.name.toLowerCase() +
                      ' <span>→</span> <strong>' + data.family + '</strong>';
    this.panel.appendChild(crumb);

    var detail = el('div', 'grid-detail');
    detail.innerHTML = data.detail;
    this.panel.appendChild(detail);

    if (data.example) {
      var ex = el('p', 'grid-example');
      ex.innerHTML = '<span>Canonical problem</span> ' + data.example;
      this.panel.appendChild(ex);
    }
  };

  global.DecisionGrid = {
    mount: function (rootId, dataId) {
      var root = document.getElementById(rootId);
      var data = document.getElementById(dataId);
      if (!root || !data) return null;
      var spec;
      try {
        spec = JSON.parse(data.textContent);
      } catch (e) {
        root.textContent = 'Grid failed to load: ' + e.message;
        return null;
      }
      return new Grid(root, spec);
    }
  };
})(window);
