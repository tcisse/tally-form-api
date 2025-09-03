export type Json = Record<string, any> | any[] | string | number | boolean | null;

export function diffObjects(a: any, b: any): Record<string, any> {
  const changes: Record<string, any> = {};
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

