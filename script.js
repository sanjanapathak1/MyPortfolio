// script.js - Premium Portfolio with Advanced Animations

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
    } else if (savedTheme === 'light') {
        body.classList.remove('dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    });
}

// ============================================
// TYPING ANIMATION
// ============================================
const words = ["Full Stack Developer", "UI/UX Designer", "Java Developer", "Problem Solver"];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typedTextSpan = document.getElementById('typed-text');

function typeEffect() {
    if (!typedTextSpan) return;
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 300);
        return;
    }
    setTimeout(typeEffect, isDeleting ? 70 : 130);
}
if (typedTextSpan) typeEffect();

// ============================================
// CUSTOM CURSOR GLOW
// ============================================
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ============================================
// RIPPLE EFFECT
// ============================================
document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// COUNTER ANIMATION
// ============================================
const counters = document.querySelectorAll('.stat-number');
const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            let current = 0;
            const increment = target / 50;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        }
    });
};
window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ============================================
// MOBILE HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// ACTIVE LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 500 ? 'flex' : 'none';
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const feedbackDiv = document.getElementById('form-feedback');

        // Reset previous errors
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        [name, email, subject, message].forEach(field => {
            if (field) field.style.borderColor = '';
        });

        let isValid = true;

        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(name, 'Name must be at least 2 characters');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, 'Valid email required');
            isValid = false;
        }

        if (!subject.value.trim()) {
            showError(subject, 'Subject is required');
            isValid = false;
        }

        if (!message.value.trim()) {
            showError(message, 'Message cannot be empty');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        }

        if (!isValid) {
            if (feedbackDiv) {
                feedbackDiv.innerHTML = '<span style="color:#ef4444;">❌ Please fix the errors above.</span>';
                setTimeout(() => feedbackDiv.innerHTML = '', 4000);
            }
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate API call - Replace with actual API endpoint
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.value.trim(),
                    email: email.value.trim(),
                    subject: subject.value.trim(),
                    message: message.value.trim()
                })
            });

            const data = await response.json();

            if (response.ok) {
                if (feedbackDiv) {
                    feedbackDiv.innerHTML = '<span style="color:#10b981;">✅ Message sent successfully! I will get back to you soon.</span>';
                }
                contactForm.reset();
            } else {
                if (feedbackDiv) {
                    feedbackDiv.innerHTML = `<span style="color:#ef4444;">❌ ${data.message || 'Something went wrong. Please try again.'}</span>`;
                }
            }
        } catch (error) {
            console.error('Error:', error);
            if (feedbackDiv) {
                feedbackDiv.innerHTML = '<span style="color:#ef4444;">❌ Network error. Please check your connection.</span>';
            }
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            setTimeout(() => {
                if (feedbackDiv) feedbackDiv.innerHTML = '';
            }, 5000);
        }
    });
}

function showError(input, message) {
    if (!input) return;
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        const errorSpan = formGroup.querySelector('.error-msg');
        if (errorSpan) errorSpan.textContent = message;
    }
    input.style.borderColor = '#ef4444';
    input.addEventListener('input', () => {
        input.style.borderColor = '';
        const formGroup2 = input.closest('.form-group');
        if (formGroup2) {
            const err = formGroup2.querySelector('.error-msg');
            if (err) err.textContent = '';
        }
    }, { once: true });
}

// ============================================
// PARALLAX FLOATING BADGES
// ============================================
const badges = document.querySelectorAll('.floating-badge');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    badges.forEach((badge, i) => {
        const speed = (i + 1) * 15;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        badge.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ============================================
// RESUME DOWNLOAD - PDF
// ============================================
/**
 * RESUME DOWNLOAD FUNCTIONALITY
 * Clicking on "Download Resume" button downloads resume.pdf
 * Place your resume.pdf file in the same folder as index.html
 * or update the path below to point to your resume file location
 */
document.querySelectorAll('#downloadResumeBtn, #resumeDownloadBtn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        // Create a temporary anchor element
        const link = document.createElement('a');

        // Path to your resume PDF file
        // Option 1: If resume.pdf is in the same folder as index.html
        link.href = 'resume.pdf';

        // Option 2: If resume.pdf is in a different folder (uncomment and modify)
        // link.href = './assets/resume.pdf';

        // Option 3: If you want to use a hosted URL
        // link.href = 'https://example.com/resume.pdf';

        // Set download attribute to force download
        link.download = 'Sanjana_Kumari_Pathak_Resume.pdf';

        // Append to body, click, and remove
        document.body.appendChild(link);

        // Add a small delay to ensure the click registers
        setTimeout(() => {
            link.click();
            document.body.removeChild(link);
        }, 100);

        // Show feedback to user
        const btnText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = btnText;
            btn.disabled = false;
        }, 2000);

        // Track download event (optional)
        console.log('Resume download initiated');
    });
});

// ============================================
// ADDITIONAL: Handle resume download with visual feedback
// ============================================
// This creates a notification when download starts
const showDownloadNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 16px;
        font-weight: 500;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Inter', sans-serif;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideDown 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
};

// Add CSS animations for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideDown {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================
// KEYBOARD SHORTCUT: Press 'R' to download resume
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        if (!e.ctrlKey && !e.metaKey) {
            const resumeBtn = document.querySelector('#downloadResumeBtn') || document.querySelector('#resumeDownloadBtn');
            if (resumeBtn) {
                resumeBtn.click();
                showDownloadNotification('📄 Resume download started!', 'success');
            }
        }
    }
});

// ============================================
// CONSOLE LOG (Developer Info)
// ============================================
console.log('✨ Premium Portfolio Loaded Successfully!');
console.log('📄 Press "R" key to download resume');
console.log('🌓 Toggle theme with the moon/sun button');
console.log('📱 Website is fully responsive');

// ============================================
// PERFORMANCE: Debounce scroll events
// ============================================
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        animateCounters();
    }, 50);
});

// ============================================
// PREVENT ZOOM ON DOUBLE TAP (Mobile)
// ============================================
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

console.log('🚀 All systems ready!');