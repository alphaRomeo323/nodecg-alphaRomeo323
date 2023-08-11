import anime from "../../node_modules/animejs/lib/anime.es.js"

const deadline = 6
const timeToLive = 60 // sec
const duration = 1000 // milisec

export const YoutubeChatOverlay = (nodecg) => {
    nodecg.Replicant("chat", 'nodecg-livechat').on("change", (newValue) => {
        if (typeof newValue === "undefined"){
            return;
        }
        if (newValue.platform !== "youtube"){
            return;
        }
        const chatElem = document.getElementById("chat");
        let tmpElem = document.getElementById("chat-template").cloneNode(true);
        tmpElem.classList.remove("hidden")
        tmpElem.lastElementChild.classList.add("bg-rose-200/75")
        tmpElem.id = "";
        if( newValue.avatar != ""){
            tmpElem.firstElementChild.src = newValue.avatar;
        }
        tmpElem.lastElementChild.innerText = ""
        newValue.message.forEach(element => {
            if ( typeof element.text !== "undefined"){
                const newText = document.createTextNode(element.text)
                tmpElem.lastElementChild.appendChild(newText)
            }
            else if( typeof element.emojiText !== "undefined"){
                if (element.isCustomEmoji === true){
                    const newCustomEmoji = document.createElement("img");
                    newCustomEmoji.src = element.url;
                    newCustomEmoji.classList.add("h-8")
                    tmpElem.lastElementChild.appendChild(newCustomEmoji)
                }
                else {
                    const newEmoji = document.createTextNode(element.emojiText)
                    tmpElem.lastElementChild.appendChild(newEmoji)
                }
                
            }
        });
        const newelm = chatElem.appendChild(tmpElem);
        let tl = anime.timeline({
            easing: 'easeOutExpo',
            duration: 750,
        });
        tl.add({
            targets: newelm,
            opacity: [{ value: 0, duration: 0 }, { value: 1 }],
            translateX: [{ value: -100, duration: 0 }, { value: 0 }],
            duration
        });
        tl.add({
            targets: newelm,
            opacity: 0,
            delay: timeToLive * 1000,
            duration
        })
        setTimeout(function () {
            chatElem.removeChild(newelm)
        }, timeToLive * 1000 + duration)
        if (chatElem.childNodes.length > deadline) {
            chatElem.removeChild(chatElem.firstElementChild)
        }
    });
}