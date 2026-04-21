"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const wrap = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const el = wrap.current, cvs = canvas.current, ctx = cvs.getContext("2d");
    const frames = 145, imgs = [], play = { f: 0 };
    const src = (i) => `/sequences/seq/${String(i + 1).padStart(4, "0")}.webp`;

    const size = () => {
      const dpr = window.devicePixelRatio || 1;
      cvs.width = innerWidth * dpr;
      cvs.height = innerHeight * dpr;
      cvs.style.width = innerWidth + "px";
      cvs.style.height = innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const img = imgs[play.f];
      if (!img?.naturalWidth) return;
      const cw = innerWidth, ch = innerHeight, ia = img.naturalWidth / img.naturalHeight, ca = cw / ch;
      let w, h, x, y;
      if (ia > ca) h = ch, w = h * ia, x = (cw - w) / 2, y = 0;
      else w = cw, h = w / ia, x = 0, y = (ch - h) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    };

    size();

    let loaded = 0;
    for (let i = 0; i < frames; i++) {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (i === 0) draw();
        if (loaded === frames) {
          gsap.to(play, {
            f: frames - 1,
            ease: "none",
            snap: "f",
            onUpdate: draw,
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "+=700%",
              pin: true,
              scrub: 1,
            },
          });
          ScrollTrigger.refresh();
        }
      };
      img.src = src(i);
      imgs.push(img);
    }

    const onResize = () => { size(); draw(); ScrollTrigger.refresh(); };
    addEventListener("resize", onResize);

    return () => {
      removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={wrap} className="relative h-screen overflow-hidden bg-black">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 z-10 flex items-center justify-center text-center text-white">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/70">Features</p>
          <h2 className="text-4xl font-semibold">Sequence Test</h2>
        </div>
      </div>
    </section>
  );
}