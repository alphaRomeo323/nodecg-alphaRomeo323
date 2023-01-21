module.exports = function (nodecg) {
    const twitterHandleRep = nodecg.Replicant("twitter-handle");
    const descriptionRep = nodecg.Replicant("description");

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