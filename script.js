// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});


// ===============================
// Scroll Reveal Animation
// ===============================

const observer = new IntersectionObserver((entries) => {
  
  entries.forEach(entry => {
    
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
    
  });
  
}, {
  threshold: 0.2
});

document.querySelectorAll(
  ".about-card,.skill-card,.contact-item,.image-box"
).forEach(el => {
  
  el.classList.add("hidden");
  
  observer.observe(el);
  
});


// ===============================
// Navbar Shadow
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  
  if (window.scrollY > 40) {
    
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";
    
  } else {
    
    header.style.boxShadow = "none";
    
  }
  
});


// ===============================
// Active Navigation
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  
  let current = "";
  
  sections.forEach(section => {
    
    const top = section.offsetTop - 150;
    
    if (pageYOffset >= top) {
      
      current = section.getAttribute("id");
      
    }
    
  });
  
  navLinks.forEach(link => {
    
    link.classList.remove("active");
    
    if (link.getAttribute("href") === "#" + current) {
      
      link.classList.add("active");
      
    }
    
  });
  
});


// ===============================
// Image Hover
// ===============================

const image = document.querySelector(".image-box");

if (image) {
  
  image.addEventListener("mousemove", (e) => {
    
    const rect = image.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    
    const y = e.clientY - rect.top;
    
    image.style.transform =
      `rotateY(${(x-rect.width/2)/25}deg)
 rotateX(${-(y-rect.height/2)/25}deg)`;
    
  });
  
  image.addEventListener("mouseleave", () => {
    
    image.style.transform = "rotateY(0deg) rotateX(0deg)";
    
  });
  
}


// ===============================
// Typing Effect
// ===============================

const title = document.querySelector(".small-title");

const text = "WELCOME";

let i = 0;

title.innerHTML = "";

function typing() {
  
  if (i < text.length) {
    
    title.innerHTML += text.charAt(i);
    
    i++;
    
    setTimeout(typing, 120);
    
  }
  
}

typing();


// ===============================
// Button Ripple
// ===============================

document.querySelectorAll(".btn").forEach(button => {
  
  button.addEventListener("click", function(e) {
    
    const circle = document.createElement("span");
    
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    
    circle.style.width = diameter + "px";
    
    circle.style.height = diameter + "px";
    
    circle.style.left = e.offsetX - diameter / 2 + "px";
    
    circle.style.top = e.offsetY - diameter / 2 + "px";
    
    circle.classList.add("ripple");
    
    const ripple = this.querySelector(".ripple");
    
    if (ripple) {
      
      ripple.remove();
      
    }
    
    this.appendChild(circle);
    
  });
  
});


// ===============================
// End
// ===============================