export type Mood = 'Chill' | 'Energetic' | 'Melancholy' | 'Focus';
export type Genre = 'Pop' | 'Jazz' | 'Electronic' | 'Traditional' | 'Rock';

export interface Song {
  id: string;
  title: string;
  artist: string;
  countryName: string;
  mood: Mood;
  genre: Genre;
  coverColor: string;
}

export const mockSongs: Song[] = [
  { id: '1', title: 'Midnight Sakura', artist: 'Ryo & The City', countryName: 'Japan', mood: 'Chill', genre: 'Jazz', coverColor: 'bg-indigo-500' },
  { id: '2', title: 'Neon Shibuya', artist: 'Hatsune Vibes', countryName: 'Japan', mood: 'Energetic', genre: 'Electronic', coverColor: 'bg-pink-500' },
  { id: '3', title: 'Fuji Morning', artist: 'Kenji Strings', countryName: 'Japan', mood: 'Focus', genre: 'Traditional', coverColor: 'bg-emerald-500' },
  
  { id: '4', title: 'Parisian Rain', artist: 'Claire de Lune', countryName: 'France', mood: 'Melancholy', genre: 'Jazz', coverColor: 'bg-slate-500' },
  { id: '5', title: 'Louvre Nights', artist: 'DJ Pierre', countryName: 'France', mood: 'Energetic', genre: 'Electronic', coverColor: 'bg-fuchsia-500' },
  { id: '6', title: 'Seine Sunrise', artist: 'Marie & Co', countryName: 'France', mood: 'Chill', genre: 'Pop', coverColor: 'bg-amber-400' },
  
  { id: '7', title: 'Brooklyn Beats', artist: 'NYC Collective', countryName: 'United States of America', mood: 'Energetic', genre: 'Pop', coverColor: 'bg-blue-500' },
  { id: '8', title: 'Coffee Shop Study', artist: 'LoFi Dreamer', countryName: 'United States of America', mood: 'Focus', genre: 'Electronic', coverColor: 'bg-orange-400' },
  { id: '9', title: 'Desert Highway', artist: 'The Mavericks', countryName: 'United States of America', mood: 'Chill', genre: 'Rock', coverColor: 'bg-red-500' },
  
  { id: '10', title: 'Samba Sol', artist: 'Rio Rhythms', countryName: 'Brazil', mood: 'Energetic', genre: 'Traditional', coverColor: 'bg-yellow-400' },
  { id: '11', title: 'Amazon Nights', artist: 'Bossa Nova Trio', countryName: 'Brazil', mood: 'Chill', genre: 'Jazz', coverColor: 'bg-green-500' },
  
  { id: '12', title: 'London Fog', artist: 'The Thames', countryName: 'United Kingdom', mood: 'Melancholy', genre: 'Rock', coverColor: 'bg-gray-500' },
  { id: '13', title: 'Soho Lights', artist: 'Brit Pop Boyz', countryName: 'United Kingdom', mood: 'Energetic', genre: 'Pop', coverColor: 'bg-purple-500' },
  
  { id: '14', title: 'Sydney Shores', artist: 'Oceanic', countryName: 'Australia', mood: 'Chill', genre: 'Electronic', coverColor: 'bg-cyan-400' },
  { id: '15', title: 'Outback Drive', artist: 'Kangaroo Rock', countryName: 'Australia', mood: 'Energetic', genre: 'Rock', coverColor: 'bg-orange-500' },

  { id: '16', title: 'Berlin Underground', artist: 'Techno Kraft', countryName: 'Germany', mood: 'Energetic', genre: 'Electronic', coverColor: 'bg-zinc-800' },
  { id: '17', title: 'Bavarian Breeze', artist: 'München Strings', countryName: 'Germany', mood: 'Focus', genre: 'Traditional', coverColor: 'bg-sky-500' },
];

export const moods: Mood[] = ['Chill', 'Energetic', 'Melancholy', 'Focus'];
export const genres: Genre[] = ['Pop', 'Jazz', 'Electronic', 'Traditional', 'Rock'];
