const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");



let apiQuotes = [];


//showloading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

//hideloading
function complete() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}



//show new quote
function newQuote() {
	loading();
	//pick random quote from apiquote
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	//check if author fill is blank and replace with unknow
	if (!quote.author) {
		authorText.textContent = "Unknown";
	} else {
		authorText.textContent = quote.author;
	}

	//check quote length to determine styling
	if (quote.text.length > 50) {
		quoteText.classList.add("long-quote");
	} else {
		quoteText.classList.remove("long-quote");
	}

	//set quote, hide loader
	quoteText.textContent = quote.text;
	complete();
}

//GET QUOTES FROM API
async function getQuotes() {
	loading();
	const apiUrl = "https://type.fit/api/quotes";
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		//catcherror here
	}
}

//tweet quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, "_blank");
}

//event listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load
getQuotes();
