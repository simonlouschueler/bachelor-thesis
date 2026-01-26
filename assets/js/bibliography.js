// Bibliography item highlight

document.addEventListener("DOMContentLoaded", () => {
	const highlightFromHash = () => {
		const hash = window.location.hash;
		if (!hash) return;
		
		// Remove previous highlights
		document.querySelectorAll("li.highlighted").forEach(el => {
			el.classList.remove("highlighted");
		});
		
		const target = document.querySelector(hash);
		if (target && target.tagName.toLowerCase() === 'li') {
			target.classList.add("highlighted");
		
			// Optional: auto-remove highlight
			setTimeout(() => {
				target.classList.remove("highlighted");
			}, 3000);
		}
	};
	
	// Run on page load
	highlightFromHash();
	
	// Run on link click (in-page)
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener("click", () => {
			setTimeout(() => {
				highlightFromHash();
			}, 50);
		});
	});
});


// Back to citation button

document.addEventListener("DOMContentLoaded", () => {
	// Get the back button element (now permanently in HTML)
	const backButton = document.getElementById('back-to-citation');
	
	// Add click handler to clean up after navigation
	backButton.addEventListener('click', () => {
		// Use a small delay to allow the navigation to complete
		setTimeout(() => {
			const readingPosition = document.getElementById('reading-position');
			if (readingPosition) {
				// Add highlight effect
				readingPosition.classList.add('highlighted');
				
				// Remove highlight after 1,5 seconds
				setTimeout(() => {
					readingPosition.classList.remove('highlighted');
				}, 1500);
				
				// Remove the reading position ID and hide button
				readingPosition.removeAttribute('id');
				hideBackButton();

				// Strip the reading position hash from the URL
				if (window.location.hash === '#reading-position') {
					window.history.replaceState(null, '', window.location.pathname + window.location.search);
				}
			}
		}, 100);
	});
	
	// Show the back button
	function showBackButton() {
		backButton.classList.add('visible');
	}
	
	// Hide the back button
	function hideBackButton() {
		backButton.classList.remove('visible');
	}
	
	// Check if we’re at a bibliography entry
	function isAtBibliographyEntry() {
		const hash = window.location.hash;
		if (!hash) return false;
		
		const target = document.querySelector(hash);
		return target && target.closest('.bibliography');
	}
	
	// Handle citation link clicks
	document.querySelectorAll('.citation a[href^="#"]').forEach(link => {
		link.addEventListener('click', function(e) {
			// Find the citation span that contains this link
			const citationSpan = this.closest('.citation');
			if (citationSpan) {
				// Remove any existing reading position
				const existingReadingPosition = document.getElementById('reading-position');
				if (existingReadingPosition) {
					existingReadingPosition.removeAttribute('id');
				}
				
				// Add reading position ID to this citation
				citationSpan.id = 'reading-position';
				
				// Show back button after a short delay to allow navigation
				setTimeout(() => {
					showBackButton();
				}, 100);
			}
		});
	});
	
	// Handle hash changes (when navigating directly to bibliography entries)
	window.addEventListener('hashchange', () => {
		if (isAtBibliographyEntry()) {
			// Show button if there’s a reading position
			const readingPosition = document.getElementById('reading-position');
			if (readingPosition) {
				showBackButton();
			} else {
				hideBackButton();
			}
		} else {
			// If we’re not at a bibliography entry, hide the back button
			hideBackButton();
		}
	});
	
});
