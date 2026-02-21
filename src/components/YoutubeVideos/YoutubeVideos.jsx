import { useEffect, useState } from 'react';
import './youtube-videos.scss';

function YoutubeVideos() {
	const [isLoading, setIsLoading] = useState(true);
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		async function fetchVideos() {
			try {
				const response = await fetch('https://portfolio-datalayer.vercel.app/api/youtube');
				if (!response.ok) {
					console.log(response);
				}
				const data = await response.json();
				setVideos(data.data);
				setIsLoading(false);
			} catch (error) {
				console.error('Failed to fetch videos:', error);
			}
		}

		fetchVideos();
	}, []);

	return (
	<div className='youtube-videos'>
		<ul className='youtube-videos__list'>
			{ !isLoading ? videos.map(video => (
				<li className='youtube-videos__video' key={video.id}>
					<a href={`https://youtube.com/watch?v=${video.id}`}>
						<img key={video.id} src={video.thumbnail} alt={video.title} />
						<p>{video.title}</p>
					</a>
				</li>
			)) : (
				[...Array(4)].map((_, index) => (
					<li className='youtube-videos__video' key={index}>
						<div className='youtube-videos__placeholder'></div>
					</li>
				))
			)}
		</ul>
	</div>
	)
}

export default YoutubeVideos;