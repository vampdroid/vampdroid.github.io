export async function fetchYoutubeVideos() {
	try {
		const response = await fetch('https://portfolio-datalayer.vercel.app/api/youtube');
		const data = await response.json();
		return data.data || [];
	} catch (error) {
		console.error('Failed to fetch videos:', error);
		return [];
	}
}
