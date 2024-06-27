import { Router } from 'express';
import { registerUser, loginUser, sendLocation, checkAvailabilityU} from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-location', sendLocation);
router.get('/check-availability', checkAvailabilityU);

export default router;
