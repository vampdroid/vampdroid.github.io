import React from 'react';
import './chat.scss';
import { useEffect, useRef } from 'react';

const ChatBox = ( { askAI } ) => {
	const inputRef = useRef(null);

	const handleInput = (event) => {
		if(event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSubmit(event);
		}
	}

	const handleInputBlur = () => {
		if (inputRef.current && inputRef.current.innerHTML === '<br>') {
			inputRef.current.innerText = '';
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const userMessage = inputRef.current.innerText.trim();

		if ( userMessage ) {
			inputRef.current.innerText = '';
			inputRef.current.blur();
			askAI(userMessage);
		}
	}

	return (
		<div className="relative w-full mt-auto">
			<div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark to-transparent -top-12 z-0 pointer-events-none h-12" style={{backgroundImage: 'linear-gradient(to top, var(--color-bg), var(--color-bg), transparent)'}}></div>
			<div className="chat-input-wrapper rounded-2xl p-2 flex items-center shadow-lg relative z-10 transition-colors" style={{ display: 'flex', padding: '0.5rem', borderRadius: '1rem', alignItems: 'center'}}>
				<div 
					ref={inputRef}
					contentEditable="plaintext-only" 
					className="chat-input" 
					name="user-message" 
					placeholder="Type your message..." 
					onKeyDown={(e)=>handleInput(e)} 
					onBlur={()=>handleInputBlur()}
					style={{ flex: 1, padding: '0.75rem 1rem', outline: 'none', backgroundColor: 'transparent', minHeight: '1.5rem', maxHeight: '150px', overflowY: 'auto', fontSize: '1rem' }}
				></div>
				<button 
					className="bg-white hover:bg-gray-200 transition-colors rounded-xl p-3 flex items-center justify-center cursor-pointer" 
					onClick={(e) => handleSubmit(e)}
					style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', display: 'flex' }}
				>
					<i className="fa-solid fa-paper-plane text-sm"></i>
				</button>
			</div>
		</div>
	);
}

export default ChatBox;