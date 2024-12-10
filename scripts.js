document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const searchBtn = document.getElementById("search-btn");

    chatForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const userMessage = userInput.value.trim();
        if (userMessage) {
            appendMessage("user", userMessage);
            fetchAIResponse(userMessage);
            userInput.value = "";
        }
    });

    searchBtn.addEventListener("click", function () {
        appendMessage("ai", "Sökfunktion är inte implementerad för närvarande.");
    });

    function appendMessage(role, content) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${role}`;
        messageDiv.textContent = content;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function fetchAIResponse(message) {
        try {
            const response = await fetch('https://limiss-c3e25bf4b974.herokuapp.com/get_response', {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ user_input: message }),
            });
            const data = await response.json();
            appendMessage("ai", data.ai_response);
        } catch (error) {
            appendMessage("ai", "Ett fel uppstod. Försök igen senare.");
        }
    }
});

