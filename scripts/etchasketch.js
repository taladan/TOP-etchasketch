// # Assignment

// Create a webpage with a 16x16 grid of square divs.
// Create the divs using JavaScript. Don’t try making them by hand with copy and pasting in your HTML file!
// There are several different ways to make the divs appear as a grid (versus just one on each line). Feel free to use any or play with each of them:
// - float/clear
// - inline-block
// - flexbox
// - CSS Grid

// Be careful with borders and margins, as they can adjust the size of the squares!

// Set up a “hover” effect so that the grid divs change color when your mouse passes over them, leaving a (pixelated) trail through your grid like a pen would.
// Hint: “Hovering” is what happens when your mouse enters a div and ends when your mouse leaves it. You can set up event listeners for either of those events as a starting point.
// There are multiple ways to change the color of the divs, including:
// adding a new class to the div.
// changing the div’s background color using JavaScript.
// Add a button to the top of the screen that will send the user a popup asking for the number of squares per side for the new grid. Once entered, the existing grid should be removed and a new grid should be generated in the same total space as before (e.g. 960px wide) so that you’ve got a new sketch pad. Tip: Set the limit for the user input to a maximum of 100. A larger number of squares results in more computer resources being used, potentially causing delays, freezing, or crashing that we want to prevent.
// Research button tags in HTML and how you can make a JavaScript function run when one is clicked.
// Also check out prompts.
// You should be able to enter 64 and have a brand new 64x64 grid pop up without changing the total amount of pixels used.
// Push your project to GitHub!

// Extra Credit

// Instead of just changing the color of a square from black to white (for example), have each pass through with the mouse change it to a completely random RGB value. Then try having each pass just add another 10% of black to it so that only after 10 passes is the square completely black.

// Create container div

const title = document.querySelector("h1");
const frame = document.getElementById("frame");

const container = document.createElement("div");
container.id = "container";
container.style.margin = "0 auto";
container.style.padding = "0";
container.style.display = "inline-block";
container.style.left = "25px";
container.style.top = "25px";
container.style.resize = "none";

/* Pick size of grid */
//
//
//
// Starting size is 16 x 16 //
const initialDivCount = 16;
let currentDivCount = initialDivCount;

// create div count selector
const divCountSlider = document.createElement("input");
divCountSlider.id = "sizer";
divCountSlider.type = "range";
divCountSlider.setAttribute("min", initialDivCount);
divCountSlider.setAttribute("max", initialDivCount * 4);
divCountSlider.setAttribute("value", initialDivCount);
divCountSlider.setAttribute("step", initialDivCount);

// Place count selector in page
const tools = document.getElementById("tools");
tools.appendChild(divCountSlider);
divCountSlider.addEventListener("mouseup", getSliderValue);

// Track currentDivCount
function getSliderValue(e) {
  currentDivCount = e.target.value;
  createGameBoard();

  // Need to change grid when count changes
}

// create divs //

function createGameBoard() {
  // clear the board first
  container.replaceChildren();
  const containerWidth = parseInt(container.style.width);
  const containerHeight = parseInt(container.style.height);
  const divCount = parseInt(currentDivCount);

  for (let row = 0; row < currentDivCount; row++) {
    const currentRow = document.createElement("div");
    currentRow.id = `row-${row}`;
    currentRow.className = "row";
    currentRow.maxHeight = container.style.height / currentDivCount;
    currentRow.maxWidth = container.style.width / currentDivCount;
    for (let column = 0; column < currentDivCount; column++) {
      const currentCell = document.createElement("span");
      currentCell.style.backgroundColor = "#ccc";
      currentCell.style.border = "1px solid #ddd";
      currentCell.id = `${currentRow.id}-${column}`;
      currentCell.className = "cell";
      currentCell.style.display = "Block";
      currentCell.addEventListener("mouseover", setCellColor);
      currentCell.style.maxWidth = "6px";
      currentCell.style.maxHeight = "6px";
      currentCell.textContent = "&nbsp";
      currentCell.style.color = "transparent";
      currentCell.style.userSelect = "none";
      currentRow.append(currentCell);
    }
    container.appendChild(currentRow);
    container.style.transform = `translate(${Math.floor(
      parseInt(container.style.width) / parseInt(currentDivCount)
    )}px, ${Math.floor(
      parseInt(container.style.height) / parseInt(currentDivCount)
    )}px)`;
    // console.log(container.style.transform);
    frame.appendChild(container);
  }
}

/* Pick pen color */
//
//
//
// Starting color is black #000 //
const initialPenColor = "#000";
let currentPenColor = initialPenColor;

function setCellColor(e) {
  let cell = document.getElementById(e.target.id);
  cell.style.backgroundColor = currentPenColor;
}

/* May use this later - for now it's crufty */
//
//
const colorPicker = new iro.ColorPicker("#picker", {
  width: 150,
  color: currentPenColor,
});
const picker = document.getElementById("picker");
picker.addEventListener("mouseleave", setPen);

// create color selector
function setPen() {
  console.log("Setting color!");
  currentPenColor = colorPicker.color.hexString;
}
/* Create the gameboard for inital page view after pageload */
createGameBoard();
