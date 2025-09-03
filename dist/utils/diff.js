export function diffObjects(a, b) {
    const changes = {};
    const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
    for (const key of keys) {
        const av = a?.[key];
        const bv = b?.[key];
        if (JSON.stringify(av) !== JSON.stringify(bv)) {
            changes[key] = { from: av, to: bv };
        }
    }
    return changes;
}
