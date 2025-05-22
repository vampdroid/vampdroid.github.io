	import './chat.scss';

	const ChatBox = () => {
		return (
			<div className="chat-box">
				<div contenteditable="true" className="chat-box__input" name="user-message" placeholder="Kon'nichiwa, Ask me anything!"></div>
				<button  className="chat-box__submit-button" type="submit">Send</button>
			</div>
		);
	}

	export default ChatBox;