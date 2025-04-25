/* Brady Jones 04/27/2025
 * Original creator: https://javascript30.com/
 *
 * New elements:
 * Object methods (https://www.w3schools.com/Js/js_object_method.asp)
 * fill method (https://www.w3schools.com/jsref/jsref_fill.asp)
 * 
 * Challenges:
 * I would need more than two hands to count the number of times
 * rows and columns, and x and y were mixed up in the making of this page.
 */
const container = document.querySelector(".container");
const COLUMNS = 5;
const ROWS = 3;
const grid = {
    panels: new Array(COLUMNS),
    weightX: new Array(COLUMNS),
    weightY: new Array(ROWS),

    weightSum: function (x, y) {
        return this.weightX[x] + this.weightY[y];
    }
};
let panels;

function setUp() {
    // create a COLUMNS by ROWS grid of panels
    for (let x = 0; x < COLUMNS; x++) {
        const col = document.createElement("div");
        col.classList.add("col");
        grid.panels[x] = new Array(ROWS);
        for (let y = 0; y < ROWS; y++) {
            const row = document.createElement("div");
            row.classList.add("panel");
            row.id = `${x},${y}`;
            col.appendChild(row);
            grid.panels[x][y] = false; 
        }
        container.appendChild(col);
    }

    panels = document.querySelectorAll(".panel");
    panels.forEach(panel => panel.addEventListener('click', adjustContent));
    grid.weightX.fill(0); 
    grid.weightY.fill(0);
}

function adjustContent() {
    const panelID = this.id.split(",").map(function (val) { return Number(val); });
    grid.panels[panelID[0]][panelID[1]] = !grid.panels[panelID[0]][panelID[1]];
    updateWeight();

    recolor();

    // change border color if this panel is active/inactive
    if (grid.panels[panelID[0]][panelID[1]]) {
        this.style.borderColor = "#ffffff";
    } else {
        this.style.borderColor = "#000000";
    }

    // increase/decrease scaling of panels within the row and column of this panel
    for (let x = 0; x < COLUMNS; x++){
        const panel = document.getElementById(`${x},${panelID[1]}`);
        panel.style.flex = `${grid.weightY[panelID[1]] + 1} 0 auto`;
    }
    container.childNodes[panelID[0] + 1].style.flex = `${grid.weightX[panelID[0]] + 1} 0 auto`;
}

function updateWeight() {
    // store the number of active panels by column 
    for (let x = 0; x < COLUMNS; x++) {
        let temp = 0;
        for (let y = 0; y < ROWS; y++) {
            temp += grid.panels[x][y];
        }
        grid.weightX[x] = temp;
    }

    // store the number of active panels by row
    for (let y = 0; y < ROWS; y++) {
        let temp = 0;
        for (let x = 0; x < COLUMNS; x++) {
            temp += grid.panels[x][y];
        }
        grid.weightY[y] = temp;
    }
}

function recolor() {
    // increase hue of each panel based on the number of active panels in that row and column
    panels.forEach(function (panel) {
        const panelID = panel.id.split(",").map(function (val) { return Number(val); });
        const maxWeight = ROWS + COLUMNS;
        const weightIncrement = (grid.weightSum(panelID[0], panelID[1])) / maxWeight;
        panel.style.backgroundColor = `hsl(${weightIncrement * 300}, 100%, 50%)`;
    });
}

setUp();