const MAX_FILE_BYTES = 10 * 1024 * 1024

export async function readImageAsDataUrl(file, maxWidth = 1200, quality = 0.82, aspectRatio = null) {
  if (!file?.type?.startsWith('image/')) {
    throw new Error('Please upload an image file (JPG, PNG, WebP).')
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error('Image must be under 10MB.')
  }

  const blobUrl = URL.createObjectURL(file)
  try {
    const img = await loadImage(blobUrl)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not process image.')

    let { sx, sy, sw, sh, dw, dh } = computeCrop(img.naturalWidth, img.naturalHeight, maxWidth, aspectRatio)
    canvas.width = dw
    canvas.height = dh
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh)

    const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
    return canvas.toDataURL(mime, quality)
  } finally {
    URL.revokeObjectURL(blobUrl)
  }
}

/** Optimized for blog cover cards — 16:9 center crop */
export function readCoverImageAsDataUrl(file) {
  return readImageAsDataUrl(file, 1600, 0.85, 16 / 9)
}

function computeCrop(w, h, maxWidth, aspectRatio) {
  if (!aspectRatio) {
    const scale = w > maxWidth ? maxWidth / w : 1
    return { sx: 0, sy: 0, sw: w, sh: h, dw: Math.round(w * scale), dh: Math.round(h * scale) }
  }

  const targetRatio = aspectRatio
  const srcRatio = w / h
  let sw = w
  let sh = h
  let sx = 0
  let sy = 0

  if (srcRatio > targetRatio) {
    sw = h * targetRatio
    sx = (w - sw) / 2
  } else if (srcRatio < targetRatio) {
    sh = w / targetRatio
    sy = (h - sh) / 2
  }

  const dw = maxWidth
  const dh = Math.round(maxWidth / targetRatio)
  return { sx, sy, sw, sh, dw, dh }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not load image.'))
    img.src = src
  })
}
