import { Request, Response } from 'express';
import { getDateRangeUtcForTZ } from '../utils/datetime';
import { getMatchDetails, getMatchesByDate } from '../services/match.service';
import { MatchByDateDTO } from '../dtos/matches.dto';
import { MatchDetailsDTO } from '../dtos/match-details.dto';

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
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getMatch = async(req: Request, res: Response) => {
    try {
        const paramsDTO = MatchDetailsDTO.safeParse(req.params);
        if (!paramsDTO.success) {
          return res.status(400).json({
            message: "Error de validación",
            errors: paramsDTO.error,
          });
        }

        const { id } = paramsDTO.data;
        const match = await getMatchDetails(id);
        res.json(match);
  } catch (e) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};