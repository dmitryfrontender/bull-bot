$(document).ready(function(){
	//calls functions
	plugOpenPopup();
	claimOpenPopup();
	plugClosePopup();
	infoOpenPopup();
	timerPlugFunction();
	initSwiper();
	tabsInit();
	startMining();
	startTask();
	copyToClipboard();
});

//functions
const plugOpenPopup = () => {
	const joinBtn = $('.js-join-btn');
	const popupBlock = $('.popup-block');
	joinBtn.on('click', () => {
		popupBlock.addClass('active');
	});
}

const claimOpenPopup = () => {
	const joinBtn = $('.js-claim-button');
	const popupBlock = $('.popup-block');
	joinBtn.on('click', () => {
		popupBlock.addClass('active');
	});
}

const infoOpenPopup = () => {
	const joinBtn = $('.js-info-button');
	const popupBlock = $('.popup-block');
	joinBtn.on('click', () => {
		popupBlock.addClass('active');
	});
}

const plugClosePopup = () => {
	const submitBtn = $('.js-submit-btn');
	const popupBlock = $('.popup-block');
	const actionBlock = $('.action-block');

	submitBtn.on('click', () => {
		popupBlock.removeClass('active');
		actionBlock.addClass('active');
	});
}

const timerPlugFunction = () => {
	$('#simple_timer').syotimer({
		date: new Date(2035, 4, 9, 20, 30),
	});
};

const timerFunction = () => {
	$('#simple_mine_timer').syotimer({
		date: new Date(2025, 1, 7, 20, 30, 0),
		layout: "hms",
	});
};

const timerPopupFunction = () => {
	$('#simple_popup_timer').syotimer({
		date: new Date(2025, 0, 8, 20, 30, 0),
		layout: "ms",
	});
};

const startMining = () => {
	const startBtn = $('.js-start-mining');
	const wrapperBlock = $('.app-wrapper');
	startBtn.on('click', () => {
		if (wrapperBlock.hasClass('mining-started')) return;
		wrapperBlock.addClass('mining-started');
		timerFunction();
	});
}

const startTask = () => {
	const startBtn = $('.js-start-task');
	const defaultBlock = $('.default-state');
	const startBlock = $('.start-state');

	startBtn.on('click', () => {
		if (defaultBlock.hasClass('active')) {
			defaultBlock.removeClass('active');
			startBlock.addClass('active');
			timerPopupFunction();
		}
	});
}

const initSwiper = () => {
	const swiper = new Swiper('.swiper', {
		// Optional parameters
		loop: false,
		slidesPerView: 2,
		slidesPerGroup: 2,
      	spaceBetween: 10,

		// If we need pagination
		pagination: {
		  el: '.swiper-pagination',
		},

		// Navigation arrows
		navigation: false,
	});
};

const tabsInit = () => {
	const tabs = document.querySelectorAll('.tab');
	const contents = document.querySelectorAll('.tabcontent');

	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			contents.forEach(content => content.classList.remove('active'));
			document.getElementById(tab.dataset.content)?.classList.add('active');
		});
	});
};

const copyToClipboard = () => {
	// Get the text field
	var copyText = document.querySelector(".js-input-copy");
	var copyButton = document.querySelector(".js-button-copy");

	copyButton?.addEventListener('click', () => {
		// Select the text field
		copyText?.select();
		copyText?.setSelectionRange(0, 99999); // For mobile devices

		// Copy the text inside the text field
		navigator.clipboard.writeText(copyText?.value);
	});
}