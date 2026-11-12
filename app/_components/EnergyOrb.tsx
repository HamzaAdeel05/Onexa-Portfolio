"use client";

import { useEffect, useRef } from "react";
import styles from "../OnexaOrb.module.css";

type Props = {
  /** Wordmark shown at the bottom of the poster. */
  label?: string;
  /** Extra class for the poster wrapper (sizing, margins). */
  className?: string;
};

type Curve = {
  pts: Float32Array;
  w: number;
  a: number;
  phase: number;
  rate: number;
  freq: number;
};

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  tw: number;
  tr: number;
  big: boolean;
};

type Mat3 = number[];

export default function OnexaOrb({
  label = "Onexa Personalized Intelligence",
  className = "",
}: Props) {
  const posterRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const poster = posterRef.current;
    const cv = canvasRef.current;
    if (!poster || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      window.matchMedia("(max-width: 900px)").matches ||
      (navigator.hardwareConcurrency || 8) <= 6;

    /* ---------- seeded random, so the orb is identical on every load ---------- */
    const rng = (seed: number) => () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const rand = rng(20261106);

    /* ---------- 3D helpers ---------- */
    const randRot = (): Mat3 => {
      const u1 = rand(), u2 = rand(), u3 = rand();
      const a = Math.sqrt(1 - u1), b = Math.sqrt(u1);
      const x = a * Math.sin(2 * Math.PI * u2), y = a * Math.cos(2 * Math.PI * u2);
      const z = b * Math.sin(2 * Math.PI * u3), w = b * Math.cos(2 * Math.PI * u3);
      return [
        1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w),
        2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w),
        2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y),
      ];
    };
    const applyM = (m: Mat3, x: number, y: number, z: number): [number, number, number] => [
      m[0] * x + m[1] * y + m[2] * z,
      m[3] * x + m[4] * y + m[5] * z,
      m[6] * x + m[7] * y + m[8] * z,
    ];

    /* ---------- filaments: closed 3D curves wrapped around a sphere ---------- */
    const N = lowPower ? 96 : 128; // points per filament
    const CH = 16; // fewer canvas paths per frame
    const curves: Curve[] = [];

    const addCurve = (
      fn: (t: number) => [number, number, number],
      opts: { w: number; a: number }
    ) => {
      const pts = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const p = fn((i / N) * Math.PI * 2);
        pts[i * 3] = p[0];
        pts[i * 3 + 1] = p[1];
        pts[i * 3 + 2] = p[2];
      }
      curves.push({
        pts,
        w: opts.w,
        a: opts.a,
        phase: rand() * 6.283,
        rate: 0.35 + rand() * 0.9,
        freq: 1 + Math.floor(rand() * 3),
      });
    };

    // 1. Wave bands: weave above and below a tilted equator (the knotted look).
    for (let c = 0; c < (lowPower ? 9 : 13); c++) {
      const mm = randRot();
      const k = 2 + Math.floor(rand() * 4);
      const A = 0.45 + rand() * 0.75;
      const ph = rand() * 6.283;
      const sc = 0.8 + rand() * 0.22;
      const hero = c < 6;
      addCurve(
        (t) => {
          const lat = A * Math.sin(k * t + ph);
          const cl = Math.cos(lat);
          const p = applyM(mm, cl * Math.cos(t), Math.sin(lat), cl * Math.sin(t));
          return [p[0] * sc, p[1] * sc, p[2] * sc];
        },
        { w: hero ? 1.1 + rand() * 0.5 : 0.5 + rand() * 0.6, a: hero ? 0.95 : 0.35 + rand() * 0.45 }
      );
    }

    // 2. Small circles: flat rings pressed onto the sphere at random tilts (the rosette).
    for (let c = 0; c < (lowPower ? 6 : 8); c++) {
      const mm = randRot();
      const al = 0.55 + rand() * 0.8;
      const sc = 0.8 + rand() * 0.22;
      const ca = Math.cos(al), sa = Math.sin(al);
      addCurve(
        (t) => {
          const p = applyM(mm, sa * Math.cos(t), ca, sa * Math.sin(t));
          return [p[0] * sc, p[1] * sc, p[2] * sc];
        },
        { w: 0.45 + rand() * 0.55, a: 0.3 + rand() * 0.45 }
      );
    }

    // 3. Inner filaments: smaller and dimmer, they give the orb its depth.
    for (let c = 0; c < (lowPower ? 2 : 3); c++) {
      const mm = randRot();
      const al = 0.7 + rand() * 0.7;
      const sc = 0.52 + rand() * 0.24;
      const ca = Math.cos(al), sa = Math.sin(al);
      addCurve(
        (t) => {
          const p = applyM(mm, sa * Math.cos(t), ca, sa * Math.sin(t));
          return [p[0] * sc, p[1] * sc, p[2] * sc];
        },
        { w: 0.4 + rand() * 0.3, a: 0.2 + rand() * 0.25 }
      );
    }

    /* ---------- stardust ---------- */
    const stars: Star[] = [];
    for (let i = 0; i < (lowPower ? 55 : 90); i++) {
      const u = rand(), v = rand(), w = rand();
      const th = u * 6.283;
      const ph = Math.acos(2 * v - 1);
      const r = Math.cbrt(w);
      stars.push({
        x: r * Math.sin(ph) * Math.cos(th),
        y: r * Math.cos(ph),
        z: r * Math.sin(ph) * Math.sin(th),
        size: 0.4 + rand() * rand() * 1.5,
        tw: rand() * 6.283,
        tr: 0.8 + rand() * 2.4,
        big: rand() < 0.06,
      });
    }

    /* ---------- view state ---------- */
    let W = 0, H = 0, dpr = 1, R = 100, cx = 0, cy = 0, lw = 1;
    let yaw = 0.6, pitch = -0.35;
    const AUTO = reduce ? 0 : 0.16; // radians per second
    let prev = 0;
    let raf = 0;
    let lastDraw = 0;
    let visible = true;
    let running = false;
    const FRAME_INTERVAL = 1000 / 24;
    const X = new Float32Array(N + 1);
    const Y = new Float32Array(N + 1);
    const D = new Float32Array(N + 1);
    const D_CAM = 3.4;

    const resize = () => {
      const r = poster.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.25);
      W = r.width;
      H = r.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W * 0.265, H * 0.22);
      cx = W / 2;
      cy = H * 0.417;
      lw = Math.max(0.7, Math.min(1.3, R / 120));
    };
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(poster);
    resize();

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    visibility.observe(poster);

    /* ---------- draw ---------- */
    const draw = (t: number) => {
      const cyw = Math.cos(yaw), syw = Math.sin(yaw);
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const breathe = 1 + 0.012 * Math.sin(t * 1.3);

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "butt";
      ctx.lineJoin = "round";

      // soft halo hugging the shell
      const g = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.6);
      g.addColorStop(0, "rgba(90,210,255,0)");
      g.addColorStop(0.28, "rgba(90,210,255,0.11)");
      g.addColorStop(0.62, "rgba(151,105,255,0.07)");
      g.addColorStop(1, "rgba(90,210,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.6, 0, 6.2832);
      ctx.fill();

      // filaments
      for (let ci = 0; ci < curves.length; ci++) {
        const cu = curves[ci];
        const pts = cu.pts;
        for (let i = 0; i <= N; i++) {
          const k = (i % N) * 3;
          const x = pts[k] * breathe, y = pts[k + 1] * breathe, z = pts[k + 2] * breathe;
          const x1 = x * cyw + z * syw;
          const z1 = -x * syw + z * cyw;
          const y2 = y * cp - z1 * sp;
          const z2 = y * sp + z1 * cp;
          const f = D_CAM / (D_CAM - z2);
          X[i] = cx + x1 * R * f;
          Y[i] = cy - y2 * R * f;
          D[i] = Math.max(0, Math.min(1, (z2 + 1) * 0.5));
        }
        for (let a = 0; a < N; a += CH) {
          const b = Math.min(a + CH, N);
          const dm = D[(a + b) >> 1];
          let h = 0.5 + 0.5 * Math.sin(cu.phase + (a / N) * 6.2832 * cu.freq + t * cu.rate * 2);
          h = h * h * h * h;
          let alpha = cu.a * (0.2 + 0.8 * Math.pow(dm, 1.2)) * (0.3 + 1.1 * h);
          if (alpha > 1) alpha = 1;
          ctx.beginPath();
          ctx.moveTo(X[a], Y[a]);
          for (let q = a + 1; q <= b; q++) ctx.lineTo(X[q], Y[q]);
          ctx.lineWidth = cu.w * lw * 4.5;
          ctx.strokeStyle = `rgba(87,205,255,${(alpha * 0.21).toFixed(3)})`;
          ctx.stroke();
          ctx.lineWidth = cu.w * lw;
          ctx.strokeStyle = `rgba(236,243,255,${alpha.toFixed(3)})`;
          ctx.stroke();
        }
      }

      // stardust
      for (let si = 0; si < stars.length; si++) {
        const st = stars[si];
        const sx1 = st.x * cyw + st.z * syw;
        const sz1 = -st.x * syw + st.z * cyw;
        const sy2 = st.y * cp - sz1 * sp;
        const sz2 = st.y * sp + sz1 * cp;
        const sf = D_CAM / (D_CAM - sz2);
        const px = cx + sx1 * R * sf;
        const py = cy - sy2 * R * sf;
        const dd = Math.max(0, Math.min(1, (sz2 + 1) * 0.5));
        const tw = 0.5 + 0.5 * Math.sin(t * st.tr + st.tw);
        const al = (0.2 + 0.8 * tw) * (0.3 + 0.7 * dd);
        const rad = st.size * lw;
        ctx.fillStyle = `rgba(225,241,255,${al.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, 6.2832);
        ctx.fill();
        if (st.big) {
          ctx.fillStyle = `rgba(170,132,255,${(al * 0.24).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, rad * 4, 0, 6.2832);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = prev ? Math.min(0.05, (now - prev) / 1000) : 0.016;
      prev = now;
      yaw += AUTO * dt;
      if (now - lastDraw >= FRAME_INTERVAL) {
        draw(now / 1000);
        lastDraw = now;
      }
      raf = requestAnimationFrame(frame);
    };

    function start() {
      if (running || reduce || document.hidden || !visible) return;
      running = true;
      prev = 0;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      prev = 0;
    }

    const onDocumentVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onDocumentVisibility);

    if (reduce) draw(0);
    else start();

    return () => {
      stop();
      ro.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onDocumentVisibility);
    };
  }, []);

  return (
    <div ref={posterRef} className={`${styles.poster} ${className}`}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        tabIndex={0}
        role="img"
        aria-label="A slowly rotating sphere of interwoven glowing filaments and stardust."
      />
      <div className={styles.label}>
        <span className={styles.wordmark}>{label}</span>
        <span className={styles.subtitle}>Personalized Intelligence</span>
      </div>
    </div>
  );
}
