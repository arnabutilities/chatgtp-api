import { Router, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as crypto from "crypto";
import { PromptManager } from '../../services/chatgpt';

// New Router instance
const router = Router();

router.use(cors());
router.use(helmet());
router.use(morgan('dev'));

router.use((req: Request, res: Response, next) => {
    req.headers['APP-SERVER-REQUEST-UUID'] = crypto.randomUUID();
    console.log('[TIME]: ', new Date());
    console.log('[ROUTE]: REST');
    console.log('[UUID]:', req.headers['APP-SERVER-REQUEST-UUID']);
    next();
});

// Users routes
router.get('/', (req: Request, res: Response) => {
  res.send('rest route!'+req.headers['APP-SERVER-REQUEST-UUID']);
});

router.get('/prompt', (req: Request, res: Response) => {
  let pm = new PromptManager({
    aiAssistantRole: "senior software engineer",
    serviceName: "product development",
    instructions: ["rewrite the provided text in email format", "email should address the team"],
    userInput: [
      {
        inputDescription: "provided text",
        inputData: "I need to take from 20th june 2024 to 25th june 2024, reason: personal work"
      }
    ]
  });
  res.send(pm.generatedPrompt);
});

export default router;