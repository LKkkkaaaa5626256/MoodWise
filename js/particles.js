class Particle {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.x = options.x || Math.random() * canvas.width;
        this.y = options.y || Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `rgba(52, 152, 219, ${Math.random() * 0.5 + 0.2})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const hero = document.querySelector('.hero');
    
    // Set hero section positioning
    if (getComputedStyle(hero).position === 'static') {
        hero.style.position = 'relative';
    }
    
    hero.insertBefore(canvas, hero.firstChild);
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0.5';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';  // Place canvas behind all content

    // Ensure hero content is above canvas
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.position = 'relative';
        heroContent.style.zIndex = '2';
    }

    // Ensure all interactive elements are above canvas
    hero.querySelectorAll('a, button, .cta-button').forEach(element => {
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        element.style.zIndex = '3';
    });

    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({ length: 50 }, () => new Particle(canvas));

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        requestAnimationFrame(animate);
    }

    animate();
}); 