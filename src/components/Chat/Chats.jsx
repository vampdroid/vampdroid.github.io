import './chat.scss';
import ChatBox from './ChatBox';
import { useState } from 'react';

const Chats = () => {
	const defaultFirstAIMessages = [
		'Konichiwa, I am Yash Kukreja. Ask me anything?',
		'Hello, I am Yash Kukreja. How can I assist you today?',
		'Hi there! I am Yash Kukreja\'s AI assistant, Ask me anything about Yash.(it will remain between us okay?!)',
		'Greetings! I am Yash Kukreja\'s AI assistant. What would you like to know?',
	];
	
	const [messages, setMessages] = useState(() => {
	  const randomMessage = defaultFirstAIMessages[Math.floor(Math.random() * defaultFirstAIMessages.length)];
	  return [{ by: 'ai', text: randomMessage }];
	});

	async function getGeminiResponse(prompt) {
		setMessages((prevMessages) => [
			...prevMessages,
			{ by: 'user', text: prompt },
		]);

		const res = await fetch('https://gemini-serverless.vercel.app/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ prompt }),
		});

		const data = await res.json();
		console.log(data);
		setMessages((prevMessages) => [
			...prevMessages,
			{ by: 'ai', text: data.candidates[0].content.parts[0].text },
		]);
	}

	return (
		<>
			<div className="chats">
				{messages.map((message, index) => (
					<p key={index} className={`chats__chat chats__chat--${message.by}`}>
						{message.text}
					</p>
				))}
			</div>
			<ChatBox askAI={ getGeminiResponse }/>
		</>
	);
}

export default Chats;

/*
 Todos:
 1. Limit the characters as its just a portfolio info.
 2. Make good changes to system instructions.
 3. Handle per minute limit as well as per day limits!
 {
    "error": {
        "code": 429,
        "message": "You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits.",
        "status": "RESOURCE_EXHAUSTED",
        "details": [
            {
                "@type": "type.googleapis.com/google.rpc.QuotaFailure",
                "violations": [
                    {
                        "quotaMetric": "generativelanguage.googleapis.com/generate_content_free_tier_requests",
                        "quotaId": "GenerateRequestsPerMinutePerProjectPerModel-FreeTier",
                        "quotaDimensions": {
                            "location": "global",
                            "model": "gemini-2.0-flash"
                        },
                        "quotaValue": "15"
                    }
                ]
            },
            {
                "@type": "type.googleapis.com/google.rpc.Help",
                "links": [
                    {
                        "description": "Learn more about Gemini API quotas",
                        "url": "https://ai.google.dev/gemini-api/docs/rate-limits"
                    }
                ]
            },
            {
                "@type": "type.googleapis.com/google.rpc.RetryInfo",
                "retryDelay": "30s"
            }
        ]
    }
}
*/