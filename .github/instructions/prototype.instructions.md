import React, { useEffect, useMemo, useState } from "react";

const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => a + (b - a) * t;
const smoothTo = (current, target, factor) => lerp(current, target, clamp(factor, 0, 1));
const rateFactor = (baseFactor, simHours, baseHours = 0.25) => {
  if (simHours <= 0) return 0;
  const bf = clamp(baseFactor, 0, 0.999);
  const n = simHours / baseHours;
  return 1 - Math.pow(1 - bf, n);
};

const CLIMATE_CONFIG = {
  rainy: { label: "Lluvias", freshwaterBoost: 18, heatStress: 28 },
  normal: { label: "Normal", freshwaterBoost: 0, heatStress: 48 },
  drought: { label: "Sequía", freshwaterBoost: -22, heatStress: 72 },
};

const PRESETS = {
  equilibrio: {
    label: "Equilibrio",
    controls: { freshwater: 68, connectivity: 72, climate: "normal" },
  },
  sequia: {
    label: "Sequía",
    controls: { freshwater: 18, connectivity: 50, climate: "drought" },
  },
  bloqueados: {
    label: "Caños bloqueados",
    controls: { freshwater: 45, connectivity: 18, climate: "normal" },
  },
  recuperacion: {
    label: "Recuperación",
    controls: { freshwater: 82, connectivity: 80, climate: "rainy" },
  },
  colapso: {
    label: "Colapso extremo",
    controls: { freshwater: 0, connectivity: 0, climate: "drought", speed: 3, isPlaying: true },
  },
};

const INITIAL_CONTROLS = {
  freshwater: 62,
  connectivity: 65,
  climate: "normal",
  isPlaying: true,
  speed: 1,
};

const INITIAL_STATE = {
  timeOfDay: 9,
  flushing: 60,
  salinity: 42,
  algae: 36,
  oxygen: 68,
  hypoxiaExposure: 0,
  fishHealth: 78,
  ecosystemHealth: 74,
};

function daylightFactor(timeOfDay) {
  // 0..1. Máximo al mediodía, mínimo de noche.
  const radians = ((timeOfDay - 6) / 24) * Math.PI * 2;
  return clamp((Math.sin(radians) + 1) / 2, 0, 1);
}

function salinityBalanceScore(salinity) {
  // Índice de idoneidad para un humedal salobre (didáctico, normalizado)
  const ideal = 38;
  const tolerance = 26;
  return clamp(100 - (Math.abs(salinity - ideal) / tolerance) * 100);
}

function algaeBalanceScore(algae) {
  // Algo de biomasa es natural; floraciones altas penalizan el estado sistémico
  const ideal = 28;
  const tolerance = 35;
  return clamp(100 - (Math.abs(algae - ideal) / tolerance) * 100);
}

function evolveWetland(prev, controls, options = {}) {
  const { advanceTime = true, dtHours = 0.25 } = options;
  const climate = CLIMATE_CONFIG[controls.climate];

  // La velocidad debe afectar tanto el reloj como la dinámica ecológica (no solo la animación)
  const simHours = advanceTime ? dtHours * controls.speed : dtHours;

  const timeOfDay = advanceTime
    ? (prev.timeOfDay + dtHours * controls.speed) % 24
    : prev.timeOfDay;

  const daylight = daylightFactor(timeOfDay);
  const freshwaterEffective = clamp(controls.freshwater + climate.freshwaterBoost);
  const connectivity = clamp(controls.connectivity);
  const heatStress = climate.heatStress;

  // 1) Circulación / renovación hídrica
  const targetFlushing = clamp(freshwaterEffective * 0.58 + connectivity * 0.42);
  const flushing = smoothTo(prev.flushing, targetFlushing, rateFactor(0.18, simHours));

  // 2) Salinidad (sube cuando baja el aporte dulce y la conectividad)
  const targetSalinity = clamp(
    84 - freshwaterEffective * 0.55 - connectivity * 0.18 + (100 - flushing) * 0.12,
    5,
    95
  );
  const salinity = smoothTo(prev.salinity, targetSalinity, rateFactor(0.16, simHours));

  // 3) Biomasa algal: estancamiento + calor + estrés salino (modelo conceptual)
  const stagnation = 100 - flushing;
  const salinityStress = clamp(salinity - 45);
  const targetAlgae = clamp(
    18 + stagnation * 0.46 + heatStress * 0.28 + salinityStress * 0.18 - flushing * 0.14,
    0,
    100
  );
  const algaeGrowthBase = 0.13 + (stagnation / 100) * 0.08;
  const algae = smoothTo(prev.algae, targetAlgae, rateFactor(algaeGrowthBase, simHours));

  // 4) Oxígeno disuelto: fotosíntesis (día) vs respiración/descomposición (noche)
  const photoBoost = daylight * (16 + clamp(algae * 0.08, 0, 7));
  const freshwaterOxygenBoost = freshwaterEffective * 0.16 + flushing * 0.08;
  const nightPenalty = (1 - daylight) * (22 + algae * 0.12);
  const decompositionPenalty = algae * 0.22 + stagnation * 0.12;
  const salinityPenalty = clamp(salinity - 55) * 0.18;

  const targetOxygen = clamp(
    54 + photoBoost + freshwaterOxygenBoost - nightPenalty - decompositionPenalty - salinityPenalty,
    0,
    100
  );
  const oxygen = smoothTo(prev.oxygen, targetOxygen, rateFactor(0.17, simHours));

  // 5) Peces: stock relativo (0-100) con memoria de hipoxia y recuperación lenta
  const lowOxygenStress = clamp(((45 - oxygen) / 45) * 100);
  const anoxiaStress = clamp(((18 - oxygen) / 18) * 100);
  const highSalinityStress = clamp(((salinity - 55) / 35) * 100);
  const lowSalinityStress = clamp(((20 - salinity) / 20) * 100);
  const algaeStress = clamp(((algae - 55) / 45) * 100);

  const hypoxiaExposureTarget =
    oxygen < 35
      ? clamp((35 - oxygen) * 2.4 + (1 - daylight) * 22 + stagnation * 0.22)
      : 0;

  const hypoxiaExposure =
    oxygen < 35
      ? smoothTo(prev.hypoxiaExposure ?? 0, hypoxiaExposureTarget, rateFactor(0.22, simHours))
      : smoothTo(prev.hypoxiaExposure ?? 0, 0, rateFactor(0.08, simHours));

  const acuteMortalityStress = clamp(anoxiaStress * 0.55 + hypoxiaExposure * 0.65);

  const chronicFishStress = clamp(
    lowOxygenStress * 0.42 +
      acuteMortalityStress * 0.33 +
      highSalinityStress * 0.1 +
      lowSalinityStress * 0.07 +
      algaeStress * 0.08
  );

  const targetFishHealth = clamp(100 - chronicFishStress);

  let fishHealth;
  if (targetFishHealth < prev.fishHealth) {
    const declineBase = 0.12 + (acuteMortalityStress / 100) * 0.12 + (1 - daylight) * 0.03;
    fishHealth = smoothTo(prev.fishHealth, targetFishHealth, rateFactor(declineBase, simHours));
  } else {
    const recoverBase = oxygen > 50 && flushing > 40 && hypoxiaExposure < 35 ? 0.03 : 0.01;
    fishHealth = smoothTo(prev.fishHealth, targetFishHealth, rateFactor(recoverBase, simHours));
  }

  // Colapso agudo adicional en hipoxia severa sostenida (permite mortandad total realista)
  if (oxygen < 8 && hypoxiaExposure > 70) {
    fishHealth = clamp(fishHealth - 0.9 * (simHours / 0.25));
  } else if (oxygen < 15 && hypoxiaExposure > 55) {
    fishHealth = clamp(fishHealth - 0.25 * (simHours / 0.25));
  }

  // 6) Índice global sistémico (TGS: totalidad)
  const ecosystemHealth = clamp(
    fishHealth * 0.3 +
      oxygen * 0.23 +
      salinityBalanceScore(salinity) * 0.18 +
      flushing * 0.17 +
      algaeBalanceScore(algae) * 0.12
  );

  return {
    timeOfDay,
    flushing,
    salinity,
    algae,
    oxygen,
    hypoxiaExposure,
    fishHealth,
    ecosystemHealth,
  };
}

function getTGSInsights(state, controls) {
  const { salinity, oxygen, algae, fishHealth, ecosystemHealth, flushing } = state;
  const climateLabel = CLIMATE_CONFIG[controls.climate].label;
  const day = daylightFactor(state.timeOfDay) > 0.45;

  return [
    {
      title: "Totalidad",
      text:
        ecosystemHealth >= 70
          ? "El sistema se mantiene funcional: las variables se apoyan mutuamente."
          : ecosystemHealth >= 45
          ? "El sistema presenta estrés: cambios en una parte ya están afectando el conjunto."
          : "El sistema está en deterioro: el comportamiento global ya no se explica por una sola variable.",
    },
    {
      title: "Interdependencia",
      text:
        salinity > 58 || flushing < 40
          ? "Menor renovación hídrica elevó la salinidad y favoreció el desequilibrio biológico."
          : "La conectividad y el aporte dulce sostienen la renovación hídrica y amortiguan el sistema.",
    },
    {
      title: "Homeostasis",
      text:
        oxygen >= 45 && salinity >= 20 && salinity <= 60
          ? "El sistema se mantiene cerca de rangos funcionales."
          : "El sistema salió de su rango funcional; necesita compensación (más agua dulce o mejor conectividad).",
    },
    {
      title: "Retroalimentación",
      text:
        algae > 60
          ? "Bucle de deterioro activo: algas altas aumentan descomposición y reducen oxígeno."
          : "No hay floración severa; el bucle de deterioro está contenido.",
    },
    {
      title: "Multicausalidad",
      text: `Estado actual influido por clima (${climateLabel}), conectividad de caños, aporte de agua dulce y ciclo ${day ? "diurno" : "nocturno"}.`,
    },
    {
      title: "Emergencia",
      text:
        fishHealth < 40
          ? "La mortandad de peces emerge del acoplamiento entre bajo oxígeno, salinidad y biomasa algal."
          : "La salud de peces se mantiene porque las variables internas aún están acopladas de forma favorable.",
    },
  ];
}

function useWetlandSimulation(controls) {
  const [state, setState] = useState(INITIAL_STATE);

  // Reacción inmediata a cambios de controles (sin avanzar el tiempo)
  useEffect(() => {
    setState((prev) => evolveWetland(prev, controls, { advanceTime: false }));
  }, [controls.freshwater, controls.connectivity, controls.climate]);

  // Simulación temporal (play/pause)
  useEffect(() => {
    if (!controls.isPlaying) return;
    const id = setInterval(() => {
      setState((prev) => evolveWetland(prev, controls, { advanceTime: true, dtHours: 0.25 }));
    }, 180);
    return () => clearInterval(id);
  }, [controls]);

  const setManualTime = (value) => {
    setState((prev) => evolveWetland({ ...prev, timeOfDay: value }, controls, { advanceTime: false }));
  };

  const resetState = () => setState(INITIAL_STATE);

  return { state, setState, setManualTime, resetState };
}

function formatHour(time) {
  const totalMinutes = ((Math.round(time * 60) % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${hh}:${mm}`;
}

function valueLabel(value, type) {
  if (type === "oxygen") {
    if (value < 25) return "Crítico";
    if (value < 45) return "Bajo";
    if (value < 70) return "Aceptable";
    return "Bueno";
  }
  if (type === "salinity") {
    if (value > 65) return "Muy alta";
    if (value > 50) return "Alta";
    if (value >= 20) return "Intermedia";
    return "Baja";
  }
  if (type === "algae") {
    if (value > 75) return "Floración";
    if (value > 55) return "Alta";
    if (value > 30) return "Media";
    return "Baja";
  }
  if (value < 35) return "Crítico";
  if (value < 60) return "Estrés";
  return "Estable";
}

function MetricCard({ label, value, kind, description }) {
  const pct = clamp(value);
  const status = valueLabel(value, kind);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <span className="text-xs text-slate-500">{Math.round(value)}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-700 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-700">{status}</span>
        <span className="text-slate-500">Índice 0–100</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function WetlandScene({ state, controls }) {
  const daylight = daylightFactor(state.timeOfDay);
  const algaeOpacity = clamp(state.algae / 100, 0, 0.85);
  const deadFishRatio = clamp((45 - state.fishHealth) / 45, 0, 1);
  const liveFishRatio = clamp(state.fishHealth / 100, 0, 1);
  const riverFlow = clamp((controls.freshwater + CLIMATE_CONFIG[controls.climate].freshwaterBoost) / 100, 0, 1);
  const seaPush = clamp(state.salinity / 100, 0, 1);
  const bubbleCount = Math.max(0, Math.round(state.oxygen / 14));
  const sunY = 70 - daylight * 25;
  const moonY = 95 - (1 - daylight) * 28;

  const bubbles = Array.from({ length: bubbleCount }).map((_, i) => ({
    x: 230 + (i * 38) % 340,
    y: 260 - ((i * 17 + state.timeOfDay * 6) % 90),
    r: 2 + (i % 3),
  }));

  const liveFish = Array.from({ length: 6 }).map((_, i) => ({
    x: 250 + i * 55,
    y: 255 + ((i % 2) * 18 - 9),
    scale: 0.85 + ((i % 3) * 0.12),
    opacity: liveFishRatio > i / 6 ? 0.95 : 0,
  }));

  const deadFish = Array.from({ length: 6 }).map((_, i) => ({
    x: 315 + i * 65,
    y: 300 - (i % 2) * 12,
    opacity: deadFishRatio > i / 6 ? 0.9 : 0,
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Maqueta sistémica del humedal</h3>
          <p className="text-xs text-slate-500">Ciénaga costera simplificada para explicar TGS</p>
        </div>
        <div className="rounded-xl bg-slate-100 px-2 py-1 text-xs text-slate-700">
          Hora: {formatHour(state.timeOfDay)}
        </div>
      </div>

      <svg viewBox="0 0 900 360" className="h-[320px] w-full rounded-xl border border-slate-100 bg-slate-50">
        <defs>
          <linearGradient id="skyGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={daylight > 0.5 ? "#eaf4ff" : "#0f172a"} />
            <stop offset="100%" stopColor={daylight > 0.5 ? "#f8fafc" : "#1e293b"} />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="55%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#334155" />
          </marker>
        </defs>

        <rect x="0" y="0" width="900" height="190" fill="url(#skyGrad)" />
        <rect x="0" y="190" width="900" height="170" fill="#d6f3d4" />

        {/* Sol / luna */}
        <circle cx="770" cy={sunY} r="16" fill="#fbbf24" opacity={daylight} />
        <circle cx="770" cy={moonY} r="12" fill="#e2e8f0" opacity={1 - daylight} />

        {/* Río (izquierda) */}
        <path d="M0 150 C140 150 120 245 220 245 L220 310 L0 310 Z" fill="#bfdbfe" />
        <text x="28" y="170" className="fill-slate-700 text-[12px] font-semibold">Río (agua dulce)</text>

        {/* Mar (derecha) */}
        <path d="M900 145 C790 145 785 245 680 245 L680 310 L900 310 Z" fill="#7dd3fc" opacity={0.95} />
        <text x="770" y="170" className="fill-slate-700 text-[12px] font-semibold">Mar</text>

        {/* Cuerpo principal del humedal */}
        <path
          d="M190 210 C250 170 650 170 710 210 L710 320 L190 320 Z"
          fill="url(#waterGrad)"
          opacity={0.95}
          stroke="#bae6fd"
          strokeWidth="2"
        />

        {/* Capa de algas */}
        <path
          d="M205 218 C285 190 615 190 695 218 L695 318 L205 318 Z"
          fill="#22c55e"
          opacity={algaeOpacity * 0.65}
        />
        <path
          d="M210 245 C340 225 560 225 690 245"
          stroke="#166534"
          strokeWidth="5"
          opacity={algaeOpacity * 0.85}
          fill="none"
          strokeLinecap="round"
        />

        {/* Manglar simplificado */}
        {[235, 290, 350, 410, 470, 530, 590, 645].map((x, idx) => (
          <g key={x} opacity={0.65 + state.ecosystemHealth / 300 - idx * 0.01}>
            <rect x={x} y={160} width="7" height="45" fill="#78350f" />
            <circle cx={x + 3.5} cy={152} r="17" fill="#16a34a" />
            <path d={`M${x + 3.5} 205 C ${x - 8} 222, ${x + 14} 235, ${x + 1} 250`} stroke="#92400e" strokeWidth="2" fill="none" />
          </g>
        ))}
        <text x="378" y="145" className="fill-slate-700 text-[12px] font-semibold">Manglar</text>

        {/* Flujo río -> humedal */}
        <path
          d="M95 228 C145 228 160 228 215 228"
          stroke="#334155"
          strokeWidth={2 + riverFlow * 4}
          opacity={0.35 + riverFlow * 0.55}
          fill="none"
          markerEnd="url(#arrow)"
          strokeLinecap="round"
        />
        <text x="48" y="247" className="fill-slate-600 text-[11px]">Aporte dulce</text>

        {/* Influencia marina */}
        <path
          d="M805 232 C760 232 740 232 685 232"
          stroke="#334155"
          strokeWidth={1.8 + seaPush * 3.5}
          opacity={0.25 + seaPush * 0.55}
          fill="none"
          markerEnd="url(#arrow)"
          strokeLinecap="round"
        />
        <text x="780" y="251" className="fill-slate-600 text-[11px]">Entrada salina</text>

        {/* Burbujas de oxígeno */}
        {bubbles.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="#f8fafc" opacity={0.65} stroke="#e2e8f0" />
        ))}
        <text x="222" y="336" className="fill-slate-700 text-[11px]">Oxígeno disuelto</text>

        {/* Peces vivos */}
        {liveFish.map((f, idx) => (
          <g key={`live-${idx}`} transform={`translate(${f.x} ${f.y}) scale(${f.scale})`} opacity={f.opacity}>
            <ellipse cx="0" cy="0" rx="12" ry="7" fill="#0f172a" opacity="0.85" />
            <polygon points="12,0 21,-6 21,6" fill="#0f172a" opacity="0.85" />
            <circle cx="-5" cy="-1.5" r="1" fill="#f8fafc" />
          </g>
        ))}

        {/* Peces muertos */}
        {deadFish.map((f, idx) => (
          <g key={`dead-${idx}`} transform={`translate(${f.x} ${f.y}) rotate(90)`} opacity={f.opacity}>
            <ellipse cx="0" cy="0" rx="12" ry="7" fill="#7f1d1d" opacity="0.85" />
            <polygon points="12,0 21,-6 21,6" fill="#7f1d1d" opacity="0.85" />
            <circle cx="-5" cy="-1.5" r="1" fill="#f8fafc" />
            <line x1="-7" y1="-5" x2="2" y2="4" stroke="#f8fafc" strokeWidth="1" />
            <line x1="2" y1="-5" x2="-7" y2="4" stroke="#f8fafc" strokeWidth="1" />
          </g>
        ))}

        {/* Etiquetas de estado */}
        <g>
          <rect x="20" y="20" width="230" height="66" rx="12" fill="#ffffff" opacity="0.9" />
          <text x="32" y="42" className="fill-slate-800 text-[12px] font-semibold">Estado del sistema</text>
          <text x="32" y="60" className="fill-slate-700 text-[11px]">Salinidad: {Math.round(state.salinity)} | Oxígeno: {Math.round(state.oxygen)}</text>
          <text x="32" y="77" className="fill-slate-700 text-[11px]">Algas: {Math.round(state.algae)} | Peces: {Math.round(state.fishHealth)}</text>
        </g>
      </svg>
    </div>
  );
}

function ControlsPanel({ controls, setControls, state, setManualTime, onPreset, onReset }) {
  const setField = (field, value) => setControls((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-800">Controles del modelo</h3>
      <p className="mt-1 text-xs text-slate-500">Simulador conceptual con índices normalizados (0–100) para explicar relaciones sistémicas (TGS)</p>

      <div className="mt-4 space-y-4">
        <div>
          <label className="flex items-center justify-between text-xs font-medium text-slate-700">
            <span>Aporte de agua dulce</span>
            <span>{controls.freshwater}</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={controls.freshwater}
            onChange={(e) => setField("freshwater", Number(e.target.value))}
            className="mt-1 w-full"
          />
          <p className="mt-1 text-xs text-slate-500">Variable principal: regula salinidad, renovación y oxígeno.</p>
        </div>

        <div>
          <label className="flex items-center justify-between text-xs font-medium text-slate-700">
            <span>Conectividad de caños</span>
            <span>{controls.connectivity}</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={controls.connectivity}
            onChange={(e) => setField("connectivity", Number(e.target.value))}
            className="mt-1 w-full"
          />
          <p className="mt-1 text-xs text-slate-500">Representa apertura/cierre de canales e intercambio hídrico.</p>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700">Clima</label>
          <select
            value={controls.climate}
            onChange={(e) => setField("climate", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            {Object.entries(CLIMATE_CONFIG).map(([value, cfg]) => (
              <option key={value} value={value}>{cfg.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center justify-between text-xs font-medium text-slate-700">
            <span>Hora del día</span>
            <span>{formatHour(state.timeOfDay)}</span>
          </label>
          <input
            type="range"
            min={0}
            max={23.75}
            step={0.25}
            value={state.timeOfDay}
            onChange={(e) => setManualTime(Number(e.target.value))}
            className="mt-1 w-full"
          />
          <p className="mt-1 text-xs text-slate-500">Permite mostrar el efecto día/noche sobre el oxígeno.</p>
        </div>

        <div>
          <label className="flex items-center justify-between text-xs font-medium text-slate-700">
            <span>Velocidad</span>
            <span>{controls.speed.toFixed(1)}x</span>
          </label>
          <input
            type="range"
            min={0.5}
            max={3}
            step={0.5}
            value={controls.speed}
            onChange={(e) => setField("speed", Number(e.target.value))}
            className="mt-1 w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setField("isPlaying", !controls.isPlaying)}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {controls.isPlaying ? "Pausar" : "Reproducir"}
          </button>
          <button
            onClick={onReset}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Reiniciar
          </button>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-slate-700">Escenarios rápidos</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => onPreset(preset.controls)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TGSPanel({ insights }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-800">Principios de TGS en tiempo real</h3>
      <p className="mt-1 text-xs text-slate-500">Mensajes explicativos para exposición en clase</p>
      <div className="mt-3 grid gap-2">
        {insights.map((item) => (
          <div key={item.title} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-700">{item.title}</p>
            <p className="mt-1 text-xs text-slate-600 leading-5">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HumedalTGSPrototype() {
  const [controls, setControls] = useState(INITIAL_CONTROLS);
  const { state, setState, setManualTime, resetState } = useWetlandSimulation(controls);

  const insights = useMemo(() => getTGSInsights(state, controls), [state, controls]);

  const metricConfig = useMemo(
    () => [
      {
        key: "salinity",
        label: "Índice de salinidad",
        value: state.salinity,
        kind: "salinity",
        description: "Sube cuando baja el aporte de agua dulce o la conectividad.",
      },
      {
        key: "flushing",
        label: "Índice de renovación hídrica",
        value: state.flushing,
        kind: "generic",
        description: "Intercambio de agua en el sistema (circulación).",
      },
      {
        key: "algae",
        label: "Índice de biomasa algal",
        value: state.algae,
        kind: "algae",
        description: "Aumenta con estancamiento, calor y desequilibrio.",
      },
      {
        key: "oxygen",
        label: "Índice de oxígeno disuelto",
        value: state.oxygen,
        kind: "oxygen",
        description: "Proxy de disponibilidad de oxígeno; variable crítica para peces.",
      },
      {
        key: "fish",
        label: "Estado de peces",
        value: state.fishHealth,
        kind: "generic",
        description: "Stock relativo (0–100) de condición/abundancia de peces.",
      },
      {
        key: "system",
        label: "Estado sistémico",
        value: state.ecosystemHealth,
        kind: "generic",
        description: "Índice global para explicar totalidad (TGS).",
      },
    ],
    [state]
  );

  const applyPreset = (presetControls) => {
    setControls((prev) => ({
      ...prev,
      ...INITIAL_CONTROLS,
      ...presetControls,
    }));
  };

  const handleReset = () => {
    setControls({ ...INITIAL_CONTROLS });
    resetState();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">Humedales como sistema (TGS) — Maqueta interactiva</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Prototipo didáctico para explicar cómo el aporte de agua dulce, la conectividad de caños y el clima
            alteran el equilibrio ecológico en un humedal costero (caso conceptual inspirado en la Ciénaga Grande de Santa Marta).
            Los indicadores mostrados son índices relativos (0–100), no mediciones instrumentales.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <div className="xl:col-span-3">
            <ControlsPanel
              controls={controls}
              setControls={setControls}
              state={state}
              setManualTime={setManualTime}
              onPreset={applyPreset}
              onReset={handleReset}
            />
          </div>

          <div className="space-y-4 xl:col-span-6">
            <WetlandScene state={state} controls={controls} />
            <TGSPanel insights={insights} />
          </div>

          <div className="xl:col-span-3 space-y-3">
            {metricConfig.map((metric) => (
              <MetricCard
                key={metric.key}
                label={metric.label}
                value={metric.value}
                kind={metric.kind}
                description={metric.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
