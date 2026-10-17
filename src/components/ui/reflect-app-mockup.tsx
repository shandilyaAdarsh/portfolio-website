"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Mic,
  PenSquare,
  FileText,
  CheckSquare,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Command,
  Clock,
  RotateCcw,
  X,
  Circle,
  ArrowRight,
  Box,
  Database,
  Globe,
  Zap,
  Lock,
  Server,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "staff-app",
    name: "Staff Operational App",
    client: "G8G Agency",
    status: "LIVE",
    statusColor: "text-emerald-400",
    stack: ["Next.js", "Supabase", "RLS", "WebSocket"],
    description: "Real-time floor operations & order lifecycle for restaurant staff.",
    color: "border-emerald-500/30 bg-emerald-500/5",
    dot: "bg-emerald-400",
  },
  {
    id: "career",
    name: "Career Platform",
    client: "Elevance Skill",
    status: "ACTIVE",
    statusColor: "text-amber-400",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "REST API"],
    description: "Scalable multi-tenant career & skill management platform.",
    color: "border-amber-500/30 bg-amber-500/5",
    dot: "bg-amber-400",
  },
  {
    id: "saas",
    name: "Restaurant SaaS Engine",
    client: "Personal / Open",
    status: "SHIPPED",
    statusColor: "text-orange-400",
    stack: ["Next.js", "Stripe", "Supabase", "QR Dispatch"],
    description: "Zero-commission QR ticketing & multi-tenant SaaS billing pipeline.",
    color: "border-orange-500/30 bg-orange-500/5",
    dot: "bg-orange-400",
  },
];

const TASKS = [
  { id: 1, label: "Two Pointer — Pair Sum", tag: "Arrays", done: true, difficulty: "Easy" },
  { id: 2, label: "Sliding Window Max", tag: "Arrays", done: true, difficulty: "Medium" },
  { id: 3, label: "Reverse Linked List", tag: "Linked List", done: true, difficulty: "Easy" },
  { id: 4, label: "LRU Cache", tag: "Linked List", done: true, difficulty: "Hard" },
  { id: 5, label: "Merge K Sorted Lists", tag: "Heap", done: true, difficulty: "Hard" },
  { id: 6, label: "Binary Search Tree Validate", tag: "Trees", done: true, difficulty: "Medium" },
  { id: 7, label: "Word Break (DP)", tag: "Dynamic Programming", done: false, difficulty: "Medium" },
  { id: 8, label: "Coin Change", tag: "Dynamic Programming", done: false, difficulty: "Medium" },
  { id: 9, label: "Graph BFS Islands", tag: "Graphs", done: false, difficulty: "Medium" },
  { id: 10, label: "Topological Sort", tag: "Graphs", done: false, difficulty: "Hard" },
];

const ARCH_NODES = [
  { id: "client", label: "Next.js Client", icon: Globe, x: 50, y: 10, color: "#fde047", group: "frontend" },
  { id: "api", label: "API Routes", icon: Server, x: 50, y: 38, color: "#38bdf8", group: "backend" },
  { id: "supabase", label: "Supabase", icon: Database, x: 20, y: 65, color: "#34d399", group: "db" },
  { id: "realtime", label: "Realtime WS", icon: Zap, x: 50, y: 65, color: "#f97316", group: "infra" },
  { id: "rls", label: "RLS Policies", icon: Lock, x: 80, y: 65, color: "#f87171", group: "security" },
  { id: "edge", label: "Edge Cache", icon: Box, x: 80, y: 38, color: "#fbbf24", group: "infra" },
];

const ARCH_EDGES = [
  { from: "client", to: "api" },
  { from: "api", to: "supabase" },
  { from: "api", to: "realtime" },
  { from: "api", to: "edge" },
  { from: "supabase", to: "rls" },
  { from: "realtime", to: "supabase" },
];

type NavItem = "daily" | "projects" | "tasks" | "arch";

// ─── Component ───────────────────────────────────────────────────────────────

export const ReflectAppMockup: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());
  const [viewDate, setViewDate] = useState<Date>(() => new Date());
  const [selectedDay, setSelectedDay] = useState<number>(() => new Date().getDate());
  const [activeNav, setActiveNav] = useState<NavItem>("daily");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredArchNode, setHoveredArchNode] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeFormatted = useMemo(() => {
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getSeconds()).padStart(2, "0");
    const hours12 = currentTime.getHours() % 12 || 12;
    const ampm = currentTime.getHours() >= 12 ? "PM" : "AM";
    const fullDate = currentTime.toLocaleDateString("en-US", {
      weekday: "short", month: "short", day: "numeric", year: "numeric",
    });
    const monthYear = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    return {
      hours, minutes, seconds, ampm,
      fullTime: `${String(hours12).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`,
      fullDate, monthYear,
      secondsNum: currentTime.getSeconds(),
    };
  }, [currentTime, viewDate]);

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
    const prevPadding = Array.from({ length: firstDayIndex }, (_, i) => ({
      day: prevMonthDays - firstDayIndex + 1 + i, isCurrentMonth: false, isPrev: true,
    }));
    const currentDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1, isCurrentMonth: true, isPrev: false,
    }));
    const totalFilled = prevPadding.length + currentDays.length;
    const totalTarget = totalFilled > 35 ? 42 : 35;
    const nextPadding = Array.from({ length: totalTarget - totalFilled }, (_, i) => ({
      day: i + 1, isCurrentMonth: false, isPrev: false,
    }));
    return [...prevPadding, ...currentDays, ...nextPadding];
  }, [viewDate]);

  const isCurrentMonthView = useMemo(() => (
    viewDate.getMonth() === currentTime.getMonth() &&
    viewDate.getFullYear() === currentTime.getFullYear()
  ), [viewDate, currentTime]);

  // Search filtering across all content
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const matchedProjects = PROJECTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.stack.some((s) => s.toLowerCase().includes(q)) || p.description.toLowerCase().includes(q)
    );
    const matchedTasks = TASKS.filter(
      (t) => t.label.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q)
    );
    return { projects: matchedProjects, tasks: matchedTasks };
  }, [searchQuery]);

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return TASKS;
    const q = searchQuery.toLowerCase();
    return TASKS.filter((t) => t.label.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return PROJECTS;
    const q = searchQuery.toLowerCase();
    return PROJECTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.stack.some((s) => s.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handleNavClick = (nav: NavItem) => {
    setActiveNav(nav);
    setSearchQuery("");
  };

  // ─── Center panel content ────────────────────────────────────────────────

  const renderCenter = () => {
    // Search results overlay
    if (searchQuery.trim() && searchResults) {
      const total = searchResults.projects.length + searchResults.tasks.length;
      return (
        <div className="space-y-4">
          <p className="font-mono text-[10px] tracking-widest text-[#C8C8DC] uppercase">
            {total} result{total !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
          </p>
          {searchResults.projects.length > 0 && (
            <div className="space-y-2">
              <p className="font-mono text-[10px] text-amber-400 uppercase tracking-wider">Projects</p>
              {searchResults.projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setActiveNav("projects"); setSearchQuery(""); }}
                  className={`w-full rounded-lg border p-3 text-left transition-all hover:border-white/20 ${p.color}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#F2F2F2]">{p.name}</span>
                    <span className={`font-mono text-[10px] ${p.statusColor}`}>{p.status}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-[#C8C8DC]">{p.description}</p>
                </button>
              ))}
            </div>
          )}
          {searchResults.tasks.length > 0 && (
            <div className="space-y-1.5">
              <p className="font-mono text-[10px] text-amber-400 uppercase tracking-wider">Tasks</p>
              {searchResults.tasks.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setActiveNav("tasks"); setSearchQuery(""); }}
                  className="flex w-full items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-left hover:border-white/15"
                >
                  <span className={`text-xs ${t.done ? "line-through text-[#888]" : "text-[#E0E0EC]"}`}>{t.label}</span>
                  <span className="font-mono text-[10px] text-[#C8C8DC]">{t.tag}</span>
                </button>
              ))}
            </div>
          )}
          {total === 0 && (
            <p className="text-xs text-[#888] italic">No results found.</p>
          )}
        </div>
      );
    }

    if (activeNav === "daily") {
      return (
        <div className="space-y-4">
          <div>
            <p className="font-medium text-sm text-[#F0F0F5]">
              • Deployed <span className="text-amber-400 font-semibold">Staff Radar v2.0</span>{" "}
              and <span className="text-orange-400 font-semibold">Restaurant SaaS Engine</span>
            </p>
          </div>
          <div className="space-y-2.5 pl-3 border-l border-amber-500/30 text-xs text-[#C8C8DC] leading-relaxed">
            <p className="text-[#E0E0EC] font-medium">Why this engineering stands out:</p>
            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">↳</span>
                <span>
                  <strong className="text-white font-medium">Real-time WebSocket Engine:</strong>{" "}
                  Sub-15ms client state synchronization across distributed workers.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">↳</span>
                <span>
                  <strong className="text-white font-medium">Multi-Tenant SaaS:</strong> Instant QR
                  ticket dispatch, zero commission pipeline, and Stripe API integration.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">↳</span>
                <span>
                  <strong className="text-white font-medium">Production Experience:</strong> G8G
                  Agency &amp; Elevance Skill — crafting high-throughput web applications.
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border border-amber-500/20 bg-amber-950/20 px-3 py-2 text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px]">
                Production status: All systems operational • 150+ DSA problems solved
              </span>
            </div>
            <span suppressHydrationWarning className="hidden font-mono text-[10px] text-amber-400 md:inline">
              {timeFormatted.hours}:{timeFormatted.minutes}:{timeFormatted.seconds}
            </span>
          </div>
        </div>
      );
    }

    if (activeNav === "projects") {
      return (
        <div className="space-y-3">
          <p className="font-mono text-[10px] tracking-widest text-[#C8C8DC] uppercase">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          </p>
          {filteredProjects.length === 0 && (
            <p className="text-xs text-[#888] italic">No projects match.</p>
          )}
          {filteredProjects.map((p) => (
            <div key={p.id} className={`rounded-xl border p-4 space-y-2 transition-all hover:border-white/20 ${p.color}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-[#F2F2F2]">{p.name}</p>
                  <p className="font-mono text-[10px] text-[#C8C8DC]">{p.client}</p>
                </div>
                <span className={`shrink-0 rounded border border-current/20 px-2 py-0.5 font-mono text-[10px] font-bold ${p.statusColor}`}>
                  {p.status}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#C8C8DC]">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.stack.map((s) => (
                  <span key={s} className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-[#DCDCE8]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeNav === "tasks") {
      const done = filteredTasks.filter((t) => t.done).length;
      const total = filteredTasks.length;
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-widest text-[#C8C8DC] uppercase">
              DSA Problems — {done}/{total} solved
            </p>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"
                style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
              />
            </div>
          </div>
          {filteredTasks.length === 0 && (
            <p className="text-xs text-[#888] italic">No tasks match.</p>
          )}
          <div className="space-y-1.5">
            {filteredTasks.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs transition-all hover:border-white/15"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${t.done ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400" : "border-white/20"}`}>
                    {t.done && <span className="text-[9px]">✓</span>}
                  </span>
                  <span className={t.done ? "line-through text-[#888]" : "text-[#E0E0EC]"}>
                    {t.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[10px] text-[#C8C8DC]">{t.tag}</span>
                  <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${
                    t.difficulty === "Hard" ? "border-red-500/30 text-red-400 bg-red-500/10"
                    : t.difficulty === "Medium" ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
                    : "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                  }`}>
                    {t.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeNav === "arch") {
      const hovered = ARCH_NODES.find((n) => n.id === hoveredArchNode);
      const connectedEdges = hoveredArchNode
        ? ARCH_EDGES.filter((e) => e.from === hoveredArchNode || e.to === hoveredArchNode)
        : [];
      const connectedIds = new Set(connectedEdges.flatMap((e) => [e.from, e.to]));

      return (
        <div className="space-y-3">
          <p className="font-mono text-[10px] tracking-widest text-[#C8C8DC] uppercase">
            System Architecture — hover a node
          </p>
          {/* SVG map */}
          <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#05050D]" style={{ height: 180 }}>
            <svg width="100%" height="100%" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet">
              {/* Edges */}
              {ARCH_EDGES.map((edge, i) => {
                const from = ARCH_NODES.find((n) => n.id === edge.from)!;
                const to = ARCH_NODES.find((n) => n.id === edge.to)!;
                const isActive = hoveredArchNode
                  ? connectedEdges.includes(edge)
                  : true;
                return (
                  <line
                    key={i}
                    x1={from.x} y1={from.y + 4}
                    x2={to.x} y2={to.y + 4}
                    stroke={isActive ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.05)"}
                    strokeWidth={isActive ? 0.6 : 0.3}
                    strokeDasharray={isActive ? "none" : "2,2"}
                  />
                );
              })}
              {/* Nodes */}
              {ARCH_NODES.map((node) => {
                const isHovered = hoveredArchNode === node.id;
                const isConnected = connectedIds.has(node.id);
                const dim = hoveredArchNode && !isConnected;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredArchNode(node.id)}
                    onMouseLeave={() => setHoveredArchNode(null)}
                  >
                    <circle
                      cx={0} cy={4}
                      r={isHovered ? 5.5 : 4}
                      fill={dim ? "rgba(30,30,40,0.8)" : node.color + (isHovered ? "ff" : "55")}
                      stroke={node.color}
                      strokeWidth={isHovered ? 1 : 0.5}
                      opacity={dim ? 0.3 : 1}
                      style={{ transition: "all 0.15s" }}
                    />
                    <text
                      x={0} y={13}
                      textAnchor="middle"
                      fill={dim ? "#444" : isHovered ? "#fff" : "#bbb"}
                      fontSize={isHovered ? 3.8 : 3.2}
                      fontFamily="monospace"
                      style={{ transition: "all 0.15s", userSelect: "none" }}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          {/* Node detail */}
          <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 font-mono text-[11px] text-[#C8C8DC] min-h-[52px]">
            {hovered ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: hovered.color }} />
                  <span className="font-bold text-[#F2F2F2]">{hovered.label}</span>
                  <span className="uppercase text-[9px] tracking-widest" style={{ color: hovered.color }}>{hovered.group}</span>
                </div>
                <p className="text-[10px] text-[#A8A8C0]">
                  Connected to:{" "}
                  {connectedEdges
                    .map((e) => (e.from === hovered.id ? e.to : e.from))
                    .map((id) => ARCH_NODES.find((n) => n.id === id)?.label)
                    .join(", ")}
                </p>
              </div>
            ) : (
              <span className="text-[#555]">Hover a node to inspect connections</span>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  const NAV_ITEMS: { id: NavItem; label: string; icon: React.ReactNode }[] = [
    { id: "daily", label: "Daily notes", icon: <PenSquare className="h-3.5 w-3.5 text-amber-400" /> },
    { id: "projects", label: "All projects", icon: <FileText className="h-3.5 w-3.5" /> },
    { id: "tasks", label: "Tasks (150+ DSA)", icon: <CheckSquare className="h-3.5 w-3.5" /> },
    { id: "arch", label: "Architecture Map", icon: <MapPin className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="relative mx-auto w-full max-w-5xl px-2 sm:px-4">
      <div className="relative overflow-hidden rounded-t-2xl border-t border-x border-white/15 bg-[#080705]/95 shadow-[0_-25px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        {/* Top Header Bar */}
        <div className="grid grid-cols-12 items-center border-b border-white/[0.08] px-4 py-3 sm:px-6">
          <div className="col-span-12 flex items-center justify-between sm:col-span-4">
            <div className={`flex w-full items-center gap-2 rounded-lg border px-3 py-1.5 text-xs text-[#C8C8DC] transition-all ${searchFocused ? "border-white/25 bg-white/[0.06]" : "border-white/[0.08] bg-white/[0.03] hover:border-white/15"}`}>
              <Search className="h-3.5 w-3.5 shrink-0 text-[#C8C8DC]" />
              <input
                type="text"
                placeholder="Search systems & code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="flex-1 bg-transparent font-light text-[#F2F2F2] placeholder-[#888] outline-none"
                aria-label="Search"
              />
              {searchQuery ? (
                <button onClick={() => setSearchQuery("")} className="shrink-0 text-[#888] hover:text-white">
                  <X className="h-3 w-3" />
                </button>
              ) : (
                <>
                  <span className="flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1 py-0.5 font-mono text-[10px] text-[#DCDCE8]">
                    <Command className="h-2.5 w-2.5" />K
                  </span>
                  <Mic className="h-3.5 w-3.5 text-[#C8C8DC] hover:text-[#FFFFFF]" />
                </>
              )}
            </div>
          </div>

          <div className="hidden sm:col-span-5 sm:flex sm:items-center sm:pl-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </span>
              <div className="flex items-baseline gap-2">
                <span suppressHydrationWarning className="font-semibold text-xs tracking-wide text-[#FFFFFF]">
                  {timeFormatted.fullDate}
                </span>
                <span suppressHydrationWarning className="font-mono text-xs font-bold tracking-wider text-amber-400">
                  {timeFormatted.fullTime}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden sm:col-span-3 sm:flex sm:items-center sm:justify-end sm:gap-2">
            <span suppressHydrationWarning className="font-semibold text-xs text-[#E2E2EA]">
              {timeFormatted.monthYear}
            </span>
            <div className="flex items-center gap-0.5 text-[#C8C8DC]">
              <button onClick={() => setViewDate((p) => new Date(p.getFullYear(), p.getMonth() - 1, 1))} className="cursor-pointer rounded p-1 transition-colors hover:bg-white/10 hover:text-white" aria-label="Previous Month">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => { const n = new Date(); setViewDate(n); setSelectedDay(n.getDate()); }}
                className={`cursor-pointer rounded p-1 transition-colors ${!isCurrentMonthView ? "text-amber-400 hover:bg-white/10" : "hover:bg-white/10 hover:text-white"}`}
                aria-label="Reset to Today"
              >
                {!isCurrentMonthView ? <RotateCcw className="h-3.5 w-3.5" /> : <CalendarIcon className="h-3.5 w-3.5" />}
              </button>
              <button onClick={() => setViewDate((p) => new Date(p.getFullYear(), p.getMonth() + 1, 1))} className="cursor-pointer rounded p-1 transition-colors hover:bg-white/10 hover:text-white" aria-label="Next Month">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Body */}
        <div className="grid grid-cols-12 gap-0 text-left text-xs">
          {/* Sidebar */}
          <div className="hidden border-r border-white/[0.08] p-4 sm:col-span-3 sm:block md:col-span-2.5">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all ${
                    activeNav === item.id
                      ? "bg-white/[0.07] text-[#E2E2EA]"
                      : "text-[#C8C8DC] hover:bg-white/[0.03] hover:text-[#FFFFFF]"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {activeNav === item.id && (
                    <ArrowRight className="ml-auto h-3 w-3 text-amber-400" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 border-t border-white/[0.06] pt-4">
              <p className="font-mono text-[10px] text-[#C8C8DC] uppercase tracking-wider">
                Pinned Stacks
              </p>
              <div className="mt-2 space-y-1.5 font-mono text-[11px] text-[#DCDCE8]">
                <div className="flex items-center justify-between">
                  <span>Next.js 15 App</span>
                  <span className="text-emerald-400 font-bold">●</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>WebSocket Sync</span>
                  <span className="text-amber-400 font-bold">●</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Docker &amp; Redis</span>
                  <span className="text-sky-400 font-bold">●</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center */}
          <div className="col-span-12 p-5 sm:col-span-6 md:col-span-6.5 sm:p-6 sm:border-r sm:border-white/[0.08]">
            {renderCenter()}
          </div>

          {/* Right: Calendar & Telemetry */}
          <div className="hidden p-5 sm:col-span-3 sm:block md:col-span-3">
            <div className="mb-4 rounded-xl border border-white/10 bg-[#070605] p-3 shadow-inner">
              <div className="flex items-center justify-between text-[#C8C8DC]">
                <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase">
                  <Clock className="h-3 w-3 text-amber-400" />
                  <span>Realtime Clock</span>
                </div>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-400">
                  LIVE
                </span>
              </div>
              <div suppressHydrationWarning className="mt-2 flex items-baseline justify-between font-mono">
                <div className="text-2xl font-black tracking-tight text-[#FFFFFF]">
                  {timeFormatted.hours}:{timeFormatted.minutes}
                  <span className="text-sm font-bold text-amber-400">:</span>
                  <span className="text-xl font-bold text-amber-400">{timeFormatted.seconds}</span>
                </div>
                <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#DCDCE8]">
                  {timeFormatted.ampm}
                </span>
              </div>
              <div className="mt-2.5">
                <div suppressHydrationWarning className="flex items-center justify-between font-mono text-[9px] text-[#A8A8C0]">
                  <span>SECOND TIMER</span>
                  <span className="font-bold text-amber-400">{timeFormatted.seconds}s / 60s</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${((timeFormatted.secondsNum + 1) / 60) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between font-mono text-xs">
              <span suppressHydrationWarning className="font-bold tracking-wider text-[#FFFFFF] uppercase">
                {timeFormatted.monthYear}
              </span>
              {!isCurrentMonthView && (
                <button onClick={() => { const n = new Date(); setViewDate(n); setSelectedDay(n.getDate()); }} className="cursor-pointer text-[10px] text-amber-400 underline hover:text-white">
                  Return to Today
                </button>
              )}
            </div>

            <div className="grid grid-cols-7 gap-1 pb-1.5 text-center font-mono text-[10px] font-semibold text-[#C8C8DC]">
              {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d) => <span key={d}>{d}</span>)}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px]">
              {calendarDays.map((cell, idx) => {
                const isToday = cell.isCurrentMonth && isCurrentMonthView && cell.day === currentTime.getDate();
                const isSelected = cell.isCurrentMonth && selectedDay === cell.day;
                return (
                  <button
                    key={idx}
                    disabled={!cell.isCurrentMonth}
                    onClick={() => cell.isCurrentMonth && setSelectedDay(cell.day)}
                    className={`relative flex h-7 items-center justify-center rounded-md font-medium transition-all ${
                      !cell.isCurrentMonth ? "cursor-default text-[#454552] select-none"
                      : isToday ? "cursor-pointer bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-white shadow-[0_0_12px_rgba(249,115,22,0.85)] ring-1 ring-amber-300"
                      : isSelected ? "cursor-pointer border border-amber-500/60 bg-amber-500/20 font-bold text-white"
                      : "cursor-pointer text-[#DCDCE8] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{cell.day}</span>
                    {isToday && <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-amber-400 shadow-[0_0_4px_#f59e0b]" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 space-y-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 font-mono text-[10px]">
              <div className="flex items-center justify-between text-[#C8C8DC]">
                <span>Status</span>
                <span className="font-semibold text-emerald-400">Active (Live Sync)</span>
              </div>
              <div className="flex items-center justify-between text-[#C8C8DC]">
                <span>Clock Precision</span>
                <span className="font-medium text-amber-400">1000ms Realtime</span>
              </div>
              <div className="flex items-center justify-between text-[#C8C8DC]">
                <span>Active Date</span>
                <span className="text-[#DCDCE8]">
                  {selectedDay
                    ? `${viewDate.toLocaleString("default", { month: "short" })} ${selectedDay}, ${viewDate.getFullYear()}`
                    : timeFormatted.fullDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

