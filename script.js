//  nav link and animation ////////////////////////////////////////////////
const header = document.querySelector(".header");
const hero = document.querySelector(".hero_section");
const navLinks = document.querySelectorAll(".link");
const toTop = document.querySelector(".top");
const logos = document.querySelectorAll(".link_logo");

window.addEventListener("scroll", () => {
	header.classList.toggle("sticky", window.scrollY > 20);
});

// vvvvv reset links animation

function resetLinkState(toHome) {
	navLinks.forEach((close_link) => {
		close_link.classList.remove("active");
		if (toHome && close_link.textContent == "Home") {
			close_link.classList.add("active");
		} else {
		}
	});
}

// handle link clicks//////////////////////////////
navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		resetLinkState(false);
		link.classList.add("active");
	});
});

// handle back to top clicks//////////////////////////////
toTop.addEventListener("click", () => resetLinkState(true));

// handle logo link clicks//////////////////////////////
logos.forEach((logo) => {
	logo.addEventListener("click", () => resetLinkState(true));
});

// hero image and reels dot animation////////////////////////////////////////////////
const imageWrapper = document.querySelector(".image-wrapper");
const reels = document.querySelectorAll(".reels");

function animate() {
	let translatePosition = 0;
	let selectedReelDot = 0;
	setInterval(() => {
		if (translatePosition == -1160) {
			translatePosition = 0;
			resetDots();
			selectedReelDot = 0;
		} else {
			translatePosition -= 580;
			resetDots();
			selectedReelDot += 1;
		}
		console.log(translatePosition);
		console.log(selectedReelDot);
		reels[selectedReelDot].classList.add("reel_active");
		imageWrapper.style.transform = `translate(${translatePosition}px)`;
	}, 5000);
}

// vvvvv reset reels dot animation
animate();
function resetDots() {
	reels.forEach((reel) => {
		reel.classList.remove("reel_active");
	});
}
