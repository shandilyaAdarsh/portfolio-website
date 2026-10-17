"use client";

import React, { useState, useEffect } from "react";
import { Reveal, TextReveal, FadeScale } from "@/components/ui/animation-primitives";
import { ArrowUpRight, CheckCircle2, RefreshCw, Activity, Zap } from "lucide-react";
import { motion } from "framer-motion";

const PIPELINE_STAGES = [
  { id: "order", label: "ORDER CREATED", detail: "Ticket #4821 • Table 07", latency: "8ms", color: "#34d399" },
  { id: "kitchen", label: "KITCHEN", detail: "Accepted by Line Chef 01", latency: "14ms", color: "#f59e0b" },
  { id: "prep", label: "PREPARING", detail: "Sous Chef Station • 4 Items", latency: "12ms", color: "#f97316" },
  { id: "ready", label: "READY", detail: "Expediter Pass Clear", latency: "6ms", color: "#38bdf8" },
  { id: "waiter", label: "WAITER", detail: "Runner 02 Dispatched to Floor", latency: "9ms", color: "#34d399" },
];

export const ProjectsPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(7);
  const [pipelineStage, setPipelineStage] = useState<number>(0);

  // Cycle realtime event through the operational pipeline
  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineStage((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentStage = PIPELINE_STAGES[pipelineStage];

  return (
    <section
      id="work"
      className="relative w-full border-t border-white/[0.08] bg-transparent px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1600px] space-y-28 sm:space-y-36">
        {/* Section Header */}
        <div className="border-b border-white/[0.08] pb-10">
          <TextReveal>
            <h2 className="tracking-display text-4xl font-black text-[#F2F2F2] uppercase sm:text-6xl md:text-7xl">
              SELECTED WORK
            </h2>
          </TextReveal>
        </div>

        {/* ========================================================================= */}
        {/* CASE STUDY 01: STAFF APP — HERO PROJECT (Emerges from page)               */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="group rounded-3xl border border-white/10 bg-[#0a0806] p-6 transition-all duration-500 hover:border-white/20 hover:shadow-2xl sm:p-10 lg:p-14"
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Metadata & Narrative */}
            <div className="space-y-6 lg:col-span-5">
              <div className="flex items-center gap-3 font-mono text-xs text-[#C8C8DC]">
                <span className="font-bold text-amber-400">CASE 01</span>
                <span>•</span>
                <span>G8G AGENCY</span>
                <span>•</span>
                <span className="text-emerald-400">ONGOING</span>
              </div>

              {/* Title animates with distinct entrance */}
              <motion.h3
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-3xl font-bold tracking-tight text-[#F2F2F2] transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl lg:text-5xl"
              >
                STAFF OPERATIONAL APP
              </motion.h3>

              <p className="text-sm leading-relaxed text-[#DCDCE8] sm:text-base">
                Real-time operational execution system for restaurant floor personnel, enabling
                synchronized floor execution, waiter coordination, order lifecycle tracking, and
                instant kitchen status updates.
              </p>

              <div className="space-y-2 border-l border-white/10 pl-4 text-xs text-[#C8C8DC]">
                <p>• Floor execution & waiter coordination with active table mapping.</p>
                <p>• Real-time WebSocket synchronization with Supabase Realtime.</p>
                <p>• Tenant & branch isolation secured by PostgreSQL Row-Level Security (RLS).</p>
              </div>

              <div className="pt-2">
                <p className="mb-2 font-mono text-[11px] text-[#B8B8CC] uppercase">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js",
                    "TypeScript",
                    "Supabase Realtime",
                    "PostgreSQL",
                    "RLS",
                    "REST APIs",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-[#C0C0C0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <a
                  href="https://github.com/shandilyaAdarsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#F2F2F2] transition-colors hover:text-amber-400"
                >
                  <span>SOURCE ON GITHUB</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Custom Interactive Abstract Realtime Interface */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#050505] p-5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01] sm:p-7"
              >
                {/* Top Header of Simulated Interface */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-[#C8C8DC]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="font-semibold text-[#F2F2F2]">
                      LIVE FLOOR DISPATCH
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#A0A0A8]">
                      <Zap className="h-3 w-3 text-amber-400" />
                      WS SYNC &lt; 15ms
                    </span>
                    <button
                      onClick={() => setActiveTab(activeTab === 7 ? 4 : 7)}
                      className="rounded border border-white/10 px-2 py-0.5 text-[10px] text-[#C0C0C0] hover:border-amber-400"
                    >
                      CYCLE TABLE
                    </button>
                  </div>
                </div>

                {/* REALTIME EVENT FLOW PIPELINE: ORDER CREATED -> KITCHEN -> PREPARING -> READY -> WAITER */}
                <div className="my-5 rounded-xl border border-white/[0.08] bg-[#070605] p-3.5">
                  <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-[#707078] uppercase">
                    <span className="flex items-center gap-1.5 text-white/80">
                      <Activity className="h-3 w-3 text-amber-400" />
                      REALTIME EVENT PIPELINE
                    </span>
                    <span className="text-emerald-400 font-semibold">STAGE {pipelineStage + 1} OF 5</span>
                  </div>

                  {/* Visual Breadcrumb Steps */}
                  <div className="grid grid-cols-5 gap-1.5 pt-1">
                    {PIPELINE_STAGES.map((st, idx) => {
                      const isActive = pipelineStage === idx;
                      const isPast = pipelineStage > idx;
                      return (
                        <div
                          key={st.id}
                          onClick={() => setPipelineStage(idx)}
                          className={`relative cursor-pointer rounded-lg border p-2 text-center transition-all ${
                            isActive
                              ? "border-amber-400/80 bg-amber-950/30 shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                              : isPast
                              ? "border-white/15 bg-white/[0.02] text-[#808088]"
                              : "border-white/5 bg-transparent text-[#505058]"
                          }`}
                        >
                          <p className="font-mono text-[9px] font-bold tracking-tight">
                            {st.label}
                          </p>
                          {isActive && (
                            <motion.div
                              layoutId="activePipelineGlow"
                              className="absolute -bottom-1 left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-[0_0_6px_#f59e0b]"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Operational Cards Grid */}
                <div className="my-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div
                    className={`rounded-xl border p-3 ${activeTab === 7 ? "border-amber-500 bg-amber-500/5" : "border-white/10 bg-white/[0.02]"}`}
                  >
                    <p className="font-mono text-[10px] text-[#B8B8CC]">TABLE</p>
                    <p className="text-sm font-bold text-[#F2F2F2]">TABLE 07</p>
                    <span className="font-mono text-[10px] text-emerald-400">SEATED</span>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <p className="font-mono text-[10px] text-[#B8B8CC]">TICKET</p>
                    <p className="text-sm font-bold text-[#F2F2F2]">#4821</p>
                    <span className="font-mono text-[10px] text-[#DCDCE8]">4 ITEMS</span>
                  </div>
                  <div
                    className={`rounded-xl border p-3 transition-colors ${
                      pipelineStage === 2
                        ? "border-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(249,115,22,0.25)]"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <p className="font-mono text-[10px] text-[#B8B8CC]">KITCHEN</p>
                    <p className="text-sm font-bold text-amber-400">PREPARING</p>
                    <span className="font-mono text-[10px] text-[#C8C8DC]">EST: 6 MIN</span>
                  </div>
                  <div
                    className={`rounded-xl border p-3 transition-colors ${
                      pipelineStage === 4
                        ? "border-emerald-400 bg-emerald-950/20 shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <p className="font-mono text-[10px] text-[#B8B8CC]">WAITER</p>
                    <p className="text-sm font-bold text-[#F2F2F2]">NOTIFIED</p>
                    <span className="font-mono text-[10px] text-emerald-400">ACKNOWLEDGED</span>
                  </div>
                </div>

                {/* Realtime Event Telemetry Feed */}
                <div className="space-y-2 rounded-xl border border-white/[0.06] bg-[#070605] p-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/5 pb-1 text-[11px] text-[#B8B8CC]">
                    <span>EVENT_DISPATCH_LOG</span>
                    <span>SUPABASE_REALTIME_BUS</span>
                  </div>

                  {/* Active Event Highlight Row */}
                  <div className="flex items-center justify-between rounded bg-white/[0.03] px-2 py-1 text-white">
                    <span className="flex items-center gap-1.5 font-bold" style={{ color: currentStage.color }}>
                      <Activity className="h-3 w-3 animate-spin" />
                      {currentStage.label}
                    </span>
                    <span className="text-[#A0A0A8]">{currentStage.detail}</span>
                    <span className="rounded bg-white/10 px-1 text-[10px] text-white/70">
                      {currentStage.latency}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#C8C8DC] px-2">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      ORDER_CREATED
                    </span>
                    <span>TICKET #4821 • TABLE 07</span>
                    <span className="text-[10px] text-[#B8B8CC]">14:28:02</span>
                  </div>

                  <div className="flex items-center justify-between text-[#C8C8DC] px-2">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <RefreshCw className="h-3 w-3" />
                      KITCHEN_ACCEPTED
                    </span>
                    <span>LINE_CHEF_01</span>
                    <span className="text-[10px] text-[#B8B8CC]">14:28:19</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CASE STUDY 02: RESTAURANT ORDERING SAAS PLATFORM */}
        {/* ========================================================================= */}
        <Reveal delay={0.15}>
          <div className="group rounded-3xl border border-white/10 bg-[#0a0806] p-6 transition-all duration-500 hover:border-white/20 hover:shadow-2xl sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Left Column: Flow Diagram Artifact */}
              <div className="order-2 lg:order-1 lg:col-span-7">
                <div className="relative rounded-2xl border border-white/10 bg-[#050505] p-5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01] sm:p-7">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-[#C8C8DC]">
                    <span>MULTI_TENANT_PIPELINE</span>
                    <span className="text-amber-400">RLS ISOLATED</span>
                  </div>

                  {/* Flow Visualization */}
                  <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                      <p className="mb-1 font-mono text-[10px] text-[#B8B8CC]">STEP 01</p>
                      <p className="text-sm font-bold text-[#F2F2F2]">QR MENU</p>
                      <p className="mt-1 text-[10px] text-[#C8C8DC]">Contactless Scan</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                      <p className="mb-1 font-mono text-[10px] text-[#B8B8CC]">STEP 02</p>
                      <p className="text-sm font-bold text-[#F2F2F2]">ORDER</p>
                      <p className="mt-1 text-[10px] text-[#C8C8DC]">Cart & Payload</p>
                    </div>

                    <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 text-center">
                      <p className="mb-1 font-mono text-[10px] text-amber-400">STEP 03</p>
                      <p className="text-sm font-bold text-[#F2F2F2]">KITCHEN</p>
                      <p className="mt-1 text-[10px] text-amber-400">Live Ticket Sync</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                      <p className="mb-1 font-mono text-[10px] text-[#B8B8CC]">STEP 04</p>
                      <p className="text-sm font-bold text-[#F2F2F2]">BILLING</p>
                      <p className="mt-1 text-[10px] text-[#C8C8DC]">Settlement & Audit</p>
                    </div>
                  </div>

                  {/* Architecture Metrics Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-3 font-mono text-[11px] text-[#C8C8DC]">
                    <span>TENANT_DATABASE: POSTGRESQL</span>
                    <span>ACCESS_POLICY: RLS SECURED</span>
                    <span className="text-emerald-400">LATENCY: &lt; 25ms</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Metadata & Narrative */}
              <div className="order-1 space-y-6 lg:order-2 lg:col-span-5">
                <div className="flex items-center gap-3 font-mono text-xs text-[#C8C8DC]">
                  <span className="font-bold text-amber-400">CASE 02</span>
                  <span>•</span>
                  <span>G8G AGENCY</span>
                </div>

                <h3 className="text-3xl font-bold tracking-tight text-[#F2F2F2] transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl lg:text-5xl">
                  RESTAURANT ORDERING SaaS
                </h3>

                <p className="text-sm leading-relaxed text-[#DCDCE8] sm:text-base">
                  Multi-tenant cloud platform built for restaurant groups. Incorporates role-based
                  access for administrators, kitchen crews, waiters, and customers with strict
                  tenant-isolated data segregation.
                </p>

                <div className="space-y-2 border-l border-white/10 pl-4 text-xs text-[#C8C8DC]">
                  <p>• QR-based digital menus and automated table management workflows.</p>
                  <p>• Multi-role administrative dashboards with live operational telemetry.</p>
                  <p>• Tenant-isolated PostgreSQL Row-Level Security architecture.</p>
                </div>

                <div className="pt-2">
                  <p className="mb-2 font-mono text-[11px] text-[#B8B8CC] uppercase">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Next.js",
                      "TypeScript",
                      "Supabase",
                      "PostgreSQL",
                      "Tailwind CSS",
                      "REST APIs",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-[#C0C0C0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <a
                    href="https://github.com/shandilyaAdarsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#F2F2F2] transition-colors hover:text-amber-400"
                  >
                    <span>SOURCE ON GITHUB</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* CASE STUDY 03: FULL-STACK JOB RECOMMENDATION PORTAL */}
        {/* ========================================================================= */}
        <Reveal delay={0.2}>
          <div className="group rounded-3xl border border-white/10 bg-[#0a0806] p-6 transition-all duration-500 hover:border-white/20 hover:shadow-2xl sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Left Column: Metadata & Narrative */}
              <div className="space-y-6 lg:col-span-5">
                <div className="flex items-center gap-3 font-mono text-xs text-[#C8C8DC]">
                  <span className="font-bold text-amber-400">CASE 03</span>
                  <span>•</span>
                  <span>FULL-STACK</span>
                </div>

                <h3 className="text-3xl font-bold tracking-tight text-[#F2F2F2] transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl lg:text-5xl">
                  JOB RECOMMENDATION PORTAL
                </h3>

                <p className="text-sm leading-relaxed text-[#DCDCE8] sm:text-base">
                  Full-stack talent platform featuring algorithmic job matching,
                  candidate skill-gap scoring, and personalized recommendation dashboards.
                </p>

                <div className="space-y-2 border-l border-white/10 pl-4 text-xs text-[#C8C8DC]">
                  <p>• Skill-based weighting and multi-attribute recommendation engine.</p>
                  <p>• Scalable REST API backend designed with Express.js and MongoDB.</p>
                  <p>• Responsive dashboard for career discovery and preference matching.</p>
                </div>

                <div className="pt-2">
                  <p className="mb-2 font-mono text-[11px] text-[#B8B8CC] uppercase">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Tailwind CSS"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-[#C0C0C0]"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <a
                    href="https://github.com/shandilyaAdarsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#F2F2F2] transition-colors hover:text-amber-400"
                  >
                    <span>SOURCE ON GITHUB</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Recommendation Pipeline Visualization */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl border border-white/10 bg-[#050505] p-5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01] sm:p-7">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-[#C8C8DC]">
                    <span>RECOMMENDATION ENGINE</span>
                    <span className="text-emerald-400">98.4% RELEVANCE MATCH</span>
                  </div>

                  {/* Pipeline Graph Node representation */}
                  <div className="my-6 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3">
                      <span className="text-[#B8B8CC]">01 / INPUT</span>
                      <span className="font-semibold text-[#F2F2F2]">
                        User Skill Matrix & Target Roles
                      </span>
                      <span className="text-amber-400">PARSED</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3">
                      <span className="text-[#B8B8CC]">02 / SCORING</span>
                      <span className="font-semibold text-[#F2F2F2]">
                        Weighted Skill Match (TS, Next.js, API)
                      </span>
                      <span className="text-white/60">EVALUATED</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                      <span className="text-amber-400">03 / MATCH</span>
                      <span className="font-semibold text-[#F2F2F2]">
                        Full Stack Engineer • G8G Studio
                      </span>
                      <span className="font-bold text-emerald-400">TOP MATCH</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[11px] text-[#C8C8DC]">
                    <span>QUERY_EXECUTION: 18ms</span>
                    <span>REST_API: /api/v1/recommendations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
