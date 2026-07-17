/* js/script.js */

document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE NAVIGATION ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- TESTIMONIAL CAROUSEL (Index Page) ---
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const nextBtn = document.getElementById('next-slide');
        const prevBtn = document.getElementById('prev-slide');

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }

        // Auto rotate every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

// --- TABS (Programs Page) ---
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            // Remove active class
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Activate button
            btn.classList.add('active');

            const target = btn.dataset.target;

            if (target === "all") {
                // Show all tab contents
                tabContents.forEach(content => {
                    content.classList.add('active');
                });
            } else {
                // Show selected tab only
                const content = document.getElementById(target);
                if (content) {
                    content.classList.add('active');
                }
            }
        });
    });

    // ✅ Initialize page with "All" selected
    const activeBtn = document.querySelector('.tab-btn.active');

    if (activeBtn && activeBtn.dataset.target === "all") {
        tabContents.forEach(content => {
            content.classList.add('active');
        });
    }
}

    // --- ACCORDION (Resources Page) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;

                // Close others (optional logic, commented out for independent open/close)
                // document.querySelectorAll('.accordion-item').forEach(acc => {
                //    if(acc !== item) acc.classList.remove('active');
                // });

                item.classList.toggle('active');
            });
        });
    }

    // --- EVENT FILTERS (Events Page) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.dataset.filter;

                // Filter cards
                eventCards.forEach(card => {
                    if (filterValue === 'all' || card.dataset.category === filterValue) {
                        card.classList.remove('hide-event');
                    } else {
                        card.classList.add('hide-event');
                    }
                });
            });
        });
    }


    emailjs.init({
        publicKey: "Yxz2cq2WJowGKuL15"
    });

    const contactForm = document.getElementById("contact-form");
    const formSuccess = document.getElementById("form-success");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // 1. Send to developer
        emailjs.send("service_ackmlgm", "template_tn0r5e7", {
            name: name,
            email: email,
            subject: subject,
            message: message
        })
            .then(function () {

                // 2. Send confirmation to the user
                return emailjs.send("service_ackmlgm", "template_7y64gyx", {
                    name: name,
                    email: email,
                    subject: subject
                });

            })
            .then(function () {

                contactForm.reset();
                contactForm.style.display = "none";
                formSuccess.style.display = "block";

            })
            .catch(function (error) {
                console.error("EmailJS Error:", error);
                alert("Failed to send message. Please try again.");
            });
    });






});







// ==========================================================================
// LIGHT / DARK MODE TOGGLE LOGIC
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = themeToggle.querySelector('i');

    // 1. Check if the user has a saved theme preference from a previous visit/page
    const savedTheme = localStorage.getItem('theme') || 'light';

    // 2. Apply the saved theme immediately on page load
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    // 3. Listen for clicks on the toggle button
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Apply the new theme to the HTML element
        document.documentElement.setAttribute('data-theme', newTheme);

        // Save the setting so it persists across all 10 pages
        localStorage.setItem('theme', newTheme);

        // Flip the icon look
        updateToggleIcon(newTheme);
    });

    // Helper function to switch between the Sun and Moon icons
    function updateToggleIcon(theme) {
        if (theme === 'dark') {
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
            themeToggle.style.color = '#ffcb05'; // Golden yellow sun color
        } else {
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
            themeToggle.style.color = 'var(--color-dark)';
        }
    }
});