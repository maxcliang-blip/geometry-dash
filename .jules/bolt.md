## 2024-04-21 - Spatial Pruning and Path2D Batching
**Learning:** Binary search for spatial pruning must account for object width. A simple search for `obj.x >= minX` can miss wide objects that start before the viewport but overlap it. Tracking `maxObjWidth` and adjusting the search range to `minX - maxObjWidth` ensures correctness. Additionally, callback-based iteration (`forEachInRange`) avoids array allocations in hot loops, reducing GC pressure.
**Action:** Always consider object bounds (not just start position) when implementing spatial queries and favor callbacks over array returns for performance-critical iterators.

## 2024-04-22 - Rendering Batching and Loop Invariants
**Learning:** Batching drawing operations with `Path2D` significantly reduces the overhead of context state changes and draw calls. Also, moving loop-invariant calculations (like the player's top bound) outside of physics/collision loops avoids redundant arithmetic in high-frequency code paths.
**Action:** Use `Path2D` to batch similar geometry and always hoist static calculations out of hot loops.
