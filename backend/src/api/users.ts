// API Users: Gestion des utilisateurs et profils

import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/users/:address - Profil utilisateur
router.get('/:address', async (req: Request, res: Response) => {
  res.json({
    address: req.params.address,
    fanPasses: [],
    badges: []
  });
});

// GET /api/users/:address/creator - Profil créateur
router.get('/:address/creator', async (req: Request, res: Response) => {
  res.json({
    address: req.params.address,
    profile: null
  });
});

export default router;
