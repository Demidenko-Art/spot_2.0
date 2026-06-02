const CLIENT_ID = '532ce00b';

export const tracks = async () => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=20&hasimage=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    return data.results.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artist_name,
      cover: track.image,
      album: track.album_name,
      src: track.audio
    }));

  } catch (error) {
    console.error('Ошибка загрузки:', error);
    return [];
  }
};