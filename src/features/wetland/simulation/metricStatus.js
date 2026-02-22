const GENERIC_RULES = [
  {
    tone: "critical",
    match: (value) => value < 35,
    label: "Critico",
    detail: "La variable esta fuera del rango funcional.",
  },
  {
    tone: "warning",
    match: (value) => value < 60,
    label: "En estres",
    detail: "Hay presion sobre el equilibrio del sistema.",
  },
  {
    tone: "good",
    match: () => true,
    label: "Estable",
    detail: "La variable se mantiene en rango favorable.",
  },
];

const METRIC_RULES = {
  salinity: [
    {
      tone: "critical",
      match: (value) => value >= 68 || value < 10,
      label: "Fuera de rango",
      detail: "Salinidad extrema con alto riesgo fisiologico para la biota.",
    },
    {
      tone: "warning",
      match: (value) => value >= 58 || value < 18,
      label: "Estres salino",
      detail: "El sistema se aleja del rango funcional estuarino.",
    },
    {
      tone: "good",
      match: (value) => value >= 30 && value <= 50,
      label: "Rango funcional",
      detail: "Condicion compatible con equilibrio ecologico del humedal.",
    },
    {
      tone: "neutral",
      match: () => true,
      label: "Transicion",
      detail: "Condicion intermedia; requiere seguimiento.",
    },
  ],
  flushing: [
    {
      tone: "critical",
      match: (value) => value < 35,
      label: "Estancamiento",
      detail: "Baja renovacion hidrica favorece concentracion y deterioro.",
    },
    {
      tone: "warning",
      match: (value) => value < 50,
      label: "Renovacion baja",
      detail: "Intercambio limitado entre aportes y cuerpo de agua.",
    },
    {
      tone: "good",
      match: (value) => value >= 65,
      label: "Renovacion alta",
      detail: "Mejor intercambio, dilucion y capacidad de regulacion.",
    },
    {
      tone: "neutral",
      match: () => true,
      label: "Renovacion media",
      detail: "Estado intermedio de circulacion.",
    },
  ],
  algae: [
    {
      tone: "critical",
      match: (value) => value >= 65,
      label: "Floracion severa",
      detail: "Biomasa alta con riesgo de anoxia por descomposicion.",
    },
    {
      tone: "warning",
      match: (value) => value >= 50,
      label: "Floracion activa",
      detail: "Aumento de algas por desequilibrio hidrologico-nutricional.",
    },
    {
      tone: "good",
      match: (value) => value >= 25 && value <= 45,
      label: "Biomasa balanceada",
      detail: "Productividad compatible con estabilidad del sistema.",
    },
    {
      tone: "neutral",
      match: () => true,
      label: "Biomasa baja",
      detail: "Produccion primaria limitada o en ajuste.",
    },
  ],
  oxygen: [
    {
      tone: "critical",
      match: (value) => value < 20,
      label: "Hipoxia severa",
      detail: "Disponibilidad de oxigeno insuficiente para la fauna.",
    },
    {
      tone: "warning",
      match: (value) => value < 35,
      label: "Hipoxia",
      detail: "Oxigeno bajo con riesgo de mortandad en peces.",
    },
    {
      tone: "neutral",
      match: (value) => value < 45,
      label: "Limitado",
      detail: "Oxigenacion parcial; el sistema sigue vulnerable.",
    },
    {
      tone: "good",
      match: () => true,
      label: "Funcional",
      detail: "Oxigenacion adecuada para sostener la biota.",
    },
  ],
  fish: [
    {
      tone: "critical",
      match: (value) => value < 25,
      label: "Mortandad alta",
      detail: "Colapso biologico por estres hipoxico-salino.",
    },
    {
      tone: "warning",
      match: (value) => value < 60,
      label: "Poblacion en estres",
      detail: "Deterioro notable de la condicion de peces.",
    },
    {
      tone: "neutral",
      match: (value) => value < 80,
      label: "Recuperacion",
      detail: "Mejora gradual, aun con vulnerabilidad ecosistemica.",
    },
    {
      tone: "good",
      match: () => true,
      label: "Poblacion estable",
      detail: "Condicion favorable de abundancia y supervivencia.",
    },
  ],
};

export function getMetricStatus(kind, value) {
  const rules = METRIC_RULES[kind] ?? GENERIC_RULES;
  return rules.find((rule) => rule.match(value)) ?? GENERIC_RULES[0];
}
