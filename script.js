async function askQuestion() {
    const input = document.getElementById("questionInput");
    const chatBox = document.getElementById("chatBox");

    const question = input.value;
    if (!question) return;

    chatBox.innerHTML += `<div class="user"><b>You:</b> ${question}</div>`;
    input.value = "";

    const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
    });

    const data = await response.json();

    chatBox.innerHTML += `<div class="bot"><b>AI:</b> ${data.answer}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}