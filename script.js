
document.addEventListener('DOMContentLoaded', () => {
           // --- PRELOADER LOGIC ---
            const preloader = document.getElementById('preloader');
            const body = document.body;

            // Wait for full window load (images, css, etc)
            window.addEventListener('load', () => {
                // Add fade out class
                preloader.classList.add('loaded');
                
                // Remove from DOM after animation
                setTimeout(() => {
                    preloader.remove();
                }, 600);
            });

            // --- HERO SLIDER LOGIC ---
            const track = document.getElementById('heroTrack');
            const slides = Array.from(track.children);
            const nextBtn = document.getElementById('nextBtn');
            const prevBtn = document.getElementById('prevBtn');
            
            let currentIndex = 0;
            const totalSlides = slides.length;
            const autoPlayDelay = 3000; // 3 seconds per slide
            let slideInterval;

            function updateSlidePosition() {
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlidePosition();
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSlidePosition();
            }

            function startAutoPlay() {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, autoPlayDelay);
            }

            function stopAutoPlay() {
                clearInterval(slideInterval);
            }

            // Initialize Auto Play
            startAutoPlay();

            // Button Event Listeners
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoPlay(); // Reset timer to avoid jumping
            });

            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoPlay(); // Reset timer to avoid jumping
            });

            
            // --- SPA NAVIGATION LOGIC ---
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('section');
            const mobileBtn = document.getElementById('mobile-menu-btn');
            const navLinksContainer = document.getElementById('nav-links');
            const contactForm = document.getElementById('contactForm');
            
            // --- THEME LOGIC ---
            const themeToggleBtn = document.getElementById('theme-toggle');
            const iconSun = document.getElementById('icon-sun');
            const iconMoon = document.getElementById('icon-moon');
        
            // --- PORTFOLIO FILTER LOGIC ---
            const filterBtns = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');

            // --- COUNTER ANIMATION LOGIC ---
            const counterElement = document.getElementById('totalCounter');
            let counted = false;

            // --- ANIMATING WORDS LOGIC ---
            const words = ["Your", "Websites", "Applications", "Branding", "Solutions"];
            let wordIndex = 0;
            const rotator = document.getElementById('word-rotator');

            function rotateWord() {
                rotator.classList.add('fade'); 
                setTimeout(() => {
                    wordIndex = (wordIndex + 1) % words.length;
                    rotator.innerText = words[wordIndex];
                    rotator.classList.remove('fade'); 
                }, 500); 
            }
            setInterval(rotateWord, 3000); 


            // 1. Navigation Switch Function
            window.switchSection = function(sectionId) {
                // Update Nav Links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('data-target') === sectionId) {
                        link.classList.add('active');
                    }
                });

                // Update Sections
                sections.forEach(sec => {
                    sec.classList.remove('active-section');
                });

                const activeSection = document.getElementById(sectionId);
                if (activeSection) {
                    activeSection.classList.add('active-section');
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                     // Trigger counter animation if Clients section opens
                    if (sectionId === 'clients' && !counted) {
                        animateValue(counterElement, 0, 150, 2000);
                        counted = true;
                    }
                }
            };

            // 2. Event Listeners for Nav
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('data-target');
                    switchSection(targetId);

                    if (window.innerWidth <= 768) {
                        navLinksContainer.classList.remove('mobile-nav-visible');
                    }
                });
            });

            // 3. Mobile Menu Toggle
            mobileBtn.addEventListener('click', () => {
                navLinksContainer.classList.toggle('mobile-nav-visible');
            });

            // 4. Portfolio Filtering
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Add active to clicked button
                    btn.classList.add('active');

                    const filterValue = btn.getAttribute('data-filter');

                    portfolioItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    });
                });
            });

            // --- GALLERY LIGHTBOX LOGIC ---
            const galleryImages = document.querySelectorAll('.gallery-item img');
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const closeLightbox = document.getElementById('close-lightbox');

            galleryImages.forEach(img => {
                img.parentElement.addEventListener('click', () => {
                    lightboxImg.src = img.src;
                    lightbox.style.display = 'flex';
                });
            });

            closeLightbox.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });

            // Close lightbox when clicking outside the image
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.style.display = 'none';
                }
            });

            // 5. Dark Mode Logic
            const savedTheme = localStorage.getItem('theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                setDarkMode(true);
            } else {
                setDarkMode(false);
            }

            themeToggleBtn.addEventListener('click', () => {
                const isDark = body.getAttribute('data-theme') === 'dark';
                setDarkMode(!isDark);
            });

            function setDarkMode(isDark) {
                if (isDark) {
                    body.setAttribute('data-theme', 'dark');
                    iconSun.classList.add('show');
                    iconMoon.classList.remove('show');
                    themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
                    localStorage.setItem('theme', 'dark');
                } else {
                    body.removeAttribute('data-theme');
                    iconMoon.classList.add('show');
                    iconSun.classList.remove('show');
                    themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
                    localStorage.setItem('theme', 'light');
                }
            }

            // --- FORM HANDLING ---
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = contactForm.querySelector('.submit-btn');
                const originalText = btn.textContent;
                
                btn.textContent = "Message Sent! ✓";
                btn.style.backgroundColor = "#10B981"; 
                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = ""; 
                }, 3000);
            });

            // 7. Counter Animation Helper
            function animateValue(obj, start, end, duration) {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    obj.innerHTML = Math.floor(progress * (end - start) + start) + "+";
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            }
});