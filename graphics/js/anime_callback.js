import anime from "../../node_modules/animejs/lib/anime.es.js"
const defaultFontSize = 32;
const scrollSpeed = 25;
const duration = 1000;

export const staticAnimCallback = (arg, targetElm, current) => {
    anime({
    targets: targetElm,
    opacity: [{value: 0,duration: 0}, {value: 1}],
    duration,
    endDelay: 5000,
    direction: 'alternate',
    easing: 'linear',
    complete: () => {
        console.log(arg[current]);
        document.getElementById("anim-icon").innerText = arg[current].icon;
        document.getElementById("anim-text").innerText = arg[current].detail;
        if(current === arg.length - 1) {
            current = 0;
        } else {
            current++;
        }
        staticAnimCallback(arg, targetElm, current);
    }
})};

export const ReplicantAnimCallback = (replicant, targetElm, current) => {
    const newValue = replicant.value[current];
    let tempHTML = ""
    if (newValue.svg !== ''){
        tempHTML += `<img src="svg/${newValue.svg}" class="h-6 float-left mt-2 mr-2">`
    }
    else if(newValue.materialIcon !== '') {
        tempHTML += `<span class="material-icons align-sub text-4xl mr-2">${newValue.materialIcon}</span>`
    }
    tempHTML += newValue.content;
    targetElm.innerHTML = tempHTML
    anime({
    targets: targetElm,
    opacity: [{value: 0,duration: 0}, {value: 1}],
    duration,
    endDelay: 5000,
    direction: 'alternate',
    easing: 'linear',
    complete: () => {
        if(current === replicant.value.length - 1) {
            current = 0;
        } else {
            current++;
        }
        ReplicantAnimCallback(replicant, targetElm, current);
    }
})};
export const ReplicantScrollCallback = (replicant, targetElm, current) => {
    const newValue = replicant.value[current];
    let messageLength = 0;
    let tempHTML = "";
    if (newValue.svg !== ''){
        tempHTML += `<img src="svg/${newValue.svg}" class="h-6 float-left mt-2 mr-2">`
    }
    else if(newValue.materialIcon !== '') {
        tempHTML += `<span class="material-icons align-sub text-4xl mr-2">${newValue.materialIcon}</span>`
        messageLength += 2;
    }
    tempHTML += newValue.content;
    messageLength += newValue.content.length
    targetElm.innerHTML = tempHTML
    anime({
        targets: targetElm,
        translateX: [{ value: window.innerWidth, duration: 0 }, { value: -1 * defaultFontSize * messageLength }],
        easing: "linear",
        duration: scrollSpeed * ( window.innerWidth + defaultFontSize * messageLength),
    complete: () => {
        if(current === replicant.value.length - 1) {
            current = 0;
        } else {
            current++;
        }
        ReplicantScrollCallback(replicant, targetElm, current);
    }
})};