export const mouseControls = [
  {
    control: "Clic izquierdo sobre un objeto",
    description:
      "Selecciona un objeto que deseas reciclar haciendo clic sobre él.",
  },
  {
    control: "Clic izquierdo sobre un contenedor",
    description:
      "Después de seleccionar un objeto, haz clic en el contenedor donde creas que debe ser reciclado.",
  },
];

export const keyControls = [
  {
    control: "Controles de teclado",
    description:
      "Este escenario no utiliza controles de teclado. Todas las interacciones se realizan con el mouse.",
  },
];

export const cameraSettings = {
  position: [-20, 10, -20],
};

export const recyclingRules = {
  PlasticBottle: "WhiteRecyclingBin",
  Apple: "GreenRecyclingBin",
  Banana: "GreenRecyclingBin",
  Chips: "BlackRecyclingBin",
  CoffeeCup: "BlackRecyclingBin",
  PizzaBox: "BlackRecyclingBin",
  GlassBottle: "WhiteRecyclingBin",
  Eggs: "GreenRecyclingBin",
  Can: "WhiteRecyclingBin",
};

export const names = {
  PlasticBottle: "Botella de plástico",
  Apple: "Manzana",
  Banana: "Banano",
  Chips: "Envoltorio de Doritos",
  CoffeeCup: "Vaso de café",
  PizzaBox: "Caja de pizza",
  GlassBottle: "Botella de vidrio",
  Eggs: "Cáscara de huevo",
  Can: "Lata de gaseosa",
};
