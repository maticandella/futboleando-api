import z from "zod";

export const MatchDetailsDTO = z.object({ id: z.string().regex(/^\d+$/) });

export type MatchDetails = z.infer<typeof MatchDetailsDTO>;