# Minesweeper Game

A classic Minesweeper implementation using HTML, CSS, and JavaScript.

## Description

This is a web-based version of the classic Minesweeper game, featuring all the traditional gameplay elements including:

- 10x10 grid
- 10 mines
- Timer
- Mine counter
- Flag system
- First-click safety

## How to Play

1. **Starting the Game**

   - Simply open the `index.html` file in any modern web browser
   - The game starts when you make your first click
   - The first click is always safe and will never reveal a mine

2. **Controls**

   - Left Click: Reveal a cell
   - Right Click: Place/Remove a flag
   - Click the smiley face button: Reset the game

3. **Game Rules**

   - The goal is to reveal all cells that don't contain mines
   - Numbers indicate how many mines are adjacent to that cell
   - Use flags (right-click) to mark suspected mine locations
   - If you reveal a mine, the game is over
   - Win by revealing all safe cells without triggering any mines

4. **Number Colors**
   - 1 (Blue): One adjacent mine
   - 2 (Green): Two adjacent mines
   - 3 (Red): Three adjacent mines
   - 4 (Dark Blue): Four adjacent mines
   - 5 (Dark Red): Five adjacent mines
   - 6 (Teal): Six adjacent mines
   - 7 (Black): Seven adjacent mines
   - 8 (Gray): Eight adjacent mines

## Game Features

- **Timer**: Tracks how long you've been playing
- **Mine Counter**: Shows remaining mines (10 - number of flags placed)
- **Emoji Feedback**:
  - 😊 Normal gameplay
  - 😎 Victory
  - 😵 Game Over
- **Auto-reveal**: Clicking an empty cell reveals all adjacent empty cells
- **Flag System**: Right-click to mark potential mine locations

## Technical Details

The game is built using three main components:

1. **HTML (index.html)**

   - Contains the game board structure
   - Info panel with mine count, reset button, and timer
   - No dependencies required

2. **CSS (styles.css)**

   - Classic Minesweeper styling
   - Responsive grid layout
   - Color-coded numbers
   - Cell hover and click effects

3. **JavaScript (script.js)**
   - Object-oriented implementation using a Minesweeper class
   - Handles game logic, board generation, and user interactions
   - Implements recursive cell revealing
   - Manages game state and win/lose conditions

## Setup Instructions

1. Clone or download this repository
2. No installation or dependencies required
3. Open `index.html` in your web browser
4. Start playing!

## Browser Compatibility

The game works in all modern browsers including:

- Chrome
- Firefox
- Safari
- Edge

## Development

The game is built using vanilla JavaScript without any dependencies, making it easy to modify and extend. The Minesweeper class in `script.js` handles all game logic and can be customized by modifying the board size and mine count parameters:

```javascript
// To create a game with different settings:
new Minesweeper(boardSize, mineCount);
// Default: new Minesweeper(10, 10);
```
