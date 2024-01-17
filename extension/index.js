const send = require("./info_send");
const api = require('./api');

module.exports = function (nodecg) {
    const playBackRep = nodecg.Replicant("playback");
    const activeRep = nodecg.Replicant("mopidy-active");
    const guestsRep = nodecg.Replicant("guests");
    const router = nodecg.Router();
    api(router, nodecg);
    nodecg.mount("/api", router);
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