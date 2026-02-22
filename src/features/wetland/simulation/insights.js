import { CLIMATE_CONFIG } from "./constants";
import { daylightFactor } from "./model";

export function getTGSInsights(state, controls) {
  const { salinity, oxygen, algae, fishHealth, ecosystemHealth, flushing } = state;
  const climateLabel = CLIMATE_CONFIG[controls.climate].label;
  const isDay = daylightFactor(state.timeOfDay) > 0.45;

  return [
    {
      title: "Totalidad",
      text:
        ecosystemHealth >= 70
          ? "El sistema se mantiene funcional: las variables se apoyan mutuamente."
          : ecosystemHealth >= 45
            ? "El sistema presenta estres: cambios en una parte ya afectan al conjunto."
            : "El sistema esta en deterioro: el comportamiento global no depende de una sola variable.",
    },
    {
      title: "Interdependencia",
      text:
        salinity > 58 || flushing < 40
          ? "Menor renovacion hidrica elevo la salinidad y favorecio el desequilibrio biologico."
          : "La conectividad y el aporte dulce sostienen la renovacion hidrica y amortiguan el sistema.",
    },
    {
      title: "Homeostasis",
      text:
        oxygen >= 45 && salinity >= 20 && salinity <= 60
          ? "El sistema se mantiene cerca de rangos funcionales."
          : "El sistema salio de su rango funcional; necesita compensacion.",
    },
    {
      title: "Retroalimentacion",
      text:
        algae > 60
          ? "Bucle de deterioro activo: algas altas aumentan descomposicion y reducen oxigeno."
          : "No hay floracion severa; el bucle de deterioro esta contenido.",
    },
    {
      title: "Multicausalidad",
      text: `Estado influido por clima (${climateLabel}), conectividad de canos, aporte de agua dulce y ciclo ${isDay ? "diurno" : "nocturno"}.`,
    },
    {
      title: "Emergencia",
      text:
        fishHealth < 40
          ? "La mortandad de peces emerge del acoplamiento entre bajo oxigeno, salinidad y biomasa algal."
          : "La salud de peces se mantiene porque las variables siguen acopladas de forma favorable.",
    },
  ];
}
