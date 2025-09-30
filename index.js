console.log('Happy developing ✨')
// Create floating balls
const colors = ['rgba(203,0,255,0.94)', '#332b00', '#110800', 'white'];
function looping() {
    let area = document.body.clientWidth * document.body.clientHeight;
    let Counting;

    if (window.innerWidth > 1200) {
        Counting = Math.floor(area / 20000);
    }else if (window.innerWidth > 768) {
        Counting = Math.floor(area / 9000);
    }else{
        Counting = Math.floor(area / 7000);
    }

    for (let i = 0; i < Counting; i++) {
        createFloatingBall();
    }
}
looping()

// window.addEventListener('resize', looping);

function createFloatingBall() {
    const ball = document.createElement('canvas');
    ball.className = 'floating-ball';

    // Adjust bubble size based on screen width
    let size;
    if (window.innerWidth > 1200) {
        size = Math.random() * 40 + 40; // 40px - 120px (large screens)
    } else if (window.innerWidth > 768) {
        size = Math.random() * 25 + 25; // 25px - 75px (tablets)
    } else {
        size = Math.random() * 10 + 15; // 15px - 45px (phones)
    }

    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * document.body.clientHeight;
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Set styles
    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
    ball.style.backgroundColor = color;
    ball.style.opacity = 0.8;

    // Set animation variables
    ball.style.setProperty('--x-move', `${Math.random() * 60 - 30}px`);
    ball.style.setProperty('--y-move', `${Math.random() * 60 - 30}px`);
    ball.style.animationDuration = `${Math.random() * 4 + 3}s`;

    document.body.appendChild(ball);
}


// Create bubbles on click
let container = document.querySelector(".container")
document.addEventListener('click', (e) => {
    createBubbleExplosion(e.clientX, e.clientY);
});

function createBubbleExplosion(x, y) {
    const bubbleCount = 60;

    for (let i = 0; i < bubbleCount; i++) {
        createBubble(x, y);
    }
}

function createBubble(x, y) {
    const bubble = document.createElement('canvas');
    bubble.className = 'bubble';

    // Random properties
    const size = Math.random() * 10 + 5;

    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 200;

    // Calculate starting position
    const startX = x + Math.cos(angle) * distance;
    const startY = y + Math.sin(angle) * distance;

    // Set styles
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${startX}px`;
    bubble.style.top = `${startY}px`;
    bubble.style.backgroundColor = color;
    bubble.style.animationDuration = `${Math.random() * 1 + 1}s`;

    document.body.appendChild(bubble);

    // Remove bubble after animation
    setTimeout(() => {
        bubble.remove();
    }, 5000);
}


let convert_BTN = document.querySelector(".convert_BTN");

convert_BTN.addEventListener("click", function (e) {
    alert("Praise the LORD")
    convertCurrency();
    document.getElementById("amount").value = "";
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        convert_BTN.click()
    }
})

const loader = document.querySelector(".loader");
const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const resultDisplay = document.querySelector(".Main_Ans");

// Helper function for fetch with error handling
async function fetchData(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Populate currency dropdowns
async function populateCurrencies() {
    loader.style.display = "flex";

    try {
        const data = await fetchData("https://currencybackend-1.onrender.com/api/symbols/");
        const symbols = data.symbols;

        for (let code in symbols) {
            const option1 = new Option(`${symbols[code]} (${code})`, code);
            const option2 = new Option(`${symbols[code]} (${code})`, code);
            fromSelect.add(option1.cloneNode(true));
            toSelect.add(option2.cloneNode(true));
        }

        fromSelect.value = "USD";
        toSelect.value = "NGN";

    } catch (err) {
        alert("Failed to load currencies. Check your internet connection.");
    } finally {
        loader.style.display = "none";
        document.body.classList.add("hidden")
    }
}

// Convert currency
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!amount || isNaN(amount)) {
        alert("Please enter a valid amount");
        return;
    }

    resultDisplay.textContent = "Loading conversion...";
    try {
        const data = await fetchData(
            `https://currencybackend-1.onrender.com/api/convert/?from=${from}&to=${to}&amount=${amount}`
        );

        if (data.result === "success") {
            resultDisplay.textContent = `${amount} ${from} = ${data.conversion_result.toFixed(2)} ${to}`;
        } else {
            resultDisplay.textContent = "Conversion failed. Try again later.";
        }
    } catch (err) {
        resultDisplay.textContent = `Error: ${err.message}`;
    }
}

// Event listener for convert button
document.querySelector(".convert_BTN").addEventListener("click", convertCurrency);

// Initialize
populateCurrencies();




function animating(){
    let text = "FULLTIME";
    let colors = [
        {
            first: "white",
            Tcols: "black",
            delay: "0.2s"
        },
        {

        first: "#332b00",
        Tcols: "white",
        delay: "0.1s"
    },
        {
            first: "white",
            Tcols: "black",
            delay: "0.25s"
        },
        {
            first: "#000000",
            Tcols: "white",
            delay: "0.3s"
        },
        {
            first: "#332b00",
            Tcols: "white",
            delay: "0.35s"
        },
        {
            first: "#000000",
            Tcols: "white",
            delay: "0.4s"
        },
        {
            first: "#332b00",
            Tcols: "white",
            delay: "0.45s"
        },
        {
            first: "white",
            Tcols: "black",
            delay: "0.5s"
        },
    ]
    for(let x = 0;x < text.length;x++){
        let element = document.createElement("div");
            element.className = "animate";
            element.innerHTML = text[x];
            element.style.backgroundColor = colors[x].first;
            element.style.color = colors[x].Tcols;
            element.style.animationDelay = colors[x].delay;
            document.querySelector(".loader").appendChild(element);

    }
}
animating();

console.log(window);
