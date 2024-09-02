//  nav link and animation ////////////////////////////////////////////////
const header = document.querySelector(".header");
const hero = document.querySelector(".hero_section");
const navLinks = document.querySelectorAll(".link");
const toTop = document.querySelector(".top");
const logos = document.querySelectorAll(".link_logo");
const menu = document.querySelector(".menu");
const navMenuToggle = document.querySelector(".nav_link");
const reelsControl = document.querySelector(".play-btn");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

function hideBodyContent(v) {
	if (v) {
		main.setAttribute("inert", "");
		footer.setAttribute("inert", "");
	} else {
		main.removeAttribute("inert");
		footer.removeAttribute("inert");
	}
}

//  menu navigation ///////////////////////////////////////////////
let nav_menu = document.querySelector(".nav_menu");
let media = window.matchMedia("(width < 850px");

function setTopNav(e) {
	if (e.matches) {
		nav_menu.setAttribute("inert", "");
	} else {
		nav_menu.removeAttribute("inert");
	}
}

setTopNav(media);
media.addEventListener("change", function () {
	setTopNav(media);
});
menu.addEventListener("click", function () {
	navMenuToggle.classList.toggle("active");
	menu.querySelectorAll("i").forEach((icon) => icon.classList.toggle("remove"));
	if (navMenuToggle.classList.contains("active")) {
		navMenuToggle.setAttribute("aria-expanded", "true");
		nav_menu.removeAttribute("inert");
		hideBodyContent(true);
	} else {
		navMenuToggle.setAttribute("aria-expanded", "false");
		nav_menu.setAttribute("inert", "");
		hideBodyContent(false);
	}
});

// close menu on click link////
navLinks.forEach((close_link) => {
	close_link.addEventListener("click", function () {
		navMenuToggle.classList.remove("active");
		menu.querySelectorAll("i").forEach((icon) => icon.classList.toggle("remove"));
		navMenuToggle.setAttribute("aria-expanded", "false");
		hideBodyContent(false);
	});
});

// sticky header ////////////////////////////////////////////////
window.addEventListener("scroll", () => {
	header.classList.toggle("sticky", window.scrollY > 20);
	toTop.classList.toggle("backToTop", window.scrollY > 5);
});

// function resetLinkState() {
// 	navLinks.forEach((close_link) => {
// 		close_link.classList.remove("active");
// 	});
// }

// // handle active link on click clicks //////////////////////////////
// navLinks.forEach((link) => {
// 	link.addEventListener("click", () => {
// 		resetLinkState();
// 		link.classList.add("active");
// 	});
// });

// handle active links on scroll //////////////////////////////

let sections = document.querySelectorAll(".section");

window.addEventListener("scroll", function () {
	sections.forEach((section) => {
		let sectionID = section.getAttribute("id");
		let sectionHeight = section.offsetHeight;
		let sectionTop = section.offsetTop - 250;
		let windowScrollY = window.scrollY;

		if (windowScrollY >= sectionTop && windowScrollY < sectionTop + sectionHeight) {
			document.querySelector(`.nav_link a[nav_link_a=${sectionID}]`).classList.add("active");
		} else {
			document.querySelector(`.nav_link a[nav_link_a=${sectionID}]`).classList.remove("active");
		}
	});
});

// reels animation///////////////////////////////////////////////////////////////////////////

let imageView = document.querySelector(".image_view");
let imgs = document.querySelectorAll(".img");

let imageSize = imageView.clientWidth;
let imageLength = imgs.length;
let imageWrapperLength = imageSize * (imageLength - 1);

function ImageResize(value) {
	imgs.forEach((child) => {
		child.style.width = `${value}px`;
	});
}
ImageResize(imageSize);
window.addEventListener("resize", function () {
	console.log(imageView.clientWidth);
	imageSize = imageView.clientWidth;
	ImageResize(imageSize);
	imageWrapperLength = imageSize * (imageLength - 1);
});

// hero image reels and dots dot animation////////////////////////////////////////////////
let imageWrapper = document.querySelector(".image-wrapper");
let dots = document.querySelectorAll(".reels");

let mouseHover = false;

let translatePosition = 0;
let selectedDot = 0;
let pauseSlider = true;
let interval = null;

function resetDots() {
	dots.forEach((reel) => {
		reel.classList.remove("reel_active");
	});
}

// reels control function////////////////////////////////////////////////
function sliderFunction() {
	if (translatePosition <= -imageWrapperLength) {
		translatePosition = 0;
		resetDots();
		selectedDot = 0;
	} else {
		translatePosition -= imageSize;
		resetDots();
		selectedDot += 1;
	}
	dots[selectedDot].classList.add("reel_active");
	imageWrapper.style.transform = `translate(${translatePosition}px)`;
}

function runSliderAnimation() {
	if (pauseSlider == false) {
		window.clearInterval(interval);
	} else {
		interval = setInterval(sliderFunction, 4000);
	}
}
runSliderAnimation();

//  reels control //////////////////////////////////////////
let play = document.querySelector(".play");
let pause = document.querySelector(".pause");
reelsControl.addEventListener("click", function () {
	pauseSlider = !pauseSlider;
	play.classList.toggle("active");
	pause.classList.toggle("active");

	runSliderAnimation();
	if (pause.classList.contains("active")) {
		pause.parentElement.setAttribute("aria-checked", "false");
	} else {
		pause.parentElement.setAttribute("aria-checked", "true");
	}
});

// MODEL #############################################################

let model = document.querySelector(".model");
let modelCloseBtn = document.querySelector(".close_model");
let allBtn = document.querySelectorAll(".btn");

allBtn.forEach((btn) => {
	btn.addEventListener("click", function () {
		if (btn.classList.contains("toFP")) {
		} else {
			model.classList.add("active");
			model.removeAttribute("inert");
			modelCloseBtn.focus();
		}
	});
});

// close model ////////////////////////////
modelCloseBtn.addEventListener("click", () => {
	model.classList.remove("active");
	model.setAttribute("inert", "");
});

// form handling and validation ##################################################################
let form = document.querySelector("form");
let modelText = document.querySelector(".model_text");
let userName = document.querySelector(".name");
let userEmail = document.querySelector(".email");
let userNumber = document.querySelector(".number");
let userMsg = document.querySelector(".msg");
// handle on submit/////////////
form.addEventListener("submit", function (e) {
	e.preventDefault();
	if (validation()) {
		modelText.innerText = `🙏thank you ${userName.value.trim()} for checking-out this website, the page you currently seek is not available.`;
		model.classList.add("active");
		let inputs = document.querySelectorAll(".input");
		inputs.forEach((input) => {
			input.value = "";
			input.classList.remove("success");
		});
	}
});
// form validation ///////////////

function validation() {
	let userNameVal = userName.value.trim();
	let userEmailVal = userEmail.value.trim();
	let userNumberVal = userNumber.value.trim();
	let userMsgVal = userMsg.value.trim();
	let validationSuccess = true;

	if (userNameVal == "") {
		validationSuccess = false;
		setError(userName, " full name is required");
	} else {
		success(userName);
	}

	if (userEmailVal == "") {
		validationSuccess = false;
		setError(userEmail, "email is required");
	} else if (!emailValidation(userEmailVal)) {
		validationSuccess = false;
		setError(userEmail, "please enter a valid email address");
	} else {
		success(userEmail);
	}

	if (userNumberVal == "") {
		validationSuccess = false;
		setError(userNumber, "number is required");
	} else {
		success(userNumber);
	}

	if (userMsgVal == "") {
		validationSuccess = false;
		setError(userMsg, "messages is required");
	} else {
		success(userMsg);
	}
	return validationSuccess;
}
// validation error function /////////////////////
function setError(inputElement, message) {
	let errorElement = inputElement.nextElementSibling;
	errorElement.classList.add("error");
	errorElement.innerText = message;

	inputElement.classList.remove("success");
}

// validation success function /////////////////////
function success(inputElement) {
	inputElement.classList.add("success");
	let errorElement = inputElement.nextElementSibling;
	errorElement.classList.remove("error");
	errorElement.innerText = "";
}

// email validation  function ////////////////////
function emailValidation(emailValue) {
	return String(emailValue)
		.toLowerCase()
		.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

// scroll reveal #############################################################################
const sr = ScrollReveal({
	origin: "bottom",
	distance: "30px",
	duration: 1500,
	reset: true,
});
sr.reveal(`.left_hero_section, .about_us_right, .card, .left_services, .b_card, .why_us_card, .test_right, .footer_content_left, .footer_bottom`).interval(200);
