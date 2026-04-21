const isLoadedFrame = (image) => image?.complete && image.naturalWidth > 0

export function preloadFrames({ frameCount, frameSrc, priorityCount = 12, onLoad }) {
  return Array.from({ length: frameCount }, (_, index) => {
    const frame = index + 1
    const image = new Image()

    image.decoding = "async"
    image.fetchPriority = frame <= priorityCount ? "high" : "auto"
    image.src = frameSrc(frame)

    if (onLoad) {
      image.addEventListener("load", () => onLoad(frame, image), { once: true })
    }

    return image
  })
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
