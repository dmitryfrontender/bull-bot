$(document).ready(function(){
	//calls functions
	plugOpenPopup();
	plugClosePopup();
	timerFunction();
});

// $(window).on('load', function () {
// 	//calls functions
// });

// $(window).on('resize', function () {
// 	//calls functions
// });

// $(window).load(function() {
// 	//calls functions
// });

// $(window).scroll(function() {
// 	//calls functions
// });

//functions
const plugOpenPopup = () => {
	const joinBtn = $('.js-join-btn');
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

const timerFunction = () => {
	$('#simple_timer').syotimer({
		date: new Date(2035, 4, 9, 20, 30),
	});

};