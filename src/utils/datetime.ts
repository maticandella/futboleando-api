import { DateTime } from "luxon";

export const CANONICAL_TZ = process.env.CANONICAL_TZ || 'America/Argentina/Buenos_Aires';

export function todayDateKey() {
  return DateTime.now().setZone(CANONICAL_TZ).toFormat('yyyy-LL-dd'); // ej 2025-09-13
}

export function getTodayRangeUtcForTZ(tz = CANONICAL_TZ) {
  const start = DateTime.now().setZone(tz).startOf("day");
  const end = start.plus({ days: 1 });
  return {
    startUtc: start.toUTC().toISO(),
    endUtc: end.toUTC().toISO(),
    dateKey: start.toFormat("yyyy-LL-dd"),
  };
}