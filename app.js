let cookies = 0;
let cookiesPerSecond = 0;
let upgrades = [];

const cookieCount = document.getElementById('cookieCount');
const cpsDisplay = document.getElementById('cosDisplay');
const cookieButton = document.getElementById('cookieButton');
const upgradesList = document.getElementById('upgradesList');

page.addEventListener('load', function () {
    loadSavedGame();
    fetchUpgrades();
    updateDisplay();
    setInterval(gameLoop, 1000);
});

function gameLoop() {
    cookies += cookiesPerSecond;
    updatedDisplay();
    saveGame();
}

function clickCookie() {
    cookies += 1;
    updateDisplay();
}

function updateDisplay() {
    cookieCount.textContent = Math.floor(cookies);
    cpsDisplay.textContent = cookiesPerSecond;
}

async function fetchUpgrades() {
        const response = await fetch('https://cookie-upgrade-api.vercel.app/api/upgrades');
        const data = await response.json();
        upgrades = data;
        createShop();
    }

function saveGame() {
    const gameData = {
        cookies: cookies,
        cookiesPerSecond: cookiesPerSecond,
        upgrades: upgrades
    };
    localStorage.setItem('cookieGame', JSON.stringify(gameData));
}


function loadSavedGame() {
    const saved = localStorage.getItem('cookieGame');
    if (saved) {
        const gameData = JSON.parse(saved);
        cookies = gameData.cookies || 0;
        cookiesPerSecond = gameData.cookiesPerSecond
        if (gameData.upgrades) {
            upgrades = gameData.upgrades;
        }
    }
}



cookieButton.addEventListener('click', clickCookie);

