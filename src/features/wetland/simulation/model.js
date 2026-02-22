import { CLIMATE_CONFIG } from "./constants";
import { clamp, rateFactor, smoothTo } from "./math";

export function daylightFactor(timeOfDay) {
  const radians = ((timeOfDay - 6) / 24) * Math.PI * 2;
  return clamp((Math.sin(radians) + 1) / 2, 0, 1);
}

function salinityBalanceScore(salinity) {
  const ideal = 38;
  const tolerance = 26;
  return clamp(100 - (Math.abs(salinity - ideal) / tolerance) * 100);
}

function algaeBalanceScore(algae) {
  const ideal = 28;
  const tolerance = 35;
  return clamp(100 - (Math.abs(algae - ideal) / tolerance) * 100);
}

export function evolveWetland(previousState, controls, options = {}) {
  const { advanceTime = true, dtHours = 0.25 } = options;
  const climate = CLIMATE_CONFIG[controls.climate];

  const simHours = advanceTime ? dtHours * controls.speed : dtHours;
  const timeOfDay = advanceTime
    ? (previousState.timeOfDay + dtHours * controls.speed) % 24
    : previousState.timeOfDay;

  const daylight = daylightFactor(timeOfDay);
  const freshwaterEffective = clamp(controls.freshwater + climate.freshwaterBoost);
  const connectivity = clamp(controls.connectivity);
  const heatStress = climate.heatStress;

  const targetFlushing = clamp(freshwaterEffective * 0.58 + connectivity * 0.42);
  const flushing = smoothTo(
    previousState.flushing,
    targetFlushing,
    rateFactor(0.18, simHours),
  );

  const targetSalinity = clamp(
    84 -
      freshwaterEffective * 0.55 -
      connectivity * 0.18 +
      (100 - flushing) * 0.12,
    5,
    95,
  );
  const salinity = smoothTo(
    previousState.salinity,
    targetSalinity,
    rateFactor(0.16, simHours),
  );

  const stagnation = 100 - flushing;
  const salinityStress = clamp(salinity - 45);
  const targetAlgae = clamp(
    18 +
      stagnation * 0.46 +
      heatStress * 0.28 +
      salinityStress * 0.18 -
      flushing * 0.14,
    0,
    100,
  );
  const algaeGrowthBase = 0.13 + (stagnation / 100) * 0.08;
  const algae = smoothTo(
    previousState.algae,
    targetAlgae,
    rateFactor(algaeGrowthBase, simHours),
  );

  const photoBoost = daylight * (16 + clamp(algae * 0.08, 0, 7));
  const freshwaterOxygenBoost = freshwaterEffective * 0.16 + flushing * 0.08;
  const nightPenalty = (1 - daylight) * (22 + algae * 0.12);
  const decompositionPenalty = algae * 0.22 + stagnation * 0.12;
  const salinityPenalty = clamp(salinity - 55) * 0.18;

  const targetOxygen = clamp(
    54 +
      photoBoost +
      freshwaterOxygenBoost -
      nightPenalty -
      decompositionPenalty -
      salinityPenalty,
    0,
    100,
  );
  const oxygen = smoothTo(
    previousState.oxygen,
    targetOxygen,
    rateFactor(0.17, simHours),
  );

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
      ? smoothTo(
          previousState.hypoxiaExposure ?? 0,
          hypoxiaExposureTarget,
          rateFactor(0.22, simHours),
        )
      : smoothTo(
          previousState.hypoxiaExposure ?? 0,
          0,
          rateFactor(0.08, simHours),
        );

  const acuteMortalityStress = clamp(anoxiaStress * 0.55 + hypoxiaExposure * 0.65);
  const chronicFishStress = clamp(
    lowOxygenStress * 0.42 +
      acuteMortalityStress * 0.33 +
      highSalinityStress * 0.1 +
      lowSalinityStress * 0.07 +
      algaeStress * 0.08,
  );

  const targetFishHealth = clamp(100 - chronicFishStress);

  let fishHealth;
  if (targetFishHealth < previousState.fishHealth) {
    const declineBase =
      0.12 + (acuteMortalityStress / 100) * 0.12 + (1 - daylight) * 0.03;
    fishHealth = smoothTo(
      previousState.fishHealth,
      targetFishHealth,
      rateFactor(declineBase, simHours),
    );
  } else {
    const recoverBase =
      oxygen > 50 && flushing > 40 && hypoxiaExposure < 35 ? 0.03 : 0.01;
    fishHealth = smoothTo(
      previousState.fishHealth,
      targetFishHealth,
      rateFactor(recoverBase, simHours),
    );
  }

  if (oxygen < 8 && hypoxiaExposure > 70) {
    fishHealth = clamp(fishHealth - 0.9 * (simHours / 0.25));
  } else if (oxygen < 15 && hypoxiaExposure > 55) {
    fishHealth = clamp(fishHealth - 0.25 * (simHours / 0.25));
  }

  const ecosystemHealth = clamp(
    fishHealth * 0.3 +
      oxygen * 0.23 +
      salinityBalanceScore(salinity) * 0.18 +
      flushing * 0.17 +
      algaeBalanceScore(algae) * 0.12,
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

export function formatHour(time) {
  const totalMinutes = ((Math.round(time * 60) % (24 * 60)) + 24 * 60) % (24 * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function valueLabel(value, type) {
  if (type === "oxygen") {
    if (value < 25) return "Critico";
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
    if (value > 75) return "Floracion";
    if (value > 55) return "Alta";
    if (value > 30) return "Media";
    return "Baja";
  }

  if (value < 35) return "Critico";
  if (value < 60) return "Estres";
  return "Estable";
}
