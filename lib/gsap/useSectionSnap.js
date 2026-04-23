"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SNAP_THRESHOLD = 0.25;

export default function useSectionSnap(ids = []) {
  useLayoutEffect(() => {
    if (!ids.length) return;

    const debug = document.createElement("div");
    const bar = document.createElement("div");

    debug.style.cssText =
      "position:fixed;right:12px;bottom:12px;z-index:9999;width:220px;border-radius:12px;background:rgba(0,0,0,.78);color:#fff;padding:10px;font:11px/1.45 monospace;pointer-events:none;white-space:pre-wrap;";
    bar.style.cssText =
      "position:fixed;left:0;bottom:0;z-index:9999;height:3px;width:0;background:#334086;pointer-events:none;";

    document.body.append(debug, bar);

    const getPoints = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return [0];

      const points = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((el) => el.offsetTop / maxScroll)
        .filter((point) => Number.isFinite(point))
        .sort((a, b) => a - b);

      return [...new Set(points)];
    };

    const snapTo = (progress) => {
      const points = getPoints();
      if (points.length < 2) return points[0] ?? 0;

      for (let index = 0; index < points.length - 1; index += 1) {
        const current = points[index];
        const next = points[index + 1];

        if (progress >= current && progress <= next) {
          const distance = next - current;
          const localProgress = distance > 0 ? (progress - current) / distance : 0;
          return localProgress >= SNAP_THRESHOLD ? next : current;
        }
      }

      return gsap.utils.snap(points, progress);
    };

    const updateDebug = (progress) => {
      const points = getPoints();
      const target = snapTo(progress);
      let segment = points.length - 1;
      let localProgress = 1;

      for (let index = 0; index < points.length - 1; index += 1) {
        if (progress >= points[index] && progress <= points[index + 1]) {
          const distance = points[index + 1] - points[index];

          segment = index;
          localProgress = distance > 0 ? (progress - points[index]) / distance : 0;
          break;
        }
      }

      debug.textContent = [
        `snap debug`,
        `progress: ${progress.toFixed(3)}`,
        `segment: ${segment + 1}/${Math.max(points.length - 1, 1)}`,
        `local: ${localProgress.toFixed(3)}`,
        `threshold: ${SNAP_THRESHOLD}`,
        `target: ${target.toFixed(3)}`,
      ].join("\n");
      bar.style.width = `${progress * 100}%`;
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      onUpdate: (self) => updateDebug(self.progress),
      snap: {
        snapTo,
        delay: 0.08,
        duration: { min: 0.18, max: 0.35 },
        ease: "power2.out",
      },
    });

    ScrollTrigger.refresh();
    updateDebug(window.scrollY / Math.max(ScrollTrigger.maxScroll(window), 1));

    return () => {
      trigger.kill();
      debug.remove();
      bar.remove();
    };
  }, [ids]);
}
