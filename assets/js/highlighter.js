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
