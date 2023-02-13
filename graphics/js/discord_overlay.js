import anime from "../../node_modules/animejs/lib/anime.es.js"

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
export const ChatOverlay = (nodecg) => {
    nodecg.Replicant("chat", 'nodecg-discord-utils').on("change", (newValue) => {
        const chatElem = document.getElementById("chat");
        let tmpElem = document.getElementById("chat-template").cloneNode(true);
        tmpElem.classList.remove("hidden")
        tmpElem.id = "";
        if( newValue.avatar != ""){
            tmpElem.firstElementChild.src = newValue.avatar;
        }
        tmpElem.lastElementChild.innerText = newValue.content;
        const newelm = chatElem.appendChild(tmpElem);
        let tl = anime.timeline({
            easing: 'easeOutExpo',
            duration: 750,
        });
        tl.add({
            targets: newelm,
            opacity: [{ value: 0, duration: 0 }, { value: 1 }],
            translateX: [{ value: -100, duration: 0 }, { value: 0 }],
            duration: 1000,
        });
        tl.add({
            targets: newelm,
            opacity: 0,
            delay: 10000,
            duration: 1000,
        })
        setTimeout(function () {
            chatElem.removeChild(newelm)
        }, 11000)
        if (chatElem.childNodes.length > 6) {
            chatElem.removeChild(chatElem.firstElementChild)
        }
    });
}