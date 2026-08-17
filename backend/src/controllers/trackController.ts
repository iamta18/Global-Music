import { Request, Response } from 'express';
import { fetchTracks } from '../services/spotifyService';
import { getCachedTracks, setCachedTracks } from '../services/cacheService';

export const getTracks = async (req: Request, res: Response) => {
  try {
    const { country, genre, mood } = req.query;

    if (!country || !genre || !mood) {
      return res.status(400).json({ error: 'Missing required query parameters: country, genre, mood' });
    }

    const c = country.toString().toUpperCase();
    const g = genre.toString().toLowerCase();
    const m = mood.toString().toLowerCase();

    const cacheKey = `${c}-${g}-${m}`;
    const cachedData = getCachedTracks(cacheKey);

    if (cachedData) {
      return res.status(200).json({ source: 'cache', data: cachedData });
    }

    const tracks = await fetchTracks(c, g, m);

    if (tracks.length > 0) {
      setCachedTracks(cacheKey, tracks);
    }

    return res.status(200).json({ source: 'spotify', data: tracks });
  } catch (error: any) {
    console.error('Error in getTracks controller:', error);
    if (error.message.includes('rate limit')) {
      return res.status(429).json({ error: 'Rate limit exceeded, please try again later' });
    }
    return res.status(500).json({ error: 'Failed to fetch tracks' });
  }
};
