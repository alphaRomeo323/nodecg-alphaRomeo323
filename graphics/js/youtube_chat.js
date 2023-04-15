import anime from "../../node_modules/animejs/lib/anime.es.js"

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
        tmpElem.lastElementChild.classList.add("bg-rose-200/50")
        tmpElem.id = "";
        if( newValue.avatar != ""){
            tmpElem.firstElementChild.src = newValue.avatar;
        }
        let MessageTemp = ""
        newValue.message.forEach(element => {
            if ( typeof element.text !== "undefined"){
                MessageTemp += element.text
            }
            else if( typeof element.emojiText !== "undefined"){
                if (element.isCustomEmoji === true){
                    MessageTemp += `<img src="${element.url}" class="h-8">`
                }
                else {
                    MessageTemp += element.emojiText
                }
                
            }
        });
        tmpElem.lastElementChild.innerHTML = MessageTemp;
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