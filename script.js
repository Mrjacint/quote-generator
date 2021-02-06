const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLodingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function remuveLodingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show Quote
function newQuote() {
  showLodingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   Check if Author field is blank and replace it with 'Unknown'
  !quote.author
    ? (authorText.textContent = "Unknown")
    : (authorText.textContent = quote.author);
  // Check Quote length to determine styling
  quote.text.length > 100
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  quoteText.textContent = quote.text;
  remuveLodingSpinner();
}

// Get Qoute From API
async function getQuotes() {
  showLodingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log("woops no data " + error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Liseners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Call getQuotes function
getQuotes();
