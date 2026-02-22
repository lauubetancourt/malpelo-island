export function normalizeTimeOfDay(timeOfDay) {
  return ((timeOfDay % 24) + 24) % 24;
}

export function timeOfDayToMinutes(timeOfDay) {
  return normalizeTimeOfDay(timeOfDay) * 60;
}

export function formatSimulationHour(timeOfDay) {
  const totalMinutes =
    ((Math.round(timeOfDayToMinutes(timeOfDay)) % (24 * 60)) + 24 * 60) %
    (24 * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function getClockAngles(timeOfDay) {
  const totalMinutes = timeOfDayToMinutes(timeOfDay);
  const hourAngle = ((totalMinutes / 60) % 12) * 30;
  const minuteAngle = (totalMinutes % 60) * 6;

  return {
    hourAngle,
    minuteAngle,
  };
}
