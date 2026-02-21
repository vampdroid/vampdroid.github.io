import React, { useEffect, useState } from 'react';
import './recent-blogs.scss';

function RecentBlogs() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchPosts() {
			try {
				// Base URL should ideally be an environment variable
				const baseUrl = 'https://portfolio-datalayer.vercel.app'; // Assuming deployment same as youtube api
				const response = await fetch(`${baseUrl}/api/blogs?first=3`);
				const data = await response.json();
				
				if (data.data) {
					setPosts(data.data);
				}
				setIsLoading(false);
			} catch (error) {
				console.error('Failed to fetch blogs:', error);
				setIsLoading(false);
			}
		}

		fetchPosts();
	}, []);

	if (isLoading) {
		return (
			<div className='recent-blogs'>
				<ul className='recent-blogs__list'>
					{[...Array(3)].map((_, i) => (
						<li className='recent-blogs__post' key={i}>
							<div className="post-info loading-placeholder">
								<div className="placeholder-date"></div>
								<div className="placeholder-title"></div>
								<div className="placeholder-excerpt"></div>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<div className='recent-blogs'>
			<ul className='recent-blogs__list'>
				{posts.map(post => (
					<li className='recent-blogs__post' key={post.id}>
						<a href={`/blog/${post.slug}`}>
							<div className="post-info">
								<span className="post-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
								<h4 className="post-title">{post.title}</h4>
								<div className="post-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
							</div>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export default RecentBlogs;

