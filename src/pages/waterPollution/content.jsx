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
  crab: {
    icon: <FaInfoCircle />,
    background: "#486ECA",
    name: "Cangrejo",
    description:
      "Un crustáceo que habita en zonas rocosas y arenosas del océano, conocido por su caparazón duro y su capacidad para moverse lateralmente.",
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
  tire: {
    icon: <IoIosWarning />,
    background: "red",
    name: "Llanta",
    description:
      "Un residuo persistente que libera microplásticos y sustancias tóxicas al degradarse, dañando el ecosistema marino y afectando la vida de diversas especies.",
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
    description: `Plásticos: representan un peligro para la fauna marina que puede ingerir estos plásticos o enredarse en ellos.\n
Equipos de pesca: redes y líneas abandonadas, pueden seguir atrapando y matando animales durante años. Estas redes también liberan microplásticos y otros materiales tóxicos al descomponerse en el agua. \n
Químicos y metales pesados: Estos contaminantes se acumulan en los organismos marinos y pueden afectar desde los corales hasta los grandes depredadores.`,
  },
  {
    title: "¿Cómo afecta?",
    description:
      "La contaminación del agua afecta gravemente a los ecosistemas acuáticos al introducir sustancias tóxicas que matan o dañan a muchas especias acuáticas, destruyendo hábitats vitales como arrecifes de coral y manglares, esenciales para muchas especies.",
  },
  {
    title: "¿Cómo ayudar?",
    description: `Reducir el uso de plásticos: evita los productos plásticos y elige productos biodegradables.\n
Tratar los desechos correctamente: asegúrate de reciclar y desechar la basura de forma adecuada. \n
Educar a otros sobre la importancia de Malpelo: crea conciencia sobre la importancia ecológica de la isla y la necesidad de proteger su biodiversidad con tu familia y amigos \n
¡Pequeñas acciones individuales pueden marcar una gran diferencia en la protección de la Isla Malpelo y sus ecosistemas!`,
  },
];

export const mouseControls = [
  {
    control: "Clic izquierdo sostenido",
    description:
      "Rota la cámara para explorar diferentes ángulos de la escena.",
  },
  {
    control: "Clic izquierdo sobre el cangrejo",
    description:
      "El cangrejo te atacará con sus pinzas.",
  },
  {
    control: "Pasar el cursor sobre un objeto",
    description: "Muestra información sobre los objetos seleccionados.",
  },
];

export const keyControls = [
  {
    control: "Tecla A o Flecha Izquierda",
    description: "Mueve al tiburón hacia la izquierda.",
  },
  {
    control: "Tecla W o Flecha Arriba",
    description: "Mueve al tiburón hacia arriba.",
  },
  {
    control: "Tecla S o Flecha Abajo",
    description: "Mueve al tiburón hacia abajo.",
  },
  {
    control: "Barra Espaciadora",
    description: "El tiburón realiza una mordida.",
  },
];
