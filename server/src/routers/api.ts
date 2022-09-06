import { Router } from 'express';
import swapi from './swapi/people.api';

// Init
const apiRouter = Router();

// Add api routes
apiRouter.use('/swapi', swapi);

// Export default
export default apiRouter;