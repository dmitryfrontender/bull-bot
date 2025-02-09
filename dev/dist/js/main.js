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
	roulette();
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

const advProcess = (block, timer, button) => {
	const time = timer.text();
	let counter = 0;

	const interval = setInterval(() => {
		counter++;

		if (time - counter === 0) {
			button.removeClass('inactive');

			button.on('click', () => {
				block.removeClass('active');
			});

			clearInterval(interval);
		}

		timer.text(time - counter);
	}, 1000);
}

const startMining = () => {
	const startBtn = $('.js-start-mining');
	const wrapperBlock = $('.app-wrapper');
	const popupBlock = $('.popup-adv-block');
	const advTimer = $('.js-adv-timer');
	const skipAdvButton = $('.js-close-ads');
	startBtn.on('click', () => {
		if (wrapperBlock.hasClass('mining-started')) return;
		wrapperBlock.addClass('mining-started');
		timerFunction();

		popupBlock.addClass('active');
		advProcess(popupBlock, advTimer, skipAdvButton);
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

// ROULETTE
const roulette = () => {
	const roulette = $('#roulette');

	if (!roulette.length) return;

	const startButton = $('#startButton')[0];
	const popupBlock = $('.popup-block');
	const prizeImg = $('.js-prize-img');
	const restartButton = $('.js-restart-roulette-btn');
	const itemWidth = 133; // width + margins
	let isSpinning = false;
	let lastWinningElement = null;

	function createPrizeItems() {
		// Create four sets of prizes
		const allPrizes = [...prizes, ...prizes, ...prizes, ...prizes];

		// Empty the roulette
		roulette.innerHTML = '';

		// Append prize items to the roulette
		allPrizes.forEach(prize => {
			const item = `
				<div class="prize-item" data-value="${prize.value}">
					<div class="prize-item-wrapper">
						<div class="prize-item-image">
							<img src="${prize.url}" alt="${prize.title}">
						</div>
						<p>${prize.title}</p>
					</div>
				</div>
			`;
			roulette.append(item);
		});
	}

	function centerRoulette() {
		const containerWidth = $('.roulette-container')[0].offsetWidth;

		const centerPosition = (containerWidth - itemWidth) / 2;

		roulette[0].style.transition = 'none';
		roulette[0].style.transform = `translateX(${centerPosition}px)`;
		roulette[0].offsetHeight; // Force reflow
	}

	function determineWinner() {
		const containerRect = $('.roulette-container')[0].getBoundingClientRect();
		const centerX = containerRect.left + containerRect.width / 2;

		let closestElement = null;
		let minDistance = Infinity;

		Array.from(roulette[0].children).forEach(element => {
			const rect = element.getBoundingClientRect();
			const elementCenterX = rect.left + rect.width / 2;
			const distance = Math.abs(elementCenterX - centerX);

			if (distance < minDistance) {
				minDistance = distance;
				closestElement = element;
			}
		});

		return closestElement;
	}

	function spin() {
		if (isSpinning) return;
		isSpinning = true;
		startButton.disabled = true;

		// Remove previous winner class if exists
		if (lastWinningElement) {
			lastWinningElement.classList.remove('winner');
		}

		// Get current position
		const currentTransform = getComputedStyle(roulette[0]).transform;
		const matrix = new DOMMatrix(currentTransform);
		const currentX = matrix.m41;

		// Calculate spin distance
		const spinDistance = (prizes.length * 2 + randomPrizeIndex) * itemWidth;

		// Enable transition and spin
		roulette[0].style.transition = 'transform 4s cubic-bezier(0.1, 0.7, 0.29, 0.99)';
		roulette[0].style.transform = `translateX(${currentX - spinDistance}px)`;

		// Handle spin completion
		setTimeout(() => {
			const winningElement = determineWinner();
			if (winningElement) {
				lastWinningElement = winningElement;
				winningElement.classList.add('winner');
				const prize = winningElement.dataset.value;

				prizeImg.attr('src', prizes[prize].url);

				popupBlock.addClass('active');

				restartButton.on('click', () => {
					popupBlock.removeClass('active');
					centerRoulette();
				});
			}

			isSpinning = false;
			startButton.disabled = false;
		}, 4000);
	}

	// Initialize
	createPrizeItems();
	centerRoulette();

	// Event listeners
	startButton.addEventListener('click', spin);
	window.addEventListener('resize', () => {
		if (!isSpinning) {
			centerRoulette();
		}
	});
};