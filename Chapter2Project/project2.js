// Brady Jones 03/09/2025
let myName = "Brady Jones";
let para1 = document.getElementById("p1");
para1.textContent = myName;

let n1 = 10;
let n2 = 12;
let numberSum = n1 + n2;
document.getElementById("p2").textContent = numberSum;

let numberMult = n1 * n2;
document.getElementById("p3").textContent = numberMult;

let myNameAddNum = n1 + myName;
document.getElementById("p4").textContent = myNameAddNum;

let myNameMultNum = n1 * myName;
document.getElementById("p5").textContent = myNameMultNum;

let ageCompare = 20 < numberMult;
document.getElementById("p6").textContent = ageCompare;