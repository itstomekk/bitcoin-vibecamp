/**
 * Shape-checked shallow merge for `site_content` values.
 *
 * Every editable block in the database is optional and partial: a stored row
 * supplies only the fields it overrides, and every other field falls through to
 * the code default in src/data/*.ts.
 *
 * Validation is PER FIELD, never per page: if one field of a stored object is
 * malformed (wrong type, empty array, array item missing a key), only that field
 * falls back to the default. A bad write can never blank a whole section or
 * throw at render time.
 *
 * The default value doubles as the shape template — no schema duplication.
 */

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);

/**
 * Does `value` structurally match `template`?
 *
 *  - array template: value must be a non-empty array whose every item matches
 *    the first template item (arrays are all-or-nothing: one bad item rejects
 *    the field, which then falls back to the default array)
 *  - object template: value must be an object and every key present in the
 *    template must match; extra keys are allowed and passed through
 *  - string template: a string, or null (some fields — `url` — are nullable by
 *    design and the components guard for it)
 *  - number / boolean template: same primitive type
 *  - null / undefined template: anything goes (unknown shape, e.g. JSON-LD)
 */
export const matchesShape = (value: unknown, template: unknown): boolean => {
  if (template === null || template === undefined) return true;

  if (Array.isArray(template)) {
    if (!Array.isArray(value) || value.length === 0) return false;
    const item = template[0];
    return item === undefined ? true : value.every((v) => matchesShape(v, item));
  }

  if (isPlainObject(template)) {
    if (!isPlainObject(value)) return false;
    return Object.keys(template).every((k) =>
      // Optional template keys (undefined default) impose no constraint.
      template[k] === undefined ? true : matchesShape(value[k], template[k]),
    );
  }

  if (typeof template === "string") return typeof value === "string" || value === null;

  return typeof value === typeof template;
};

/**
 * Shallow-merge a stored value over a default object, field by field.
 * Anything missing or malformed keeps the default.
 */
export const mergeContent = <T extends Record<string, unknown>>(defaults: T, stored: unknown): T => {
  if (!isPlainObject(stored)) return defaults;

  const out = { ...defaults } as Record<string, unknown>;
  for (const key of Object.keys(defaults)) {
    if (!(key in stored)) continue;
    const candidate = stored[key];
    if (candidate === undefined) continue;
    if (matchesShape(candidate, defaults[key])) out[key] = candidate;
  }
  return out as T;
};
