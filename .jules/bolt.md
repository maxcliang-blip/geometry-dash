## 2025-05-14 - Optimized Game Engine Performance
**Learning:** For HTML5 Canvas games, batching draw calls using Path2D and implementing horizontal spatial pruning on sorted object lists significantly reduces CPU overhead from O(N) to O(Viewport).
**Action:** Always sort level objects by X-coordinate in the constructor to enable efficient culling and pruning in the game loop. Use Path2D for batching objects of the same type and style.
