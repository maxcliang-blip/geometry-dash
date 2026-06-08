## 2024-04-21 - Spatial Pruning and Path2D Batching
**Learning:** Binary search for spatial pruning must account for object width. A simple search for `obj.x >= minX` can miss wide objects that start before the viewport but overlap it. Tracking `maxObjWidth` and adjusting the search range to `minX - maxObjWidth` ensures correctness. Additionally, callback-based iteration (`forEachInRange`) avoids array allocations in hot loops, reducing GC pressure.
**Action:** Always consider object bounds (not just start position) when implementing spatial queries and favor callbacks over array returns for performance-critical iterators.

## 2026-06-08 - Callback-based Early Termination
**Learning:** When refactoring procedural loops (O(N)) into callback-based spatial queries (O(log N + K)), ensure the callback mechanism supports early termination (e.g., by returning `false`). Standard `forEach` doesn't support this, which can lead to redundant processing after a "terminal" event like player death.
**Action:** Design spatial query callbacks to respect boolean return values for early loop termination.
