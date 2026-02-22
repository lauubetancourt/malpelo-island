export const clamp = (value, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value));

export const lerp = (a, b, t) => a + (b - a) * t;

export const smoothTo = (current, target, factor) =>
  lerp(current, target, clamp(factor, 0, 1));

export const rateFactor = (baseFactor, simHours, baseHours = 0.25) => {
  if (simHours <= 0) return 0;
  const normalizedBaseFactor = clamp(baseFactor, 0, 0.999);
  const steps = simHours / baseHours;
  return 1 - Math.pow(1 - normalizedBaseFactor, steps);
};
