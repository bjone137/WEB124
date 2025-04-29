/* Brady Jones 04/27/2025 */
const button = document.querySelector("button");
const itterations = 10;
let input;

function main() {
    input = Number(document.getElementById("num").value);
    addition();
    subtraction();
    multiplication();
    division();
}

function addition() {
    const add = document.getElementById("add");
    add.textContent = "";

    for (let i = 1; i <= itterations; i++) {
        add.innerHTML += `${i} + ${input} = ${i + input}<br>`;
    }
}

function subtraction() {
    const subt = document.getElementById("subt");
    subt.textContent = "";

    let i = 1;
    while (i <= itterations) {
        subt.innerHTML += `${i} - ${input} = ${i - input}<br>`;
        i++;
    }

}

function multiplication() {
    const mult = document.getElementById("mult");
    mult.textContent = "";

    let i = 1;
    do {
        mult.innerHTML += `${i} * ${input} = ${i * input}<br>`;
        i++;
    } while (i <= itterations);
}

function division() {
    const dvsn = document.getElementById("dvsn");
    dvsn.textContent = "";

    for (let i = 1; i <= itterations; i++) {
        dvsn.innerHTML += `${i} / ${input} = ${(i / input).toFixed(2)}<br>`;
    }
}

button.addEventListener('click', main);