import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { moods, genres } from '../mockData';
import type { Mood, Genre } from '../mockData';

interface FiltersProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood | null) => void;
  selectedGenre: Genre | null;
  onGenreSelect: (genre: Genre | null) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  selectedMood,
  onMoodSelect,
  selectedGenre,
  onGenreSelect,
}) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl">
      <div>
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Mood</h3>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => onMoodSelect(selectedMood === mood ? null : mood)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                selectedMood === mood
                  ? "text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              )}
            >
              {selectedMood === mood && (
                <motion.div
                  layoutId="mood-pill"
                  className="absolute inset-0 bg-brand-600 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{mood}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Genre</h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreSelect(selectedGenre === genre ? null : genre)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                selectedGenre === genre
                  ? "text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              )}
            >
              {selectedGenre === genre && (
                <motion.div
                  layoutId="genre-pill"
                  className="absolute inset-0 bg-brand-600 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{genre}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
