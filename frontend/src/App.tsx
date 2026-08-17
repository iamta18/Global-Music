import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorldMap } from './components/WorldMap';
import { Filters } from './components/Filters';
import { SongList } from './components/SongList';
import type { Mood, Genre } from './mockData';
import { Music, X } from 'lucide-react';

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [showMobilePanel, setShowMobilePanel] = useState(false);

  const hasSelection = selectedCountry !== null || selectedMood !== null || selectedGenre !== null;

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(prev => prev === country ? null : country);
    setShowMobilePanel(true);
  };

  const handleMoodSelect = (mood: Mood | null) => {
    setSelectedMood(mood);
    setShowMobilePanel(true);
  };

  const handleGenreSelect = (genre: Genre | null) => {
    setSelectedGenre(genre);
    setShowMobilePanel(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row overflow-hidden text-slate-200">
      
      {/* Main Map Area */}
      <div className="flex-1 relative flex flex-col h-[100dvh] lg:h-screen transition-all duration-500">
        
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 p-6 z-20 pointer-events-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Music className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              GlobalGroove
            </h1>
          </div>
        </header>

        {/* Filters Overlay */}
        <div className="absolute bottom-6 left-6 right-6 lg:bottom-auto lg:top-6 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 z-20 lg:w-max mx-auto pointer-events-auto">
          <Filters
            selectedMood={selectedMood}
            onMoodSelect={handleMoodSelect}
            selectedGenre={selectedGenre}
            onGenreSelect={handleGenreSelect}
          />
        </div>

        {/* Map Container */}
        <div className="flex-1 w-full h-full pb-32 lg:pb-0 z-10 pt-20 lg:pt-32 px-4 flex items-center justify-center">
          <div className="w-full max-w-5xl aspect-video max-h-[70vh]">
            <WorldMap
              selectedCountry={selectedCountry}
              onCountrySelect={handleCountrySelect}
            />
          </div>
        </div>
      </div>

      {/* Desktop Side Panel */}
      <AnimatePresence>
        {hasSelection && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
            className="hidden lg:block bg-slate-900/80 backdrop-blur-xl border-l border-slate-800 shadow-2xl relative z-30 shrink-0"
          >
            <SongList
              country={selectedCountry}
              mood={selectedMood}
              genre={selectedGenre}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {showMobilePanel && hasSelection && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="lg:hidden fixed inset-x-0 bottom-0 h-[60vh] bg-slate-900 border-t border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-40 rounded-t-3xl overflow-hidden flex flex-col"
          >
            <div className="flex justify-center pt-3 pb-2 w-full absolute top-0 z-10 bg-gradient-to-b from-slate-900 to-slate-900/0">
              <div className="w-12 h-1.5 bg-slate-700 rounded-full" />
            </div>
            
            <button 
              onClick={() => setShowMobilePanel(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-slate-800 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex-1 pt-6 overflow-hidden">
              <SongList
                country={selectedCountry}
                mood={selectedMood}
                genre={selectedGenre}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
