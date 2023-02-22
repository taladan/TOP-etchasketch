// set inital rainbow
let rainbow = false;

// set frame to max gameboard size
const frame = document.getElementById("frame");
frame.style.width = "449px";
frame.style.height = "449px";

// Create container div
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
const divCountTitle = document.createElement("h2");
divCountTitle.style.display = "flex";
divCountTitle.style.flexDirection = "column";
divCountTitle.style.justifyContent = "space-apart";
divCountTitle.textContent = "Adjust Screen Size";

// Size picker
const divCountSlider = document.createElement("input");
divCountSlider.id = "sizer";
divCountSlider.type = "range";
divCountSlider.setAttribute("min", initialDivCount);
divCountSlider.setAttribute("max", initialDivCount * 4);
divCountSlider.setAttribute("value", initialDivCount);
divCountSlider.setAttribute("step", initialDivCount);
divCountSlider.addEventListener("mouseup", getSliderValue);

// Rainbow Button;
const rainbowButton = document.createElement("button");
rainbowButton.addEventListener("click", toggleRainbow);
rainbowButton.textContent = "Taste the Rainbow";

// Place count selector in page
const tools = document.getElementById("tools");
divCountTitle.appendChild(divCountSlider);
tools.appendChild(divCountTitle);
tools.appendChild(rainbowButton);

// Track currentDivCount
function getSliderValue(e) {
  currentDivCount = e.target.value;
  createGameBoard();
}

// create divs //
function createGameBoard() {
  // clear the board first
  container.replaceChildren();

  // build rows
  for (let row = 0; row < currentDivCount; row++) {
    const currentRow = document.createElement("div");
    currentRow.id = `row-${row}`;
    currentRow.className = "row";
    currentRow.maxHeight = container.style.height / currentDivCount;
    currentRow.maxWidth = container.style.width / currentDivCount;
    // build cells
    for (let column = 0; column < currentDivCount; column++) {
      const currentCell = document.createElement("span");
      currentCell.id = `${currentRow.id}-${column}`;
      currentCell.className = "cell";
      currentCell.addEventListener("mouseover", setCellColor);
      currentCell.style.backgroundColor = "#ccc";
      currentCell.style.border = "1px solid #ddd";
      currentCell.style.display = "Block";
      currentCell.style.maxWidth = "6px";
      currentCell.style.maxHeight = "6px";
      currentCell.textContent = "&nbsp";
      currentCell.style.color = "transparent";
      currentCell.style.userSelect = "none";

      // add each cell to row
      currentRow.append(currentCell);
    }
    // add each row to container
    container.appendChild(currentRow);
    container.style.transform = `translate(${Math.floor(
      parseInt(container.style.width) / parseInt(currentDivCount)
    )}px, ${Math.floor(
      parseInt(container.style.height) / parseInt(currentDivCount)
    )}px)`;
    frame.appendChild(container);
  }
}

// Calculate frame size
function calculateSize(cWidth, cHeight, tWidth, tHeight) {
  return [cWidth + tWidth, cHeight + tHeight];
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
  if (rainbow === true) {
    currentPenColor = randomRgb();
  }
  cell.style.backgroundColor = currentPenColor;
}

/* Set up color picker */
//
//
const colorPicker = new iro.ColorPicker("#picker", {
  width: 150,
  color: currentPenColor,
});
const picker = document.getElementById("picker");
picker.addEventListener("mouseleave", setPen);

// color selector
function setPen() {
  currentPenColor = colorPicker.color.hexString;
}

function toggleRainbow() {
  if (!rainbow) {
    rainbow = true;
  } else {
    setPen();
    rainbow = false;
  }
}
function randomRgb() {
  let o = Math.round;
  let r = Math.random;
  let s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}

/* Create the gameboard for inital page view after pageload */
createGameBoard();
