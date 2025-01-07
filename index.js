const accessKey = "3rPOx8hfwkeMxir1J2_HO53WCKCJU7gR7ECXQUj6mvQ";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchMore = document.getElementById("show-more-btn");
const voiceSearchBtn = document.getElementById("voice-search-btn");
const themeToggle = document.querySelector(".theme-toggle");

let keyword = "";
let page = 1;

// Function to search for images
async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    searchMore.style.display = "block";
}

// Event listener for form submission
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
});

// Event listener for "Show more" button
searchMore.addEventListener("click", () => {
    page++;
    searchImage();
});

// Voice search feature
voiceSearchBtn.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onstart = () => {
        voiceSearchBtn.textContent = "🎙️ Listening...";
    };

    recognition.onspeechend = () => {
        recognition.stop();
        voiceSearchBtn.textContent = "🎤";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        searchBox.value = transcript;
        page = 1;
        searchImage();
    };

    recognition.onerror = (event) => {
        console.error("Voice recognition error:", event.error);
        alert("Voice search failed. Please try again.");
        voiceSearchBtn.textContent = "🎤";
    };

    recognition.start();
});

// Theme toggle feature
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent =
        document.body.classList.contains("dark-mode") ? "Switch to Light Mode" : "Switch to Dark Mode";
});
