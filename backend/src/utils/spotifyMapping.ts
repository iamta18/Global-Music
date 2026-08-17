export const mapMoodToSpotifyKeywords = (mood: string): string => {
  const moodLower = mood.toLowerCase();
  
  // Basic mapping of mood to keywords that can be appended to the search query
  const moodMap: Record<string, string> = {
    chill: 'chill relaxing lowfi calm',
    energetic: 'workout upbeat party dance',
    melancholy: 'sad emotional acoustic slow',
    focus: 'study focus instrumental ambient',
    happy: 'happy feel good upbeat pop',
  };

  return moodMap[moodLower] || moodLower;
};
