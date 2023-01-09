const clock = e => {
	const chk = i => {
		if (i < 10) {
			return '0' + i;
		}

		return i;
	};

	const time = new Date();
	e.innerText = chk(time.getHours()) + ':' + chk(time.getMinutes()) + ':' + chk(time.getSeconds());
};
