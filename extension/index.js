const send = require("./info_send");

module.exports = function (nodecg) {
    const playBackRep = nodecg.Replicant("playback");
    const activeRep = nodecg.Replicant("mopidy-active");
    const guestsRep = nodecg.Replicant("guests");

    //Initialize
    if ( typeof guestsRep.value !== "object")
        guestsRep.value = [];
    playBackRep.value = { playing: false };
    activeRep.value = false;

    //callback of replicants
    nodecg.Replicant("description").on("change", ()=>{
        send(nodecg);
    })
    nodecg.Replicant("twitter-handle").on("change", ()=>{
        send(nodecg);
    })
    nodecg.Replicant("misskey-acct").on("change", ()=>{
        send(nodecg);
    })
    nodecg.Replicant("youtube-handle").on("change", ()=>{
        send(nodecg);
    })
    nodecg.Replicant("twitch-id").on("change", ()=>{
        send(nodecg);
    })
    nodecg.Replicant("guests").on("change", () => {
        send(nodecg);
    })
    nodecg.Replicant("additional-info").on("change", () => {
        send(nodecg);
    })
}