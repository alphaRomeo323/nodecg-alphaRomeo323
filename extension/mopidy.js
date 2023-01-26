const Mopidy = require("mopidy");


module.exports = (mopidy, nodecg) => {

    const playBackRep =nodecg.Replicant("playback");
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