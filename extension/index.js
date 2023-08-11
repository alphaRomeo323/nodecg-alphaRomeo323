const Mopidy = require("mopidy")
const mopidyModule = require("./mopidy")
const send = require("./info_send")

module.exports = function (nodecg) {
    const playBackRep = nodecg.Replicant("playback");
    playBackRep.value = { playing: false };

    //mopidy websocket
    if (nodecg.bundleConfig.mopidyWebSocket){
        const mopidy = new Mopidy({
            webSocketUrl: nodecg.bundleConfig.mopidyWebSocket,    
        })
        mopidy.on("state:online", async () => {
            nodecg.log.info("Mopidy extension is ready.")
            mopidyModule(mopidy,nodecg);
        });
        mopidy.on("websocket:error", (error) => {
            nodecg.log.error(`WebSocket error: ${error.message}`);
        });
    }
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