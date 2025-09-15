import { Router } from 'express';
import { getMatches } from '../controllers/matches.controller';

const router = Router();

// router.get('/:id', getMatchDetails);
router.get('/', getMatches);

export default router;