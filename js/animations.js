document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Observe mission content and purpose items
    document.querySelectorAll('.mission-content, .purpose-item').forEach(element => {
        observer.observe(element);
    });

    // 3D Tilt effect for feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.transition = 'none';
            
            // Add highlight effect
            const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
            card.style.backgroundImage = shine;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
            card.style.backgroundImage = 'none';
        });
    });

    // Parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        const speed = 0.5;
        
        if (currentScrollY <= window.innerHeight) {
            const translateY = currentScrollY * speed;
            heroContent.style.transform = `translateY(${translateY}px)`;
            heroContent.style.opacity = 1 - (currentScrollY / (window.innerHeight * 0.8));
        }
        
        lastScrollY = currentScrollY;
    });

    // Add hover effect to feature icons with spring animation
    document.querySelectorAll('.feature-icon').forEach(icon => {
        icon.addEventListener('mouseover', (e) => {
            e.target.style.transform = 'scale(1.2) rotate(5deg)';
            e.target.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        icon.addEventListener('mouseout', (e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)';
            e.target.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    });

    // Add wave effect to the purpose section
    const createWave = () => {
        const wave = document.createElement('div');
        wave.className = 'wave';
        document.querySelector('.purpose').appendChild(wave);
        
        setTimeout(() => {
            wave.remove();
        }, 2000);
    };

    setInterval(createWave, 3000);

    // Initialize features section
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 200); // Stagger the animation
    });

    // Add visible class to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Smooth scroll for timeline items
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });

    // Initialize features section
    document.addEventListener('DOMContentLoaded', function() {
        const moodSpace = document.querySelector('.mood-space');
        const experiences = document.querySelectorAll('.experience');
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        // Initialize experience positions
        experiences.forEach((exp, index) => {
            const angle = (index / experiences.length) * Math.PI * 2;
            const radius = 200;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            exp.style.left = `${centerX + Math.cos(angle) * radius}px`;
            exp.style.top = `${centerY + Math.sin(angle) * radius}px`;
            exp.style.zIndex = index;
        });

        // Mouse movement handler
        moodSpace.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth animation loop
        function animate() {
            // Smooth mouse position
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            // Update experience positions
            experiences.forEach((exp, index) => {
                const rect = exp.getBoundingClientRect();
                const expX = rect.left + rect.width / 2;
                const expY = rect.top + rect.height / 2;
                
                const dx = currentX - expX;
                const dy = currentY - expY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 300) {
                    const force = (1 - distance / 300) * 50;
                    const angle = Math.atan2(dy, dx);
                    const moveX = Math.cos(angle) * force;
                    const moveY = Math.sin(angle) * force;
                    
                    const currentLeft = parseFloat(exp.style.left);
                    const currentTop = parseFloat(exp.style.top);
                    
                    exp.style.left = `${currentLeft - moveX}px`;
                    exp.style.top = `${currentTop - moveY}px`;
                }
            });

            requestAnimationFrame(animate);
        }

        // Start animation
        animate();

        // Add visible class to experiences
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        experiences.forEach(exp => {
            observer.observe(exp);
        });

        // Handle experience clicks
        experiences.forEach(exp => {
            exp.addEventListener('click', () => {
                const link = exp.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
            });
        });
    });

    // Initialize flow items
    const flowItems = document.querySelectorAll('.flow-item');
    
    // Intersection Observer for flow items
    const flowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove visible class when element is out of view
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe each flow item
    flowItems.forEach(item => {
        flowObserver.observe(item);
    });

    // Smooth scroll for navigation
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

    // Intersection Observer for animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all flow items
    document.querySelectorAll('.flow-item').forEach(item => {
        animationObserver.observe(item);
    });

    // Add initial animations
    document.addEventListener('DOMContentLoaded', () => {
        // Add initial transform states
        document.querySelector('.flow-item.high-five').style.transform = 'translateX(-50px)';
        document.querySelector('.flow-item.jokes').style.transform = 'translateX(50px)';
        document.querySelector('.flow-item.wisdom').style.transform = 'translateY(30px)';
        document.querySelector('.flow-item.chat').style.transform = 'scale(0.98)';
        document.querySelector('.flow-item.celebration').style.transform = 'rotate(-2deg) scale(0.98)';

        // Add transition properties
        document.querySelectorAll('.flow-item').forEach(item => {
            item.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
}); 