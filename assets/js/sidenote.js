// Position sidenotes at fixed vertical position to aligning with anchor words

let rafId = null;
let anchors = null;
let mainElement = null;
const isSmallScreen = () => window.matchMedia('(max-width: 68rem)').matches;

async function createSidenoteButton(anchor, sidenote) {
  // Check if toggle button already exists
  if (anchor.querySelector('.sidenote-toggle')) {
    // If toggle exists but close button doesn't, create it
    if (!sidenote.querySelector('.sidenote-close')) {
      await createCloseButton(sidenote, anchor);
    }
    return;
  }
  
  const button = document.createElement('button');
  button.className = 'sidenote-toggle';
  button.setAttribute('aria-label', 'Show sidenote');
  
  // Load book icon SVG
  try {
    const bookResponse = await fetch('/assets/icons/book.svg');
    const bookSvg = await bookResponse.text();
    const bookParser = new DOMParser();
    const bookDoc = bookParser.parseFromString(bookSvg, 'image/svg+xml');
    const bookIcon = bookDoc.querySelector('svg');
    if (bookIcon) {
      bookIcon.setAttribute('width', '14');
      bookIcon.setAttribute('height', '14');
      bookIcon.setAttribute('viewBox', '0 0 16 16');
      button.appendChild(bookIcon);
    }
  } catch (error) {
    console.error('Failed to load book icon:', error);
  }
  
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidenote(sidenote, button);
  });
  
  anchor.appendChild(button);
  
  // Create close button inside sidenote panel
  await createCloseButton(sidenote, anchor);
}

async function createCloseButton(sidenote, anchor) {
  // Check if close button already exists
  if (sidenote.querySelector('.sidenote-close')) {
    return;
  }
  
  const button = anchor.querySelector('.sidenote-toggle');
  const closeButton = document.createElement('button');
  closeButton.className = 'sidenote-close';
  closeButton.setAttribute('aria-label', 'Close sidenote');
  
  // Load xmark icon SVG
  try {
    const xmarkResponse = await fetch('/assets/icons/xmark.svg');
    const xmarkSvg = await xmarkResponse.text();
    const xmarkParser = new DOMParser();
    const xmarkDoc = xmarkParser.parseFromString(xmarkSvg, 'image/svg+xml');
    const xmarkIcon = xmarkDoc.querySelector('svg');
    if (xmarkIcon) {
      xmarkIcon.setAttribute('width', '12');
      xmarkIcon.setAttribute('height', '12');
      xmarkIcon.setAttribute('viewBox', '0 0 16 16');
      closeButton.appendChild(xmarkIcon);
    }
  } catch (error) {
    console.error('Failed to load xmark icon:', error);
  }
  
  closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    closeSidenote(sidenote, button);
  });
  
  sidenote.appendChild(closeButton);
}

function toggleSidenote(sidenote, button) {
  const isActive = sidenote.classList.contains('active');
  
  // Close all other sidenotes first
  document.querySelectorAll('.sidenote.active').forEach(s => {
    s.classList.remove('active');
    const toggle = s.parentElement.querySelector('.sidenote-toggle');
    if (toggle) {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-label', 'Show sidenote');
    }
  });
  
  if (!isActive) {
    sidenote.classList.add('active');
    button.classList.add('active');
    button.setAttribute('aria-label', 'Close sidenote');
  } else {
    sidenote.classList.remove('active');
    button.classList.remove('active');
    button.setAttribute('aria-label', 'Show sidenote');
  }
}


function closeSidenote(sidenote, button) {
  sidenote.classList.remove('active');
  if (button) {
    button.classList.remove('active');
    button.setAttribute('aria-label', 'Show sidenote');
  }
}

async function positionSidenotes() {
  if (!anchors) {
    anchors = document.querySelectorAll('.sidenote-anchor');
  }
  
  const minSpacing = 16; // 1rem = 16px minimum spacing between sidenotes
  const isSmall = isSmallScreen();
  
  // First pass: position all sidenotes at their ideal positions
  const sidenoteData = [];
  for (const anchor of anchors) {
    const sidenote = anchor.querySelector('.sidenote');
    if (!sidenote) continue;
    
    const anchorRect = anchor.getBoundingClientRect();
    const idealTop = anchorRect.top;
    
    if (isSmall) {
      // On small screens: create toggle button and position sidenote off-screen
      await createSidenoteButton(anchor, sidenote);
      
      const button = anchor.querySelector('.sidenote-toggle');
      if (button) {
        // Position button at right edge, aligned with anchor
        button.style.top = `${idealTop}px`;
        button.style.transform = 'translateY(-50%)';
      }
      
      // Position sidenote off-screen at bottom (handled by CSS)
      sidenote.style.position = 'fixed';
      // Remove top positioning - let CSS handle bottom positioning
      sidenote.style.top = 'auto';
      sidenote.style.transform = 'none';
    } else {
      // On large screens: normal positioning
      sidenote.style.position = 'fixed';
      sidenote.style.top = `${idealTop}px`;
      sidenote.style.transform = 'none';
      
      // Remove toggle button if it exists
      const button = anchor.querySelector('.sidenote-toggle');
      if (button) button.remove();
      
      // Remove close button if it exists
      const closeButton = sidenote.querySelector('.sidenote-close');
      if (closeButton) closeButton.remove();
    }
    
    // Get actual height after positioning
    const sidenoteRect = sidenote.getBoundingClientRect();
    
    sidenoteData.push({
      sidenote,
      idealTop,
      height: sidenoteRect.height,
      currentTop: idealTop,
      button: anchor.querySelector('.sidenote-toggle')
    });
  }
  
  // Second pass: resolve overlaps by pushing overlapping sidenotes down (only on large screens)
  if (!isSmall) {
    for (let i = 0; i < sidenoteData.length; i++) {
      const current = sidenoteData[i];
      let adjustedTop = current.currentTop;
      
      // Check against all previous sidenotes
      for (let j = 0; j < i; j++) {
        const previous = sidenoteData[j];
        const previousBottom = previous.currentTop + previous.height;
        
        // If current sidenote overlaps with previous (within minSpacing)
        if (adjustedTop < previousBottom + minSpacing) {
          adjustedTop = previousBottom + minSpacing;
        }
      }
      
      // Apply adjusted position
      if (adjustedTop !== current.currentTop) {
        current.sidenote.style.top = `${adjustedTop}px`;
        current.currentTop = adjustedTop;
      }
    }
  } else {
    // On small screens, also adjust button positions to avoid overlaps
    for (let i = 0; i < sidenoteData.length; i++) {
      const current = sidenoteData[i];
      if (!current.button) continue;
      
      let adjustedTop = current.idealTop;
      
      // Check against all previous buttons
      for (let j = 0; j < i; j++) {
        const previous = sidenoteData[j];
        if (!previous.button) continue;
        
        const previousButtonRect = previous.button.getBoundingClientRect();
        const previousBottom = previousButtonRect.bottom;
        
        // If current button overlaps with previous (within minSpacing)
        if (adjustedTop < previousBottom + minSpacing) {
          adjustedTop = previousBottom + minSpacing;
        }
      }
      
      // Apply adjusted position to both button and sidenote
      if (adjustedTop !== current.idealTop) {
        current.button.style.top = `${adjustedTop}px`;
        current.sidenote.style.top = `${adjustedTop}px`;
        current.currentTop = adjustedTop;
      }
    }
  }
  
}

// Close sidenotes when clicking outside (only on small screens)
let clickOutsideHandler = null;
function setupClickOutsideHandler() {
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler);
  }
  
  if (isSmallScreen()) {
    clickOutsideHandler = (e) => {
      if (!e.target.closest('.sidenote') && !e.target.closest('.sidenote-toggle')) {
        document.querySelectorAll('.sidenote.active').forEach(s => {
          s.classList.remove('active');
          const toggle = s.parentElement.querySelector('.sidenote-toggle');
          if (toggle) {
            toggle.classList.remove('active');
            toggle.setAttribute('aria-label', 'Show sidenote');
          }
        });
      }
    };
    document.addEventListener('click', clickOutsideHandler);
  }
}

async function updateSidenotes() {
  await positionSidenotes();
  rafId = null;
}

function scheduleUpdate() {
  if (!rafId) {
    rafId = requestAnimationFrame(updateSidenotes);
  }
}

// Position sidenotes on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    positionSidenotes();
    setupClickOutsideHandler();
  });
} else {
  positionSidenotes();
  setupClickOutsideHandler();
}

// Reposition on window resize (debounced)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    anchors = null; // Reset cache
    mainElement = null;
    positionSidenotes();
    setupClickOutsideHandler();
  }, 100);
});

// Reposition on scroll using requestAnimationFrame for smooth updates
window.addEventListener('scroll', scheduleUpdate, { passive: true });

