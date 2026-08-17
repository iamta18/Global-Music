import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface WorldMapProps {
  selectedCountry: string | null;
  onCountrySelect: (country: string) => void;
}

const geoUrl = "/features.json";

export const WorldMap: React.FC<WorldMapProps> = ({ selectedCountry, onCountrySelect }) => {
  return (
    <motion.div 
      className="w-full h-full relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <ComposableMap
        projectionConfig={{ scale: 140 }}
        className="w-full h-full outline-none"
      >
        <ZoomableGroup center={[0, 0]} zoom={1} minZoom={1} maxZoom={4}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const isSelected = selectedCountry === countryName;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onCountrySelect(countryName)}
                    className={cn(
                      "outline-none cursor-pointer transition-colors duration-300",
                      isSelected 
                        ? "fill-brand-500 hover:fill-brand-400" 
                        : "fill-slate-700 hover:fill-slate-500"
                    )}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </motion.div>
  );
};
