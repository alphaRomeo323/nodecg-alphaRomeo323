import anime from "../../node_modules/animejs/lib/anime.es.js"
const BGMdelay = 10000;


export const currentTrackUpdate = (replicant) => {
    const currentBGMElm = document.getElementById("current-temp");
    const frameElm = document.getElementById("current");
    const trackNameElm = document.getElementById("track-name");
    const trackArtistElm = document.getElementById("track-artist");
    const trackAlbumElm = document.getElementById("track-album");
    trackNameElm.id = "";
    trackArtistElm.id = ""
    trackAlbumElm.id = ""

    replicant.on("change",(newValue) =>{
        if(frameElm.lastElementChild)
            frameElm.removeChild(frameElm.lastElementChild);
        if (newValue.playing === false)
            return;
        trackNameElm.innerText = newValue.track;
        if (newValue.artist !== "")
            trackArtistElm.innerText = `by ${newValue.artist}`;
        if (newValue.album !== "")
            trackAlbumElm.innerText = `from ${newValue.album}`;
        let tmpElem = currentBGMElm.cloneNode(true);
        tmpElem.classList.remove("hidden");
        tmpElem.id = "current-anime"
        let tl = anime.timeline({
            easing: 'easeOutExpo',
            duration: 750,
            });
        tl.add({
            targets:tmpElem,
            translateX: [{ value: 380, duration: 0 }, { value: 0 }],
        duration: 1000,
        });
        tl.add({
            targets:tmpElem,
            translateX: 380,
            duration: 1000,
            delay: BGMdelay,
        });
        frameElm.appendChild(tmpElem);
    });
}