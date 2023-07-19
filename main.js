const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorName = document.querySelector(".name");
const speechBtn = document.querySelector(".speech");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");
const synth = speechSynthesis;

async function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  
  try {
    const response = await fetch("https://api.quotable.io/random");
    const result = await response.json();
    
    quoteText.innerText = result.content;
    authorName.innerText = result.author;
    
    quoteBtn.classList.remove("loading");
    quoteBtn.innerText = "New Quote";
  } catch (error) {
    console.log(error);
  }
}

speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    const utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    synth.speak(utterance);
    
    setInterval(() => {
      !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
    }, 10);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

quoteBtn.addEventListener("click", randomQuote);
