export async function fetchRecentBlogs(limit = 3) {
	try {
		const baseUrl = 'https://portfolio-datalayer.vercel.app';
		const response = await fetch(`${baseUrl}/api/blogs?first=${limit}`);
		const data = await response.json();
		return data.data || [];
	} catch (error) {
		console.error('Failed to fetch blogs:', error);
		return [];
	}
}
