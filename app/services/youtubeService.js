import {
  getYouTubeSearchQuery,
  constructYouTubeSearchURL,
  getRecommendedChannels,
} from '../data/skillTutorials';
import ENV from '../config/env';

// Get API key from config
const YOUTUBE_API_KEY = ENV.YOUTUBE_API_KEY;

if (!YOUTUBE_API_KEY) {
  console.error('YouTube API key is not set in config');
}

export const fetchTutorialsForSkill = async (skill, level = 'beginner') => {
  try {
    // Get the search query for the skill and level
    const searchQuery = getYouTubeSearchQuery(skill, level);
    if (!searchQuery) {
      console.error('No search query generated for:', skill, level);
      return [];
    }

    console.log('Searching for skill:', skill, 'level:', level);
    console.log('Search query:', searchQuery);
    
    // Construct the search URL
    const searchURL = constructYouTubeSearchURL(searchQuery);
    if (!searchURL) {
      console.error('Failed to construct search URL');
      return [];
    }

    const fullURL = `${searchURL}&key=${YOUTUBE_API_KEY}`;
    console.log('Full URL:', fullURL);
    
    // Make the API request
    const response = await fetch(fullURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      console.error('YouTube API Error:', data.error);
      return [];
    }

    if (!data.items || data.items.length === 0) {
      console.log('No videos found for:', skill, level);
      return [];
    }

    console.log(`Found ${data.items.length} videos for ${skill}`);
    
    // Process and return the results
    const processedVideos = data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
    }));

    // Log the first video to verify the results
    if (processedVideos.length > 0) {
      console.log('First video result:', processedVideos[0]);
    }

    return processedVideos;
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    return [];
  }
};

export const fetchRecommendedChannelVideos = async (skill) => {
  try {
    const channels = getRecommendedChannels(skill);
    const channelVideos = [];

    for (const channelId of channels) {
      const searchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=5&key=${YOUTUBE_API_KEY}`;
      
      const response = await fetch(searchURL);
      const data = await response.json();
      
      if (!data.error && data.items) {
        channelVideos.push(...data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
        })));
      }
    }

    return channelVideos;
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    return [];
  }
};

// Cache the results to avoid excessive API calls
const tutorialCache = new Map();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const getCachedTutorials = async (skill, level = 'beginner') => {
  const cacheKey = `${skill}-${level}`;
  const cachedData = tutorialCache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    console.log('Returning cached tutorials for:', skill, level);
    return cachedData.data;
  }

  console.log('Fetching fresh tutorials for:', skill, level);
  const tutorials = await fetchTutorialsForSkill(skill, level);
  
  if (tutorials.length > 0) {
    tutorialCache.set(cacheKey, {
      data: tutorials,
      timestamp: Date.now(),
    });
  }

  return tutorials;
};

// Add default export
const youtubeService = {
  fetchTutorialsForSkill,
  fetchRecommendedChannelVideos,
  getCachedTutorials
};

export default youtubeService; 