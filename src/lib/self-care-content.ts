export interface BreathingExercise {
  nameEn: string;
  nameEs: string;
  purposeEn: string;
  purposeEs: string;
  stepsEn: string[];
  stepsEs: string[];
}

export interface SelfCareResource {
  nameEn: string;
  nameEs: string;
  detail: string;
  href: string;
}

export const BREATHING_EXERCISES: BreathingExercise[] = [
  {
    nameEn: 'Box Breathing',
    nameEs: 'Respiración en Caja',
    purposeEn: 'Calms anxiety and steadies your heart rate',
    purposeEs: 'Calma la ansiedad y estabiliza tu frecuencia cardíaca',
    stepsEn: [
      'Breathe in slowly through your nose for 4 counts',
      'Hold your breath for 4 counts',
      'Breathe out slowly through your mouth for 4 counts',
      'Hold for 4 counts — repeat 4 times',
    ],
    stepsEs: [
      'Inhala lentamente por la nariz durante 4 tiempos',
      'Mantén el aire durante 4 tiempos',
      'Exhala lentamente por la boca durante 4 tiempos',
      'Mantén durante 4 tiempos — repite 4 veces',
    ],
  },
  {
    nameEn: 'Pursed Lip Breathing',
    nameEs: 'Respiración con Labios Fruncidos',
    purposeEn: 'Slows breathing and helps with shortness of breath — especially for asthma or COPD',
    purposeEs: 'Desacelera la respiración y ayuda con la falta de aliento — especialmente para asma o EPOC',
    stepsEn: [
      'Relax your neck and shoulders',
      'Breathe in slowly through your nose for 2 counts',
      'Pucker your lips as if blowing out a candle',
      'Breathe out slowly through pursed lips for 4 counts — twice as long as you inhaled',
    ],
    stepsEs: [
      'Relaja el cuello y los hombros',
      'Inhala lentamente por la nariz durante 2 tiempos',
      'Frunce los labios como si fueras a apagar una vela',
      'Exhala lentamente por los labios fruncidos durante 4 tiempos — el doble de tiempo que inhalaste',
    ],
  },
  {
    nameEn: 'Belly Breathing',
    nameEs: 'Respiración Abdominal',
    purposeEn: 'Grounds you and reduces stress — works anywhere, anytime',
    purposeEs: 'Te centra y reduce el estrés — funciona en cualquier lugar y momento',
    stepsEn: [
      'Sit comfortably or lie down',
      'Place one hand on your chest, one on your belly',
      'Breathe in through your nose — feel your belly rise, chest stays still',
      'Breathe out slowly through your mouth — feel your belly fall',
      'Repeat for 5–10 breaths',
    ],
    stepsEs: [
      'Siéntate cómodamente o acuéstate',
      'Coloca una mano en el pecho y otra en el vientre',
      'Inhala por la nariz — siente cómo sube el vientre, el pecho se queda quieto',
      'Exhala lentamente por la boca — siente cómo baja el vientre',
      'Repite durante 5 a 10 respiraciones',
    ],
  },
];

export const SELF_CARE_RESOURCES: SelfCareResource[] = [
  {
    nameEn: 'Crisis Text Line',
    nameEs: 'Línea de Crisis por Mensaje',
    detail: 'Text HOME to 741741',
    href: 'sms:741741&body=HOME',
  },
  {
    nameEn: 'SAMHSA Mental Health Helpline',
    nameEs: 'Línea de Salud Mental SAMHSA',
    detail: '1-800-662-4357 — free, confidential, 24/7',
    href: 'tel:18006624357',
  },
  {
    nameEn: '211 Chicago — Local Support',
    nameEs: '211 Chicago — Apoyo Local',
    detail: 'Call or text 211 for food, shelter, health services',
    href: 'tel:211',
  },
  {
    nameEn: 'Chicago Dept. of Public Health',
    nameEs: 'Dept. de Salud Pública de Chicago',
    detail: '312-744-5000',
    href: 'tel:3127445000',
  },
];
