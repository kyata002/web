// Un-directed BFS search to find shortest path between two members
export function findShortestPath(members, startId, endId) {
    if (!members || members.length === 0) return null;
    const queue = [[startId]];
    const visited = new Set([startId]);
    
    while (queue.length > 0) {
        const path = queue.shift();
        const currentId = path[path.length - 1];
        
        if (currentId === endId) return path;
        
        const current = members.find(x => x.id === currentId);
        if (!current) continue;
        
        // Neighbors (parents, children, spouses)
        const neighbors = [];
        (current.parents || []).forEach(id => neighbors.push({ id, rel: "parent" }));
        (current.children || []).forEach(id => neighbors.push({ id, rel: "child" }));
        (current.spouses || []).forEach(id => neighbors.push({ id, rel: "spouse" }));
        
        for (const n of neighbors) {
            if (!visited.has(n.id)) {
                visited.add(n.id);
                queue.push([...path, n.id]);
            }
        }
    }
    return null;
}

// Detailed Vietnamese kinship translation rule-base
export function determineKinshipTerm(members, path, nodes) {
    if (!path || path.length === 1) {
        return { term1: "Bản thân", term2: "Bản thân", call1: "Tôi" };
    }
    
    const m1 = members.find(x => x.id === path[0]);
    const m2 = members.find(x => x.id === path[path.length - 1]);
    if (!m1 || !m2) return { term1: "Họ hàng", term2: "Họ hàng", call1: "Người ấy" };
    
    // 1. Spouses (Vợ / Chồng)
    if (path.length === 2 && (m1.spouses || []).includes(m2.id)) {
        if (m1.gender === "Nam") {
            return { term1: "Chồng", term2: "Vợ", call1: "Chồng" };
        } else {
            return { term1: "Vợ", term2: "Chồng", call1: "Vợ" };
        }
    }

    // Helper to calculate birth year
    const getYear = (m) => {
        if (m.birthDate) {
            const parts = m.birthDate.split("/");
            const yr = parseInt(parts[parts.length - 1]);
            if (!isNaN(yr)) return yr;
        }
        return 1980;
    };

    // Find generation numbers from layout
    const gen1 = nodes[m1.id]?.generation || 0;
    const gen2 = nodes[m2.id]?.generation || 0;
    const genDiff = gen2 - gen1; // positive means m2 is younger gen, negative means m2 is older gen

    // Direct Parent / Child
    if (path.length === 2) {
        if ((m1.children || []).includes(m2.id)) {
            // m1 is parent of m2
            const term1 = m1.gender === "Nam" ? "Cha" : "Mẹ";
            const term2 = m2.gender === "Nam" ? "Con trai" : "Con gái";
            const call1 = m1.gender === "Nam" ? "Bố" : "Mẹ";
            return { term1, term2, call1 };
        }
        if ((m1.parents || []).includes(m2.id)) {
            // m1 is child of m2
            const term1 = m1.gender === "Nam" ? "Con trai" : "Con gái";
            const term2 = m2.gender === "Nam" ? "Cha" : "Mẹ";
            return { term1, term2, call1: m2.gender === "Nam" ? "Bố" : "Mẹ" };
        }
    }

    // Siblings (Anh/Chị/Em ruột)
    if (path.length === 3 && (m1.parents || []).some(p => (m2.parents || []).includes(p)) && genDiff === 0) {
        const isM1Older = getYear(m1) < getYear(m2);
        if (isM1Older) {
            const term1 = m1.gender === "Nam" ? "Anh trai" : "Chị gái";
            const term2 = m2.gender === "Nam" ? "Em trai" : "Em gái";
            return { term1, term2, call1: m1.gender === "Nam" ? "Anh" : "Chị" };
        } else {
            const term1 = m1.gender === "Nam" ? "Em trai" : "Em gái";
            const term2 = m2.gender === "Nam" ? "Anh trai" : "Chị gái";
            return { term1, term2, call1: "Em" };
        }
    }

    // Grandparents / Grandchildren
    if (genDiff === 2) {
        // m2 is grandchild of m1
        const term1 = m1.gender === "Nam" ? "Ông" : "Bà";
        const term2 = "Cháu";
        return { term1, term2, call1: term1 };
    }
    if (genDiff === -2) {
        // m2 is grandparent of m1
        const term1 = "Cháu";
        const term2 = m2.gender === "Nam" ? "Ông" : "Bà";
        return { term1, term2, call1: term2 };
    }

    // Great Grandparents / Great Grandchildren
    if (genDiff >= 3) {
        const term1 = m1.gender === "Nam" ? "Cụ ông" : "Cụ bà";
        const term2 = "Chắt";
        return { term1, term2, call1: m1.gender === "Nam" ? "Cụ" : "Cụ" };
    }
    if (genDiff <= -3) {
        const term1 = "Chắt";
        const term2 = m2.gender === "Nam" ? "Cụ ông" : "Cụ bà";
        return { term1, term2, call1: m2.gender === "Nam" ? "Cụ" : "Cụ" };
    }

    // Aunt/Uncle vs Nephew/Niece (Gen difference = 1)
    if (genDiff === 1) {
        // m1 is older generation (Uncle / Aunt) of m2
        let side = "nội";
        const step2 = members.find(x => x.id === path[1]);
        if (step2 && step2.parents && step2.parents.length > 0) {
            const father = members.find(x => (x.parents || []).includes(step2.id) && x.gender === "Nam");
            if (!father) side = "ngoại";
        }
        
        let term1 = "Bác";
        if (m1.gender === "Nam") {
            term1 = side === "nội" ? "Chú" : "Cậu";
        } else {
            term1 = side === "nội" ? "Cô" : "Dì";
        }
        
        return { term1, term2: "Cháu", call1: term1 };
    }

    if (genDiff === -1) {
        // m2 is older generation (Uncle / Aunt) of m1
        let side = "nội";
        let term2 = "Bác";
        if (m2.gender === "Nam") {
            term2 = side === "nội" ? "Chú" : "Cậu";
        } else {
            term2 = side === "nội" ? "Cô" : "Dì";
        }
        return { term1: "Cháu", term2, call1: "Cháu" };
    }

    // Cousin (Anh em họ - Gen difference = 0)
    if (genDiff === 0) {
        const isM1Older = getYear(m1) < getYear(m2);
        if (isM1Older) {
            const term1 = m1.gender === "Nam" ? "Anh họ" : "Chị họ";
            const term2 = "Em họ";
            return { term1, term2, call1: m1.gender === "Nam" ? "Anh" : "Chị" };
        } else {
            const term1 = "Em họ";
            const term2 = m2.gender === "Nam" ? "Anh họ" : "Chị họ";
            return { term1, term2, call1: "Em" };
        }
    }

    // General fallback based on generation delta
    if (genDiff > 0) {
        return { term1: "Vai Vế Trên (Họ hàng)", term2: "Vai Vế Dưới (Họ hàng)", call1: m1.gender === "Nam" ? "Ông/Bác" : "Bà/Cô" };
    } else {
        return { term1: "Vai Vế Dưới (Họ hàng)", term2: "Vai Vế Trên (Họ hàng)", call1: "Cháu" };
    }
}
