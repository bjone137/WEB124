/* Brady Jones 04/06/2025
 * Original creator: https://javascript30.com/
 *
 * New elements:
 * DOMContentLoaded event (https://www.w3schools.com/jsref/jsref_event.asp)
 * split method (https://www.w3schools.com/jsref/jsref_split.asp)
 * map method (https://www.w3schools.com/jsref/jsref_map.asp)
 */
const container = document.getElementById('autoSort');
const ROWS = 20;
const COLUMNS = 30;
let lastChecked;

function setUp() {
    // create a ROWS by COLUMNS grid of checkboxes
    for (let y = 0; y < ROWS; y++) {
        const row = document.createElement("div");
        for (let x = 0; x < COLUMNS; x++) {
            const col = document.createElement("input");
            col.type = "checkbox";
            col.id = `${x},${y}`;
            row.appendChild(col);
        }
        container.appendChild(row);
    }

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
}

function handleCheck(e) {
    if (e.shiftKey && this.checked && lastChecked != null) {
        // obtain the coordinates of the top left and bottom right checkboxes
        const tempCheckbox = this.id.split(",").map(function (val)
                             { return Number(val); });
        let firstCheckbox = lastChecked.id.split(",").map(function (val)
                            { return Number(val); });
        let secondCheckbox = [Math.max(tempCheckbox[0], firstCheckbox[0]),
                             Math.max(tempCheckbox[1], firstCheckbox[1])];
        firstCheckbox = [Math.min(tempCheckbox[0], firstCheckbox[0]),
                        Math.min(tempCheckbox[1], firstCheckbox[1])];

        // check all boxes between the current and previously selected checkboxes
        for (let y = firstCheckbox[1]; y <= secondCheckbox[1]; y++) {
            for (let x = firstCheckbox[0]; x <= secondCheckbox[0]; x++) {
                const currentCheckbox = document.getElementById(`${x},${y}`);
                currentCheckbox.checked = true;
            }
        }
    }
    lastChecked = this;
}

document.addEventListener('DOMContentLoaded', setUp);