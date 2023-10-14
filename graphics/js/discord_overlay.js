import anime from "../../node_modules/animejs/lib/anime.es.js"

const deadline = 6
const timeToLive = 60 // sec
const duration = 1000 // milisec

export const VoiceOverlay = (nodecg) => {
    nodecg.Replicant("vc", 'nodecg-discord-utils').on("change", (newValue) => {
        const vcElem = document.getElementById("vc");
        let child = vcElem.lastElementChild;
        while (child) {
            vcElem.removeChild(child);
            child = vcElem.lastElementChild;
        }
        newValue.forEach((value) => {
            let tmpElem = document.getElementById("vc-template").cloneNode(true);
            tmpElem.classList.remove("hidden")
            tmpElem.id = "";
            tmpElem.firstElementChild.src = value.avatar;
            tmpElem.lastElementChild.innerText = value.name;
            if (value.speaking) {
                tmpElem.firstElementChild.classList.add("outline-emerald-500", "outline", "outline-4")
            }
            vcElem.appendChild(tmpElem);
        })
    });
}