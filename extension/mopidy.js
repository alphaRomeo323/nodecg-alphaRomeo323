const Mopidy = require("mopidy");


module.exports = (mopidy, nodecg) => {
    const logRep = nodecg.Replicant("mopidy-connection-log");
    const playBackRep =nodecg.Replicant("playback");
    let errorCount = 0;
    mopidy.on("websocket:error", (error) => {
        nodecg.log.error(`WebSocket error: ${error.message}`);
        errorCount += 1;
        if(errorCount > 5){
            mopidy.close();
            nodecg.log.info("Mopidy client is no longer listening");
            logRep.value = "Closed..."
        }
    });

    mopidy.on("state:online", async () => {
        nodecg.log.info("Mopidy server is online.")
        logRep.value = "Online!"
        errorCount = 0;
        
    });
    mopidy.on("state:offline", () => {
        nodecg.log.info("Mopidy server is now offline.")
        if( logRep.value === "Closed..."){
            logRep.value = "Offline"
        }
    })

    mopidy.on("event:trackPlaybackStarted", ({ tl_track  }) =>{
        const currentTrack = tl_track.track; 
        let artist;
        let album;
        if (currentTrack.artists !== undefined)
            artist = currentTrack.artists.map((a) => a.name).join(", ")
        else artist = "";
        if (currentTrack.album !== undefined)
            album = currentTrack.album.name;
        else album = "";
        playBackRep.value = {
            track: currentTrack.name,
            artist,
            album,
            playing: true
        }
    })

    mopidy.on("event:playbackStateChanged", ({ new_state }) => {
        switch (new_state) {
            case "playing":
              playBackRep.value.playing = true;
              break;
            case "paused":
            case "stopped":
              playBackRep.value.playing = false;
              break;
            default:
          }
      });

}