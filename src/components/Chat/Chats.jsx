import React from 'react';
import './chat.scss';
import ChatBox from './ChatBox';
import { useState, useRef, useEffect } from 'react';

const Chats = () => {
	const defaultFirstAIMessages = [
		'Konichiwa, I am Yash Kukreja. Ask me anything?',
		'Hello, I am Yash Kukreja. How can I assist you today?',
		'Hi there! I am Yash Kukreja\'s AI assistant, Ask me anything about Yash (it will remain between us okay?!)',
		'Greetings! I am Yash Kukreja\'s AI assistant. What would you like to know?',
	];

	const [messages, setMessages] = useState(() => {
	  const randomMessage = defaultFirstAIMessages[Math.floor(Math.random() * defaultFirstAIMessages.length)];
	  return [{ by: 'ai', text: randomMessage }];
	});

	const [isLoading, setIsLoading] = useState(false);
	const chatContainerRef = useRef(null);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [messages, isLoading]);

	async function getGeminiResponse(prompt) {
		setMessages((prevMessages) => [
			...prevMessages,
			{ by: 'user', text: prompt },
		]);
		
		setIsLoading(true);

		try {
			const res = await fetch('https://portfolio-datalayer.vercel.app/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt }),
			});

			const data = await res.json();
			setMessages((prevMessages) => [
				...prevMessages,
				{ by: 'ai', text: data.candidates[0].content.parts[0].text },
			]);
		} catch (error) {
			console.error(error);
			setMessages((prevMessages) => [
				...prevMessages,
				{ by: 'ai', text: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later." },
			]);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="flex-1 w-full max-w-3xl mx-auto flex flex-col relative z-0" style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', maxWidth: '48rem', margin: '0 auto', position: 'relative', height: '100%' }}>
			
			<div className="text-center mb-8" style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>CHAT WITH MY AI BOT</h1>
				<p className="text-sm" style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>Ask me anything about my work, skills, or projects.</p>
			</div>

			<div 
				ref={chatContainerRef}
				className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6 scroll-smooth chat-container" 
				style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '0.5rem', marginBottom: '1.5rem', paddingBottom: '1rem' }}
			>
				{messages.map((message, index) => (
					<div key={index} className={`flex items-start gap-4 max-w-[90%] ${message.by === 'user' ? 'ml-auto flex-row-reverse' : ''}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', maxWidth: '90%', marginLeft: message.by === 'user' ? 'auto' : '0', flexDirection: message.by === 'user' ? 'row-reverse' : 'row' }}>
						
						{message.by === 'ai' ? (
							<div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'linear-gradient(to bottom right, #6366f1, #9333ea)', boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.2)' }}>
								<i className="fa-solid fa-robot text-white text-sm" style={{ color: 'white', fontSize: '0.875rem' }}></i>
							</div>
						) : (
							<div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderStyle: 'solid', borderWidth: '1px' }}>
								<i className="fa-solid fa-user text-sm" style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}></i>
							</div>
						)}

						<div className={`flex flex-col gap-1 ${message.by === 'user' ? 'items-end' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: message.by === 'user' ? 'flex-end' : 'flex-start' }}>
							<span className="text-xs font-semibold" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', margin: message.by === 'user' ? '0 0.25rem 0 0' : '0 0 0 0.25rem' }}>
								{message.by === 'user' ? 'You' : 'AI Assistant'}
							</span>
							
							<div 
								className={`${message.by === 'ai' ? 'glass-bubble rounded-tl-none' : 'user-bubble rounded-tr-none text-white'} rounded-2xl px-6 py-4 leading-relaxed`}
								style={
									message.by === 'user' 
									? { borderRadius: '1rem', borderTopRightRadius: 0, padding: '1rem 1.5rem', lineHeight: 1.625, color: '#ffffff' } 
									: { borderRadius: '1rem', borderTopLeftRadius: 0, padding: '1rem 1.5rem', lineHeight: 1.625, color: 'var(--color-text)' }
								}
							>
								<p>{message.text}</p>
							</div>
						</div>
					</div>
				))}

				{isLoading && (
					<div className="flex items-start gap-4 max-w-[90%]" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', maxWidth: '90%' }}>
						<div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'linear-gradient(to bottom right, #6366f1, #9333ea)', boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.2)' }}>
							<i className="fa-solid fa-robot text-white text-sm" style={{ color: 'white', fontSize: '0.875rem' }}></i>
						</div>
						<div className="flex flex-col gap-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
							<span className="text-xs font-semibold" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', marginLeft: '0.25rem' }}>AI Assistant</span>
							<div className="glass-bubble rounded-2xl rounded-tl-none px-6 py-4 shadow-sm w-24 flex items-center justify-center gap-1.5" style={{ borderRadius: '1rem', borderTopLeftRadius: 0, padding: '1rem 1.5rem', width: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
								<div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'var(--color-muted)', borderRadius: '9999px' }}></div>
								<div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'var(--color-muted)', borderRadius: '9999px' }}></div>
								<div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'var(--color-muted)', borderRadius: '9999px' }}></div>
							</div>
						</div>
					</div>
				)}
			</div>
			<ChatBox askAI={ getGeminiResponse }/>
		</div>
	);
}

export default Chats;