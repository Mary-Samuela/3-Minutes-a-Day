// Sample Bible verses
const verses = [
    {
        text: "The Lord is my shepherd; I shall not want.",
        ref: "Psalm 23:1",
        reflection: "Let the Lord guide your path and provide for your every need."
    },
    {
        text: "I can do all things through Christ who strengthens me.",
        ref: "Philippians 4:13",
        reflection: "Find strength in Christ to overcome every challenge today."
    },
    {
    text: "Rejoice in the Lord always, again I say rejoice.",
    ref: "Phil 4:4",
    reflection: "True joy is found in the Lord."
    },
    {
    text: "Therefore do not worry about tomorrow.",
    ref: "Matthew 6:34.",    
    reflection: "Focus on the present day and do not let future anxieties overwhelmn you."
    }
];

// Element references
const verseForm = document.getElementById("verseForm");
const datePicker = document.getElementById("datePicker");
const verseText = document.getElementById("verseText");
const verseRef = document.getElementById("verseRef");
const verseReflection = document.getElementById("verseReflection");
const verseDisplay = document.getElementById("verseDisplay");
const verseOfDayHeading = document.getElementById("verseOfDayHeading");

const randomVerseBtn = document.getElementById("randomVerseBtn");
const shareSection = document.getElementById("shareSection");
const copyVerseBtn = document.getElementById("copyVerse");
const shareWhatsApp = document.getElementById("shareWhatsApp");
const shareX = document.getElementById("shareX");
const shareEmail = document.getElementById("shareEmail");

// Display a verse

function displayVerse(selectedVerse) {
    verseText.textContent = `"${selectedVerse.text}"`;
    verseRef.textContent = selectedVerse.ref;
    verseReflection.textContent = selectedVerse.reflection;

    localStorage.setItem("lastVerse", JSON.stringify(selectedVerse));
}

// show verse display and heading
verseDisplay.classList.remove("hidden");
verseOfDayHeading.classList.remove("hidden");
shareSection.classList.remove("hidden");


// Generate verse based on date input
function getVerseByDate(event) {
    event.preventDefault();
    const dateValue = datePicker.value;

    if (!dateValue) {
        verseText.textContent = "Please select a date first.";
        verseRef.textContent = "";
        verseReflection.textContent = "";
        verseDisplay.classList.remove("hidden");
        verseOfDayHeading.classList.add("hidden");
        shareSection.classList.add("hidden");
        return;
    }
        const date = new Date(dateValue);
        const dayOfYear = date.getDate() + date.getMonth() *31;
        const index = dayOfYear % verses.length;
        const selectedVerse = verses[index];

        displayVerse(selectedVerse);
}

// Random verse

function getRandomVerse() {
    const randomIndex = Math.floor(Math.random() * verses.length);
    const selectedVerse = verses[randomIndex];
    displayVerse(selectedVerse);
}


// copy verse to clipboard
function copyVerse() {
    const textToCopy = `${verseText.textContent} - ${verseRef.textContent}
    \n${verseReflection.textContent}`;
    navigator.clipboard.writeText(textToCopy)
    .then(() => alert("verse copied to clipboard"))
    .catch(() =>alert("could not copy verse. Please try again"))
}

// Share verse

function shareOnWhatsApp() {
    const message = `${verseText.textContent} 
    ${verseRef.textContent} - ${verseReflection.textContent}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url,"_blank");
}
function shareOnX() {
    const message = `${verseText.textContent} 
    ${verseRef.textContent} - ${verseReflection.textContent}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(url,"_blank");
}

function shareOnEmail() {
    const subject = "3 Minutes-a-Day with Jesus";
    const body = `${verseText.textContent} ${verseRef.textContent}
    /n/n${verseReflection.textContent}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=
    ${encodeURIComponent(body)}`;
    window.location.href = url;
}

// Event Listeners

verseForm.addEventListener("submit",getVerseByDate);
randomVerseBtn.addEventListener("click",getRandomVerse);
copyVerseBtn.addEventListener("click",copyVerse);
shareWhatsApp.addEventListener("click",shareOnWhatsApp);
shareX.addEventListener("click",shareOnX);
shareEmail.addEventListener("click",shareOnEmail);

// Restore the last verse viewed
window.addEventListener("load", ()=> {
    const savedVerse = localStorage.getItem("lastVerse");
    if (savedVerse) {
        const verse = JSON.parse(savedVerse);
        displayVerse(verse);
    }
});

// Form Submission

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const feedback = document.getElementById("formMessage");

    if (name && email && messasge) {
        feedback.textContent = "Thank you, " + name + "! Your message has been sent Successfully.";
        feedback.stylecolor = "green";
        this.reset()
    }else {
        feedback.textContent = "Please fill in all fields before submitting."
        feedback.style.color = "red";
    }
});