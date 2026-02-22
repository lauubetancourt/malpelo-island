/* =====================================================
   Wetland Content Data — sourced from public/content.txt
   ===================================================== */

// ─── Section 1: ¿Qué son los humedales? ─────────────────

export const wetlandIntro = {
  title: "¿Qué son los Humedales y qué los caracteriza?",
  paragraphs: [
    "Los humedales son áreas de transición entre sistemas acuáticos y terrestres, frecuentemente inundadas o saturadas de aguas superficiales o subterráneas. Son zonas normalmente planas donde la superficie del suelo se cubre de agua de forma permanente o estacional.",
    "No todo terreno lleno de agua puede considerarse un humedal. El líquido tiene que permanecer durante un lapso lo suficientemente largo como para que se desarrolle una flora acuática significativa, y se puedan dar las condiciones para alcanzar el estado de ecosistema de transición entre un sistema acuático y terrestre.",
    "Los humedales suelen encontrarse muy cerca de otros cuerpos acuíferos que los abastecen, como ríos o lagos, aunque ciertos humedales aparentemente aislados de otras fuentes hídricas superficiales pueden ser abastecidos de aguas subterráneas. Los humedales tienen límites poco definidos; son espacios de transición, de escasa profundidad y de naturaleza cambiante con el tiempo y el espacio.",
  ],
};

export const wetlandTypes = {
  title: "Los 6 principales tipos de humedales",
  subtitle:
    "Cada zona geográfica tiene características climatológicas, de relieve y de vegetación específicas.",
  types: [
    {
      icon: "🌊",
      title: "Marinos",
      description:
        "Ecosistemas costeros donde el agua continental entra en contacto con el agua marina. Representan zonas ricas en nutrientes con grandes tasas de intercambio de materia y energía. Incluyen lagunas costeras, costas rocosas, pastos marinos y arrecifes de coral.",
    },
    {
      icon: "🏞️",
      title: "Estuarinos",
      description:
        "Hábitats de aguas profundas influenciadas por las mareas, semirodeadas por tierra con acceso permanente o esporádico al mar. Se presentan donde los ríos desembocan al mar. Incluyen manglares, deltas y marismas de mareas.",
    },
    {
      icon: "🫧",
      title: "Lacustres",
      description:
        "Humedales situados en depresiones topográficas o sobre canales represados, con una extensión superior a 8 hectáreas. Principalmente son humedales asociados a lagos.",
    },
    {
      icon: "🏔️",
      title: "Ribereños",
      description:
        "Ecosistemas de llanura de inundación donde la inundación por agua superficial es un fenómeno regular. Incluyen valles y laderas adyacentes regularmente afectadas por flujos de ríos y arroyos.",
    },
    {
      icon: "🌿",
      title: "Palustres",
      description:
        "Humedales dominados por árboles, arbustos, musgos o líquenes, con salinidad menor a 0.5%. Incluyen pantanos, marismas y ciénagas.",
    },
    {
      icon: "🏗️",
      title: "Artificiales",
      description:
        "Creados por el hombre con diferentes propósitos (embalses, canales, actividad productiva, etc.) y aun así cumplen las funciones de los humedales naturales.",
    },
  ],
};

export const wetlandVegetation = {
  highlight:
    "El agua es el principal factor que controla la dinámica de los humedales, incluyendo su fauna y flora. Como los suelos de los humedales están constantemente saturados con agua, la vegetación típica son plantas hidrofíticas, las cuales poseen adaptaciones morfológicas y metabólicas que les permiten sobrevivir en suelos en condiciones anaeróbicas.",
};

// ─── Section 2: Los humedales desde la TGS ──────────────

export const tgsIntro = {
  title: "Los Humedales desde la Teoría General de Sistemas",
  paragraphs: [
    "La Teoría General de Sistemas (TGS) define un sistema como un conjunto de elementos interrelacionados que interactúan entre sí y con su entorno, intercambiando materia, energía e información.",
  ],
};

export const tgsWhySystem = {
  subtitle: "¿Por qué un humedal es un sistema?",
  items: [
    {
      bold: "Múltiples elementos",
      text: "Está compuesto por agua, suelo, flora, fauna, microorganismos y micronutrientes.",
    },
    {
      bold: "Interacción constante",
      text: "Existe interacción continua entre todos sus componentes.",
    },
    {
      bold: "Intercambio",
      text: "Intercambia energía (radiación solar), materia (agua, nutrientes, sedimentos) e información (procesos ecológicos) con su entorno.",
    },
    {
      bold: "Organización interna",
      text: "Presenta una estructura organizada y coordinada.",
    },
    {
      bold: "Propiedades emergentes",
      text: "Exhibe biodiversidad, regulación climática y resiliencia.",
    },
    {
      bold: "Objetivo sistémico",
      text: "Posee capacidad de auto-mantenimiento y persistencia, coordinando sus componentes bióticos y abióticos mediante retroalimentación para conservar su equilibrio dinámico.",
    },
  ],
};

export const tgsCharacteristics = {
  title: "Características del humedal como sistema",
  items: [
    {
      bold: "Sistema natural",
      text: "Se origina y evoluciona mediante procesos ecológicos y geológicos.",
    },
    {
      bold: "Sistema abierto",
      text: "Intercambia materia y energía con el entorno: recibe agua, sedimentos y nutrientes, y exporta biomasa y energía.",
    },
    {
      bold: "Sistema dinámico",
      text: "Está sujeto a variaciones estacionales, hidrológicas, climáticas y antrópicas. Su estado nunca permanece estático.",
    },
    {
      bold: "Sistema complejo",
      text: "Presenta múltiples niveles de organización (microorganismos, comunidades vegetales, redes tróficas) y relaciones no lineales.",
    },
  ],
};

export const tgsSubsystems = {
  title: "Subsistemas del humedal",
  subsystems: [
    {
      icon: "💧",
      title: "Hidrológico",
      description: "Flujos de entrada y salida de agua.",
    },
    {
      icon: "🪨",
      title: "Edáfico",
      description: "Propiedades físicas y químicas del suelo.",
    },
    {
      icon: "🌱",
      title: "Biológico",
      description: "Flora, fauna y microorganismos.",
    },
    {
      icon: "🌤️",
      title: "Climático",
      description: "Precipitación, temperatura y evaporación.",
    },
    {
      icon: "👥",
      title: "Antrópico",
      description: "Usos del suelo y actividades humanas.",
    },
  ],
};

// ─── Section 3: Ciénaga Grande de Santa Marta ───────────

export const cienegaIntro = {
  title: "La Ciénaga Grande de Santa Marta",
  paragraphs: [
    "La Ciénaga Grande de Santa Marta es el complejo lagunar costero más grande de Colombia y uno de los ecosistemas más importantes del Caribe. Fue declarada sitio Ramsar en 1998.",
    "Es un humedal de tipo estuarino-costero, caracterizado por la interacción entre aguas dulces provenientes del río Magdalena, aguas salinas del mar Caribe y amplias zonas de manglar.",
  ],
};

export const cienegaDynamics = {
  title: "Dinámica hídrica y salinidad",
  paragraphs: [
    "La Ciénaga Grande de Santa Marta es un sistema complejo cuya estabilidad depende del equilibrio entre aportes de agua dulce, intercambio marino y dinámica climática. La salinidad constituye una variable crítica que integra estas interacciones.",
    "En épocas de lluvias o desbordamientos de los ríos tributarios, el ingreso de agua dulce disminuye la concentración de sales y favorece condiciones adecuadas para peces e invertebrados. En contraste, cuando los cauces son desviados o se reduce el flujo hídrico por sequías o intervención humana, aumenta la evaporación relativa y se eleva la salinidad, provocando estrés fisiológico, disminución del oxígeno disuelto y episodios de mortandad masiva de peces.",
  ],
};

export const cienegaCrisis = {
  highlight:
    "En 2015 se registró uno de los episodios más críticos de mortandad masiva de peces en la ciénaga, asociado a una combinación de sequía intensa (vinculada al fenómeno de El Niño), reducción del ingreso de agua dulce y limitaciones en la circulación hídrica. Estas condiciones incrementaron la salinidad y favorecieron la estratificación del agua, lo que redujo el oxígeno disuelto. La descomposición bacteriana generó hipoxia severa que provocó la muerte de miles de peces.",
};

export const cienegaBiogeochemistry = {
  paragraphs: [
    "Desde el punto de vista biogeoquímico, la disminución del flujo de agua dulce y el aumento de la salinidad modifican profundamente los ciclos de nutrientes. En condiciones normales, el nitrógeno y el fósforo ingresan al sistema a través de los aportes fluviales y son asimilados por el fitoplancton, que constituye la base de la productividad primaria.",
    "Cuando la circulación hídrica disminuye, los nutrientes pueden concentrarse y favorecer floraciones algales intensas. Tras su muerte, la biomasa sedimenta y es degradada por bacterias heterotróficas, incrementando la demanda bioquímica de oxígeno. En los sedimentos, la falta de oxígeno altera procesos como la nitrificación y la desnitrificación, retroalimentando nuevas floraciones. De esta manera, un cambio inicial en la hidrología reorganiza el metabolismo completo del sistema.",
  ],
};

// ─── Section 4: Principios de la TGS ────────────────────

export const tgsPrinciples = {
  title: "Principios de la TGS en la Ciénaga Grande",
  principles: [
    {
      title: "Totalidad",
      description:
        "La Ciénaga no puede entenderse analizando únicamente la salinidad, o solo los peces, o únicamente el flujo del río Magdalena. Cuando se reducen los aportes de agua dulce, se modifican los gradientes de densidad del agua, la circulación interna, la distribución del fitoplancton, la actividad bacteriana y la productividad pesquera. El sistema responde como un todo integrado.",
    },
    {
      title: "Interdependencia",
      description:
        "Los componentes físicos, químicos y biológicos están estrechamente acoplados. Menor flujo de agua dulce genera mayor salinidad, mayor estrés osmótico en peces, mayor mortalidad, más materia orgánica en descomposición, mayor actividad bacteriana, menor oxígeno disuelto y disminución de organismos dependientes del oxígeno.",
    },
    {
      title: "Homeostasis",
      description:
        "La Ciénaga mantiene rangos funcionales de salinidad, oxígeno y nutrientes que permiten la continuidad de la vida. No es un equilibrio estático, sino dinámico: en temporada de lluvias baja la salinidad con mayor renovación hídrica; en temporada seca aumenta la concentración de sales. La homeostasis depende del intercambio continuo con el río Magdalena y el mar Caribe.",
    },
    {
      title: "Retroalimentación",
      description:
        "Existen bucles de retroalimentación positiva y negativa. Por ejemplo: alta temperatura + baja circulación → floraciones algales → biomasa muerta → descomposición bacteriana → menor oxígeno → mortalidad. Y también: mayor entrada de agua dulce → menor salinidad → mayor oxigenación → menor estrés fisiológico → recuperación biológica.",
    },
    {
      title: "Multicausalidad",
      description:
        "Los eventos ecológicos no tienen una única causa. Por ejemplo, la mortandad de peces en 2015 fue resultado del fenómeno de El Niño, disminución del caudal, interrupción histórica de caños, altas temperaturas, estratificación térmica y procesos microbianos.",
    },
    {
      title: "Emergencia",
      description:
        "La presencia de comunidades especializadas de aves es una propiedad emergente del sistema. Especies como el colibrí cienaguero es endémica de esta zona. Esta especie no existiría si no interactuaran de manera acoplada el manglar, la disponibilidad de nutrientes, la productividad del fitoplancton y la estructura hidrológica del sistema.",
    },
    {
      title: "Entropía",
      description:
        "La entropía es la tendencia natural de un sistema a perder organización sin energía externa. En la Ciénaga, sin luz solar las algas no realizarían fotosíntesis, el zooplancton no tendría alimento, los peces disminuirían y la red trófica colapsaría progresivamente.",
    },
    {
      title: "Neguentropía",
      description:
        "Como sistema abierto, la Ciénaga importa energía solar y nutrientes fluviales que le permiten mantener organización frente a la tendencia al desorden. Sin flujo de energía y materia, el sistema tendería a simplificarse y perder estructura biológica.",
    },
    {
      title: "Jerarquía",
      description:
        "Dentro de la Ciénaga hay complejas redes tróficas con múltiples niveles de depredadores y presas, organizadas de forma jerárquica dentro del ecosistema.",
    },
    {
      title: "Sinergia",
      description:
        "La interacción entre procesos físicos (mezcla), químicos (nutrientes) y biológicos (plancton) produce una productividad mayor que la suma de los procesos individuales.",
    },
    {
      title: "Resiliencia",
      description:
        "A pesar de décadas de desvío de cauces, construcción de infraestructura vial, alteración de flujos y sobreexplotación pesquera, la Ciénaga ha mostrado capacidad de recuperación parcial natural. Pese a todas estas intervenciones, sigue siendo un ecosistema donde hay vida.",
    },
    {
      title: "Adaptación",
      description:
        "La flora de la Ciénaga ha desarrollado características para sobrevivir en condiciones de baja profundidad, variabilidad salina y bajos niveles de oxígeno. Plantas halófitas toleran altas concentraciones de sal, mientras que especies subacuáticas y raíces especializadas soportan suelos anóxicos e inestables.",
    },
    {
      title: "Equifinalidad",
      description:
        "El equilibrio ecológico de la Ciénaga puede restablecerse por distintas vías: mayor aporte de agua dulce en lluvias o menor evaporación por cambios estacionales. Aunque los mecanismos difieran, ambos conducen al mismo resultado: la recuperación del equilibrio dinámico del ecosistema.",
    },
    {
      title: "Centralización",
      description: "El flujo de agua dulce actúa como la 'parte líder'; una pequeña variación en este componente central provoca un cambio masivo en el sistema total." 
    },
    {
      title: "Coevolución",
      description: "Las especies vegetales y los microorganismos del suelo no evolucionan solos; coevolucionan en una red de interdependecia."
    },
    {
      title: "Autoorganización",
      description: "La Ciénaga surge de las interacciones autónomas de los agentes. Su organización surge de la interacción constante entre sus componentes bióticos y abióticos."
    },
    {
      title: "Individualidad",
      description: "La Ciénaga está compuesta por 'individuos autónomos' llamados agentes. Son los elementos que caracterizan al sistema y lo estructuran, tales como la flora, fauna y los microorganismos."

    }
  ],
};

export const feedbackData = {
  title: "Bucles de retroalimentación",
  feedbackLoops: [
    {
      title: "Retroalimentación negativa",
      steps: [
        "Alta temperatura + baja circulación",
        "↑ Floraciones algales",
        "↑ Biomasa muerta",
        "↑ Descomposición bacteriana",
        "↓ Oxígeno",
        "↑ Mortalidad",
      ],
    },
    {
      title: "Retroalimentación positiva",
      steps: [
        "Mayor entrada de agua dulce",
        "↓ Salinidad",
        "↑ Oxigenación",
        "↓ Estrés fisiológico",
        "Recuperación biológica",
      ],
    },
  ],
};

// ─── Bibliography ────────────────────────────────────────

export const bibliographyData = {
  bibliography: [
    'Humedales. Ministerio de Ambiente y Desarrollo Sostenible. https://archivo.minambiente.gov.co/index.php/bosques-biodiversidad-y-servicios-ecosistematicos/ecosistemas-estrategicos/humedales',
    'Humedales: reservas de vida en peligro de extinción. Universidad Nacional de La Plata UNLP Argentina. https://unlp.edu.ar/investiga/especiales/humedales-17562-22562/',
    'Los Humedales. Centro Regional Ramsar Para La Capacitación e Investigación Sobre Humedales Para Hemisferio Occidental. https://creho.org/humedales/tipos-de-humedales/',
    'Ossa Ossa CA. Teoría general de sistemas: conceptos y aplicaciones. Universidad Tecnológica de Pereira; 2016. https://doi.org/10.22517/9789587222289',
    'Ciénaga Grande de Santa Marta. https://cienagagrande.minambiente.gov.co/',
    'Más de 15 toneladas de peces muertos en la Ciénaga Grande. El Colombiano. https://www.elcolombiano.com/medio-ambiente/mas-de-15-toneladas-de-peces-muertos-en-la-cienaga-grande-HN4935832',
    'Fisher J, Acreman MC. Wetland nutrient removal: a review of the evidence. Hydrol Earth Syst Sci 2004;8:673–85. https://doi.org/10.5194/hess-8-673-2004',
  ],
};
