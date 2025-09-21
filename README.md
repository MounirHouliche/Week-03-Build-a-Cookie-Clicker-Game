# Week-03-Build-a-Cookie-Clicker-Game

🎯 What requirements did you achieve?
- Event Listeners - Cookie button clicks and buy button interactions
- DOM Manipulation - Dynamic shop creation and display updates using createElement() and innerHTML
- Local Storage - Save/load game progress with localStorage.setItem() and getItem()
- Fetch API - Get upgrade data from https://cookie-upgrade-api.vercel.app/api/upgrades using async/await
- setInterval - Game loop runs every second to add cookies and update display
- Functions - Code organized into clear, reusable functions like clickCookie(), buyUpgrade(), createShop()

🎯 Were there any requirements or goals that you were unable to achieve?
- Button state management - Buy buttons don't disable when you can't afford upgrades (would need additional logic)
- Error feedback - No visual feedback when trying to buy unaffordable items
- API reliability - Occasionally the API takes time to load, showing "Loading upgrades..." longer than expected

🎯 If so, what was it that you found difficult about these tasks?
- API Integration - Had to learn async/await syntax and handle network errors with try/catch blocks
- Local Storage data types - Struggled with converting objects to strings with JSON.stringify() and back with JSON.parse()
- DOM timing issues - Sometimes tried to update elements before they were created, had to ensure proper function call order
- Debugging - Finding typos like cosDisplay instead of cpsDisplay that broke the game silently