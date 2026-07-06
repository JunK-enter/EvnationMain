/** Deep-merge locale catalogs (later objects override). */
export function mergeCatalogs(...objects) {
  return objects.reduce((acc, obj) => deepMerge(acc, obj), {})
}

function deepMerge(target, source) {
  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    return source
  }
  const out = { ...(target && typeof target === 'object' ? target : {}) }
  for (const key of Object.keys(source)) {
    const value = source[key]
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      out[key] = deepMerge(out[key], value)
    } else {
      out[key] = value
    }
  }
  return out
}
