## 2024-04-21 - Spatial Pruning and Path2D Batching
**Learning:** Binary search for spatial pruning must account for object width. A simple search for `obj.x >= minX` can miss wide objects that start before the viewport but overlap it. Tracking `maxObjWidth` and adjusting the search range to `minX - maxObjWidth` ensures correctness. Additionally, callback-based iteration (`forEachInRange`) avoids array allocations in hot loops, reducing GC pressure.
**Action:** Always consider object bounds (not just start position) when implementing spatial queries and favor callbacks over array returns for performance-critical iterators.

## 2024-05-15 - Spatial Pruning and Path2D Batching
**Learning:** In a side-scrolling canvas game, O(N) iteration over game objects for collision and rendering becomes a bottleneck as levels grow. Sorting objects by X-coordinate allows for O(log N) spatial pruning using binary search. Additionally, batching similar geometries into Path2D objects before a single fill/stroke call significantly reduces canvas overhead compared to individual draw calls.
**Action:** Always sort static game objects by position during initialization to enable efficient spatial queries, and use Path2D for batch rendering of repeated shapes.
