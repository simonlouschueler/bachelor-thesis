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

window.addEventListener('scroll', function () {
	var elements = document.querySelectorAll('.side-nav');
	var scrollPosition = window.scrollY;

	var threshold = window.innerHeight + 30; // Adjust threshold as needed

	elements.forEach(function (element) {
		if (scrollPosition >= threshold) {
			element.classList.add('fixed');
		} else {
			element.classList.remove('fixed');
		}
	});
});


// Copy URL with heading ID to clipboard on H1 and H2 click

document.addEventListener('DOMContentLoaded', function() {
	// Function to add click handlers to headings
	function addHeadingClickHandlers() {
		const headingElements = document.querySelectorAll('article h1, article h2');
		
		headingElements.forEach(heading => {
			// Skip if already has click handler
			if (heading.dataset.hasClickHandler) return;
			
			// Generate ID if none exists
			if (!heading.id) {
				const text = heading.textContent.trim();
				heading.id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
			}
			
			heading.addEventListener('click', function() {
				const headingId = this.getAttribute('id');
				if (headingId) {
					const currentUrl = window.location.href.split('#')[0]; // Remove existing hash
					const urlWithHash = currentUrl + '#' + headingId;
					
					// Copy to clipboard
					navigator.clipboard.writeText(urlWithHash).then(function() {
						// Visual feedback - add copied class
						heading.classList.add('copied');
						
						// Reset to hashtag icon after 2 seconds
						setTimeout(() => {
							heading.classList.remove('copied');
						}, 2000);
						
						console.log('URL copied to clipboard:', urlWithHash);
					}).catch(function(err) {
						console.error('Failed to copy URL: ', err);
					});
				}
			});
			
			// Mark as having click handler
			heading.dataset.hasClickHandler = 'true';
		});
	}
	
	// Initial setup
	addHeadingClickHandlers();
	
	// Watch for dynamic content changes (for markdown content)
	const observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.type === 'childList') {
				addHeadingClickHandlers();
			}
		});
	});
	
	// Start observing
	observer.observe(document.body, {
		childList: true,
		subtree: true
	});
});
