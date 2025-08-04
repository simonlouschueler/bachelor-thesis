const infoButton = document.getElementById('info-button');
const closeInfoButton = document.getElementById('close-info-button');
const infoPanel = document.querySelector('.info-panel');

function updateButtonStates() {
	const isActive = infoPanel.classList.contains('active');
	
	if (isActive) {
		closeInfoButton.classList.add('active');
		infoButton.classList.remove('active');
	} else {
		infoButton.classList.add('active');
		closeInfoButton.classList.remove('active');
	}
}

infoButton.addEventListener('click', () => {
	infoPanel.classList.add('active');
	updateButtonStates();
});

closeInfoButton.addEventListener('click', () => {
	infoPanel.classList.remove('active');
	updateButtonStates();
});