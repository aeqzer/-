const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

function addMessage(text, cls) {
  const div = document.createElement("div");
  div.className = "message " + cls;
  div.textContent = text;
  chat.appendChild(div);

  chat.scrollTop = chat.scrollHeight; // авто-прокрутка
}

send.onclick = () => {
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  addMessage("...", "bot"); // индикатор загрузки

  chrome.runtime.sendMessage(
    { type: "ASK_AI", question },
    (response) => {
      chat.lastChild.remove(); // убрать "..."

      addMessage(response?.reply || "Ошибка", "bot");
    }
  );
};

input.addEventListener("keypress", e => {
  if (e.key === "Enter") send.click();
});