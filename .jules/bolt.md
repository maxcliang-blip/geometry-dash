## 2024-04-21 - Spatial Pruning and Path2D Batching
**Learning:** Binary search for spatial pruning must account for object width. A simple search for `obj.x >= minX` can miss wide objects that start before the viewport but overlap it. Tracking `maxObjWidth` and adjusting the search range to `minX - maxObjWidth` ensures correctness. Additionally, callback-based iteration (`forEachInRange`) avoids array allocations in hot loops, reducing GC pressure.
**Action:** Always consider object bounds (not just start position) when implementing spatial queries and favor callbacks over array returns for performance-critical iterators.

## 2025-05-14 - Optimization Loop Structure
**Learning:** In performance-critical loops like collision detection, using a callback-based iterator (like `forEachInRange`) can prevent the use of `break` or `return` to immediately exit the entire search when a terminal state (like player death) is reached. While cleaner, it can be slightly less efficient than a manual `for` loop if early exits are common.
**Action:** Use manual `for` loops starting from a binary-searched index for hot paths where early exit is a likely optimization.
