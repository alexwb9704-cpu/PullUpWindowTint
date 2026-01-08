// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.getElementById('nav-menu');
    
    if (menu && !nav.contains(event.target) && !menuBtn.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fade-in animation on scroll
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.feature');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Run fade-in animation when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fadeInOnScroll);
} else {
    fadeInOnScroll();
}

// Contact Form Handling
function handleSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    // Basic validation
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    
    if (!name || !phone || !service) {
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
        
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 5000);
        
        return false;
    }
    
    // Show success message
    successMsg.style.display = 'block';
    errorMsg.style.display = 'none';
    
    // Reset form
    form.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 5000);
    
    // In production, you would send this data to a server
    // Example using FormSubmit.co (free form backend):
    /*
    const formData = new FormData(form);
    fetch('https://formsubmit.co/your@email.com', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            successMsg.style.display = 'block';
            form.reset();
        }
    });
    */
    
    return false;
}

// Gallery Lightbox Functionality
let currentImageIndex = 0;
const galleryImages = [
    {
        src: 'images/mustang.jpg',
        caption: 'Blue Mustang - Professional Automotive Tint'
    },
    {
        src: 'images/accord.jpg',
        caption: 'White Honda Accord - Sleek Dark Tint'
    },
    {
        src: 'images/f150.jpg',
        caption: 'White Ford F-150 - Truck Window Tinting'
    },
    {
        src: 'images/tahoe.jpg',
        caption: 'Black Chevrolet Tahoe - SUV Tinting'
    }
];

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImg && lightboxCaption) {
        lightbox.style.display = 'block';
        lightboxImg.src = galleryImages[index].src;
        lightboxCaption.textContent = galleryImages[index].caption;
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

function changeLightboxImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightboxImg && lightboxCaption) {
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
    }
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

// Close lightbox when clicking outside the image
document.addEventListener('click', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 3 && value.length <= 6) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        } else if (value.length > 6) {
            value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
        }
        e.target.value = value;
    });
}

// Add loading attribute to images for better performance
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});