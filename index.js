console.log('Happy developing ✨')
// Create floating balls
const colors = ['rgba(193,10,245,0.94)', '#75d90b', '#f16203', '#ffc100', '#B5EAD7', '#C7CEEA'];

for (let i = 0; i < 50; i++) {
    createFloatingBall();
}

function createFloatingBall() {
    const ball = document.createElement('div');
    ball.className = 'floating-ball';

    // Random properties
    const size = Math.random() * 100 + 50;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Set styles
    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
    ball.style.backgroundColor = color;
    ball.style.opacity = Math.random() * 0.6 + 0.2;

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
    const bubbleCount = 100;

    for (let i = 0; i < bubbleCount; i++) {
        createBubble(x, y);
    }
}

function createBubble(x, y) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    // Random properties
    const size = Math.random() * 10 + 5;

    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 140;

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
    }, 1500);
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

const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");



async function populateCurrencies() {
    try {
        const response = await fetch(`http://data.fixer.io/api/symbols?access_key=bbcdd83974d483359d1c328eb30e593d`);
        const data = await response.json();
        const symbols = data.symbols;


        for (let code in symbols) {
            let option1 = new Option(`${symbols[code]} (${code})`, code);
            let option2 = new Option(`${symbols[code]} (${code})`, code);
            fromSelect.add(option1.cloneNode(true));
            toSelect.add(option2.cloneNode(true));
        }

        fromSelect.value = "USD";
        toSelect.value = "NGN";
    }catch (err){
        alert("Your Internet connection is down")
    }

}

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!amount || isNaN(amount)) {
        alert("Please enter a valid amount");
        return;
    }

    try{


    // const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    let apiKey = `b4d4820017fc3d56d7ac8061`
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`);
    const data = await res.json();
    console.log(data);

    if(data.result === "success") {
        animating()
        alert("Request Successful");
    }else{
        alert("Request Failed due to your internet connection");
    }



    document.querySelector(".Answer").textContent =
        `${amount} ${from} = ${data.conversion_result.toFixed(2)} ${to}`;
    }catch(err){
        document.querySelector(".Answer").innerHTML = `${err.message}? Please try again`;
    }
}

populateCurrencies();

function animating(){
    let text = "FULLTIME"
    for(let x = 0;x < 8;x++){
        let element = document.createElement("div");
            element.className = "animate";
            element.innerHTML = text[x]
        document.querySelector(".Answer").appendChild(element);

    }
}
// animating();

console.log(window);
