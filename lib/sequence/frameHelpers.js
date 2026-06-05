const isLoadedFrame = (image) => image?.complete && image.naturalWidth > 0

export function preloadFrames({
  frameCount,
  frameSrc,
  priorityCount = 12,
  concurrency = 8,
  onLoad,
  onError,
}) {
  const images = Array.from({ length: frameCount }, () => new Image())
  const priorityFrames = Array.from(
    { length: Math.min(priorityCount, frameCount) },
    (_, index) => index + 1,
  )
  const remainingFrames = Array.from(
    { length: Math.max(frameCount - priorityFrames.length, 0) },
    (_, index) => priorityFrames.length + index + 1,
  )
  const queue = [...priorityFrames, ...remainingFrames]
  let cursor = 0

  const loadFrame = (frame) =>
    new Promise((resolve) => {
      const image = images[frame - 1]

      image.decoding = "async"
      image.fetchPriority = frame <= priorityCount ? "high" : "auto"

      image.addEventListener(
        "load",
        () => {
          onLoad?.(frame, image)
          resolve()
        },
        { once: true },
      )

      image.addEventListener(
        "error",
        () => {
          onError?.(frame, image)
          resolve()
        },
        { once: true },
      )

      image.src = frameSrc(frame)
    })

  const worker = async () => {
    while (cursor < queue.length) {
      const frame = queue[cursor]
      cursor += 1
      await loadFrame(frame)
    }
  }

  Array.from({ length: Math.min(concurrency, queue.length) }, worker)

  return images
}

export function getNearestLoadedImage(images, frame) {
  const exactImage = images[frame - 1]

  if (isLoadedFrame(exactImage)) {
    return exactImage
  }

  for (let index = frame - 2; index >= 0; index -= 1) {
    if (isLoadedFrame(images[index])) {
      return images[index]
    }
  }

  for (let index = frame; index < images.length; index += 1) {
    if (isLoadedFrame(images[index])) {
      return images[index]
    }
  }

  return null
}

export function drawFrame({ canvas, context, images, frame, frameCount }) {
  const safeFrame = Math.max(1, Math.min(frameCount, Math.round(frame)))
  const image = getNearestLoadedImage(images, safeFrame)

  if (!image) {
    return safeFrame
  }

  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
  const drawWidth = image.naturalWidth * scale
  const drawHeight = image.naturalHeight * scale
  const x = (width - drawWidth) / 2
  const y = (height - drawHeight) / 2

  context.clearRect(0, 0, width, height)
  context.drawImage(image, x, y, drawWidth, drawHeight)

  return safeFrame
}
