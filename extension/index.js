const Mopidy = require("mopidy")
const mopidyModule = require("./mopidy")

module.exports = function (nodecg) {
    const twitterHandleRep = nodecg.Replicant("twitter-handle");
    const descriptionRep = nodecg.Replicant("description");
    const playBackRep = nodecg.Replicant("playback");
    playBackRep.value = { playing: false };

    const mopidy = new Mopidy({
        autoConnect: true,
        webSocketUrl: "ws://localhost:6680/mopidy/ws",
      });
    mopidy.on("state:online", async () => {
        nodecg.log.info("Mopidy extension is ready.")
        mopidyModule(mopidy,nodecg);
    })

    mopidy.on("websocket:error", (error) => {
        nodecg.log.error(`WebSocket error: ${error.message}`);
        nodecg.log.error(`You can continue using bundle, but Mopidy extension is disabled.`);
      });

    const send = () =>{
        let frameInfo = [];
        let queueInfo = [];

        if(twitterHandleRep.value !== '' && twitterHandleRep.value != undefined){
            frameInfo.push({ 
                'svg': "twitter_logo_black.svg",
                'materialIcon': "",
                'content': "@"+twitterHandleRep.value
            })
            queueInfo.push({ 
                'svg': "twitter_logo_white.svg",
                'materialIcon': "",
                'content': "@"+twitterHandleRep.value
            })
        }
        if(descriptionRep.value !== '' && descriptionRep.value != undefined){
            frameInfo.push({ 
                'svg': "",
                'materialIcon': "description",
                'content': descriptionRep.value.replace(/\n/g," ")
            })
        }
        nodecg.Replicant("frame-info").value = frameInfo; 
    }

    twitterHandleRep.on("change", ()=>{
        send();
    })
    descriptionRep.on("change", ()=>{
        send();
    })
}