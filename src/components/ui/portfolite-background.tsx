"use client";

import React, { useEffect, useRef, useState } from "react";
import { vertexShaderSource, fragmentShaderSource } from "./shaders/portfolite-shader";

export function PortfoliteBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Compile shaders
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertShader || !fragShader) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setWebglSupported(false);
      return;
    }

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Program link error:", gl.getProgramInfoLog(program));
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Setup full-screen quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uPixelRatioLoc = gl.getUniformLocation(program, "u_pixelRatio");
    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uScaleLoc = gl.getUniformLocation(program, "u_scale");
    const uRotationLoc = gl.getUniformLocation(program, "u_rotation");
    const uColor1Loc = gl.getUniformLocation(program, "u_color1");
    const uColor2Loc = gl.getUniformLocation(program, "u_color2");
    const uColor3Loc = gl.getUniformLocation(program, "u_color3");
    const uProportionLoc = gl.getUniformLocation(program, "u_proportion");
    const uSoftnessLoc = gl.getUniformLocation(program, "u_softness");
    const uShapeLoc = gl.getUniformLocation(program, "u_shape");
    const uShapeScaleLoc = gl.getUniformLocation(program, "u_shapeScale");
    const uDistortionLoc = gl.getUniformLocation(program, "u_distortion");
    const uSwirlLoc = gl.getUniformLocation(program, "u_swirl");
    const uSwirlIterationsLoc = gl.getUniformLocation(program, "u_swirlIterations");

    // Uniform values matching Framer Portfolite "Animated Gradient Background" (Prism/Mist Custom)
    gl.uniform1f(uScaleLoc, 0.01);
    gl.uniform1f(uRotationLoc, (-50 * Math.PI) / 180);
    // Custom Colors: Color1 = Black, Color2 = Pure White, Color3 = Black
    gl.uniform4fv(uColor1Loc, [0.01, 0.01, 0.01, 1.0]);
    gl.uniform4fv(uColor2Loc, [1.0, 1.0, 1.0, 1.0]);
    gl.uniform4fv(uColor3Loc, [0.01, 0.01, 0.01, 1.0]);
    // Proportion 0.38 ensures the luminous mist swirls are clearly defined and radiant
    gl.uniform1f(uProportionLoc, 0.38);
    gl.uniform1f(uSoftnessLoc, 0.47);
    gl.uniform1f(uShapeLoc, 0.0); // Checks
    gl.uniform1f(uShapeScaleLoc, 0.45);
    gl.uniform1f(uDistortionLoc, 0.0);
    gl.uniform1f(uSwirlLoc, 0.5);
    gl.uniform1f(uSwirlIterationsLoc, 16.0);

    let animationFrameId: number;
    let totalAnimationTime = -2990; // Framer initial seed offset
    let lastTime = performance.now();
    let isDisposed = false;

    // Mouse coordinates tracking with smooth spring
    const targetMouse = [0, 0];
    const currentMouse = [0, 0];

    const onMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      targetMouse[0] = e.clientX * dpr;
      targetMouse[1] = (window.innerHeight - e.clientY) * dpr;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas || !gl || isDisposed) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
        gl.useProgram(program);
        gl.uniform2f(uResolutionLoc, width, height);
        gl.uniform1f(uPixelRatioLoc, dpr);
        // Default center mouse
        if (targetMouse[0] === 0) {
          targetMouse[0] = width * 0.5;
          targetMouse[1] = height * 0.5;
          currentMouse[0] = targetMouse[0];
          currentMouse[1] = targetMouse[1];
        }
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(canvas);

    // Animation Loop (Speed: 20 -> 0.22 factor)
    const render = (time: number) => {
      if (isDisposed || !gl) return;

      const delta = time - lastTime;
      lastTime = time;

      if (delta > 0 && delta < 200) {
        totalAnimationTime += delta * 0.22;
      }

      // Smooth mouse follow
      currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.06;
      currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.06;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, totalAnimationTime * 0.001);
      gl.uniform2f(uMouseLoc, currentMouse[0], currentMouse[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();

      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteProgram(program);
      }
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 h-[105vh] z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* WebGL2 animated mist canvas */}
      {webglSupported ? (
        <div className="absolute inset-0 h-full w-full">
          <canvas
            ref={canvasRef}
            className="h-full w-full opacity-100"
            style={{ display: "block" }}
          />
        </div>
      ) : (
        /* Graceful CSS mesh fallback */
        <div className="absolute inset-0 bg-[#060504]">
          <div className="absolute -top-[20%] left-1/2 h-[750px] w-[950px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,rgba(249,115,22,0.06)_40%,transparent_70%)] blur-[80px]" />
        </div>
      )}

      {/* Repeating 40px noise overlay from Framer Portfolite */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: "url('/noise.png')",
          backgroundSize: "40px",
          backgroundRepeat: "repeat",
          opacity: 0.1,
        }}
      />

      {/* Exact Portfolite overlay: top 50% crystal-clear, then fades smoothly into #060504 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6, 5, 4, 0) 0%, rgba(6, 5, 4, 0) 45%, rgba(6, 5, 4, 0.6) 75%, #060504 100%)",
        }}
      />
    </div>
  );
}
