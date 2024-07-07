const ChatItem = () => {
    return (
        <div className="chat chat-start">
            <div className="chat-header">
                Username
                <time className="text-xs opacity-50">12:00</time>
            </div>
            <div className="chat-bubble">The message content</div>
            {/* <div className="chat-footer opacity-50">Seen</div> */}
        </div>
    );
};

export default ChatItem;
