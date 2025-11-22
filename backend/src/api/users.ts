// API Users: Gestion des utilisateurs et profils

import { Router } from 'express';

const router = Router();

// GET /api/users/:address - Profil utilisateur
router.get('/:address', async (req, res) => {
  res.json({
    address: req.params.address,
    fanPasses: [],
    badges: []
  });
});

// GET /api/users/:address/creator - Profil créateur
router.get('/:address/creator', async (req, res) => {
  res.json({
    address: req.params.address,
    profile: null
  });
});

export default router;
