"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const imageAspect = 1440 / 810
const imageSrcs = Array.from(
    { length: 145 },
    (_, index) => `/sequences/seq/${String(index + 1).padStart(4, "0")}.webp`,
)

const updateCanvasImage = (renderingContext, canvas, image) => {
    if (!renderingContext || !canvas || !image) {
        throw new Error("Unable to update canvas")
    }

    renderingContext.clearRect(0, 0, canvas.width, canvas.height)
    renderingContext.drawImage(image, 0, 0, image.width, image.height)
}

const loadImages = async ({ canvas, canvasContext, imageSrcs, width, height }) => {
    const images = []
    let loadedCount = 0

    return new Promise((resolve, reject) => {
        const onImageLoad = (index, img) => {
            // Draw the first frame as soon as possible.
            if (index === 0) updateCanvasImage(canvasContext, canvas, img)

            loadedCount += 1
            if (loadedCount === imageSrcs.length) resolve(images)
        }

        const retries = {}
        const maxRetries = 3

        const onImageError = (index, img) => {
            // Retry a few times before failing the whole load.
            if ((retries[index] ?? 0) < maxRetries) {
                retries[index] = (retries[index] ?? 0) + 1
                console.warn(`Image ${index} failed to load. Retrying... ${retries[index]}`)
                img.src = `${imageSrcs[index]}?r=${retries[index]}`
            } else {
                reject(new Error(`Image ${index} failed to load: ${imageSrcs[index]}`))
            }
        }

        for (let index = 0; index < imageSrcs.length; index += 1) {
            const img = new Image()
            const scale = Math.max(canvas.width / width, canvas.height / height)

            img.width = width * scale
            img.height = height * scale
            img.addEventListener("load", () => onImageLoad(index, img))
            img.addEventListener("error", () => onImageError(index, img))
            img.src = imageSrcs[index]
            images.push(img)
        }
    })
}

const Sequence = () => {
    const header = useRef(null)
    const canvas = useRef(null)
    const images = useRef([])
    const [{ width: viewportWidth, height: viewportHeight }, setViewportSize] = useState({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        const updateViewportSize = () => {
            setViewportSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        updateViewportSize()
        window.addEventListener("resize", updateViewportSize)

        return () => window.removeEventListener("resize", updateViewportSize)
    }, [])

    useGSAP(
        () => {
            if (!canvas.current) return
            if (viewportWidth === 0 || viewportHeight === 0) return

            const setup = async () => {
                const frameWidth = viewportWidth
                const frameHeight = viewportWidth / imageAspect

                gsap.set(canvas.current, {
                    width: frameWidth,
                    height: frameHeight,
                    opacity: 1,
                })

                canvas.current.width = frameWidth
                canvas.current.height = frameHeight

                const context = canvas.current.getContext("2d", { alpha: true })
                if (!context) return

                images.current = await loadImages({
                    canvas: canvas.current,
                    canvasContext: context,
                    imageSrcs,
                    width: frameWidth,
                    height: frameHeight,
                })

                if (!active || !canvas.current || !header.current) return

                // ScrollTrigger for updating image sequence frames.
                return ScrollTrigger.create({
                    scrub: true,
                    trigger: header.current,
                    start: 0,
                    end: "bottom 25%",
                    onUpdate: ({ progress }) => {
                        const nextFrame = Math.min(
                            images.current.length - 1,
                            Math.floor(progress * images.current.length),
                        )
                        const nextImage = images.current[nextFrame]

                        if (!nextImage) return
                        updateCanvasImage(context, canvas.current, nextImage)
                    },
                })
            }

            let active = true
            let trigger

            setup()
                .then((createdTrigger) => {
                    if (!active) createdTrigger?.kill()
                    else trigger = createdTrigger
                })
                .catch((error) => {
                    console.error(error)
                })

            return () => {
                active = false
                trigger?.kill()
            }
        },
        { dependencies: [viewportWidth, viewportHeight], revertOnUpdate: true },
    )

    return (
        <>
            <header ref={header} className="absolute bg-black top-0 z-20 h-[200lvh] w-full select-none">
                <div
                    id="pin-wrapper"
                    className="flex h-lvh w-full items-center justify-center overflow-hidden"
                >

                    <h1 className="whitespace-nowrap text-3xl font-bold leading-none tracking-tighter text-white opacity-0">
                        AirPods Pro 2
                    </h1>

                    <canvas
                        ref={canvas}
                        width={viewportWidth}
                        height={viewportHeight}
                        className="absolute mb-[30vh] bg-transparent"
                    />
                </div>
            </header>

            <section className="sticky top-0 z-10 h-screen w-full overflow-hidden" />

            <section className="relative z-50 h-[300lvh] w-full" />
        </>
    )
}

export default Sequence
