import { Router, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as crypto from "crypto";

// New Router instance
const router = Router();

router.use(cors());
router.use(helmet());
router.use(morgan('dev'));

router.use((req: Request, res: Response, next) => {
    req.headers['APP-SERVER-REQUEST-UUID'] = crypto.randomUUID();
    console.log('[Time]: ', Date.now());
    console.log('[ROUTE]: GRAPHQL');
    console.log('[UUID]:', req.headers['APP-SERVER-REQUEST-UUID']);
    next();
});

// Users routes
router.get('/', (req: Request, res: Response) => {
  res.send('rest route!'+req.headers['APP-SERVER-REQUEST-UUID']);
});

router.get('/:id', (req: Request, res: Response) => {
  res.send(`User ${req.params.id} route!`);
});

export default router;