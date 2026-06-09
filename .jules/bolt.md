## 2024-04-21 - Spatial Pruning and Path2D Batching
**Learning:** Binary search for spatial pruning must account for object width. A simple search for `obj.x >= minX` can miss wide objects that start before the viewport but overlap it. Tracking `maxObjWidth` and adjusting the search range to `minX - maxObjWidth` ensures correctness. Additionally, callback-based iteration (`forEachInRange`) avoids array allocations in hot loops, reducing GC pressure.
**Action:** Always consider object bounds (not just start position) when implementing spatial queries and favor callbacks over array returns for performance-critical iterators.

## 2026-06-09 - Path2D Batching and Redundant Logic Removal
**Learning:** Batching drawing operations with `Path2D` significantly reduces the number of calls to `fill()` and `stroke()`, which are expensive. Additionally, refactoring duplicate UI logic into dedicated methods (e.g., `drawProgressBar`) improves maintainability and ensures consistent rendering states.
**Action:** Always look for opportunities to batch geometry and keep UI rendering logic decoupled from the main game loop.
