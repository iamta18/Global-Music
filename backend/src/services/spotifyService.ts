import axios from 'axios';
import { Track } from '../types';
import { mapMoodToSpotifyKeywords } from '../utils/spotifyMapping';

let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

const getSpotifyToken = async (): Promise<string> => {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials are not set in environment variables');
  }

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    cachedToken = response.data.access_token;
    // Expire 5 minutes early to be safe
    tokenExpiresAt = Date.now() + (response.data.expires_in - 300) * 1000;
    return cachedToken as string;
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    throw new Error('Failed to authenticate with Spotify API');
  }
};

export const fetchTracks = async (country: string, genre: string, mood: string): Promise<Track[]> => {
  const token = await getSpotifyToken();
  const moodKeywords = mapMoodToSpotifyKeywords(mood);
  
  // Construct a search query for Spotify: genre filter and mood keywords
  // e.g. genre:"pop" chill relaxing
  const q = `genre:"${genre}" ${moodKeywords}`;

  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        q: q,
        type: 'track',
        market: country.toUpperCase(),
        limit: 20
      }
    });

    const items = response.data.tracks.items;

    // Data Normalization
    const normalizedTracks: Track[] = items.map((item: any) => ({
      id: item.id,
      title: item.name,
      artist: item.artists.map((a: any) => a.name).join(', '),
      albumArt: item.album.images[0]?.url || '',
      previewUrl: item.preview_url,
      duration: item.duration_ms
    }));

    return normalizedTracks;
  } catch (error: any) {
    console.error('Error fetching tracks from Spotify:', error.response?.data || error.message);
    if (error.response?.status === 429) {
      throw new Error('Spotify API rate limit exceeded');
    }
    throw new Error('Failed to fetch tracks from Spotify API');
  }
};
