import { z } from "zod";
import { DateTime } from "luxon";
import { CANONICAL_TZ } from "../utils/datetime";

export const MatchByDateDTO = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato esperado yyyy-MM-dd")
    .refine((d) => DateTime.fromISO(d, { zone: "utc" }).isValid, "Fecha inválida"),
  timeZone: z.string().optional().default(CANONICAL_TZ)
    .refine(
      (tz) => DateTime.now().setZone(tz).isValid,
      "timeZone inválida (debe ser IANA, ej: America/Argentina/Cordoba)"
    ),
});

export type MatchByDate = z.infer<typeof MatchByDateDTO>;