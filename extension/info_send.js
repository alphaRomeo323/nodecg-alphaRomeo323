module.exports = (nodecg) => {
    const twitterHandleRep = nodecg.Replicant("twitter-handle");
    const MisskeyAcctRep = nodecg.Replicant("misskey-acct");
    const descriptionRep = nodecg.Replicant("description");
    const guestsRep = nodecg.Replicant("guests");
    const additionalInfo = nodecg.Replicant("additional-info");
    const guestHead = "ゲスト: "
    let frameInfo = [];
    let queueInfo = [];

    if(typeof twitterHandleRep.value === 'string' && twitterHandleRep.value !== ''){
        frameInfo.push({ 
            'svg': "x.svg",
            'materialIcon': "",
            'content': "@"+twitterHandleRep.value
        })
        queueInfo.push({ 
            'svg': "x.svg",
            'materialIcon': "",
            'content': "@"+twitterHandleRep.value
        })
    }
    if(typeof MisskeyAcctRep.value === 'string' && MisskeyAcctRep.value !== ''){
        frameInfo.push({ 
            'svg': "misskey.svg",
            'materialIcon': "",
            'content': MisskeyAcctRep.value
        })
        queueInfo.push({ 
            'svg': "misskey.svg",
            'materialIcon': "",
            'content': MisskeyAcctRep.value
        })
    }
    if(typeof descriptionRep.value === 'string' && descriptionRep.value != undefined){
        frameInfo.push({ 
            'svg': "",
            'materialIcon': "description",
            'content': descriptionRep.value.replace(/\n/g," ")
        })
    }
    if(typeof guestsRep.value === 'object' && guestsRep.value.length > 0){
        let info = {
            'svg': "",
            'materialIcon': "people",
            'content': guestHead
        }
        guestsRep.value.forEach(element => {
            if (info.content !== guestHead)
                info.content += " / ";
            info.content += element;
        });
        frameInfo.push(Object.assign({}, info));
    }
    if(typeof additionalInfo.value === 'object' &&  additionalInfo.value !== []){
        additionalInfo.value.forEach(element =>{
            if(element.queue){
                queueInfo.push(Object.assign({}, element));
            }
            if(element.frame){
                element.content = element.content.replace(/\n/g," ")
                frameInfo.push(Object.assign({}, element));
            }
        })
    }
    nodecg.Replicant("frame-info").value = frameInfo;
    nodecg.Replicant("queue-info").value = queueInfo;
}
