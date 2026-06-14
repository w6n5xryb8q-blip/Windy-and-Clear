export interface Neighborhood {
  slug: string;
  name: string;
  nameEs: string;
  communityAreaNumber: number;
  primaryZip: string;
  allZips: string[];
  isEj: boolean;
  takeActionEn: string;
  takeActionEs: string;
  takeActionUrl?: string;
}

export const neighborhoods: Neighborhood[] = [
  { slug: "rogers-park", name: "Rogers Park", nameEs: "Rogers Park", communityAreaNumber: 1, primaryZip: "60626", allZips: ["60626"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "west-ridge", name: "West Ridge", nameEs: "West Ridge", communityAreaNumber: 2, primaryZip: "60645", allZips: ["60645", "60659"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "uptown", name: "Uptown", nameEs: "Uptown", communityAreaNumber: 3, primaryZip: "60640", allZips: ["60640", "60613"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "lincoln-square", name: "Lincoln Square", nameEs: "Lincoln Square", communityAreaNumber: 4, primaryZip: "60625", allZips: ["60625"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "north-center", name: "North Center", nameEs: "North Center", communityAreaNumber: 5, primaryZip: "60613", allZips: ["60613", "60618"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "lake-view", name: "Lake View", nameEs: "Lake View", communityAreaNumber: 6, primaryZip: "60613", allZips: ["60613", "60614", "60657"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "lincoln-park", name: "Lincoln Park", nameEs: "Lincoln Park", communityAreaNumber: 7, primaryZip: "60614", allZips: ["60614"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "near-north-side", name: "Near North Side", nameEs: "Near North Side", communityAreaNumber: 8, primaryZip: "60610", allZips: ["60610", "60611"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "edison-park", name: "Edison Park", nameEs: "Edison Park", communityAreaNumber: 9, primaryZip: "60631", allZips: ["60631"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "norwood-park", name: "Norwood Park", nameEs: "Norwood Park", communityAreaNumber: 10, primaryZip: "60631", allZips: ["60631", "60656", "60714"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "jefferson-park", name: "Jefferson Park", nameEs: "Jefferson Park", communityAreaNumber: 11, primaryZip: "60630", allZips: ["60630"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "forest-glen", name: "Forest Glen", nameEs: "Forest Glen", communityAreaNumber: 12, primaryZip: "60630", allZips: ["60630", "60646"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "north-park", name: "North Park", nameEs: "North Park", communityAreaNumber: 13, primaryZip: "60625", allZips: ["60625"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "albany-park", name: "Albany Park", nameEs: "Albany Park", communityAreaNumber: 14, primaryZip: "60625", allZips: ["60618", "60625", "60630"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "portage-park", name: "Portage Park", nameEs: "Portage Park", communityAreaNumber: 15, primaryZip: "60634", allZips: ["60634", "60641"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "irving-park", name: "Irving Park", nameEs: "Irving Park", communityAreaNumber: 16, primaryZip: "60618", allZips: ["60618", "60641"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "dunning", name: "Dunning", nameEs: "Dunning", communityAreaNumber: 17, primaryZip: "60634", allZips: ["60634"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "montclare", name: "Montclare", nameEs: "Montclare", communityAreaNumber: 18, primaryZip: "60634", allZips: ["60634"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "belmont-cragin", name: "Belmont Cragin", nameEs: "Belmont Cragin", communityAreaNumber: 19, primaryZip: "60639", allZips: ["60634", "60639", "60641"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "hermosa", name: "Hermosa", nameEs: "Hermosa", communityAreaNumber: 20, primaryZip: "60639", allZips: ["60639", "60641"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  {
    slug: "austin",
    name: "Austin",
    nameEs: "Austin",
    communityAreaNumber: 25,
    primaryZip: "60644",
    allZips: ["60644", "60651"],
    isEj: true,
    takeActionEn: "Attend the next Chicago Department of Public Health community meeting and demand cumulative impact review for any new industrial permits near Austin.",
    takeActionEs: "Asiste a la próxima reunión comunitaria del Departamento de Salud Pública de Chicago y exige revisión de impacto acumulativo para nuevos permisos industriales.",
  },
  {
    slug: "west-garfield-park",
    name: "West Garfield Park",
    nameEs: "West Garfield Park",
    communityAreaNumber: 26,
    primaryZip: "60624",
    allZips: ["60624"],
    isEj: true,
    takeActionEn: "Contact your alderperson to request a community air quality meeting. EJ ordinance recommendations require cumulative impact studies here.",
    takeActionEs: "Contacta a tu concejal para solicitar una reunión comunitaria sobre calidad del aire. Las recomendaciones de la ordenanza EJ requieren estudios de impacto acumulativo.",
  },
  {
    slug: "east-garfield-park",
    name: "East Garfield Park",
    nameEs: "East Garfield Park",
    communityAreaNumber: 27,
    primaryZip: "60624",
    allZips: ["60624"],
    isEj: true,
    takeActionEn: "Connect with the Chicago Environmental Justice Network to track permit activity and attend zoning hearings in your area.",
    takeActionEs: "Conéctate con la Red de Justicia Ambiental de Chicago para rastrear actividad de permisos y asistir a audiencias de zonificación.",
  },
  { slug: "near-west-side", name: "Near West Side", nameEs: "Near West Side", communityAreaNumber: 28, primaryZip: "60607", allZips: ["60607", "60612"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "north-lawndale", name: "North Lawndale", nameEs: "North Lawndale", communityAreaNumber: 29, primaryZip: "60623", allZips: ["60623"], isEj: true, takeActionEn: "Contact LVEJO (Little Village Environmental Justice Organization) to join community organizing against industrial rezoning in this area.", takeActionEs: "Contacta a LVEJO (Organización de Justicia Ambiental de Little Village) para unirte a la organización comunitaria contra el rezonificado industrial." },
  {
    slug: "south-lawndale",
    name: "South Lawndale (Little Village)",
    nameEs: "South Lawndale (Little Village)",
    communityAreaNumber: 30,
    primaryZip: "60623",
    allZips: ["60608", "60623"],
    isEj: true,
    takeActionEn: "Contact LVEJO to report truck activity on Pulaski Road or 31st Street. They track industrial permit applications so your community doesn't have to fight alone.",
    takeActionEs: "Contacta a LVEJO para reportar actividad de camiones en Pulaski Road o la calle 31. Rastrean solicitudes de permisos industriales para que tu comunidad no tenga que luchar sola.",
    takeActionUrl: "https://lvejo.org",
  },
  { slug: "lower-west-side", name: "Lower West Side (Pilsen)", nameEs: "Lower West Side (Pilsen)", communityAreaNumber: 31, primaryZip: "60608", allZips: ["60608"], isEj: true, takeActionEn: "Call 311 to report idling diesel trucks near schools or parks. Truck traffic in Pilsen is monitored by community groups — your reports add to the record.", takeActionEs: "Llama al 311 para reportar camiones diésel en ralentí cerca de escuelas o parques. El tráfico de camiones en Pilsen es monitoreado por grupos comunitarios." },
  { slug: "loop", name: "Loop", nameEs: "Loop", communityAreaNumber: 32, primaryZip: "60601", allZips: ["60601", "60602", "60603", "60604", "60605", "60606"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "near-south-side", name: "Near South Side", nameEs: "Near South Side", communityAreaNumber: 33, primaryZip: "60616", allZips: ["60605", "60616"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "armour-square", name: "Armour Square", nameEs: "Armour Square", communityAreaNumber: 34, primaryZip: "60609", allZips: ["60609", "60616"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "douglas", name: "Douglas", nameEs: "Douglas", communityAreaNumber: 35, primaryZip: "60616", allZips: ["60616"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "oakland", name: "Oakland", nameEs: "Oakland", communityAreaNumber: 36, primaryZip: "60653", allZips: ["60653"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "fuller-park", name: "Fuller Park", nameEs: "Fuller Park", communityAreaNumber: 37, primaryZip: "60609", allZips: ["60609"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "grand-boulevard", name: "Grand Boulevard", nameEs: "Grand Boulevard", communityAreaNumber: 38, primaryZip: "60653", allZips: ["60653"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "kenwood", name: "Kenwood", nameEs: "Kenwood", communityAreaNumber: 39, primaryZip: "60615", allZips: ["60615", "60653"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "washington-park", name: "Washington Park", nameEs: "Washington Park", communityAreaNumber: 40, primaryZip: "60637", allZips: ["60637"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "hyde-park", name: "Hyde Park", nameEs: "Hyde Park", communityAreaNumber: 41, primaryZip: "60615", allZips: ["60615", "60637"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "woodlawn", name: "Woodlawn", nameEs: "Woodlawn", communityAreaNumber: 42, primaryZip: "60637", allZips: ["60637"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "south-shore", name: "South Shore", nameEs: "South Shore", communityAreaNumber: 43, primaryZip: "60649", allZips: ["60649"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "chatham", name: "Chatham", nameEs: "Chatham", communityAreaNumber: 44, primaryZip: "60619", allZips: ["60619", "60621"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "avalon-park", name: "Avalon Park", nameEs: "Avalon Park", communityAreaNumber: 45, primaryZip: "60619", allZips: ["60619"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "south-chicago", name: "South Chicago", nameEs: "South Chicago", communityAreaNumber: 46, primaryZip: "60617", allZips: ["60617"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "burnside", name: "Burnside", nameEs: "Burnside", communityAreaNumber: 47, primaryZip: "60628", allZips: ["60628"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "calumet-heights", name: "Calumet Heights", nameEs: "Calumet Heights", communityAreaNumber: 48, primaryZip: "60617", allZips: ["60617", "60619"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  {
    slug: "roseland",
    name: "Roseland",
    nameEs: "Roseland",
    communityAreaNumber: 49,
    primaryZip: "60628",
    allZips: ["60628", "60643"],
    isEj: true,
    takeActionEn: "Call 311 to report idling diesel trucks. Connect with People for Community Recovery to track environmental health in Roseland.",
    takeActionEs: "Llama al 311 para reportar camiones diésel en ralentí. Conéctate con People for Community Recovery para rastrear la salud ambiental en Roseland.",
  },
  { slug: "pullman", name: "Pullman", nameEs: "Pullman", communityAreaNumber: 50, primaryZip: "60628", allZips: ["60628"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "south-deering", name: "South Deering (Southeast Side)", nameEs: "South Deering (Southeast Side)", communityAreaNumber: 51, primaryZip: "60617", allZips: ["60617", "60633"], isEj: true, takeActionEn: "Contact the Southeast Environmental Task Force to report pollution and join monitoring efforts along the Calumet River corridor.", takeActionEs: "Contacta al Southeast Environmental Task Force para reportar contaminación y unirte a los esfuerzos de monitoreo en el corredor del río Calumet.", takeActionUrl: "https://www.facebook.com/SoutheastEnvironmentalTaskForce" },
  { slug: "east-side", name: "East Side", nameEs: "East Side", communityAreaNumber: 52, primaryZip: "60617", allZips: ["60617"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "west-pullman", name: "West Pullman", nameEs: "West Pullman", communityAreaNumber: 53, primaryZip: "60643", allZips: ["60628", "60643"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "riverdale", name: "Riverdale", nameEs: "Riverdale", communityAreaNumber: 54, primaryZip: "60827", allZips: ["60827"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "hegewisch", name: "Hegewisch", nameEs: "Hegewisch", communityAreaNumber: 55, primaryZip: "60633", allZips: ["60633"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  {
    slug: "garfield-ridge",
    name: "Garfield Ridge",
    nameEs: "Garfield Ridge",
    communityAreaNumber: 56,
    primaryZip: "60638",
    allZips: ["60629", "60638"],
    isEj: false,
    takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.",
    takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.",
    takeActionUrl: "tel:311",
  },
  { slug: "archer-heights", name: "Archer Heights", nameEs: "Archer Heights", communityAreaNumber: 57, primaryZip: "60632", allZips: ["60632"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "brighton-park", name: "Brighton Park", nameEs: "Brighton Park", communityAreaNumber: 58, primaryZip: "60632", allZips: ["60632"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  {
    slug: "mckinley-park",
    name: "McKinley Park",
    nameEs: "McKinley Park",
    communityAreaNumber: 59,
    primaryZip: "60609",
    allZips: ["60609"],
    isEj: true,
    takeActionEn: "Call 311 to report truck idling and connect with LVEJO to track permit applications near the Stevenson Expressway corridor.",
    takeActionEs: "Llama al 311 para reportar camiones en ralentí y conéctate con LVEJO para rastrear solicitudes de permisos cerca del corredor de la Autopista Stevenson.",
    takeActionUrl: "https://lvejo.org",
  },
  { slug: "bridgeport", name: "Bridgeport", nameEs: "Bridgeport", communityAreaNumber: 60, primaryZip: "60609", allZips: ["60609"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "new-city", name: "New City (Back of the Yards)", nameEs: "New City (Back of the Yards)", communityAreaNumber: 61, primaryZip: "60609", allZips: ["60609"], isEj: true, takeActionEn: "Contact the Back of the Yards Neighborhood Council and call 311 to report industrial odors or smoke in New City.", takeActionEs: "Contacta al Consejo Vecinal de Back of the Yards y llama al 311 para reportar olores industriales o humo en New City." },
  { slug: "west-elsdon", name: "West Elsdon", nameEs: "West Elsdon", communityAreaNumber: 62, primaryZip: "60629", allZips: ["60629"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "gage-park", name: "Gage Park", nameEs: "Gage Park", communityAreaNumber: 63, primaryZip: "60629", allZips: ["60629", "60632"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "clearing", name: "Clearing", nameEs: "Clearing", communityAreaNumber: 64, primaryZip: "60638", allZips: ["60638"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "west-lawn", name: "West Lawn", nameEs: "West Lawn", communityAreaNumber: 65, primaryZip: "60629", allZips: ["60629", "60632"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "chicago-lawn", name: "Chicago Lawn", nameEs: "Chicago Lawn", communityAreaNumber: 66, primaryZip: "60629", allZips: ["60629", "60632", "60652"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "west-englewood", name: "West Englewood", nameEs: "West Englewood", communityAreaNumber: 67, primaryZip: "60621", allZips: ["60621", "60636"], isEj: true, takeActionEn: "Call 311 to report industrial odors or visible pollution. Connect with Teamwork Englewood to address environmental health in West Englewood.", takeActionEs: "Llama al 311 para reportar olores industriales o contaminación visible. Conéctate con Teamwork Englewood para abordar la salud ambiental." },
  {
    slug: "englewood",
    name: "Englewood",
    nameEs: "Englewood",
    communityAreaNumber: 68,
    primaryZip: "60621",
    allZips: ["60621"],
    isEj: true,
    takeActionEn: "Call 311 to report industrial odors or truck activity. The city's EJ ordinance requires cumulative impact studies for new industrial permits in Englewood — hold them to it.",
    takeActionEs: "Llama al 311 para reportar olores industriales o actividad de camiones. La ordenanza EJ de la ciudad requiere estudios de impacto acumulativo para nuevos permisos industriales en Englewood.",
  },
  { slug: "greater-grand-crossing", name: "Greater Grand Crossing", nameEs: "Greater Grand Crossing", communityAreaNumber: 69, primaryZip: "60619", allZips: ["60619", "60621", "60637"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  {
    slug: "ashburn",
    name: "Ashburn",
    nameEs: "Ashburn",
    communityAreaNumber: 70,
    primaryZip: "60652",
    allZips: ["60652", "60655"],
    isEj: false,
    takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.",
    takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.",
    takeActionUrl: "tel:311",
  },
  { slug: "auburn-gresham", name: "Auburn Gresham", nameEs: "Auburn Gresham", communityAreaNumber: 71, primaryZip: "60620", allZips: ["60620", "60621"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "beverly", name: "Beverly", nameEs: "Beverly", communityAreaNumber: 72, primaryZip: "60643", allZips: ["60643"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "washington-heights", name: "Washington Heights", nameEs: "Washington Heights", communityAreaNumber: 73, primaryZip: "60620", allZips: ["60620", "60643"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "mount-greenwood", name: "Mount Greenwood", nameEs: "Mount Greenwood", communityAreaNumber: 74, primaryZip: "60655", allZips: ["60655"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  { slug: "morgan-park", name: "Morgan Park", nameEs: "Morgan Park", communityAreaNumber: 75, primaryZip: "60643", allZips: ["60643", "60655"], isEj: false, takeActionEn: "Call 311 to report idling trucks or visible pollution near your home.", takeActionEs: "Llama al 311 para reportar camiones en ralentí o contaminación visible.", takeActionUrl: "tel:311" },
  {
    slug: "humboldt-park",
    name: "Humboldt Park",
    nameEs: "Humboldt Park",
    communityAreaNumber: 23,
    primaryZip: "60647",
    allZips: ["60612", "60622", "60647"],
    isEj: true,
    takeActionEn: "Contact your alderperson about cumulative impact requirements under Chicago's new EJ ordinance. Attend zoning hearings for any new industrial applications.",
    takeActionEs: "Contacta a tu concejal sobre los requisitos de impacto acumulativo bajo la nueva ordenanza EJ de Chicago. Asiste a audiencias de zonificación para nuevas solicitudes industriales.",
  },
];

export const ejNeighborhoods = neighborhoods.filter((n) => n.isEj);

export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}

export function getNeighborhoodByZip(zip: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.primaryZip === zip || n.allZips.includes(zip));
}

export function getNeighborhoodByCommunityArea(num: number): Neighborhood | undefined {
  return neighborhoods.find((n) => n.communityAreaNumber === num);
}

export const ejSlugs = ejNeighborhoods.map((n) => n.slug);
