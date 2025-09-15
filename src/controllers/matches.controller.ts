import { Request, Response } from 'express';
import { getDateRangeUtcForTZ } from '../utils/datetime';
import { getMatchesByDate } from '../services/match.service';
import { MatchByDateDTO } from '../dtos/matches.dto';

export const getMatches = async(req: Request, res: Response) => {
    try {
        const paramsDTO = MatchByDateDTO.safeParse(req.query);
        if (!paramsDTO.success) {
          return res.status(400).json({
            message: "Error de validación",
            errors: paramsDTO.error,
          });
        }

        const { date, timeZone } = paramsDTO.data;
        const { startUtc, endUtc } = getDateRangeUtcForTZ(date, timeZone);
    
        const items = await getMatchesByDate(startUtc ?? '', endUtc  ?? '');
        res.json(items);
  } catch (e) {
    console.error('❌ Error en getGamesToday:', e);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};