import anime from "../../node_modules/animejs/lib/anime.es.js"
const duration = 1000
export const clock = e => {
	const chk = i => {
		if (i < 10) {
			return '0' + i;
		}

		return i;
	};

	const time = new Date();
	e.innerText = chk(time.getHours()) + ':' + chk(time.getMinutes()) + ':' + chk(time.getSeconds());
};

export const textFadeUpdate = (newValue,textElm,divElm,maxSize) => {
	anime({
		targets: textElm,
		opacity: [{ value: 1, duration: 0 }, { value: 0 }],
		duration,
		easing: "linear",
		complete: () => {
			if ( newValue != undefined){
				textElm.innerText = newValue
				if(maxSize){
					divElm.style.fontSize = maxSize + 'px';
					for(
						let size = maxSize;
						divElm.getBoundingClientRect().height < divElm.scrollHeight && size > 12;
						size--
					) {
						divElm.style.fontSize = size + 'px';
					}
				}
			}
			anime({
				targets: textElm,
				opacity: [{ value: 0, duration: 0 }, { value: 1 }],
				duration,
				delay: duration / 2,
				easing: "linear",
			});
		}
	});
}