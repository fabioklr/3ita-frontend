import { writable } from 'svelte/store';

export const landing = writable(true);

interface Message {
    sender: 'ai' | 'human';
    content: string;
}

function chatHistory() {
    const { subscribe, update } = writable<Message[]>([]);

    return {
        subscribe,
        addMessage: (message: Message) => update(messages => [...messages, message]),
        appendToMessage: (content: string) => update(messages => {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage && lastMessage.sender === 'ai') {
                lastMessage.content += content;
            }
            return messages;
        },),
        clear: () => update(messages => [])
    };
}

export const messages = chatHistory();