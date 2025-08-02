// Portfolio Website JavaScript with proper functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing portfolio...');
    
    // Global variables
    let currentPage = 'home';
    let isMenuOpen = false;
    let isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                     (localStorage.getItem('darkMode') === null && 
                      window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Initialize the website
    init();
    
    function init() {
        console.log('Initializing portfolio...');
        setupTheme();
        setupNavigation();
        setupMobileMenu();
        setupThemeToggle();
        setupContactForm();
        setupResumeDownload();
        setupAnimations();
        showInitialPage();
        console.log('Portfolio initialized successfully');
    }
    
    function setupTheme() {
        document.documentElement.setAttribute('data-color-scheme', isDarkMode ? 'dark' : 'light');
        updateThemeToggleIcon(isDarkMode);
        localStorage.setItem('darkMode', isDarkMode);
    }
    
    function updateThemeToggleIcon(isDark) {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }
    
    function setupNavigation() {
        console.log('Setting up navigation...');
        
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        console.log('Found nav links:', navLinks.length);
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                console.log('Nav link clicked:', page);
                if (page) {
                    navigateToPage(page);
                }
            });
        });
        
        // Action buttons (View Projects, Get in Touch)
        const actionButtons = document.querySelectorAll('[data-navigate]');
        console.log('Found action buttons:', actionButtons.length);
        
        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-navigate');
                console.log('Action button clicked:', page);
                if (page) {
                    navigateToPage(page);
                }
            });
        });
    }
    
    function setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMobileMenu();
            });
            
            // Close menu when clicking nav links on mobile
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    if (isMenuOpen) {
                        toggleMobileMenu();
                    }
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (isMenuOpen && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    toggleMobileMenu();
                }
            });
        }
    }
    
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function(e) {
                e.preventDefault();
                toggleTheme();
            });
        }
    }
    
    function setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleContactFormSubmit();
            });
        }
        
        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleNewsletterSubmit();
            });
        }
    }
    
    function setupResumeDownload() {
        const downloadBtn = document.getElementById('download-resume');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleResumeDownload();
            });
        }
    }
    
    function setupAnimations() {
        // Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.skill-category, .experience-card, .project-card, .article-card').forEach(el => {
            el.classList.add('scroll-animate');
            observer.observe(el);
        });
    }
    
    function showInitialPage() {
        // Set home as active initially
        const homePage = document.getElementById('home-page');
        const homeNavLink = document.querySelector('[data-page="home"]');
        
        if (homePage) {
            homePage.classList.add('active');
        }
        if (homeNavLink) {
            homeNavLink.classList.add('active');
        }
        
        // Add animation to initial page
        setTimeout(() => {
            if (homePage) {
                homePage.classList.add('fade-in');
            }
        }, 100);
    }
    
    function navigateToPage(pageName) {
        console.log('Navigating to page:', pageName);
        
        if (pageName === currentPage) {
            console.log('Already on page:', pageName);
            return;
        }
        
        // Hide current page
        const currentPageElement = document.getElementById(currentPage + '-page');
        if (currentPageElement) {
            currentPageElement.classList.remove('active');
        }
        
        // Show new page  
        const newPageElement = document.getElementById(pageName + '-page');
        if (newPageElement) {
            newPageElement.classList.add('active');
            
            // Add animation
            setTimeout(() => {
                newPageElement.classList.add('fade-in');
            }, 50);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                newPageElement.classList.remove('fade-in');
            }, 650);
        }
        
        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeNavLink = document.querySelector(`[data-page="${pageName}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
        
        // Update current page
        currentPage = pageName;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log('Page navigation completed:', pageName);
    }
    
    function toggleMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            isMenuOpen = !isMenuOpen;
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        }
    }
    
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        setupTheme();
        
        // Add a smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
        
        console.log('Theme toggled:', isDarkMode ? 'dark' : 'light');
    }
    
    function handleContactFormSubmit() {
        const formData = new FormData(document.getElementById('contact-form'));
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto URL
        const mailtoUrl = `mailto:brooklinsantosh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoUrl;
        
        // Show success message
        showNotification('Thank you! Your email client should open now.', 'success');
        
        // Reset form
        document.getElementById('contact-form').reset();
    }
    
    function handleNewsletterSubmit() {
        const email = document.querySelector('.newsletter-input').value;
        
        if (email) {
            // Show success message
            showNotification('Thank you for subscribing!', 'success');
            
            // Reset form
            document.querySelector('.newsletter-input').value = '';
        }
    }
    
    function handleResumeDownload() {
        // Create a downloadable resume PDF (you would replace this with actual file)
        showNotification('Resume download would start here.', 'info');
        
        // If you have a resume file, uncomment this:
        const link = document.createElement('a');
        link.href = 'assets/resume.pdf';
        link.download = 'Brooklin_Santosh_Resume.pdf';
        link.click();
    }
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            min-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Utility function to add smooth scrolling to anchor links
    function addSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMobileMenu();
        }
        
        // Arrow keys for page navigation (optional)
        if (e.altKey) {
            const pages = ['home', 'experience', 'projects', 'articles', 'contact'];
            const currentIndex = pages.indexOf(currentPage);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                navigateToPage(pages[currentIndex - 1]);
            } else if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
                navigateToPage(pages[currentIndex + 1]);
            }
        }
    });

    // Handling counter animation
    // Counter Animation
    function initializeCounters() {
    // Set initial values based on data
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        statNumbers[0].setAttribute('data-target', portfolioData.stats.yearsExperience);
        statNumbers[1].setAttribute('data-target', portfolioData.stats.projectsCompleted);
        statNumbers[2].setAttribute('data-target', portfolioData.stats.publicationsWritten);
        statNumbers[3].setAttribute('data-target', portfolioData.stats.teamsLed);
    }
    }

    function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
        }, 50);
    }

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (target) {
        animateCounter(stat, target);
        }
    });
    }
    
    // Handle browser back/forward buttons (optional enhancement)
    // window.addEventListener('popstate', function(e) {
    //     if (e.state && e.state.page) {
    //         navigateToPage(e.state.page);
    //     }
    // });
    
    // Add error handling for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            // Image will fall back to the onerror attribute's fallback
        });
    });
    
    // Performance optimization: Lazy load images when they come into view
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.src.includes('data:image')) {
                        // Only process placeholder images
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    console.log('Portfolio fully loaded and ready!');
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;