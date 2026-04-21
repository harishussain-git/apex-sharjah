"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Page() {
  const root = useRef(null);
  const canvas = useRef(null);
  const title = useRef(null);

  useGSAP(
    () => {
      const c = canvas.current;
      const t = title.current;
      if (!c || !t) return;

      const ctx = c.getContext("2d");
      if (!ctx) return;

      const frameCount = 145;
      const images = [];
      const playhead = { frame: 0 };
      let loaded = 0;
      let ready = false;

      const src = (i) =>
        `/sequences/seq/${String(i + 1).padStart(4, "0")}.webp`;

      const size = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = window.innerWidth;
        const h = window.innerHeight;

        c.width = w * dpr;
        c.height = h * dpr;
        c.style.width = `${w}px`;
        c.style.height = `${h}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      const draw = () => {
        const img = images[playhead.frame];
        if (!img?.naturalWidth) return;

        const w = window.innerWidth;
        const h = window.innerHeight;
        const ia = img.naturalWidth / img.naturalHeight;
        const ca = w / h;

        let dw, dh, dx, dy;

        if (ia > ca) {
          dh = h;
          dw = dh * ia;
          dx = (w - dw) / 2;
          dy = 0;
        } else {
          dw = w;
          dh = dw / ia;
          dx = 0;
          dy = (h - dh) / 2;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, dx, dy, dw, dh);
      };

      size();

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded += 1;
          images[i] = img;

          if (i === 0) draw();

          if (!ready && loaded === frameCount) {
            ready = true;

            gsap.to(playhead, {
              frame: frameCount - 1,
              ease: "none",
              snap: "frame",
              onUpdate: draw,
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "+=700%",
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });

            gsap.to(t, {
              opacity: 0.2,
              y: -30,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "+=120%",
                scrub: 1,
              },
            });

            ScrollTrigger.refresh();
          }
        };
        img.src = src(i);
      }

      const onResize = () => {
        size();
        draw();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: root }
  );

  return (
    <main className="bg-black text-white">
      <section ref={root} className="relative h-screen overflow-hidden">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center">
          <div ref={title}>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/70">
              Final GSAP Test
            </p>
            <h1 className="text-4xl font-semibold sm:text-5xl">
              Next.js + GSAP
            </h1>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-white px-6 text-center text-black">
        <div>
          <h2 className="text-3xl font-semibold">Next Section</h2>
          <p className="mt-4 text-black/70">
            If pinning works, you will reach here after the sequence.
          </p>
        </div>
      </section>
    </main>
  );
}