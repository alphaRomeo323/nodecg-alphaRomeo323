/**
 * Setup Router
 * @param {Router} router 
 * @param {NodeCG} nodecg 
 */
module.exports = (router, nodecg) => {
    let timer = setTimeout(() =>{
        nodecg.Replicant("playback").value = {
            state : 0,
            title : "",
            artist: "",
            album : ""
        };
    }, 1000);
    router.post("/playback", (req, res) => {
        const { state } = req.body;
        const { title } = req.body;
        const { artist } = req.body;
        const { album } = req.body;
        if ( typeof state === "string" && typeof title === "string") {
            res.send('{result: "ok", error: null}');
            clearTimeout(timer);
            nodecg.Replicant("playback").value = {
                state : Number(state),
                title,
                artist,
                album
            };
            timer = setTimeout(() =>{
                nodecg.Replicant("playback").value = {
                    state : 0,
                    title : "",
                    artist: "",
                    album : ""
                };
            }, 900000)
        } else {
            res.send('{result: "ng", "error": "Invaild type"}'); 
        }
    });
}