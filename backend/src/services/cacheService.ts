import { LRUCache } from 'lru-cache';
import { Track } from '../types';

// Cache for 24 hours
const options = {
  max: 500, // Maximum number of items in cache
  ttl: 1000 * 60 * 60 * 24, // 24 hours
};

const cache = new LRUCache<string, Track[]>(options);

export const getCachedTracks = (key: string): Track[] | undefined => {
  return cache.get(key);
};

export const setCachedTracks = (key: string, tracks: Track[]): void => {
  cache.set(key, tracks);
};
