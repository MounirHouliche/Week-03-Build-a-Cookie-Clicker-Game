let cookies = 0;
let cookiesPerSecond = 0;
let upgrades = [];

const cookieCount = document.getElementById('cookieCount');
const cpsDisplay = document.getElementById('cpsDisplay'); 
const cookieButton = document.getElementById('cookieButton');
const upgradesList = document.getElementById('upgradesList');

window.addEventListener('load', function () {
    loadSavedGame();
    fetchUpgrades();
    updateDisplay();
    setInterval(gameLoop, 1000);
});

function gameLoop() {
    cookies += cookiesPerSecond;
    updateDisplay(); 
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
    try { 
        const response = await fetch('https://cookie-upgrade-api.vercel.app/api/upgrades');
        const data = await response.json();
        upgrades = data;
        createShop();
    } catch (error) {
        upgrades = [
            { id: 1, name: "Auto-Clicker", cost: 100, increase: 1 },
            { id: 2, name: "Enhanced Oven", cost: 500, increase: 5 }
        ];
        createShop();
    }
}

function createShop() {
    upgradesList.innerHTML = '';
    for (let i = 0; i < upgrades.length; i++) {
        const upgrade = upgrades[i];
        const upgradeBox = document.createElement('div');
        upgradeBox.innerHTML = `
        <div>${upgrade.name} - Cost: ${upgrade.cost} cookies - Makes ${upgrade.increase} cookies/sec</div>
        <button onclick="buyUpgrade(${upgrade.id})">Buy This!</button>
        `;
        upgradesList.appendChild(upgradeBox);
    } 
}

function buyUpgrade(upgradeId) {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    
    if (cookies >= upgrade.cost) {
        cookies -= upgrade.cost;
        cookiesPerSecond += upgrade.increase;
        upgrade.cost = Math.floor(upgrade.cost * 1.2);
        
        updateDisplay();
        createShop();
    }
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
        cookiesPerSecond = gameData.cookiesPerSecond || 0; 
        if (gameData.upgrades) {
            upgrades = gameData.upgrades;
        }
    }
}

cookieButton.addEventListener('click', clickCookie);