const Mopidy = require("mopidy")
const mopidyModule = require("./mopidy")
const send = require("./info_send");

module.exports = function (nodecg) {
    const playBackRep = nodecg.Replicant("playback");
    const activeRep = nodecg.Replicant("mopidy-active");
    const logRep = nodecg.Replicant("mopidy-connection-log");
    const guestsRep = nodecg.Replicant("guests");

    //Initialize
    if ( typeof guestsRep.value !== "object")
        guestsRep.value = [];
    playBackRep.value = { playing: false };
    activeRep.value = false;
    logRep.value = "Closed..."

    let mopidy;

    //mopidy websocket
    activeRep.on("change", (newValue) => {
        if (newValue === true){
            if (typeof mopidy === "object"){
                mopidy.close()
            }
            logRep.value = "Added New Client..."
            mopidy = new Mopidy({
                webSocketUrl: nodecg.Replicant("mopidy-server").value,    
            })
            nodecg.log.info("Added new Mopidy client.")
            mopidyModule( mopidy, nodecg )
        }
    })
    
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
    nodecg.Replicant("guests").on("change", () => {
        send(nodecg);
    })
    nodecg.Replicant("additional-info").on("change", () => {
        send(nodecg);
    })
}