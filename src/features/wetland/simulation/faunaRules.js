import { clamp } from "./math.js";
import { getMetricStatus } from "./metricStatus.js";

const TONE_SEVERITY = Object.freeze({
  good: 0,
  neutral: 1,
  warning: 2,
  critical: 3,
});

const TONE_BY_SEVERITY = ["good", "neutral", "warning", "critical"];

const LIVE_FISH_FACTOR = Object.freeze({
  good: 1,
  neutral: 0.7,
  warning: 0.35,
  critical: 0,
});

const DEAD_FISH_FLOOR = Object.freeze({
  good: 0,
  neutral: 0.2,
  warning: 0.55,
  critical: 1,
});

function toneSeverity(tone) {
  return TONE_SEVERITY[tone] ?? TONE_SEVERITY.neutral;
}

function worstTone(tones) {
  const maxSeverity = tones.reduce(
    (highest, tone) => Math.max(highest, toneSeverity(tone)),
    TONE_SEVERITY.good,
  );
  return TONE_BY_SEVERITY[maxSeverity] ?? "neutral";
}

function statusForMetric(kind, value) {
  return getMetricStatus(kind, Math.round(value));
}

function clampCount(value, maxCount) {
  return Math.max(0, Math.min(maxCount, value));
}

export function deriveFaunaState(
  state,
  { liveFishCapacity = 0, deadFishCapacity = 0 } = {},
) {
  const salinityStatus = statusForMetric("salinity", state.salinity);
  const oxygenStatus = statusForMetric("oxygen", state.oxygen);
  const algaeStatus = statusForMetric("algae", state.algae);
  const fishStatus = statusForMetric("fish", state.fishHealth);

  const acuteStressTone = worstTone([
    fishStatus.tone,
    oxygenStatus.tone,
    salinityStatus.tone,
  ]);

  const ecosystemStressTone = worstTone([acuteStressTone, algaeStatus.tone]);
  const hypoxiaExposureRatio = clamp(state.hypoxiaExposure / 100, 0, 1);

  const fishBaseRatio = clamp(state.fishHealth / 100, 0, 1);
  const liveFishRatio = clamp(
    fishBaseRatio *
      LIVE_FISH_FACTOR[acuteStressTone] *
      (1 - hypoxiaExposureRatio * 0.65),
    0,
    1,
  );

  let visibleLiveFishCount = Math.round(liveFishCapacity * liveFishRatio);
  if (
    acuteStressTone === "critical" ||
    fishStatus.tone === "critical" ||
    oxygenStatus.tone === "critical" ||
    state.hypoxiaExposure >= 50
  ) {
    visibleLiveFishCount = 0;
  }

  const mortalityRatio = clamp((55 - state.fishHealth) / 55, 0, 1);
  let visibleDeadFishCount = Math.max(
    Math.round(deadFishCapacity * mortalityRatio),
    Math.round(deadFishCapacity * DEAD_FISH_FLOOR[ecosystemStressTone]),
  );
  if (acuteStressTone === "critical" || state.hypoxiaExposure >= 60) {
    visibleDeadFishCount = deadFishCapacity;
  }

  const turtleVisible =
    toneSeverity(acuteStressTone) <= TONE_SEVERITY.neutral &&
    state.hypoxiaExposure < 35;

  const hideAlligatorTrigger =
    acuteStressTone === "critical" &&
    (state.hypoxiaExposure >= 50 || fishStatus.tone === "critical");

  const showAlligatorTrigger =
    toneSeverity(acuteStressTone) <= TONE_SEVERITY.neutral &&
    state.hypoxiaExposure <= 25 &&
    fishStatus.tone !== "warning" &&
    fishStatus.tone !== "critical";

  return {
    metricStatus: {
      salinity: salinityStatus,
      oxygen: oxygenStatus,
      algae: algaeStatus,
      fish: fishStatus,
    },
    acuteStressTone,
    ecosystemStressTone,
    visibleLiveFishCount: clampCount(visibleLiveFishCount, liveFishCapacity),
    visibleDeadFishCount: clampCount(visibleDeadFishCount, deadFishCapacity),
    turtleVisible,
    hideAlligatorTrigger,
    showAlligatorTrigger,
  };
}
