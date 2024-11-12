import { FaInfoCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

export const cameraSettings = {
  position: [-18, 8, 0],
};

export const itemsWithTooltip = {
  shark: {
    icon: <FaInfoCircle />,
    background: "#486ECA",
    name: "Tiburón blanco",
    description:
      "Uno de los depredadores marinos más poderosos, conocido por su velocidad y tamaño imponentes en los océanos",
  },
  bottles: {
    icon: <IoIosWarning />,
    background: "red",
    name: "Plástico",
    description:
      "Contamina el océano durante siglos, afectando la vida marina y destruyendo hábitats en el ecosistema marino",
  },
  neonFish: {
    icon: <FaInfoCircle />,
    background: "#486ECA",
    name: "Pez neón",
    description:
      "Con sus brillantes colores azul y rojo, es pequeño pero llamativo, y suele habitar en aguas tranquilas de zonas tropicales",
  },
  stripedFish: {
    icon: <FaInfoCircle />,
    background: "#486ECA",
    name: "Pez rayado",
    description:
      "Conocido por sus distintivas líneas en el cuerpo, es adaptable y suele encontrarse en hábitats variados",
  },
  turtle: {
    icon: <FaInfoCircle />,
    background: "#486ECA",
    name: "Tortuga verde",
    description:
      "Una especie marina en peligro, es conocida por su caparazón suave y su papel crucial en el equilibrio del ecosistema oceánico",
  },
  coral: {
    icon: <FaInfoCircle />,
    background: "#486ECA",
    name: "Coral",
    description:
      "Son organismos marinos esenciales que forman arrecifes, proporcionando refugio y alimento a una vasta diversidad de especies",
  },
  crate: {
    icon: <IoIosWarning />,
    background: "red",
    name: "Madera",
    description:
      "Puede liberar sustancias químicas y fragmentarse, afectando el hábitat marino y contribuyendo al deterioro de los ecosistemas acuático",
  },
};

export const modalContent = [
  {
    title: "¿Qué es la contaminación del agua?",
    description:
      "La contaminación del agua ocurre cuando sustancias nocivas, como químicos, desechos industriales, plásticos, pesticidas, y residuos humanos, se introducen en el océano. Esto altera la calidad del agua, volviéndola tóxica para los seres vivos que dependen de ella. Puede resultar de diversas actividades humanas, incluyendo la industria, la agricultura y el vertido inadecuado de residuos.",
  },
  {
    title: "Principales fuentes de contaminación en la Isla Malpelo",
    description:
      `Plásticos: representan un peligro para la fauna marina que puede ingerir estos plásticos o enredarse en ellos.\n
Equipos de pesca: redes y líneas abandonadas, pueden seguir atrapando y matando animales durante años. Estas redes también liberan microplásticos y otros materiales tóxicos al descomponerse en el agua. \n
Químicos y metales pesados: Estos contaminantes se acumulan en los organismos marinos y pueden afectar desde los corales hasta los grandes depredadores.`,
  },
  {
    title: "¿Cómo afecta?",
    description:
      "La contaminación del agua afecta gravemente a los ecosistemas acuáticos al introducir sustancias tóxicas que matan o dañan a muchas especias acuáticas, destruyendo hábitats vitales como arrecifes de coral y manglares, esenciales para muchas especies.",
  },
  { title: "¿Cómo ayudar?", description: "Contenido de cómo ayudar..." },
];
