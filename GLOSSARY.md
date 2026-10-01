# Glossary

Terms are used with exactly these meanings throughout the course. Where a term is *ours* —
coined for this course rather than standard — it says so, so you don't carry it into an
interview expecting to be understood.

---

**Amortised** — averaged over a whole run rather than measured per step. A sliding window's
inner shrink loop has no useful per-iteration bound, yet the sweep is O(n) because `left` only
moves forward and so takes at most n steps *in total*. *"While there is no useful upper bound on
how many steps the pointer can move on a single turn, we know that the pointer moves a total of
O(n) steps during the algorithm, because it only moves to the right."*
([Competitive Programmer's Handbook](https://cses.fi/book/book.pdf), ch. 8)

**Boundary** *(our term)* — one of the n + 1 positions *between* array elements, counting both
ends. Prefix value `p[i]` belongs to boundary `i`. A subarray is exactly one pair of boundaries
`i < j` — namely `arr[i..j-1]` — and its sum is `p[j] − p[i]`. Thinking in boundaries rather than in
runs is what converts a contiguous problem into a *pair* problem, and it is the whole content of
[lesson 0004](./lessons/0004-the-prefix-pair.html#pair).

**Budget** *(our term)* — the slowest time complexity you can afford, read off the input
constraints. See [lesson 0001](./lessons/0001-read-the-constraints-first.html) and the
[constraint ladder](./reference/0001-constraint-ladder.html).

**Complement lookup** *(our term)* — restating a condition on a subarray as a condition on two
prefix values, rearranging for the one you do not know, and finding it in a hash map in O(1). "Sums
to x" becomes "an earlier boundary holds `p[j] − x`". The technique is standard; the name is ours,
by analogy with two-sum. Unlike a sliding window it needs no monotonicity, because the prefix
identity is arithmetic rather than a promise about growth. See
[lesson 0004](./lessons/0004-the-prefix-pair.html#lookup).

**Contiguous** — occupying consecutive positions, with nothing skipped. The single most
load-bearing word in a problem statement: it separates subarrays from subsequences, and
therefore separates an O(n²) search space from a 2ⁿ one.

**Downward closed** — a property that every sub-window of a valid window also has. *At most k
distinct* is downward closed; *at least k distinct* is not. This is the unstated condition behind
`total += right - left + 1` in a counting window: it counts every shorter window ending at the
same place, so those must be valid too. See [lesson 0003](./lessons/0003-the-window-invariant.html).

**Dynamic programming (DP)** — solving a problem by combining answers to smaller overlapping
subproblems, each computed once and reused. The defining feature is *overlap*: if subproblems
never repeat, you have plain recursion, not DP.

**Feasibility check** *(our term)* — a function that answers "does this candidate answer work?"
for a single candidate, used to binary search over a range of possible answers rather than over a
sorted array. It only licenses a binary search when it is *monotonic* (below) in the candidate —
see the [licence check](./lessons/0006-choosing-the-search-space.html#licence) in
[lesson 0006](./lessons/0006-choosing-the-search-space.html).

**Greedy** — building a solution by making the choice that looks best *right now*, once, without
ever revisiting it. A greedy step is only correct when there is a proof that the locally best
choice can never be beaten by saving it for later — usually by showing that whatever the greedy
choice would let you do next, any other choice would let you do too, or less. That proof is called
an **exchange argument**. Contrast with dynamic programming, above, which keeps every candidate
alive until the input forces a decision. See [lesson 0010](./lessons/0010-which-end-you-sort-by.html).

**Heap** — a binary tree stored as an array, satisfying one local rule: every parent compares no
worse than either of its children. *"Min-heaps are binary trees for which every parent node has a
value less than or equal to any of its children,"* so *"the smallest element is always the root,
`heap[0]`."* ([Python docs](https://docs.python.org/3/library/heapq.html)) That one rule is enough
to insert and remove the current extreme in O(log n) — *"insertion of elements, deletion of the
element considered highest priority, and retrieval of the highest priority element, all in
O(log N) time"* ([USACO Guide](https://usaco.guide/silver/priority-queues)) — but it guarantees
nothing about the order of the other n − 1 elements. See **partial order**, below, and
[lesson 0009](./lessons/0009-the-root-knows-one-thing.html).

**Interval** — a closed range `[start, end]`. Two intervals *overlap* when the later-starting one
begins no later than the earlier one ends. A whole set of intervals is handed to you complete, up
front — unlike the growing stream in [lesson 0009](./lessons/0009-the-root-knows-one-thing.html) —
which is exactly what licenses sorting once and sweeping, rather than maintaining a heap. See
[lesson 0010](./lessons/0010-which-end-you-sort-by.html).

**Invariant** — a statement that is true every time control reaches a particular point in the
algorithm. "The window always contains at most k distinct characters" is an invariant. Getting
the invariant wrong, rather than the pattern wrong, is the most common way a correctly-identified
approach still fails. Write it before the loop, about the line *after* the shrink step: the
`while` condition is then exactly the invariant being false, and the answer update belongs at the
one line where it is true. See [lesson 0003](./lessons/0003-the-window-invariant.html).

**Kadane's algorithm** — the O(n) sweep for maximum-sum contiguous subarray. Equivalently, a
prefix-sum sweep that tracks the running *minimum* prefix seen so far; the best subarray ending
at `r` is `p[r]` minus that minimum.
([USACO Guide](https://usaco.guide/silver/more-prefix-sums))

**Monotonic** — moving in one direction only. A predicate is monotonic over a window if, once it
becomes false as the window grows, it stays false. Equivalently: for each right endpoint the valid
start positions form one unbroken run, so a single forward-only `left` can mark the boundary. See
the [licence check](./lessons/0003-the-window-invariant.html#licence) for the two ways it fails —
mixed-sign sums, where a false predicate turns true again, and *exactly k*, where the valid starts
form a band with no single edge. The precise rule is that a band **wider than one** defeats a single
pointer: an *exactly* question over strictly positive values has a band one cell wide and is fine,
which is why CSES 1660 is a window and CSES 1661 is not
([lesson 0004](./lessons/0004-the-prefix-pair.html)). This is the precise condition that licenses a
sliding window: *"movement in one direction should not reverse the effects of movement in the
other direction."* ([USACO Guide](https://usaco.guide/silver/two-pointers))

The same word applies one axis over: a **feasibility check** (above) is monotonic if, once it
turns true as the candidate answer grows (or shrinks), it stays true. *"Similarly to how binary
search on an array only works on a sorted array, binary search on the answer only works if the
answer function is monotonic."* ([USACO Guide](https://usaco.guide/silver/binary-search)) See
[lesson 0006](./lessons/0006-choosing-the-search-space.html#licence) for a feasibility check that
fails this — true, false, true, false, true as the candidate grows — and what happens if you
binary search over it anyway.

**Parent guard** *(our term)* — the `if kid != parent` test in every DFS over a tree given as
an *adjacency list*. An undirected edge appears in both endpoints' neighbour lists, so without it
the walk recurses parent → child → parent forever. Because a tree has no cycles, carrying the one
node you came from is *sufficient*; no visited set is needed. *"The purpose of the parameter `e` is
to make sure that the search only moves to nodes that have not been visited yet."*
([Competitive Programmer's Handbook](https://cses.fi/book/book.pdf), ch. 14) See
[lesson 0008](./lessons/0008-what-the-children-return.html#tree).

**Partial order** *(our term, for this course's usage)* — the licence a heap gives you: one
guaranteed fact (how the root compares to everything else) and no guarantee about how the
remaining elements compare to *each other*. Weaker than a sorted structure's full order, and that
gap is exactly what makes push and pop O(log n) instead of O(n). Every earlier licence in this
course (monotonic, sorted, overlapping) was a claim about the whole input; a partial order is a
claim about one element, re-established after every change. See
[lesson 0009](./lessons/0009-the-root-knows-one-thing.html#trade).

**Post-order / pre-order** — where the work sits relative to the recursive calls. *Post-order*:
*"recursively visit all children before processing the current node"* — used when the answer at a
node is built from its children, and so travels **up** in return values. *Pre-order*: *"process the
current node before recursively visiting its children"* — used when the answer is handed down from
the parent, and so travels **down** in parameters.
([USACO Guide](https://usaco.guide/silver/intro-tree)) They are not two techniques; they are the
same walk with the work line moved, and the direction the information comes from decides which. See
[lesson 0008](./lessons/0008-what-the-children-return.html#down).

**Predicate** — the yes/no test a window must satisfy: "holds at most k distinct characters",
"sums to at least target". Not the same thing as an *invariant*: the invariant is a claim about
where the pointers have come to rest, and the predicate is the test that claim refers to. Whether
the predicate is *monotonic* (above) in the window's length is what decides whether a window is
legal at all. See [lesson 0003](./lessons/0003-the-window-invariant.html#licence).

**Prefix sum** — an array `p` where `p[k]` is the sum of the original array's first `k` elements,
so `p[0] = 0` and `p` has **n + 1 entries**. Its whole purpose is the identity
`sum(arr[l..r]) = p[r+1] − p[l]`, which turns any range-sum question into one subtraction. Keep that
0-indexed form rather than the USACO Guide's 1-indexed `p[R] − p[L−1]`; they are the same identity,
and every off-by-one in this pattern comes from improvising between them.
([USACO Guide](https://usaco.guide/silver/prefix-sums)) Its second, larger use is the
**complement lookup** above.

**Return type** *(our term)* — what the problem asks you to hand back: *existence* (a yes/no),
a *count*, an *optimum* (a min or max value), the *object itself* (reconstruct the winning
subarray, path, or string), or *all* objects. Within a fixed shape, the return type decides the
machinery. See [lesson 0002](./lessons/0002-the-shape-of-the-answer.html).

**Return-versus-record** *(our term)* — the decision, in a recursive walk, between the value the
*parent* can use and the value the *problem* asked for, when they differ. Tree diameter is the
canonical case: the parent can only extend a single downward branch, so that is what the call
returns, while the longest path *turning around* at this node gets recorded in a running best and
dropped. Returning the asked-for number instead is a silent wrong answer that is correct on
path-shaped and star-shaped trees — i.e. on every tree you would sketch to check your work. See
[lesson 0008](./lessons/0008-what-the-children-return.html#both).

**Rooted tree** — a tree with one node named the root and every other node placed beneath it, so
each node has exactly one parent. Its point is that it is *recursive*: *"each node of the tree acts
as the root of a subtree that contains the node itself and all nodes that are in the subtrees of
its children"* ([CPH](https://cses.fi/book/book.pdf), ch. 14). A **subtree** is that node plus
everything below it. Rooting an unrooted tree arbitrarily costs nothing and is the standard first
move on a tree problem, because it turns "the tree" into "this node and its children's answers".

**Search space** — the set of candidate answers. Usually implied by the shape and handed to you —
its *size* is the number that matters: a contiguous shape has n(n+1)/2 candidates, a subsequence
shape has 2ⁿ. It can also be one you *construct*, as a bounded range of integers, when the problem
asks you to minimize or maximize a quantity rather than find an object — see
[lesson 0006](./lessons/0006-choosing-the-search-space.html).

**Shape** *(our term)* — the geometry of the thing the problem asks you to find: a contiguous
run, an order-preserving selection, an unordered selection, a pair, or an arrangement. See
[lesson 0002](./lessons/0002-the-shape-of-the-answer.html).

**Sliding window** — a pair of indices `l ≤ r` sweeping left to right over a sequence, where
each index only ever moves forward. Because both move at most n times in total, the sweep is
O(n) even though it examines many windows. Valid only when the governing predicate is
[monotonic](./lessons/0003-the-window-invariant.html#licence) — that is the licence, and it is
worth checking before anything else. For a *longest* window, shrinking is repair — shrink while
the window is broken, measure after. For a *shortest* window, shrinking is the search — shrink
while the window still works, measuring each time.

**Subarray** — a contiguous slice of an array. There are n(n+1)/2 non-empty subarrays of an
n-element array (choose a start and an end), which is O(n²) of them.

**Subsequence** — a selection obtained by deleting zero or more elements *without reordering*
the rest. Not necessarily contiguous. There are 2ⁿ − 1 non-empty subsequences (each element is
in or out), which is why subsequence problems are DP or bitmask, never enumeration, unless n is
tiny.

**Subset** — a selection where order carries no meaning at all. Same 2ⁿ count as subsequences;
the difference is that with a subset you are free to sort the input first, and with a
subsequence you are not.

**Substring** — a subarray, in the context of strings. Contiguous. The word "substring" in a
problem statement is therefore a contiguity signal exactly as "subarray" is.

**Sweep line** — turning each interval into two point events, an arrival and a departure, sorting
all of them together, and walking the sorted list once with a running counter instead of comparing
intervals to each other. *"Each interval is converted into two events: (aᵢ, +1) for an arrival and
(bᵢ, −1) for a departure. All events are sorted by time; if two events coincide, departures are
processed before arrivals."* ([USACO Guide](https://usaco.guide/plat/sweep-line)) That tie-break is
load-bearing: without it, an interval ending the instant another begins is counted as briefly
overlapping it. See [lesson 0011](./lessons/0011-counting-maximum-overlap.html#tie).

**Two pointers** — any technique using two indices that each traverse the input once. A sliding
window is the same-direction variant; the opposite-ends variant walks inward from both ends and
relies on the input being sorted. ([USACO Guide](https://usaco.guide/silver/two-pointers))

**Bitmask** — an integer used as a set: bit *i* is 1 when item *i* is in the subset, so every
integer in `range(1 << n)` is exactly one subset of *n* items. Membership is `mask >> i & 1`.
Affordable when `n ≤ 20` (2²⁰ ≈ 10⁶). ([USACO Guide](https://usaco.guide/gold/dp-bitmasks);
[lesson 0012](./lessons/0012-subsets-as-integers.html))

**Backtracking** — building a solution one decision at a time by recursion, testing legality
*before* each recursive call and undoing the choice afterwards, so a dead partial solution is
abandoned along with every extension of it. "A backtracking algorithm begins with an empty
solution and extends the solution step by step."
([USACO Guide](https://usaco.guide/bronze/complete-rec);
[lesson 0013](./lessons/0013-prune-before-you-recurse.html))

**Reservoir sampling** — keeping a uniformly random sample of *k* items from a stream read once,
of unknown length, using only the reservoir (and a counter) as memory: keep the first *k*, then
let item *i* replace a random reservoir slot with probability *k*/*i*. For *k* = 1 that is
`random.randrange(i) == 0`. Every item ends up in the sample with probability exactly *k*/*n*.
([CS168 Lecture 13](https://web.stanford.edu/class/cs168/l/l13.pdf);
[lesson 0014](./lessons/0014-keep-with-probability-one-over-i.html))

**Breadth-first search (BFS)** — graph traversal by a queue instead of recursion, exploring every
node at distance *k* from the start before any node at distance *k*+1. "In a breadth-first search,
we travel through the vertices in order of their distance from the starting vertex."
([USACO Guide](https://usaco.guide/silver/graph-traversal)) Because of that layer order, the first
time BFS discovers a node is guaranteed to be via the fewest possible edges — the tool for
"shortest path" only when every edge counts the same.
See [lesson 0015](./lessons/0015-settle-each-node-once.html).

**Visited set** — the record of which nodes a traversal has already discovered, needed by both BFS
and DFS the moment a graph can offer more than one path to a node (any tree cannot). "The algorithm
keeps track of visited nodes, so that it processes each node only once."
([USACO Guide](https://usaco.guide/silver/graph-traversal)) Mark a node visited the instant it is
*discovered*, not when it is later processed — marking late does not break correctness but lets
the same node be queued many times over.
See [lesson 0015](./lessons/0015-settle-each-node-once.html).
