// Dom Elements
const menuToggle = document.getElementById('menuToggle')
const nav = document.getElementById('nav')
const header = document.getElementById('header')

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active')
    menuToggle.classList.toggle('active')
})

// Close mobile menu when clicking on a link
document.querySelectorAll('nav-link').forEach(link => {
    link.addEventListener('click', ()=> {
        nav.classList.remove('active')
        menuToggle.classList.remove('active')
    })
})

// Header scroll effect
window.addEventListener('scroll', () => {
    if(window.scrollY > 100) {
        header.style.backgrpund = 'rgba(255, 255, 255, 0.98)'
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)'
    } else {
        header.style.backgrpund = 'rgba(255, 255, 255, 0.95)'
        header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)'
    }
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if(target) {
            const headerheight = header.offsetHeight
            const targetPosition = target.offsetTop - headerheight

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            })
        }
    })
})

// Inserction Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'

            // Anime stats numbers
            if(entry.target.classList.contains('stats-card')) {
                animateStats()
            }
        }
    })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll('.service-card, .contact-card, .stats-card').forEach(el => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = 'all 0.6s ease'
    observer.observe(el)
})

// Stats animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]')

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'))
        const increment = target/100
        let current = 0

        stat.classList.add('animate')

        const updateStat = () => {
            if(current < target) {
                current += increment
                stat.textContent = Math.ceil(current)
                setTimeout(updateStat, 20)
            } else {
                stat.textContent = target + (stat.textContent.includes('%') ? '' : '+')
            }
        }

        updateStat()
    })
}

// Contacts button functionality
document.querySelectorAll('.cta-btn, .btn-primary').forEach(button => {
    if (button.textContent.includes('Llamar') || button.textContent.includes('Teléfono')) {
        button.addEventListener('click', () => {
            window.location.href = 'tel:+15551234567'
        })
    }
})

// Form validation (if you add a contact form later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#d1d5db';
        }
    });
    
    return isValid;
}

// Lazy loading for images (if you add images later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Add any scroll-based functionality here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);