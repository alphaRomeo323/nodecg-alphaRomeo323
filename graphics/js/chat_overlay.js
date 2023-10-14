import anime from "../../node_modules/animejs/lib/anime.es.js"

const chatElem = document.getElementById("chat");

const deadline = 6
const timeToLive = 60 // sec
const duration = 1000 // milisec

export const ChatOverlay = (nodecg) => {
    nodecg.Replicant("chat", 'nodecg-livechat').on("change", (newValue) => {
        if (typeof newValue === "undefined"){
            return;
        }
        let tmpElem = document.getElementById("chat-template").cloneNode(true);
        tmpElem.id = "";
        tmpElem.firstElementChild.innerText = newValue.author;
        let tempClildElm = tmpElem.lastElementChild;
        switch(newValue.platform){
            case "youtube":
                tempClildElm.lastElementChild.classList.add("bg-rose-200/75")
                if( newValue.avatar != ""){
                    tempClildElm.firstElementChild.src = newValue.avatar;
                }
                tempClildElm.lastElementChild.innerText = ""
                newValue.message.forEach(element => {
                    if ( typeof element.text !== "undefined"){
                        const newText = document.createTextNode(element.text)
                        tempClildElm.lastElementChild.appendChild(newText)
                    }
                    else if( typeof element.emojiText !== "undefined"){
                        if (element.isCustomEmoji === true){
                            const newCustomEmoji = document.createElement("img");
                            newCustomEmoji.src = element.url;
                            newCustomEmoji.classList.add("h-8")
                            tempClildElm.lastElementChild.appendChild(newCustomEmoji)
                        }
                        else {
                            const newEmoji = document.createTextNode(element.emojiText)
                            tempClildElm.lastElementChild.appendChild(newEmoji)
                        }
                
                    }
                });
                break;
            case "twitch":
                tempClildElm.lastElementChild.classList.add("bg-purple-200/75")
                tempClildElm.firstElementChild.src = "svg/TwitchGlitchPurpleBorder.svg";
                tempClildElm.lastElementChild.innerText = newValue.message;
                break;
            default:
                return;

        }
        tmpElem.classList.remove("hidden")
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
        if (chatElem.childNodes.length > deadline) {
            chatElem.removeChild(chatElem.firstElementChild)
        }
    });

    nodecg.Replicant("chat", 'nodecg-discord-utils').on("change", (newValue) => {
        let tmpElem = document.getElementById("chat-template").cloneNode(true);
        tmpElem.id = "";
        tmpElem.firstElementChild.innerText = newValue.name;
        let tempClildElm = tmpElem.lastElementChild;
        tempClildElm.lastElementChild.classList.add("bg-indigo-200/75")
        if( newValue.avatar !== ""){
            tempClildElm.firstElementChild.src = newValue.avatar;
        }
        tempClildElm.lastElementChild.innerText = newValue.content;
        tmpElem.classList.remove("hidden")
        const newelm = chatElem.appendChild(tmpElem);
        let tl = anime.timeline({
            easing: 'easeOutExpo',
            duration: 750,
        });
        tl.add({
            targets: newelm,
            opacity: [{ value: 0, duration: 0 }, { value: 1 }],
            translateX: [{ value: -100, duration: 0 }, { value: 0 }],
            duration,
        });
        tl.add({
            targets: newelm,
            opacity: 0,
            delay: timeToLive * 1000,
            duration,
        })
        if (chatElem.childNodes.length > deadline) {
            chatElem.removeChild(chatElem.firstElementChild)
        }
    });
}