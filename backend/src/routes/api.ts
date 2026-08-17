import { Router } from 'express';
import { getCountries } from '../controllers/countryController';
import { getTracks } from '../controllers/trackController';

const router = Router();

router.get('/countries', getCountries);
router.get('/tracks', getTracks);

export default router;
