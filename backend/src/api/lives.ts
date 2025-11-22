// API Lives: REST/GraphQL pour le frontend

import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/lives - Liste des lives actifs
router.get('/', async (req: Request, res: Response) => {
  res.json({
    lives: []
  });
});

// GET /api/lives/:id - Détails d'un live
router.get('/:id', async (req: Request, res: Response) => {
  res.json({
    id: req.params.id,
    title: 'Example Live',
    creator: 'Creator Name',
    viewers: 0
  });
});

export default router;
