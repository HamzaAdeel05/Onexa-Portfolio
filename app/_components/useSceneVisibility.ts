"use client";

import { useEffect, useRef, useState } from "react";

/** Preloads a scene just before it enters view and stops its render loop offscreen. */
export function useSceneVisibility<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const hasBeenVisible = useRef(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldRender(true);
    }, { rootMargin: "700px 0px" });

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) {
        hasBeenVisible.current = true;
        setShouldRender(true);
      }
    });

    preloadObserver.observe(element);
    visibilityObserver.observe(element);
    return () => {
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!shouldRender || visible || !hasBeenVisible.current) return;
    setShouldRender(false);
  }, [shouldRender, visible]);

  return { ref, shouldRender, visible };
}

/** Caps canvas resolution on constrained devices while retaining sharper desktop rendering. */
export function getAdaptiveDpr(): [number, number] {
  if (typeof navigator === "undefined") return [1, 1.35];

  const device = navigator as Navigator & { deviceMemory?: number };
  const lowPower = navigator.hardwareConcurrency <= 4 || (device.deviceMemory !== undefined && device.deviceMemory <= 4);
  return lowPower ? [0.8, 1.05] : [1, 1.35];
}
