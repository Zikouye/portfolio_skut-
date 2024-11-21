document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    if (!track) {
        console.error('Élément "carousel-track" non trouvé.');
        return;
    }
    const slides = Array.from(track.children);
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    if (!prevButton || !nextButton) {
        console.error('Les boutons "Précédent" ou "Suivant" ne sont pas trouvés.');
        return;
    }

    let currentSlideIndex = 0;
    let autoScrollInterval = 3000; // Intervalle pour le défilement automatique (en ms)
    let autoScrollTimer;
    let isUserInteracting = true; // Par défaut, l'utilisateur peut interagir

    // Met à jour la position du carrousel
    const updateSlidePosition = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
    };

    // Passe à la diapositive suivante
    const nextSlide = () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlidePosition();
    };

    // Passe à la diapositive précédente
    const prevSlide = () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlidePosition();
    };

    // Fonction pour démarrer le défilement automatique
    const startAutoScroll = () => {
        if (!autoScrollTimer) {
            autoScrollTimer = setInterval(nextSlide, autoScrollInterval);
        }
    };

    // Fonction pour arrêter le défilement automatique
    const stopAutoScroll = () => {
        clearInterval(autoScrollTimer);
        autoScrollTimer = null; // Réinitialisation du timer
    };

    // Ajoute un délai avant de redémarrer le défilement après une interaction utilisateur
    const resetAutoScroll = () => {
        stopAutoScroll();
        setTimeout(startAutoScroll, autoScrollInterval);
    };

    // Événements pour les boutons "Précédent" et "Suivant"
    nextButton.addEventListener("click", () => {
        if (!isUserInteracting) return; // Ne rien faire si l'utilisateur n'a pas quitté le carrousel
        stopAutoScroll(); // Arrête l'autoscroll temporairement
        nextSlide(); // Passe à la diapositive suivante
        resetAutoScroll(); // Redémarre l'autoscroll après un délai
    });

    prevButton.addEventListener("click", () => {
        if (!isUserInteracting) return; // Ne rien faire si l'utilisateur n'a pas quitté le carrousel
        stopAutoScroll(); // Arrête l'autoscroll temporairement
        prevSlide(); // Passe à la diapositive précédente
        resetAutoScroll(); // Redémarre l'autoscroll après un délai
    });

    // Mise à jour de la position sur redimensionnement de la fenêtre
    window.addEventListener("resize", updateSlidePosition);

    // Démarre le défilement automatique dès le chargement
    startAutoScroll();

    // Ajout des événements mouseenter et mouseleave pour contrôler l'interaction
    track.addEventListener('mouseenter', () => {
        isUserInteracting = false; // L'utilisateur est dans le carrousel, désactive les événements
        stopAutoScroll(); // Arrêter le défilement automatique
    });

    track.addEventListener('mouseleave', () => {
        isUserInteracting = true; // L'utilisateur quitte le carrousel, réactive les événements
        startAutoScroll(); // Démarrer à nouveau le défilement automatique
    });
});


// Cibler les éléments du menu
const navbarToggle = document.getElementById("navbar-toggle");
const navbarLinks = document.querySelector(".navbar-links");

if (navbarToggle && navbarLinks) {
    // Ajouter un événement de clic sur le hamburger
    navbarToggle.addEventListener("click", () => {
        navbarLinks.classList.toggle("active"); // Affiche ou masque le menu
    });
} else {
    console.error('Le bouton de menu ou les liens de menu ne sont pas trouvés.');
}

// JavaScript pour filtrer les projets
document.querySelectorAll('.project-filter').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Enlever la classe active des boutons
        document.querySelectorAll('.project-filter').forEach(btn => {
            btn.classList.remove('active');
        });

        // Ajouter la classe active au bouton sélectionné
        button.classList.add('active');

        // Afficher ou cacher les projets en fonction du filtre
        document.querySelectorAll('.project-item').forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelectorAll('.project-item');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-btn');
    const modalTitle = modal.querySelector('#modal-title');
    const modalDescription = modal.querySelector('#modal-description');
    const modalDetails = modal.querySelector('#modal-details');

    // Vérifie si la modale et les éléments nécessaires existent
    if (!modal || !closeModal || !modalTitle || !modalDescription || !modalDetails) {
        console.error('Un ou plusieurs éléments nécessaires à la modale n\'ont pas été trouvés.');
        return;
    }

    // Ouvrir la modale avec le contenu du projet
    projects.forEach(project => {
        project.addEventListener('click', () => {
            // Récupère les informations de base
            const title = project.querySelector('h3').textContent;
            const description = project.querySelector('p').textContent;
            
            // Remplir la modale avec ces informations
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            // Récupérer les détails spécifiques de chaque projet
            const details = project.querySelector('.project-details').innerHTML;  // Récupère le HTML du projet (éléments supplémentaires)
            
            // Remplir le contenu de la modale
            modalDetails.innerHTML = details;  // Insère les détails du projet dans la modale

            // Afficher la modale
            modal.style.display = 'flex';
        });
    });

    // Fermer la modale lorsqu'on clique sur le bouton de fermeture
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fermer la modale lorsqu'on clique à l'extérieur de la modale
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Ouverture de la modale
const moreInfoBtn = document.getElementById("more-info-btn");
const modal = document.getElementById("more-info-modal");
const closeBtn = document.querySelector(".close-btn");

moreInfoBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Fermeture de la modale
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fermer la modale si on clique à l'extérieur
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
