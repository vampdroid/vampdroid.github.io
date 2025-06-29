import './chat.scss';
import { useEffect } from 'react';

const ChatBox = ( { askAI } ) => {

	const handleInput = (event) => {
		if(event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSubmit(event);
		}
	}

	const handleInputBlur = () => {
		const inputElement = document.querySelector('.chat-box__input');

		if (inputElement.innerHTML === '<br>') {
			inputElement.innerText = '';
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const inputElement = document.querySelector('.chat-box__input');
		const userMessage = inputElement.innerText.trim();

		if ( userMessage ) {
			inputElement.innerText = '';
			inputElement.blur();
			askAI(userMessage);
		}
	}

	return (
		<div className="chat-box">
			<div contentEditable="plaintext-only" className="chat-box__input" name="user-message" placeholder="Ask me bout' myself!" onKeyDown={(e)=>handleInput(e)} onBlur={()=>handleInputBlur()}></div>
			<button  className="chat-box__submit-button" onClick={(e) => handleSubmit(e)}>
				<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14.4376 15.3703L12.3042 19.5292C11.9326 20.2537 10.8971 20.254 10.525 19.5297L4.24059 7.2971C3.81571 6.47007 4.65077 5.56156 5.51061 5.91537L18.5216 11.2692C19.2984 11.5889 19.3588 12.6658 18.6227 13.0704L14.4376 15.3703ZM14.4376 15.3703L5.09594 6.90886" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
				</svg>
			</button>
		</div>
	);
}

export default ChatBox;