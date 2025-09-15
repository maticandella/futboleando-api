import { DateTime } from "luxon";

export const CANONICAL_TZ = process.env.CANONICAL_TZ || 'America/Argentina/Buenos_Aires';

export function todayDateKey() {
  return DateTime.now().setZone(CANONICAL_TZ).toFormat('yyyy-LL-dd'); // ej 2025-09-13
}

export function getTodayRangeUtcForTZ(tz = CANONICAL_TZ) {
  const start = DateTime.now().setZone(tz).startOf("day");
  return getRangeUtc(start);
}

export function getDateRangeUtcForTZ(date: string | Date | DateTime, tz = CANONICAL_TZ) {
  // Normalizo la fecha al tipo DateTime
  const base =  date instanceof DateTime ? date : DateTime.fromJSDate(date instanceof Date ? date : new Date(date));

  const start = base.setZone(tz).startOf("day");
  return getRangeUtc(start);
}

function getRangeUtc(start: DateTime<true> | DateTime<false>) {
  const end = start.plus({ days: 1 });
  return {
    startUtc: start.toUTC().toFormat("yyyy-MM-dd"),
    endUtc: end.toUTC().toFormat("yyyy-MM-dd"),
    dateKey: start.toFormat("yyyy-MM-dd"),
  };
}