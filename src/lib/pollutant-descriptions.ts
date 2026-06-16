/**
 * Pollutant health descriptions — bilingual, WHO-sourced context.
 *
 * Health burden data: WHO Global Air Quality Guidelines (2021) and
 * WHO Regional Office for Europe, "Air quality indexes: key considerations
 * and roadmaps for best practices" (2026).
 */

export interface PollutantDescription {
  nameEn: string;
  nameEs: string;
  descEn: string;
  descEs: string;
  whoContextEn: string;
  whoContextEs: string;
}

export const POLLUTANT_DESCRIPTIONS: Record<string, PollutantDescription> = {
  'PM2.5': {
    nameEn: 'Fine Particles (PM2.5)',
    nameEs: 'Partículas finas (PM2.5)',
    descEn: 'Microscopic particles from vehicles, industry, and fires — small enough to pass deep into your lungs and enter your bloodstream.',
    descEs: 'Partículas microscópicas de vehículos, industrias e incendios — tan pequeñas que penetran profundo en los pulmones y entran al torrente sanguíneo.',
    whoContextEn: 'The leading air pollutant for health harm. Linked by WHO to 4.2 million deaths per year worldwide via heart disease, stroke, lung cancer, and COPD. No safe exposure level has been identified.',
    whoContextEs: 'El contaminante del aire con mayor impacto en la salud. La OMS lo vincula con 4.2 millones de muertes al año en todo el mundo a través de enfermedades cardíacas, accidentes cerebrovasculares, cáncer de pulmón y EPOC. No se ha identificado un nivel de exposición seguro.',
  },
  'Ozone': {
    nameEn: 'Ground-Level Ozone (O₃)',
    nameEs: 'Ozono a nivel del suelo (O₃)',
    descEn: 'Forms when sunlight reacts with vehicle and factory exhaust. Makes breathing harder — especially for children, the elderly, and people with asthma.',
    descEs: 'Se forma cuando la luz solar reacciona con el escape de autos y fábricas. Dificulta la respiración — especialmente para niños, adultos mayores y personas con asma.',
    whoContextEn: 'Short-term ozone spikes increase emergency room visits for asthma and cardiovascular events. Combined with PM2.5, its health impact is greater than either alone.',
    whoContextEs: 'Los picos de ozono a corto plazo aumentan las visitas a urgencias por asma y eventos cardiovasculares. Combinado con PM2.5, su impacto en la salud es mayor que cada uno por separado.',
  },
  'PM10': {
    nameEn: 'Coarse Particles (PM10)',
    nameEs: 'Partículas gruesas (PM10)',
    descEn: 'Larger dust particles from construction, roads, and industrial sites that irritate the nose, throat, and upper airways.',
    descEs: 'Partículas de polvo más grandes provenientes de la construcción, carreteras y sitios industriales que irritan la nariz, garganta y vías respiratorias superiores.',
    whoContextEn: 'Elevated PM10 is associated with increased hospital admissions for respiratory and cardiovascular disease, particularly in communities near industrial corridors.',
    whoContextEs: 'El PM10 elevado se asocia con un aumento de hospitalizaciones por enfermedades respiratorias y cardiovasculares, especialmente en comunidades cercanas a corredores industriales.',
  },
  'NO2': {
    nameEn: 'Nitrogen Dioxide (NO₂)',
    nameEs: 'Dióxido de nitrógeno (NO₂)',
    descEn: 'Produced by vehicle exhaust and power plants. Irritates airways and increases vulnerability to respiratory infections.',
    descEs: 'Producido por el escape de vehículos y plantas de energía. Irrita las vías respiratorias y aumenta la vulnerabilidad a infecciones respiratorias.',
    whoContextEn: 'One of three pollutants used in the Canadian Air Quality Health Index (AQHI). Chronic exposure is linked to reduced lung function in children and increased asthma incidence.',
    whoContextEs: 'Uno de los tres contaminantes utilizados en el Índice de Salud de la Calidad del Aire de Canadá (AQHI). La exposición crónica está vinculada a una función pulmonar reducida en niños y mayor incidencia de asma.',
  },
  'CO': {
    nameEn: 'Carbon Monoxide (CO)',
    nameEs: 'Monóxido de carbono (CO)',
    descEn: 'Produced by burning fuel. At elevated levels, reduces the blood\'s ability to carry oxygen — particularly dangerous for people with heart disease.',
    descEs: 'Producido al quemar combustible. En niveles elevados, reduce la capacidad de la sangre para transportar oxígeno — especialmente peligroso para personas con enfermedades del corazón.',
    whoContextEn: 'Most dangerous in enclosed spaces and for people with cardiovascular conditions. Monitored as part of the US EPA AQI alongside PM2.5 and ozone.',
    whoContextEs: 'Más peligroso en espacios cerrados y para personas con enfermedades cardiovasculares. Se monitorea como parte del ICA de la EPA de EE. UU. junto con PM2.5 y ozono.',
  },
};
