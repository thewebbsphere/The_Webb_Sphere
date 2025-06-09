// Removed image-card functionality
function adjustLayout() {
    const mainSection = document.querySelector('.main-section');
    const leftSide = document.querySelector('.left-side');
    const rightSide = document.querySelector('.right-side');

    if (window.innerWidth <= 768) {
        // Move rightSide to the top
        mainSection.insertBefore(rightSide, leftSide);

        // Hide leftSide content
        leftSide.style.display = 'none';
    } else {
        // Revert to original order if screen is larger
        if (mainSection.firstChild !== leftSide) {
            mainSection.insertBefore(leftSide, rightSide);
        }

        // Show leftSide content
        leftSide.style.display = 'grid';
    }
}

// Remove scroll-triggered animation for About Section
function handleScroll() {
    const aboutSection = document.querySelector('.about-section');
    const sectionPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
        aboutSection.classList.add('visible');
    } else {
        aboutSection.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleScroll);

// Footer fade-in animation on scroll
function handleFooterVisibility() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    const rect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight - 40) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
}
window.addEventListener('scroll', handleFooterVisibility);
window.addEventListener('load', handleFooterVisibility);

// Adjust window.onload to remove stacking effect logic
window.onload = () => {
    adjustLayout();
};
window.addEventListener('resize', adjustLayout);

// Show phase details on button hover
const phaseButtons = document.querySelectorAll('.phase-button');

phaseButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        // Hide all phase details
        document.querySelectorAll('.phase-details').forEach(detail => {
            detail.style.maxHeight = '0';
            detail.style.display = 'none';
        });

        // Show the selected phase details
        const phaseDetails = button.nextElementSibling;
        if (phaseDetails) {
            phaseDetails.style.display = 'block';
            phaseDetails.style.maxHeight = '500px'; /* Adjust as needed */
        }
    });
});

const phaseTitles = document.querySelectorAll('.phase-title');

phaseTitles.forEach(title => {
    title.addEventListener('click', function() {
        const phaseList = this.parentNode.querySelector('.phase-list');
        const isActive = this.classList.contains('active');

        // Close all phase lists
        phaseTitles.forEach(otherTitle => {
            if (otherTitle !== this) {
                otherTitle.classList.remove('active');
                otherTitle.parentNode.querySelector('.phase-list').style.maxHeight = null;
            }
        });

        // Toggle current phase list
        if (isActive) {
            this.classList.remove('active');
            phaseList.style.maxHeight = null;
        } else {
            this.classList.add('active');
            phaseList.style.maxHeight = phaseList.scrollHeight + 'px';
        }
    });
});

const quotes = [
                "The best way to predict the future is to create it. - Peter Drucker",
                "Innovation distinguishes between a leader and a follower. - Steve Jobs",
                "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
                "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
                "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
                "The secret of getting ahead is getting started. - Mark Twain",
                "It is always the simple that produces the marvelous. - Amelia Barr"
];

let currentQuoteIndex = 0;

function displayQuote() {
    document.getElementById('quoteText').innerText = quotes[currentQuoteIndex];
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
}

// Initial display
displayQuote();

// Change quote every 7 seconds
setInterval(displayQuote, 7000);

// Commitment Section Accordion Toggle for Mobile/Tablet

document.addEventListener('DOMContentLoaded', function () {
    function isMobileOrTablet() {
        return window.innerWidth <= 991.98;
    }
    function closeAllCards() {
        document.querySelectorAll('.card-text-wrapper').forEach(function (el) {
            el.classList.remove('expanded');
        });
        document.querySelectorAll('.card-toggle-btn').forEach(function (btn) {
            btn.setAttribute('aria-expanded', 'false');
        });
    }
    function setupCardToggles() {
        document.querySelectorAll('.card-toggle-btn').forEach(function (btn) {
            btn.onclick = function (e) {
                if (!isMobileOrTablet()) return;
                var wrapper = btn.parentElement.querySelector('.card-text-wrapper');
                var expanded = wrapper.classList.contains('expanded');
                closeAllCards();
                if (!expanded) {
                    wrapper.classList.add('expanded');
                    btn.setAttribute('aria-expanded', 'true');
                }
            };
        });
    }
    setupCardToggles();
    window.addEventListener('resize', setupCardToggles);
});