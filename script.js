// ⚡ Gestion du Scroll Reveal (apparition dynamique des blocs)
document.addEventListener('DOMContentLoaded', () => {
  const elementsAReveler = document.querySelectorAll('.reveal');
  
  const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach((entree, index) => {
      if (entree.isIntersecting) {
        // Un léger décalage progressif si plusieurs éléments apparaissent en même temps
        setTimeout(() => {
          entree.target.classList.add('visible');
        }, index * 60);
        observateur.unobserve(entree.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elementsAReveler.forEach(element => observateur.observe(element));

  // 🧭 Mise en surbrillance dynamique des liens de la barre de navigation
  const sections = document.querySelectorAll('section[id]');
  const liensNav = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let sectionCourante = '';
    
    sections.forEach(section => {
      const distanceTop = section.offsetTop;
      if (window.scrollY >= distanceTop - 100) {
        sectionCourante = section.getAttribute('id');
      }
    });

    liensNav.forEach(lien => {
      const cibleHref = lien.getAttribute('href');
      // On ignore les liens externes comme l'invitation ou Discord
      if (cibleHref && cibleHref.startsWith('#')) {
        if (cibleHref === `#${sectionCourante}`) {
          lien.style.color = 'var(--white)';
          lien.style.background = 'var(--purple-dim)';
        } else {
          lien.style.color = '';
          lien.style.background = '';
        }
      }
    });
  });
});