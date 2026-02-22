export const CLIMATE_CONFIG = {
  rainy: { label: "Lluvias", freshwaterBoost: 18, heatStress: 28 },
  normal: { label: "Normal", freshwaterBoost: 0, heatStress: 48 },
  drought: { label: "Sequia", freshwaterBoost: -22, heatStress: 72 },
};

export const PRESETS = {
  equilibrio: {
    label: "Equilibrio",
    controls: { freshwater: 68, connectivity: 72, climate: "normal" },
  },
  sequia: {
    label: "Sequia",
    controls: { freshwater: 18, connectivity: 50, climate: "drought" },
  },
  bloqueados: {
    label: "Canos bloqueados",
    controls: { freshwater: 45, connectivity: 18, climate: "normal" },
  },
  recuperacion: {
    label: "Recuperacion",
    controls: { freshwater: 82, connectivity: 80, climate: "rainy" },
  },
};

export const INITIAL_CONTROLS = {
  freshwater: 62,
  connectivity: 65,
  climate: "normal",
  isPlaying: true,
  speed: 1,
};

export const INITIAL_STATE = {
  timeOfDay: 9,
  flushing: 60,
  salinity: 42,
  algae: 36,
  oxygen: 68,
  hypoxiaExposure: 0,
  fishHealth: 78,
  ecosystemHealth: 74,
};
