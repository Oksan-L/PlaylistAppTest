/**
 * Converts a string in the format "mm:ss" or "m:ss" to a total number of seconds.
 * For example: "03:45" -> 225
 */
export function convertTimeToSeconds(timeString) {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return (minutes * 60) + seconds;
}