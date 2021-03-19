import express, { Request, Response } from 'express';
import nextApp from './../../nextApp';

const router = express.Router();
const handler = nextApp.getRequestHandler();

router.get("/*", (req: Request, res: Response) => {
  return handler(req, res);
});

export default router;