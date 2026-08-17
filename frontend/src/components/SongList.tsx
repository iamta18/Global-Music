import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Disc3, Music2, Globe2 } from 'lucide-react';
import { mockSongs } from '../mockData';
import type { Song, Mood, Genre } from '../mockData';

interface SongListProps {
  country: string | null;
  mood: Mood | null;
  genre: Genre | null;
}

export const SongList: React.FC<SongListProps> = ({ country, mood, genre }) => {
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    if (!country && !mood && !genre) {
      setSongs([]);
      return;
    }

    setLoading(true);
    
    // Build the query string
    const params = new URLSearchParams();
    if (country) params.append('country', country);
    if (mood) params.append('mood', mood);
    if (genre) params.append('genre', genre);

    // Use environment variable for backend URL, fallback to localhost
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    fetch(`${backendUrl}/api/tracks?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        // Backend returns normalized tracks
        if (data.error) {
          console.error(data.error);
          setSongs([]);
        } else {
          // Add a default coverColor for UI consistency
          const tracks = (data.data || data).map((t: any, idx: number) => ({
            ...t,
            coverColor: ['bg-brand-500', 'bg-fuchsia-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500'][idx % 5]
          }));
          setSongs(tracks);
        }
      })
      .catch(err => {
        console.error('Failed to fetch songs:', err);
        setSongs([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [country, mood, genre]);

  if (!country && !mood && !genre) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center">
          <Globe2 className="w-8 h-8 text-brand-500" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-200">Discover Global Sounds</h3>
          <p className="text-sm text-slate-400 mt-1">Select a mood, genre, or country to start exploring.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Results</h2>
        <div className="flex flex-wrap gap-2">
          {country && <span className="text-xs font-medium bg-brand-500/20 text-brand-300 px-2 py-1 rounded-md">{country}</span>}
          {mood && <span className="text-xs font-medium bg-fuchsia-500/20 text-fuchsia-300 px-2 py-1 rounded-md">{mood}</span>}
          {genre && <span className="text-xs font-medium bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-md">{genre}</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-800/50 animate-pulse">
                  <div className="w-12 h-12 rounded-lg bg-slate-700/50" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-700/50 rounded w-3/4" />
                    <div className="h-3 bg-slate-700/50 rounded w-1/2" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-700/50" />
                </div>
              ))}
            </motion.div>
          ) : songs.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {songs.map((song, i) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center gap-4 p-3 rounded-xl bg-slate-800/20 hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-lg ${song.coverColor} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden`}>
                    {song.albumArt ? (
                      <img src={song.albumArt} alt={song.title} className="w-full h-full object-cover" />
                    ) : (
                      <Disc3 className="w-6 h-6 text-white/70" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-slate-200 font-medium truncate">{song.title}</h4>
                    <p className="text-sm text-slate-400 truncate">{song.artist}</p>
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700/50 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-500 hover:text-white">
                    <Play className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-48 text-center"
            >
              <div className="w-16 h-16 bg-slate-800/30 rounded-full flex items-center justify-center mb-4">
                <Music2 className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-300 font-medium">No matches found</p>
              <p className="text-sm text-slate-500 mt-1">Try selecting a different mood or genre.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
