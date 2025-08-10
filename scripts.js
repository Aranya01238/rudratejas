// scripts.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scroll for Navigation ---
    document.querySelectorAll('.main-nav a, .hero-actions a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Sticky & Compact Header on Scroll ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('compact');
        } else {
            header.classList.remove('compact');
        }
    });

    // --- Reveal-on-Scroll Fade-up Animation ---
    const revealSections = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealSections.forEach(section => {
        observer.observe(section);
    });

    // --- Specs "More Details" Toggle ---
    const toggleButton = document.getElementById('toggle-specs-btn');
    const moreSpecsContent = document.getElementById('more-specs');
    toggleButton.addEventListener('click', () => {
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
        toggleButton.setAttribute('aria-expanded', !isExpanded);
        moreSpecsContent.classList.toggle('expanded');

        if (moreSpecsContent.classList.contains('expanded')) {
            moreSpecsContent.style.maxHeight = moreSpecsContent.scrollHeight + 'px';
        } else {
            moreSpecsContent.style.maxHeight = '0';
        }
    });

    // --- Gallery Lightbox Modal ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close-btn');
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');
    let currentIndex = 0;

    const openLightbox = (index) => {
        currentIndex = index;
        lightboxImage.src = galleryItems[currentIndex].href;
        lightboxImage.alt = galleryItems[currentIndex].querySelector('img').alt;
        lightbox.classList.add('visible');
    };

    const closeLightbox = () => {
        lightbox.classList.remove('visible');
    };

    const navigateLightbox = (direction) => {
        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = galleryItems.length - 1;
        } else if (currentIndex >= galleryItems.length) {
            currentIndex = 0;
        }
        lightboxImage.src = galleryItems[currentIndex].href;
        lightboxImage.alt = galleryItems[currentIndex].querySelector('img').alt;
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('visible')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // --- Simple Contact Form Validation (Client-side) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill out all required fields.');
                e.preventDefault();
            }
        });
    }

});