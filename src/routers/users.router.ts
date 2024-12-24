import { Router } from 'express';

const router = Router();

router.get('/me', (req, res) => {
  res.send({ message: 'This is a protected route' });
});

export default router;
