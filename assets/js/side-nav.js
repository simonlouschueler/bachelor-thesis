// Highlight Active Element in Side Navigation

document.addEventListener('DOMContentLoaded', function() {
	const sections = document.querySelectorAll('.scroll-section');

	window.addEventListener('scroll', function() {
		let current = '';

		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (pageYOffset >= sectionTop - 100) {
				current = section.getAttribute('id');
			}
		});

		const links = document.querySelectorAll('.side-nav a');
		links.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href').substring(1) === current) {
				link.classList.add('active');
			}
		});
	});
});


// Fix Side Navigation

window.addEventListener('scroll', function() {
	var elements = document.querySelectorAll('.side-nav');
	var scrollPosition = window.scrollY;
	var threshold = 510; // Adjust threshold as needed

	elements.forEach(function(element) {
		if (scrollPosition >= threshold) {
		element.classList.add('fixed');
		} else {
		element.classList.remove('fixed');
		}
	});
});