import { useState, useRef, useEffect } from 'react';
import './chat.scss';

const GREETING_MESSAGES = [
	'Konichiwa, I am Yash Kukreja. Ask me anything?',
	'Hello, I am Yash Kukreja. How can I assist you today?',
	"Hi there! I am Yash Kukreja's AI assistant, Ask me anything about Yash (it will remain between us okay?!)",
	"Greetings! I am Yash Kukreja's AI assistant. What would you like to know?",
];

const API_ENDPOINT = 'https://portfolio-datalayer.vercel.app/api/chat';

/**
 * Renders a single chat message bubble (AI or user).
 */
const ChatMessage = ({ sender, text }) => {
	const isUser = sender === 'user';
	const senderLabel = isUser ? 'You' : 'AI Assistant';
	const iconClass = isUser ? 'fa-user' : 'fa-robot';
	const variant = isUser ? 'user' : 'ai';

	return (
		<div className={`chat-message chat-message--${variant}`}>
			<div className={`chat-message__avatar chat-message__avatar--${variant}`}>
				<i className={`fa-solid ${iconClass} chat-message__avatar-icon`}></i>
			</div>
			<div className={`chat-message__body chat-message__body--${variant}`}>
				<span className="chat-message__sender">{senderLabel}</span>
				<div className={`chat-message__bubble chat-message__bubble--${variant}`}>
					<p>{text}</p>
				</div>
			</div>
		</div>
	);
};

/**
 * Renders the typing indicator with animated dots.
 */
const TypingIndicator = () => (
	<div className="chat-loading" style={{ display: 'flex' }}>
		<div className="chat-message__avatar chat-message__avatar--ai">
			<i className="fa-solid fa-robot chat-message__avatar-icon"></i>
		</div>
		<div className="chat-message__body chat-message__body--ai">
			<span className="chat-message__sender">AI Assistant</span>
			<div className="chat-loading__dots-container">
				<div className="typing-dot"></div>
				<div className="typing-dot"></div>
				<div className="typing-dot"></div>
			</div>
		</div>
	</div>
);

/**
 * Main Chat component.
 * Manages message state, handles user input, and communicates with the AI API.
 */
export default function Chat() {
	const randomGreeting = GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)];

	const [messages, setMessages] = useState([
		{ sender: 'ai', text: randomGreeting },
	]);
	const [isLoading, setIsLoading] = useState(false);

	const messagesContainerRef = useRef(null);
	const inputFieldRef = useRef(null);

	/**
	 * Auto-scroll to the bottom when messages or loading state change.
	 */
	useEffect(() => {
		const container = messagesContainerRef.current;
		if (container) {
			container.scrollTop = container.scrollHeight;
		}
	}, [messages, isLoading]);

	/**
	 * Sends the user's prompt to the AI API and appends both messages.
	 */
	const sendMessageToAi = async (userPrompt) => {
		setMessages((previousMessages) => [
			...previousMessages,
			{ sender: 'user', text: userPrompt },
		]);
		setIsLoading(true);

		try {
			const apiResponse = await fetch(API_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ prompt: userPrompt }),
			});

			const responseData = await apiResponse.json();
			setIsLoading(false);

			const hasValidResponse = responseData
				&& responseData.candidates
				&& responseData.candidates[0];

			if (hasValidResponse) {
				const aiResponseText = responseData.candidates[0].content.parts[0].text;

				setMessages((previousMessages) => [
					...previousMessages,
					{ sender: 'ai', text: aiResponseText },
				]);
			} else {
				setMessages((previousMessages) => [
					...previousMessages,
					{ sender: 'ai', text: "Sorry, I didn't get a valid response." },
				]);
			}
		} catch (networkError) {
			console.error(networkError);
			setIsLoading(false);

			setMessages((previousMessages) => [
				...previousMessages,
				{ sender: 'ai', text: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later." },
			]);
		}
	};

	/**
	 * Handles form submission — reads input, clears it, and sends the message.
	 */
	const handleSubmit = (submitEvent) => {
		submitEvent.preventDefault();

		const inputElement = inputFieldRef.current;
		if (!inputElement) return;

		const userMessageText = inputElement.innerText.trim();

		if (userMessageText) {
			inputElement.innerText = '';
			inputElement.blur();
			sendMessageToAi(userMessageText);
		}
	};

	/**
	 * Handles Enter key press (Shift+Enter for new lines).
	 */
	const handleKeyDown = (keyboardEvent) => {
		if (keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey) {
			keyboardEvent.preventDefault();
			handleSubmit(keyboardEvent);
		}
	};

	/**
	 * Clean up stray <br> when the input loses focus.
	 */
	const handleInputBlur = () => {
		const inputElement = inputFieldRef.current;
		if (inputElement && inputElement.innerHTML === '<br>') {
			inputElement.innerText = '';
		}
	};

	return (
		<div className="chat-wrapper">
			<div className="chat-header">
				<p className="chat-header__subtitle">
					Ask me anything about my work, skills, or projects.
				</p>
			</div>

			<div className="chat-messages" ref={messagesContainerRef}>
				{messages.map((message, messageIndex) => (
					<ChatMessage
						key={messageIndex}
						sender={message.sender}
						text={message.text}
					/>
				))}

				{isLoading && <TypingIndicator />}
			</div>

			<div className="chat-input-area">
				<div className="chat-input-area__gradient"></div>
				<div className="chat-input-wrapper">
					<div
						ref={inputFieldRef}
						contentEditable="plaintext-only"
						className="chat-input"
						placeholder="Type your message..."
						onKeyDown={handleKeyDown}
						onBlur={handleInputBlur}
					></div>
					<button
						className="chat-submit-button"
						onClick={handleSubmit}
					>
						<i className="fa-solid fa-paper-plane"></i>
					</button>
				</div>
			</div>
		</div>
	);
}
