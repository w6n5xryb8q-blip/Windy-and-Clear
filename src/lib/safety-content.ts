import type { AqiCategory } from './aqi-utils';

export interface SafetyAction {
  en: string;
  es: string;
}

export interface SafetyLevel {
  headlineEn: string;
  headlineEs: string;
  actions: SafetyAction[];
}

export const SAFETY_CONTENT: Record<AqiCategory, SafetyLevel> = {
  good: {
    headlineEn: 'Good conditions — enjoy the outdoors.',
    headlineEs: 'Buenas condiciones — disfruta el aire libre.',
    actions: [
      { en: 'Safe for all outdoor activities including exercise', es: 'Seguro para todas las actividades al aire libre, incluyendo ejercicio' },
      { en: 'Open windows to bring in fresh air', es: 'Abre las ventanas para dejar entrar aire fresco' },
      { en: 'Good day for children to play outside', es: 'Buen día para que los niños jueguen afuera' },
    ],
  },
  moderate: {
    headlineEn: 'Acceptable air — take care if you\'re sensitive.',
    headlineEs: 'Aire aceptable — ten cuidado si eres sensible.',
    actions: [
      { en: 'Most people can go about normal activities', es: 'La mayoría puede realizar actividades normales' },
      { en: 'People with asthma or allergies: limit prolonged time outdoors', es: 'Personas con asma o alergias: limita el tiempo prolongado afuera' },
      { en: 'If you feel short of breath or start coughing, go inside', es: 'Si sientes falta de aliento o empiezas a toser, entra a un lugar cerrado' },
      { en: 'Keep your inhaler nearby if you have one', es: 'Mantén tu inhalador cerca si tienes uno' },
    ],
  },
  usg: {
    headlineEn: 'Sensitive groups should reduce time outdoors.',
    headlineEs: 'Los grupos sensibles deben reducir el tiempo afuera.',
    actions: [
      { en: 'Children, elderly, and people with asthma or heart disease: limit outdoor time', es: 'Niños, personas mayores y quienes tienen asma o enfermedad cardíaca: limita el tiempo afuera' },
      { en: 'Avoid prolonged or vigorous outdoor exercise', es: 'Evita el ejercicio intenso o prolongado al aire libre' },
      { en: 'Keep medications (inhalers, nebulizers) accessible', es: 'Mantén tus medicamentos (inhaladores, nebulizadores) a la mano' },
      { en: 'Close windows if you or a family member is sensitive', es: 'Cierra las ventanas si tú o un familiar es sensible' },
      { en: 'Consider an N95 or KN95 mask if you must go out', es: 'Considera usar mascarilla N95 o KN95 si debes salir' },
    ],
  },
  unhealthy: {
    headlineEn: 'Everyone should reduce outdoor activity.',
    headlineEs: 'Todos deben reducir la actividad al aire libre.',
    actions: [
      { en: 'Limit all outdoor activity — go inside when possible', es: 'Limita toda actividad al aire libre — entra a lugares cerrados cuando puedas' },
      { en: 'Close windows and doors to keep pollution out', es: 'Cierra ventanas y puertas para evitar que entre la contaminación' },
      { en: 'Avoid vigorous outdoor exercise entirely', es: 'Evita el ejercicio intenso al aire libre por completo' },
      { en: 'Run an air purifier indoors on a high setting if you have one', es: 'Usa un purificador de aire en el interior en nivel alto si tienes uno' },
      { en: 'Wear an N95 or KN95 mask if you must go outside', es: 'Usa mascarilla N95 o KN95 si debes salir' },
      { en: 'Sensitive groups: stay indoors and rest', es: 'Grupos sensibles: quédate adentro y descansa' },
    ],
  },
  veryUnhealthy: {
    headlineEn: 'Health alert — stay indoors.',
    headlineEs: 'Alerta de salud — quédate adentro.',
    actions: [
      { en: 'Stay indoors — do not go outside unless absolutely necessary', es: 'Quédate en casa — no salgas a menos que sea absolutamente necesario' },
      { en: 'Keep all windows and doors closed tightly', es: 'Mantén todas las ventanas y puertas bien cerradas' },
      { en: 'Place a damp towel at the base of doors to seal gaps', es: 'Coloca una toalla húmeda al pie de las puertas para sellar las rendijas' },
      { en: 'Run air purifier on highest setting', es: 'Usa el purificador de aire en el nivel más alto' },
      { en: 'Avoid cooking on a gas stove — it adds indoor pollution', es: 'Evita cocinar en estufa de gas — aumenta la contaminación interior' },
      { en: 'If you must go out, wear an N95 or KN95 mask', es: 'Si debes salir, usa mascarilla N95 o KN95' },
      { en: 'Check on elderly neighbors and young children', es: 'Revisa cómo están tus vecinos mayores y niños pequeños' },
    ],
  },
  hazardous: {
    headlineEn: 'Health emergency — do not go outside.',
    headlineEs: 'Emergencia de salud — no salgas.',
    actions: [
      { en: 'Do not go outdoors — this is a health emergency', es: 'No salgas al exterior — esto es una emergencia de salud' },
      { en: 'Seal windows and doors — use tape or damp towels on gaps', es: 'Sella ventanas y puertas — usa cinta o toallas húmedas en las rendijas' },
      { en: 'Run all air purifiers on maximum', es: 'Pon todos los purificadores de aire al máximo' },
      { en: 'Do not exercise — even light activity increases pollution exposure', es: 'No hagas ejercicio — incluso la actividad ligera aumenta la exposición' },
      { en: 'If experiencing chest pain, difficulty breathing, or dizziness — call 911', es: 'Si tienes dolor en el pecho, dificultad para respirar o mareos — llama al 911' },
      { en: 'If you must evacuate, wear an N95 or KN95 mask', es: 'Si debes evacuar, usa mascarilla N95 o KN95' },
      { en: 'Contact local authorities if you have no safe shelter', es: 'Contacta a las autoridades locales si no tienes refugio seguro' },
    ],
  },
  unknown: {
    headlineEn: 'No current reading — general precautions apply.',
    headlineEs: 'Sin lectura actual — aplican precauciones generales.',
    actions: [
      { en: 'If you smell smoke or see haze, limit time outdoors', es: 'Si hueles humo o ves neblina, limita el tiempo afuera' },
      { en: 'Sensitive groups should stay indoors when in doubt', es: 'Los grupos sensibles deben quedarse adentro cuando haya duda' },
      { en: 'Keep windows closed if there is visible smoke nearby', es: 'Mantén las ventanas cerradas si hay humo visible cerca' },
    ],
  },
};
