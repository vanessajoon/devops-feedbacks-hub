const API_URL = "/api/feedback";

const form = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");
const statusMessage = document.getElementById("status");

async function loadFeedback() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load feedback");
    }

    const feedback = await response.json();

    feedbackList.innerHTML = "";

    if (feedback.length === 0) {
      feedbackList.innerHTML = "<p>No feedback yet.</p>";
      return;
    }

    feedback.forEach((item) => {
      const article = document.createElement("article");
      article.className = "feedback";

      const name = document.createElement("h3");
      name.textContent = item.name;

      const message = document.createElement("p");
      message.textContent = item.message;

      article.appendChild(name);
      article.appendChild(message);
      feedbackList.appendChild(article);
    });
  } catch (error) {
    statusMessage.textContent = "Could not load feedback.";
    console.error(error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, message })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to submit feedback");
    }

    statusMessage.textContent = "Feedback submitted successfully!";
    form.reset();
    await loadFeedback();
  } catch (error) {
    statusMessage.textContent = error.message;
  }
});

loadFeedback();
