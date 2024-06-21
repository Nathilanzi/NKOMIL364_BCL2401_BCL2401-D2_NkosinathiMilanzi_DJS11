const API_BASE_URL = 'https://podcast-api.netlify.app';

export const fetchShows = async () => {
  try {
    const response = await fetch(`https://podcast-api.netlify.app`);
    if (!response.ok) {
      throw new Error('Failed to fetch shows');
    }
    const data = await response.json();
    // data.sort((a, b) => a.title.localeCompare(b.title));
    return data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
};

export const fetchShowById = async (id) => {
  try {
    // const url = `${API_BASE_URL}/id/${showId}`;
    const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch show with ID ${response.status}`);
      }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching show with ID ${id}:`, error);
    throw error;
  }
};

export const fetchGenreById = async (id) => {
  try {
    const response = await fetch(`https://podcast-api.netlify.app'/genre/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch genre with ID ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching genre with ID ${id}:`, error);
    throw error;
  }
};
