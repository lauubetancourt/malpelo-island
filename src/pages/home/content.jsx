import { useNavigate } from "react-router-dom";

export const useIslandContent = () => {
  const navigate = useNavigate();

  return [
    {
      image: "/images/home/flora.png",
      title: "Flora",
      description: "Un vistazo a la singular flora de la Isla Malpelo",
      action: () => navigate("/flora"),
    },
    {
      image: "/images/home/fauna.png",
      title: "Fauna",
      description: "Conoce la asombrosa fauna de la Isla Malpelo",
      action: () => navigate("/fauna"),
    },
    {
      image: "/images/home/datos.png",
      title: "Datos curiosos",
      description: "Curiosidades fascinantes sobre la Isla Malpelo",
      action: () => navigate("/datos-curiosos"),
    },
  ];
};

export const useProblemsContent = () => {
  const navigate = useNavigate();

  const problemsContent = [
    {
      image: "/images/home/contaminacion.png",
      title: "Contaminación del agua",
      description: "Descubre cómo se pone en riesgo la biodiversidad de la Isla Malpelo",
      action: () => navigate("/contaminacion-del-agua"),
    },
    {
      image: "/images/home/acidificacion.png",
      title: "Acidificación de los océanos",
      description:
        "Descubre la amenaza de la Isla Malpelo que altera el equilibrio de sus ecosistemas marinos",
      action: () => navigate("/acidificacion-del-oceano"),
    },
  ];

  return problemsContent;
};
