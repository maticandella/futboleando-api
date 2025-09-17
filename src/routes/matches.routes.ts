import { Router } from 'express';
import { getMatch, getMatches } from '../controllers/matches.controller';

const router = Router();

router.get('/:id', getMatch);
router.get('/', getMatches);

export default router;