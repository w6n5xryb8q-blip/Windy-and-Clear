export interface SymptomTier {
  levelEn: string;
  levelEs: string;
  guidanceEn: string;
  guidanceEs: string;
  ctaEn: string;
  ctaEs: string;
  ctaHref?: string;
  color: string; // tailwind text color
  borderColor: string;
  symptoms: { en: string; es: string }[];
}

export interface GroundingTechnique {
  nameEn: string;
  nameEs: string;
  descEn: string;
  descEs: string;
  stepsEn: string[];
  stepsEs: string[];
}

export interface RoutineGroup {
  groupEn: string;
  groupEs: string;
  tipsEn: string[];
  tipsEs: string[];
}

export const SYMPTOM_TIERS: SymptomTier[] = [
  {
    levelEn: 'Mild',
    levelEs: 'Leve',
    guidanceEn: 'Stay home, rest, and monitor how you feel.',
    guidanceEs: 'Quédate en casa, descansa y observa cómo te sientes.',
    ctaEn: 'Stay home and rest',
    ctaEs: 'Quédate en casa y descansa',
    color: 'text-yellow-700',
    borderColor: 'border-yellow-400',
    symptoms: [
      { en: 'Mild cough or throat irritation', es: 'Tos leve o irritación de garganta' },
      { en: 'Mild headache', es: 'Dolor de cabeza leve' },
      { en: 'Eye or nose irritation', es: 'Irritación de ojos o nariz' },
      { en: 'Slight fatigue', es: 'Cansancio leve' },
    ],
  },
  {
    levelEn: 'Moderate',
    levelEs: 'Moderado',
    guidanceEn: 'Contact your doctor or visit urgent care.',
    guidanceEs: 'Contacta a tu médico o visita una clínica de urgencias.',
    ctaEn: 'Call your doctor',
    ctaEs: 'Llama a tu médico',
    color: 'text-orange-700',
    borderColor: 'border-orange-400',
    symptoms: [
      { en: 'Frequent or persistent cough', es: 'Tos frecuente o persistente' },
      { en: 'Shortness of breath with light activity', es: 'Falta de aliento con actividad ligera' },
      { en: 'Chest tightness or pressure', es: 'Presión o tensión en el pecho' },
      { en: 'Wheezing', es: 'Silbido al respirar' },
      { en: 'Unusual fatigue or dizziness', es: 'Cansancio inusual o mareos' },
    ],
  },
  {
    levelEn: 'Severe',
    levelEs: 'Severo',
    guidanceEn: 'Call 911 immediately.',
    guidanceEs: 'Llama al 911 de inmediato.',
    ctaEn: 'Call 911',
    ctaEs: 'Llama al 911',
    ctaHref: 'tel:911',
    color: 'text-red-700',
    borderColor: 'border-red-500',
    symptoms: [
      { en: 'Difficulty breathing at rest', es: 'Dificultad para respirar en reposo' },
      { en: 'Chest pain', es: 'Dolor en el pecho' },
      { en: 'Lips or fingernails turning blue', es: 'Labios o uñas que se tornan azules' },
      { en: 'Confusion or loss of consciousness', es: 'Confusión o pérdida del conocimiento' },
    ],
  },
];

export const GROUNDING_TECHNIQUES: GroundingTechnique[] = [
  {
    nameEn: '5-4-3-2-1 Grounding',
    nameEs: 'Técnica 5-4-3-2-1',
    descEn: 'Brings you back to the present moment when anxiety or stress spikes.',
    descEs: 'Te devuelve al momento presente cuando la ansiedad o el estrés aumentan.',
    stepsEn: [
      'Name 5 things you can see right now',
      'Name 4 things you can physically touch',
      'Name 3 things you can hear',
      'Name 2 things you can smell',
      'Name 1 thing you can taste',
    ],
    stepsEs: [
      'Nombra 5 cosas que puedes ver en este momento',
      'Nombra 4 cosas que puedes tocar físicamente',
      'Nombra 3 cosas que puedes escuchar',
      'Nombra 2 cosas que puedes oler',
      'Nombra 1 cosa que puedes saborear',
    ],
  },
  {
    nameEn: '2-Minute Body Scan',
    nameEs: 'Escaneo Corporal de 2 Minutos',
    descEn: 'Releases physical tension you may not realize you\'re holding.',
    descEs: 'Libera la tensión física que quizás no sabes que estás reteniendo.',
    stepsEn: [
      'Close your eyes and breathe slowly',
      'Start at the top of your head — notice any tension',
      'Move slowly down: face, neck, shoulders, arms, hands',
      'Continue: chest, belly, lower back, legs, feet',
      'At each area, consciously let go of any tightness',
    ],
    stepsEs: [
      'Cierra los ojos y respira lentamente',
      'Comienza en la parte superior de la cabeza — nota cualquier tensión',
      'Baja lentamente: cara, cuello, hombros, brazos, manos',
      'Continúa: pecho, vientre, espalda baja, piernas, pies',
      'En cada área, suelta conscientemente cualquier tensión',
    ],
  },
  {
    nameEn: 'Control Anchor',
    nameEs: 'Ancla de Control',
    descEn: 'Refocuses your mind on what you can actually influence right now.',
    descEs: 'Reenfoca tu mente en lo que realmente puedes influir en este momento.',
    stepsEn: [
      'Write or say out loud: "I cannot control the air outside."',
      'Then complete: "What I CAN control right now is ___"',
      'Examples: staying home, taking my medication, drinking water, calling a friend, checking on a neighbor',
      'Read your list back to yourself — this is your anchor',
    ],
    stepsEs: [
      'Escribe o di en voz alta: "No puedo controlar el aire afuera."',
      'Luego completa: "Lo que SÍ puedo controlar ahora es ___"',
      'Ejemplos: quedarme en casa, tomar mi medicamento, beber agua, llamar a un amigo, revisar a un vecino',
      'Lee tu lista en voz alta — este es tu ancla',
    ],
  },
];

export const ROUTINE_GROUPS: RoutineGroup[] = [
  {
    groupEn: 'Everyone',
    groupEs: 'Todos',
    tipsEn: [
      'Take all medications on schedule — do not skip',
      'Avoid indoor pollutants: candles, incense, aerosol sprays, gas stoves',
      'Drink water every hour — your body works harder in polluted air',
      'Rest more than usual; this is not laziness, it is protection',
    ],
    tipsEs: [
      'Toma todos tus medicamentos según el horario — no los omitas',
      'Evita contaminantes en interiores: velas, incienso, aerosoles, estufas de gas',
      'Bebe agua cada hora — tu cuerpo trabaja más con el aire contaminado',
      'Descansa más de lo habitual; esto no es pereza, es protección',
    ],
  },
  {
    groupEn: 'Asthma or COPD',
    groupEs: 'Asma o EPOC',
    tipsEn: [
      'Use your rescue inhaler before any physical activity, even light housework',
      'Check your peak flow meter every few hours if you have one',
      'Stay on your controller medication schedule, not just rescue',
      'Know your action plan: yellow zone means call your doctor today',
    ],
    tipsEs: [
      'Usa tu inhalador de rescate antes de cualquier actividad física, incluso tareas ligeras',
      'Revisa tu medidor de flujo máximo cada pocas horas si tienes uno',
      'Mantén el horario de tu medicamento de control, no solo el de rescate',
      'Conoce tu plan de acción: zona amarilla significa llamar a tu médico hoy',
    ],
  },
  {
    groupEn: 'Heart Conditions',
    groupEs: 'Enfermedades Cardíacas',
    tipsEn: [
      'Avoid all physical exertion, including housework',
      'Monitor your blood pressure if you have a home device',
      'Watch for unusual shortness of breath, chest pain, or irregular heartbeat',
      'If any cardiac symptoms appear — call 911, do not drive yourself',
    ],
    tipsEs: [
      'Evita todo esfuerzo físico, incluyendo las tareas del hogar',
      'Controla tu presión arterial si tienes un dispositivo en casa',
      'Está alerta a falta de aliento inusual, dolor en el pecho o latidos irregulares',
      'Si aparece cualquier síntoma cardíaco — llama al 911, no manejes',
    ],
  },
  {
    groupEn: 'Children',
    groupEs: 'Niños',
    tipsEn: [
      'No outdoor play — even briefly',
      'Quiet indoor activities only: reading, drawing, puzzles, crafts',
      'Watch for faster-than-normal breathing, unusual irritability, or pale skin',
      'Keep windows in their room closed',
    ],
    tipsEs: [
      'Sin juego al aire libre — ni siquiera por un momento',
      'Solo actividades tranquilas en interiores: lectura, dibujo, rompecabezas, manualidades',
      'Observa si hay respiración más rápida de lo normal, irritabilidad inusual o piel pálida',
      'Mantén las ventanas de su habitación cerradas',
    ],
  },
  {
    groupEn: 'Elderly Adults',
    groupEs: 'Adultos Mayores',
    tipsEn: [
      'Have a trusted person check on you every few hours',
      'Stay cool — heat and poor air together are especially dangerous',
      'If you live alone, call someone to let them know you are OK',
      'Keep emergency contacts visible near your phone',
    ],
    tipsEs: [
      'Pide a una persona de confianza que te llame cada pocas horas',
      'Mantente fresco/a — el calor y el aire contaminado juntos son especialmente peligrosos',
      'Si vives solo/a, llama a alguien para hacerle saber que estás bien',
      'Mantén los contactos de emergencia visibles cerca de tu teléfono',
    ],
  },
];
