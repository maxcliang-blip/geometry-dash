## 2025-05-15 - [Collision Loop Hoisting]
**Learning:** In collision detection loops, avoid hoisting properties (like `player.y`) that are modified within the loop (e.g., during collision resolution). If a property changes, subsequent iterations in the same frame will use stale data, leading to tunneling or missed collisions.
**Action:** Always identify which properties are mutable within a loop before hoisting them for optimization. Recalculate dependent values (like bounds) inside the loop if the base properties change.
