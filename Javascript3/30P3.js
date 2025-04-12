/* Brady Jones 04/13/2025
 * Original creator: https://javascript30.com/
 *
 * New elements:
 * getBoundingClientRect method (https://www.w3schools.com/jsref/met_element_getboundingclientrect.asp)
 * forEach method (https://www.w3schools.com/jsref/jsref_foreach.asp)
 * 
 * Challenges:
 * Despite using a similar concept in a game dev project,
 * the math took a lot of trial and error to get working properly.
 */
const hero = document.querySelector('.hero');
const eyes = document.querySelectorAll('.iris');
const radius = 70;
const mouseZIndex = 2.3; // base: 2.3

function updateEye(e, eye) {
    // get the center of the eye
    const bounds = eye.parentNode.getBoundingClientRect();
    const eyeCenterX = bounds.left + bounds.width / 2;
    const eyeCenterY = bounds.top + bounds.height / 2;

    // calc the distance and angle between the mouse and the eye
    const distanceX = e.x - eyeCenterX;
    const distanceY = e.y - eyeCenterY;
    const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    const angle = Math.atan2(distanceY, distanceX);

    const finalX = Math.cos(angle) * Math.min(radius, distance / mouseZIndex);
    const finalY = Math.sin(angle) * Math.min(radius, distance / mouseZIndex);
    
    eye.style.transform = `translate(${finalX}px, ${finalY}px)`;
}

hero.addEventListener('mousemove', (e) => {
    eyes.forEach(eye => updateEye(e, eye));
});