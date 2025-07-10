document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// Dark Mode Toggle
const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the speed, the faster the count

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
});

// Language Switcher
const languageButtons = document.querySelectorAll('.language-switcher button');

languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        // In a real application, you would load content based on the selected language here.
        // For this example, we'll just log the selected language.
        console.log(`Language switched to: ${lang}`);
        alert(`Language switched to: ${lang}`);
    });
});

// Typing Effect
const typingTextElement = document.getElementById('typing-text');
const phrases = ["A Full-Stack Developer.", "A Data Analyst.", "A Problem Solver."];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    let displayedText = currentPhrase.substring(0, charIndex);

    typingTextElement.textContent = displayedText;

    if (!isDeleting && charIndex < currentPhrase.length) {
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
        setTimeout(type, 500);
    }
}

document.addEventListener('DOMContentLoaded', type);

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;

        projectItems.forEach(item => {
            if (filter === 'all' || item.dataset.filter === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});


// Scroll-to-top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navList.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navList.classList.remove('active');
    });
});

// Fade-in sections on scroll
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('fade-in-section'); // Add base class
    observer.observe(section);
});


// Toggle Sales Dashboard Images
// Remove the previous image toggling code
// document.querySelectorAll('.toggle-images-btn').forEach(button => {
//     button.addEventListener('click', () => {
//         const imageContainer = button.nextElementSibling;
//         if (imageContainer && imageContainer.classList.contains('sales-dashboard-images')) {
//             if (imageContainer.style.display === 'none') {
//                 imageContainer.style.display = 'block';
//                 button.textContent = 'Hide Sales Dashboard Images';
//             } else {
//                 imageContainer.style.display = 'none';
//                 button.textContent = 'View Sales Dashboard Images';
//             }
//         }
//     });
// });

// Image Modal/Lightbox functionality
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeButton = document.querySelector('.close-button');
const viewDashboardBtn = document.querySelector('.view-dashboard-btn');

const salesDashboardImages = [
    'assets/1.png',
    'assets/2.png'
];
let slideIndex = 0;

function showSlides(n) {
    if (n > salesDashboardImages.length - 1) { slideIndex = 0; }
    if (n < 0) { slideIndex = salesDashboardImages.length - 1; }
    modalImage.src = salesDashboardImages[slideIndex];
}

// Open the modal when the button is clicked
viewDashboardBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    slideIndex = 0; // Start with the first image
    showSlides(slideIndex);
});

// Close the modal when the close button is clicked
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Next/previous controls
window.plusSlides = function(n) {
    showSlides(slideIndex += n);
};