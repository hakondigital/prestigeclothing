'use client';

import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a;
void main(){ gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_t;

// 2D hash + value noise
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float t = u_t * 0.04;

  // layered slow drift
  float n = noise(uv * 320.0 + vec2(t, -t * 0.7));
  float n2 = noise(uv * 80.0 - vec2(t * 0.3, t * 0.5));
  float g = mix(n, n2, 0.5);

  // contrast
  g = pow(g, 1.4);
  g = smoothstep(0.15, 0.85, g);

  gl_FragColor = vec4(vec3(g), 0.18);
}
`;

export default function GrainCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aLoc = gl.getAttribLocation(program, 'a');
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uT = gl.getUniformLocation(program, 'u_t');

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let last = 0;
    let raf = 0;
    let running = true;
    const tick = (t: number) => {
      if (!running) return;
      // throttle to ~30fps
      if (t - last > 33) {
        gl.uniform1f(uT, t * 0.001);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        last = t;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const pause = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };
    const resume = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onVis = () => {
      if (document.hidden) pause();
      else resume();
    };
    document.addEventListener('visibilitychange', onVis);

    // The canvas is fixed-position so it's always in the viewport — observe
    // the parent section instead. Pauses the shader when the hero scrolls
    // out, no point burning GPU frames underneath the rest of the page.
    let io: IntersectionObserver | null = null;
    const parent = canvas.parentElement;
    if (parent && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) resume();
          else pause();
        },
        { threshold: 0 }
      );
      io.observe(parent);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      io?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-0 mix-blend-overlay transition-opacity duration-[1200ms] data-[loaded=true]:opacity-100"
      data-loaded="true"
    />
  );
}
