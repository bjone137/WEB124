/* Brady Jones 04/20/2025
 * Original creator: https://javascript30.com/
 *
 * New elements:
 * mouseleave & resize events (https://www.w3schools.com/jsref/dom_obj_event.asp)
 * various style properties (https://www.w3schools.com/jsref/prop_html_style.asp)
 * 
 * Challenges:
 * I had trouble getting the highlight behind the text but above the background,
 * resulting in two layers being made: one for text and one for the background.
 */
const triggers = document.querySelectorAll('a');
const main = document.querySelector("main");
const background = document.querySelector("#background");
const description = document.querySelector("#description");
const highlight = document.createElement('span');
const extraWidth = 8;
highlight.classList.add('highlight');
main.appendChild(highlight);

function backgroundUpdate() {
    background.style.left = (window.innerWidth - background.getBoundingClientRect().width) / 2 + "px";
    background.style.height = window.innerHeight + window.scrollY - 1 + "px";
}

function highlightLink() {
    const linkCoords = this.getBoundingClientRect();
    const coords = {
        width: linkCoords.width + extraWidth,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX - (extraWidth / 2)
    };

    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

    findDescription(this);
    showDescription(coords);
}

function showDescription(coords) {
    const descriptionWidth = description.getBoundingClientRect().width;

    // enable visibility and move the description box below the highlighted word
    description.style.background = "rgba(32, 32, 32, 1)";
    description.style.color = "rgba(192, 192, 192, 1)";
    description.style.borderColor = "rgba(64, 64, 64, 1)";
    description.style.transform = `translate(
        ${coords.left + coords.width / 2 - descriptionWidth / 2}px,
        ${coords.top + coords.height + 5}px)`;
    description.style.zIndex = 0;
}

function hideDescription() {
    // remove all children from description
    while (description.firstChild != null) {
        description.removeChild(description.firstChild);
    }

    // disable visibility
    description.style.background = "rgba(32, 32, 32, 0)";
    description.style.color = "rgba(192, 192, 192, 0)";
    description.style.borderColor = "rgba(64, 64, 64, 0)";
    description.style.zIndex = -1;
}

/* findDescription would easily allow brief descriptions to be added
 * using the Placeholder method as a template. */
function findDescription(a) {
    switch (a.textContent)
    {
        //case "consectetur":
        //    consectetur();
        //    break;

        //case "explicabo":
        //    explicabo();
        //    break;

        default:
            placeholder();
            break;
    }
}

function placeholder() {
    const image = document.createElement("img");
    image.src = "Placeholder.png";
    image.style.width = "120px";
    image.style.height = "120px";
    description.appendChild(image);

    const header = document.createElement("h3");
    header.textContent = "Placeholder";
    description.appendChild(header);

    const text = document.createElement("p");
    text.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, deserunt facilis et iste corrupti omnis tenetur est. Iste ut est dicta dolor itaque adipisci, dolorum minima, veritatis earum provident error molestias. Ratione magni illo sint vel velit ut excepturi consectetur suscipit, earum modi";
    description.appendChild(text);
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
triggers.forEach(a => a.addEventListener('mouseleave', hideDescription))
window.addEventListener("resize", backgroundUpdate);
backgroundUpdate();