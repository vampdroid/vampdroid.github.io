import React from 'react';
import './recent-blogs.scss';

const SAMPLE_POSTS = [
	{
		id: 1,
		title: "Mastering React Server Components",
		date: "Oct 24, 2023",
		excerpt: "Deep dive into RSCs, how they work, and why you should care about them in 2024.",
		link: "#"
	},
	{
		id: 2,
		title: "The Future of Web Development with Astro",
		date: "Sep 15, 2023",
		excerpt: "Why Astro is becoming my favorite framework for content-heavy websites.",
		link: "#"
	},
	{
		id: 3,
		title: "Building Scalable CSS with BEM and SCSS",
		date: "Aug 30, 2023",
		excerpt: "How to maintain large stylesheets without losing your mind.",
		link: "#"
	}
];

function RecentBlogs() {
	return (
		<div className='recent-blogs'>
			<ul className='recent-blogs__list'>
				{SAMPLE_POSTS.map(post => (
					<li className='recent-blogs__post' key={post.id}>
						<a href={post.link}>
							<div className="post-info">
								<span className="post-date">{post.date}</span>
								<h4 className="post-title">{post.title}</h4>
								<p className="post-excerpt">{post.excerpt}</p>
							</div>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export default RecentBlogs;
