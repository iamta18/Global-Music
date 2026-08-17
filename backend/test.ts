import { fetchTracks } from './src/services/spotifyService';
import dotenv from 'dotenv';

dotenv.config();

fetchTracks('FR', 'pop', 'chill')
  .then(res => console.log('SUCCESS:', res))
  .catch(err => console.error('ERROR:', err));
