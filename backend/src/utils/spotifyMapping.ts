export const mapMoodToSpotifyKeywords = (mood: string): string => {
  const moodLower = mood.toLowerCase();
  
  // Basic mapping of mood to keywords that can be appended to the search query
  const moodMap: Record<string, string> = {
    chill: 'chill',
    energetic: 'workout',
    melancholy: 'sad',
    focus: 'focus',
    happy: 'happy',
  };

  return moodMap[moodLower] || moodLower;
};
