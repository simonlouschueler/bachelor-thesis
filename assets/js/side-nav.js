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
				
				// If this is a non-chapter link, check if its parent chapter is collapsed
				if (!link.classList.contains('chapter')) {
					// Find the previous chapter link
					let prevChapter = link.previousElementSibling;
					while (prevChapter && !prevChapter.classList.contains('chapter')) {
						prevChapter = prevChapter.previousElementSibling;
					}
					if (prevChapter) {
						// Only activate chapter if its sections are collapsed (hidden)
						const nextItem = prevChapter.nextElementSibling;
						if (nextItem && nextItem.style.display === 'none') {
							prevChapter.classList.add('active');
						}
					}
				}
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


// Chapter Navigation Collapse/Expand Functionality

document.addEventListener('DOMContentLoaded', function() {
	// Hide all non-chapter items by default
	const allNavItems = document.querySelectorAll('.side-nav a');
	allNavItems.forEach(item => {
		if (!item.classList.contains('chapter')) {
			item.style.display = 'none';
		}
	});
	
	// Add click handlers to chapter headers
	const chapterHeaders = document.querySelectorAll('.side-nav a.chapter');
	
	chapterHeaders.forEach(header => {
		header.addEventListener('click', function(e) {
			// Only handle chevron clicks, not navigation
			if (e.target.classList.contains('chevron') || e.target.closest('.chevron')) {
				e.preventDefault();
				e.stopPropagation();
				
				// Find all items after this chapter until next chapter
				const currentChapter = this;
				const nextChapter = this.nextElementSibling;
				let currentItem = this.nextElementSibling;
				let isExpanding = false;
				
				// Check if we're expanding or collapsing
				if (currentItem && currentItem.style.display === 'none') {
					isExpanding = true;
				}
				
				// Toggle visibility of items until next chapter
				while (currentItem && !currentItem.classList.contains('chapter')) {
					if (currentItem.style.display === 'none') {
						currentItem.style.display = '';
					} else {
						currentItem.style.display = 'none';
					}
					currentItem = currentItem.nextElementSibling;
				}
				
				// Rotate chevron
				const chevron = this.querySelector('.chevron svg') || this.querySelector('.chevron');
				if (chevron) {
					chevron.style.transform = chevron.style.transform === 'rotate(-90deg)' ? '' : 'rotate(-90deg)';
				}
				
				// Update active states when expanding
				if (isExpanding && this.classList.contains('active')) {
					// Find the active section within this chapter
					const activeSection = document.querySelector('.side-nav a.active:not(.chapter)');
					if (activeSection) {
						// Remove active from chapter, keep it on section
						this.classList.remove('active');
					}
				}
			}
		});
	});
	
	// Initialize all chapters as expanded by default
	const chapterGroups = document.querySelectorAll('.chapter-group');
	chapterGroups.forEach(group => {
		group.classList.remove('collapsed');
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
