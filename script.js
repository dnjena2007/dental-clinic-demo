/* ============================================
   ALL SMILES DENTAL CARE — Main Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  
  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initial check

  // --- Mobile Menu Toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Service Tabs ---
  const serviceTabs = document.querySelectorAll('.service-tab');
  const servicePanels = document.querySelectorAll('.service-panel');

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPanel = tab.getAttribute('data-tab');

      // Update active tab
      serviceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active panel
      servicePanels.forEach(panel => {
        if (panel.getAttribute('data-panel') === targetPanel) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Re-initialize Lucide icons for new panel
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- Active Nav Link Highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // --- Counter Animation for Trust Bar ---
  const trustItems = document.querySelectorAll('.trust-item-value');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;
    
    const trustBar = document.querySelector('.trust-bar');
    if (!trustBar) return;

    const rect = trustBar.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countersAnimated = true;
      
      trustItems.forEach(item => {
        const text = item.textContent.trim();
        const match = text.match(/^([\d.]+)(\+?)$/);
        
        if (match) {
          const target = parseFloat(match[1]);
          const suffix = match[2] || '';
          const isFloat = text.includes('.');
          const duration = 1500;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            if (isFloat) {
              item.textContent = current.toFixed(1) + suffix;
            } else {
              item.textContent = Math.floor(current) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              item.textContent = text;
            }
          };

          requestAnimationFrame(updateCounter);
        }
      });
    }
  };

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters(); // Check on load
});
