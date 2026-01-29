console.log('Udupi Restaurant website loaded');

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                // Reset hamburger
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Modal Logic
    const modal = document.getElementById('order-modal');
    const orderBtns = document.querySelectorAll('a[href="#order"], .btn-primary'); // Catch all order buttons
    const closeBtn = document.querySelector('.close-modal');

    if (modal) {
        orderBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const href = btn.getAttribute('href');
                // Only open modal if it's an internal #order link or intended CTA, NOT external links
                if (href && !href.startsWith('http')) {
                    if (href === '#order' || btn.textContent.includes('Order') || btn.textContent.includes('Add')) {
                        e.preventDefault();
                        modal.classList.add('active');
                    }
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});
