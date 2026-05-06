// Initialize AOS (scroll animations)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Mobile menu toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Countdown Timer
function getNextSunday6AM() {
    const now = new Date();
    const nextSunday = new Date();
    const daysUntilSunday = (7 - now.getDay()) % 7;
    nextSunday.setDate(now.getDate() + daysUntilSunday);
    nextSunday.setHours(6, 0, 0, 0);
    
    if (now.getDay() === 0 && now.getHours() >= 6) {
        nextSunday.setDate(now.getDate() + 7);
    }
    
    const savedDate = localStorage.getItem('nextRunDateTime');
    if (savedDate) {
        return new Date(savedDate);
    }
    return nextSunday;
}

function updateCountdown() {
    const nextRun = getNextSunday6AM();
    const now = new Date();
    const diff = nextRun - now;
    
    if (diff <= 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (86400000)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (3600000)) / (1000 * 60));
    const seconds = Math.floor((diff % (60000)) / 1000);
    
    const daysElem = document.getElementById('days');
    const hoursElem = document.getElementById('hours');
    const minutesElem = document.getElementById('minutes');
    const secondsElem = document.getElementById('seconds');
    
    if (daysElem) daysElem.innerText = days.toString().padStart(2, '0');
    if (hoursElem) hoursElem.innerText = hours.toString().padStart(2, '0');
    if (minutesElem) minutesElem.innerText = minutes.toString().padStart(2, '0');
    if (secondsElem) secondsElem.innerText = seconds.toString().padStart(2, '0');
}

if (document.getElementById('countdownTimer')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#connect') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Helper function for HTML escaping
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}