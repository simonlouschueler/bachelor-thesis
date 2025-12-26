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
    
    if (isSmall) {
      // On small screens: create toggle button and position button only
      await createSidenoteButton(anchor, sidenote);
      
      const button = anchor.querySelector('.sidenote-toggle');
      if (button) {
        // Position button at right edge, aligned with anchor (using fixed positioning)
        button.style.top = `${anchorRect.top}px`;
        button.style.transform = 'translateY(-50%)';
      }
      
      // Position sidenote fixed at bottom of screen (CSS handles bottom value via .active class)
      // Clear any large-screen positioning styles
      sidenote.style.position = 'fixed';
      sidenote.style.top = '';
      sidenote.style.left = '';
      sidenote.style.transform = '';
      // Don't set bottom inline - let CSS handle it via .active class for smooth transitions
    } else {
      // On large screens: use absolute positioning (calculated once, scrolls with page)
      // Position relative to anchor (which has position: relative)
      // Top aligns with anchor's top, so use 0
      
      // Calculate left position to match CSS calc(50vw + 21rem) or calc(50vw + 23rem) for larger screens
      // Get anchor's absolute left position in document
      const anchorAbsoluteLeft = anchorRect.left + window.scrollX;
      
      // Calculate target left: viewport center + 21rem (or 23rem for screens >= 86rem)
      const viewportWidth = window.innerWidth;
      const remValue = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const remOffset = viewportWidth >= 86 * remValue ? 23 : 21; // Match CSS media query
      const targetLeft = viewportWidth / 2 + (remOffset * remValue);
      
      // Calculate relative left: target position minus anchor's left
      const relativeLeft = targetLeft - anchorAbsoluteLeft;
      
      // Position relative to anchor
      // Clear any small-screen positioning styles
      sidenote.style.position = 'absolute';
      sidenote.style.top = '0';
      sidenote.style.left = `${relativeLeft}px`;
      sidenote.style.bottom = '';
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
    
    // Calculate ideal top for collision detection
    // For small screens: viewport-relative for button
    // For large screens: 0 (relative to anchor) since we use top: 0
    const idealTop = isSmall ? anchorRect.top : 0;
    
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
    // Get absolute positions for collision detection
    const absolutePositions = sidenoteData.map((data, idx) => {
      const anchor = anchors[idx];
      const anchorRect = anchor.getBoundingClientRect();
      const anchorAbsoluteTop = anchorRect.top + window.scrollY;
      return {
        data,
        absoluteTop: anchorAbsoluteTop + data.currentTop,
        absoluteBottom: anchorAbsoluteTop + data.currentTop + data.height
      };
    });
    
    for (let i = 0; i < absolutePositions.length; i++) {
      const current = absolutePositions[i];
      let adjustedAbsoluteTop = current.absoluteTop;
      
      // Check against all previous sidenotes
      for (let j = 0; j < i; j++) {
        const previous = absolutePositions[j];
        const previousBottom = previous.absoluteBottom;
        
        // If current sidenote overlaps with previous (within minSpacing)
        if (adjustedAbsoluteTop < previousBottom + minSpacing) {
          adjustedAbsoluteTop = previousBottom + minSpacing;
        }
      }
      
      // Convert back to relative position and apply
      const anchor = anchors[i];
      const anchorRect = anchor.getBoundingClientRect();
      const anchorAbsoluteTop = anchorRect.top + window.scrollY;
      const relativeTop = adjustedAbsoluteTop - anchorAbsoluteTop;
      
      if (relativeTop !== current.data.currentTop) {
        current.data.sidenote.style.top = `${relativeTop}px`;
        current.data.currentTop = relativeTop;
        // Update absolute position for next iterations
        current.absoluteTop = adjustedAbsoluteTop;
        current.absoluteBottom = adjustedAbsoluteTop + current.data.height;
      }
    }
  } else {
    // On small screens, adjust button positions to avoid overlaps
    for (let i = 0; i < sidenoteData.length; i++) {
      const current = sidenoteData[i];
      if (!current.button) continue;
      
      const buttonRect = current.button.getBoundingClientRect();
      let adjustedTop = buttonRect.top;
      
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
      
      // Apply adjusted position to button only (not sidenote)
      if (adjustedTop !== buttonRect.top) {
        current.button.style.top = `${adjustedTop}px`;
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

// On small screens, update button positions on scroll (buttons use fixed positioning)
window.addEventListener('scroll', () => {
  if (isSmallScreen()) {
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        if (!anchors) {
          anchors = document.querySelectorAll('.sidenote-anchor');
        }
        for (const anchor of anchors) {
          const button = anchor.querySelector('.sidenote-toggle');
          if (button) {
            const anchorRect = anchor.getBoundingClientRect();
            button.style.top = `${anchorRect.top}px`;
          }
        }
        rafId = null;
      });
    }
  }
}, { passive: true });

