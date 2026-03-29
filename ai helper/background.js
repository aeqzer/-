const API_KEY = "sk-_KsUuREBFBV3wW8R4ZFRew";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "ASK_AI") {
    fetch("https://llm.alem.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "alemllm",
        messages: [
          { role: "system", content: "Ты помощник для учебы. Отвечай понятно и на русском." },
          { role: "user", content: request.question }
        ]
      })
    })
    .then(res => res.json())
    .then(data => {
      sendResponse({ reply: data.choices?.[0]?.message?.content || "Ошибка" });
    })
    .catch(err => {
      sendResponse({ reply: "Ошибка соединения" });
    });

    return true; // важно для async
  }
});