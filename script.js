document.addEventListener('DOMContentLoaded', () => {

    // 1. PERFORMANCE-OPTIMIZED PARTICLE SYSTEM BACKGROUND
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    let resizeTimeout;
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 150);
    });

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.2 - 0.1;
            this.speedY = Math.random() * 0.3 + 0.1; // Smooth upward motion
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y -= this.speedY;
            if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
                this.reset();
                this.y = canvas.height;
            }
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
    const particles = Array.from({ length: particleCount }, () => new Particle());

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 2. STICKY INTERACTIVE NAVIGATION HEADER
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // 3. RESPONSIVE HAMBURGER MENU ENGINE
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburgerBtn.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) toggleMenu();
    }));

    // 4. HIGH-PERFORMANCE INTERSECTION OBSERVER (Scroll Reveal & Skills & Counters)
    const sections = document.querySelectorAll('.scroll-reveal');
    const skillFills = document.querySelectorAll('.progress-fill');
    const counters = document.querySelectorAll('.stat-number');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // If current intersecting element contains skills, trigger fills
                if (entry.target.id === 'skills') {
                    skillFills.forEach(fill => fill.style.width = fill.getAttribute('data-width'));
                }

                // If current intersecting element contains statistics, execute incremental counter
                if (entry.target.id === 'about') {
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'), 10);
                        let count = 0;
                        const increment = target / 50; // Smooth frame step
                        const updateCount = () => {
                            count += increment;
                            if (count < target) {
                                counter.innerText = Math.ceil(count);
                                setTimeout(updateCount, 20);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    sections.forEach(sec => revealObserver.observe(sec));

    // 5. ACTIVE MENU HIGHLIGHT LINK ON SCROLL
    const appSections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = 'home';
        appSections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
        });
    });

    // 6. PREMIUM TYPING ANIMATION (Hero Section Tagline)
    const stringsArray = ["Building My Digital Identity", "Engineering Precise Solutions", "Designing Structural Code"];
    let currentStringIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typingElement');

    function executeTypingPattern() {
        const currentFullString = stringsArray[currentStringIndex];

        if (isDeleting) {
            typingElement.textContent = currentFullString.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typingElement.textContent = currentFullString.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && currentCharIndex === currentFullString.length) {
            typingSpeed = 2000; // Standstill delay at complete string
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentStringIndex = (currentStringIndex + 1) % stringsArray.length;
            typingSpeed = 400; // Adaptive pause before typing next line
        }

        setTimeout(executeTypingPattern, typingSpeed);
    }
    if (typingElement) setTimeout(executeTypingPattern, 1000);

    // 7. MOUSE PARALLAX EFFECT FOR PREMIUM CARDS
    const structuralCards = document.querySelectorAll('.glass-card');
    if (window.innerWidth > 1024) { // Execute only on Desktop targets for runtime health
        structuralCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - (rect.width / 2);
                const y = e.clientY - rect.top - (rect.height / 2);

                // Precision factor adjustments
                card.style.transform = `translateY(-8px) rotateX(${-y * 0.03}deg) rotateY(${x * 0.03}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    }
/*==================================
 PREMIUM GEOMETRY PRELOADER
==================================*/

(() => {

const preloader = document.getElementById("preloader");
const canvas = document.getElementById("loaderCanvas");

if (!preloader || !canvas) return;

const ctx = canvas.getContext("2d");

let w,h;
let particles=[];

function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

window.addEventListener("resize",resize);
resize();

const accent = "rgba(255,255,255,0.9)";

const COUNT = window.innerWidth < 768 ? 45 : 80;

for(let i=0;i<COUNT;i++){

    particles.push({

        x:Math.random()*w,
        y:Math.random()*h,

        vx:(Math.random()-.5)*0.35,
        vy:(Math.random()-.5)*0.35,

        r:Math.random()*2+1

    });

}

function animate(){

    ctx.clearRect(0,0,w,h);

    for(const p of particles){

        p.x+=p.vx;
        p.y+=p.vy;

        if(p.x<0||p.x>w) p.vx*=-1;
        if(p.y<0||p.y>h) p.vy*=-1;

        ctx.beginPath();
        ctx.fillStyle=accent;
        ctx.shadowColor=accent;
        ctx.shadowBlur=8;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();

    }

    ctx.shadowBlur=0;

    for(let i=0;i<particles.length;i++){

        for(let j=i+1;j<particles.length;j++){

            const dx=particles[i].x-particles[j].x;
            const dy=particles[i].y-particles[j].y;

            const d=Math.sqrt(dx*dx+dy*dy);

            if(d<140){

                ctx.beginPath();

              ctx.strokeStyle=`rgba(255,255,255,${0.08-(d/1800)})`;

                ctx.moveTo(particles[i].x,particles[i].y);
                ctx.lineTo(particles[j].x,particles[j].y);

                ctx.stroke();

            }

        }

    }

    requestAnimationFrame(animate);

}

animate();
/*==============================
 PRELOADER TYPING
==============================*/

const loaderText = document.getElementById("loaderText");

const loadingLines = [
    "WARNING: YOU MAY STAY LONGER THAN EXPECTED.",
    "COFFEE DETECTED. PRODUCTIVITY BOOSTED.",
    "ENGINEERING... NOT MAGIC. (ALTHOUGH IT LOOKS LIKE IT.)",
    "CALM DOWN. GOOD THINGS TAKE MILLISECONDS.",
    "NO AI WAS HARMED WHILE BUILDING THIS PAGE.",
    "404: BORING EXPERIENCE NOT FOUND.",
    "LOADING... ALMOST FASTER THAN YOUR INTERNET.",
    "CALCULATING... EVERY PIXEL MATTERS."
];

const randomLine = loadingLines[Math.floor(Math.random() * loadingLines.length)];

let i = 0;

function typeLoader() {
    
    if (!loaderText) return;
    
    if (i <= randomLine.length) {
        
        loaderText.textContent = randomLine.substring(0, i++);
        setTimeout(typeLoader, 70);
        
    } else {
        
        setTimeout(() => {
            document.getElementById("preloader").classList.add("hide");
        }, 3000);
        
    }
    
}

typeLoader();


})();});