export const NODE_WIDTH = 220;
export const NODE_HEIGHT = 80;
export const SPOUSE_GAP = 30;
export const SIBLING_GAP = 40;
export const ROW_GAP = 60;

export function calculateLayout(members, collapsedNodes) {
    if (!members || members.length === 0) return { nodes: {}, links: [] };

    // Find visible members based on expanded/collapsed nodes
    const visibleIds = new Set();
    const queue = [];

    // Roots (members with no parents in the visible tree)
    const roots = members.filter(m => {
        const hasNoParents = !(m.parents) || (m.parents || []).length === 0;
        if (!hasNoParents) return false;
        
        // Exclude spouses marrying into the family (whose spouses have parents)
        const hasSpouseWithParents = (m.spouses || []).some(sId => {
            const spouse = members.find(x => x.id === sId);
            return spouse && spouse.parents && spouse.parents.length > 0;
        });
        
        return !hasSpouseWithParents;
    });

    if (roots.length > 0) {
        roots.forEach(r => {
            visibleIds.add(r.id);
            queue.push(r.id);
        });
    } else {
        visibleIds.add(members[0].id);
        queue.push(members[0].id);
    }

    while (queue.length > 0) {
        const currentId = queue.shift();
        const m = members.find(x => x.id === currentId);
        if (!m) continue;

        // Spouses are visible if this node is visible
        if (m.spouses) {
            (m.spouses || []).forEach(sId => {
                if (!visibleIds.has(sId)) {
                    visibleIds.add(sId);
                }
            });
        }

        // Children are visible ONLY if this parent is NOT collapsed
        if (m.children && !collapsedNodes.has(currentId)) {
            (m.children || []).forEach(chId => {
                if (!visibleIds.has(chId)) {
                    visibleIds.add(chId);
                    queue.push(chId);
                }
            });
        }
    }

    const layoutNodes = {};
    const links = [];
    const visited = new Set();

    // Recursive arrangeNode function to compute sizes and position nodes
    function arrangeNode(nodeId, level) {
        if (visited.has(nodeId) || !visibleIds.has(nodeId)) {
            return { width: 0, midpoint: 0, positions: {}, links: [] };
        }
        visited.add(nodeId);

        const m = members.find(x => x.id === nodeId);
        if (!m) return { width: 0, midpoint: 0, positions: {}, links: [] };

        // Get spouses on this level
        const visibleSpouses = (m.spouses || []).filter(sId => visibleIds.has(sId));
        visibleSpouses.forEach(sId => visited.add(sId));

        const hasSpouse = visibleSpouses.length > 0;
        const familyWidth = hasSpouse ? (2 * NODE_WIDTH + SPOUSE_GAP) : NODE_WIDTH;
        const parentMid = familyWidth / 2;

        // Children of this couple/node
        const childrenList = (m.children || []).filter(chId => visibleIds.has(chId) && !collapsedNodes.has(nodeId));
        const localLinks = [];

        if (childrenList.length === 0) {
            const positions = {};
            const y = level * (NODE_HEIGHT + ROW_GAP) + 50;
            positions[nodeId] = { x: 0, y, generation: level };
            if (hasSpouse) {
                const spouseId = visibleSpouses[0];
                positions[spouseId] = { x: NODE_WIDTH + SPOUSE_GAP, y, generation: level };
                
                localLinks.push({
                    type: "spouse",
                    from: nodeId,
                    to: spouseId,
                    x1: NODE_WIDTH,
                    y1: y + NODE_HEIGHT / 2,
                    x2: NODE_WIDTH + SPOUSE_GAP,
                    y2: y + NODE_HEIGHT / 2
                });
            }

            return {
                width: familyWidth,
                midpoint: parentMid,
                positions,
                links: localLinks
            };
        }

        // Layout all children recursively
        const childLayouts = childrenList.map(chId => arrangeNode(chId, level + 1));
        const totalChildrenWidth = childLayouts.reduce((sum, lay) => sum + lay.width, 0) + (childrenList.length - 1) * SIBLING_GAP;
        const childrenMid = totalChildrenWidth / 2;

        let parentStart = 0;
        let childrenStart = 0;
        let totalWidth = 0;

        if (parentMid >= childrenMid) {
            parentStart = 0;
            childrenStart = parentMid - childrenMid;
            totalWidth = familyWidth;
        } else {
            childrenStart = 0;
            parentStart = childrenMid - parentMid;
            totalWidth = totalChildrenWidth;
        }

        const positions = {};
        const y = level * (NODE_HEIGHT + ROW_GAP) + 50;
        
        // Position parents
        positions[nodeId] = { x: parentStart, y, generation: level };
        if (hasSpouse) {
            const spouseId = visibleSpouses[0];
            positions[spouseId] = { x: parentStart + NODE_WIDTH + SPOUSE_GAP, y, generation: level };
            
            localLinks.push({
                type: "spouse",
                from: nodeId,
                to: spouseId,
                x1: parentStart + NODE_WIDTH,
                y1: y + NODE_HEIGHT / 2,
                x2: parentStart + NODE_WIDTH + SPOUSE_GAP,
                y2: y + NODE_HEIGHT / 2
            });
        }

        // Position children subtrees
        let currentChildX = childrenStart;
        childLayouts.forEach((lay, idx) => {
            const childId = childrenList[idx];
            
            // Offset all coordinates in child subtree
            Object.keys(lay.positions).forEach(cId => {
                positions[cId] = {
                    x: lay.positions[cId].x + currentChildX,
                    y: lay.positions[cId].y,
                    generation: lay.positions[cId].generation
                };
            });

            // Offset child links
            lay.links.forEach(l => {
                l.x1 += currentChildX;
                l.x2 += currentChildX;
                localLinks.push(l);
            });

            currentChildX += lay.width + SIBLING_GAP;
        });

        // Add parent-to-child connection lines
        const pMidX = parentStart + parentMid;
        const parentY = y + NODE_HEIGHT / 2;

        childrenList.forEach((chId, idx) => {
            const childLoc = positions[chId];
            if (childLoc) {
                localLinks.push({
                    type: "child",
                    from: nodeId,
                    to: chId,
                    x1: pMidX,
                    y1: parentY,
                    x2: childLoc.x + NODE_WIDTH / 2,
                    y2: childLoc.y
                });
            }
        });

        return {
            width: totalWidth,
            midpoint: parentStart + parentMid,
            positions,
            links: localLinks
        };
    }

    // Process all visible roots and place their trees side-by-side
    const visibleRoots = roots.filter(r => visibleIds.has(r.id));
    let accumulatedX = 50;
    const treeGap = 150;

    visibleRoots.forEach(root => {
        if (visited.has(root.id)) return;
        const res = arrangeNode(root.id, 0);
        
        // Shift this root tree
        Object.keys(res.positions).forEach(id => {
            layoutNodes[id] = {
                x: res.positions[id].x + accumulatedX,
                y: res.positions[id].y,
                generation: res.positions[id].generation
            };
        });

        // Shift links that belong to this tree
        res.links.forEach(l => {
            l.x1 += accumulatedX;
            l.x2 += accumulatedX;
            links.push(l);
        });

        accumulatedX += res.width + treeGap;
    });

    return { nodes: layoutNodes, links };
}
