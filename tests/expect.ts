import { strict as assert } from 'assert';

/** The small subset of chai's expect() these tests use, built on node:assert. */
const typeOf = (value: unknown): string =>
  value === null
    ? 'null'
    : Array.isArray(value)
      ? 'array'
      : value instanceof Date
        ? 'date'
        : typeof value;

export function expect(actual: any) {
  const includes = (expected: unknown, deep: boolean): boolean => {
    if (typeof actual === 'string') return actual.includes(expected as string);
    if (Array.isArray(actual))
      return actual.some((item) => (deep ? isDeepStrictEqual(item, expected) : item === expected));
    return Object.entries(expected as object).every(([key, value]) =>
      deep ? isDeepStrictEqual(actual?.[key], value) : actual?.[key] === value,
    );
  };
  const include = (deep: boolean) =>
    Object.assign(
      (expected: unknown) =>
        assert.ok(includes(expected, deep), `expected to include ${String(expected)}`),
      {
        members: (expected: unknown[]) =>
          expected.forEach((item) =>
            assert.ok(actual.includes(item), `expected members to include ${String(item)}`),
          ),
      },
    );
  const typeCheck = (type: string) => assert.equal(typeOf(actual), type);
  const be = {
    a: typeCheck,
    an: typeCheck,
    instanceOf: (type: new (...args: any[]) => unknown) => assert.ok(actual instanceof type),
    greaterThan: (n: number) => assert.ok(actual > n, `${actual} > ${n}`),
    at: {
      least: (n: number) => {
        assert.ok(actual >= n, `${actual} >= ${n}`);
        return {
          and: { at: { most: (m: number) => assert.ok(actual <= m, `${actual} <= ${m}`) } },
        };
      },
    },
    approximately: (n: number, delta: number) =>
      assert.ok(Math.abs(actual - n) <= delta, `${actual} ≈ ${n} ± ${delta}`),
    get null() {
      return assert.equal(actual, null);
    },
    get true() {
      return assert.equal(actual, true);
    },
    get false() {
      return assert.equal(actual, false);
    },
  };
  return {
    to: {
      be,
      equal: (expected: unknown) => assert.equal(actual, expected),
      deep: {
        equal: (expected: unknown) => assert.deepStrictEqual(actual, expected),
        include: include(true),
      },
      include: include(false),
      not: {
        include: (expected: unknown) =>
          assert.ok(!includes(expected, false), `expected not to include ${String(expected)}`),
      },
      have: {
        property: (...args: [string] | [string, unknown]) => {
          assert.ok(actual != null && args[0] in Object(actual), `missing property ${args[0]}`);
          if (args.length > 1) assert.equal(actual[args[0]], args[1]);
        },
        lengthOf: (n: number) => assert.equal(actual.length, n),
        all: {
          keys: (keys: string[]) =>
            assert.deepStrictEqual(Object.keys(actual).sort(), [...keys].sort()),
        },
      },
      throw: () => assert.throws(actual),
    },
  };
}

function isDeepStrictEqual(a: unknown, b: unknown): boolean {
  try {
    assert.deepStrictEqual(a, b);
    return true;
  } catch {
    return false;
  }
}
