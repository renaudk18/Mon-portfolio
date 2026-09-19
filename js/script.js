/* =========================================================
   1. MENU MOBILE
   ========================================================= */

/*
   On récupère le bouton hamburger dans le HTML.

   Exemple HTML :
   <button class="menu-toggle">...</button>
*/
const menuToggle = document.querySelector('.menu-toggle');


/*
   On récupère le menu de navigation.

   Exemple HTML :
   <div id="main-menu">
      <a href="#accueil">Accueil</a>
      <a href="#apropos">À propos</a>
   </div>
*/
const menu = document.querySelector('#main-menu');


/*
   Quand l'utilisateur clique sur le bouton hamburger,
   on ouvre ou ferme le menu.
*/
menuToggle?.addEventListener('click', () => {

  /*
     classList.toggle('open') ajoute la classe "open"
     si elle n'existe pas.

     Si elle existe déjà, elle est supprimée.

     Exemple :

     Avant :
     <div id="main-menu">

     Après :
     <div id="main-menu" class="open">
  */
  const open = menu.classList.toggle('open');


  /*
     On modifie l'attribut aria-expanded.

     true  = menu ouvert
     false = menu fermé

     C'est utile pour l'accessibilité.
  */
  menuToggle.setAttribute('aria-expanded', String(open));
});


/* =========================================================
   2. FERMER LE MENU APRÈS AVOIR CLIQUÉ SUR UN LIEN
   ========================================================= */


/*
   On sélectionne tous les liens qui se trouvent
   à l'intérieur du menu.

   Exemple :
   #main-menu a
   signifie :
   "tous les <a> qui sont dans #main-menu"
*/
document.querySelectorAll('#main-menu a').forEach(link => {

  /*
     Pour chaque lien, on détecte le clic.
  */
  link.addEventListener('click', () => {

    /*
       On ferme le menu en supprimant la classe "open".
    */
    menu.classList.remove('open');


    /*
       On indique également que le menu est fermé
       pour les technologies d'assistance.
    */
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});


/* =========================================================
   3. FILTRE DES PROJETS
   ========================================================= */


/*
   On récupère tous les boutons de filtre.

   Exemple HTML :

   <button data-filter="all">Tous</button>
   <button data-filter="saas">SaaS</button>
   <button data-filter="eco">Éco-design</button>
*/
const filterButtons = document.querySelectorAll('.filters button');


/*
   On récupère toutes les cartes de projets.

   Exemple :

   <article class="project">
      ...
   </article>
*/
const projects = document.querySelectorAll('.project');


/*
   On parcourt tous les boutons de filtre.
*/
filterButtons.forEach(button => {

  /*
     Quand l'utilisateur clique sur un filtre...
  */
  button.addEventListener('click', () => {


    /*
       On enlève la classe "active" de TOUS les boutons.

       Cela permet de désactiver le filtre précédent.
    */
    filterButtons.forEach(b => {
      b.classList.remove('active');
    });


    /*
       On ajoute "active" au bouton sur lequel
       l'utilisateur vient de cliquer.

       Cela permet de mettre visuellement
       le bouton sélectionné en évidence.
    */
    button.classList.add('active');


    /*
       On récupère la valeur de data-filter.

       Exemple :

       <button data-filter="saas">

       donnera :

       filter = "saas"
    */
    const filter = button.dataset.filter;


    /*
       Maintenant, on parcourt tous les projets.
    */
    projects.forEach(project => {


      /*
         On regarde les catégories du projet.

         Exemple :

         <article class="project"
                  data-tags="saas eco">

         project.dataset.tags

         donnera :

         "saas eco"
      */
      const tags = project.dataset.tags;


      /*
         On décide si le projet doit être affiché ou caché.

         Si le filtre est "all",
         tous les projets restent visibles.

         Sinon, on vérifie si les tags du projet
         contiennent le filtre sélectionné.
      */
      project.hidden =
        filter !== 'all' && !tags.includes(filter);

    });
  });
});


// ============================================================
// FORMULAIRE DE CONTACT
// Simulation d'envoi
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  const contactForm = document.getElementById('contact-form');

  // Vérification
  if (!contactForm) {
    console.error('ERREUR : formulaire #contact-form introuvable.');
    return;
  }

  console.log('Formulaire de contact correctement chargé.');


  // ----------------------------------------------------------
  // RÉCUPÉRATION DES ÉLÉMENTS
  // ----------------------------------------------------------

  const nameInput =
    contactForm.querySelector('[name="name"]');

  const emailInput =
    contactForm.querySelector('[name="email"]');

  const typeInput =
    contactForm.querySelector('[name="type"]');

  const messageInput =
    contactForm.querySelector('[name="message"]');

  const feedback =
    contactForm.querySelector('.form-success');

  const submitButton =
    contactForm.querySelector('button[type="submit"]');


  // ----------------------------------------------------------
  // FONCTION : AFFICHER UNE ERREUR
  // ----------------------------------------------------------

  function showError(input, message) {

    input.classList.add('input-error');

    const error = document.createElement('small');

    error.className = 'form-error';

    error.textContent = message;

    input.parentNode.appendChild(error);
  }


  // ----------------------------------------------------------
  // FONCTION : SUPPRIMER UNE ERREUR
  // ----------------------------------------------------------

  function removeError(input) {

    input.classList.remove('input-error');

    const error =
      input.parentNode.querySelector('.form-error');

    if (error) {
      error.remove();
    }
  }


  // ----------------------------------------------------------
  // FONCTION : SUPPRIMER TOUTES LES ERREURS
  // ----------------------------------------------------------

  function clearErrors() {

    const errors =
      contactForm.querySelectorAll('.form-error');

    errors.forEach(function (error) {
      error.remove();
    });

    const inputs =
      contactForm.querySelectorAll('.input-error');

    inputs.forEach(function (input) {
      input.classList.remove('input-error');
    });
  }


  // ----------------------------------------------------------
  // VALIDATION
  // ----------------------------------------------------------

  function validateForm() {

    clearErrors();

    let valid = true;


    // NOM
    const name =
      nameInput.value.trim();

    if (name === '') {

      showError(
        nameInput,
        'Veuillez entrer votre nom complet.'
      );

      valid = false;
    }


    // EMAIL
    const email =
      emailInput.value.trim();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {

      showError(
        emailInput,
        'Veuillez entrer votre adresse email.'
      );

      valid = false;

    } else if (!emailRegex.test(email)) {

      showError(
        emailInput,
        'Veuillez entrer une adresse email valide.'
      );

      valid = false;
    }


    // DOMAINE
    if (typeInput.value === '') {

      showError(
        typeInput,
        'Veuillez sélectionner un domaine.'
      );

      valid = false;
    }


    // MESSAGE
    const message =
      messageInput.value.trim();

    if (message === '') {

      showError(
        messageInput,
        'Veuillez écrire votre message.'
      );

      valid = false;

    } else if (message.length < 10) {

      showError(
        messageInput,
        'Votre message doit contenir au moins 10 caractères.'
      );

      valid = false;
    }


    return valid;
  }


  // ==========================================================
  // SUBMIT
  // ==========================================================

  contactForm.addEventListener('submit', function (event) {

    // IMPORTANT :
    // empêche le formulaire de recharger/remonter la page
    event.preventDefault();

    console.log('Bouton Envoyer cliqué.');


    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!validateForm()) {

      feedback.hidden = false;

      feedback.className =
        'form-success error';

      feedback.textContent =
        'Veuillez corriger les erreurs indiquées dans le formulaire.';

      return;
    }


    // --------------------------------------------------------
    // SIMULATION D'ENVOI
    // --------------------------------------------------------

    submitButton.disabled = true;

    submitButton.textContent =
      'Envoi en cours...';

    feedback.hidden = false;

    feedback.className =
      'form-success';

    feedback.textContent =
      'Envoi de votre message...';


    // --------------------------------------------------------
    // APRÈS 1,5 SECONDE
    // --------------------------------------------------------

    setTimeout(function () {

      feedback.className =
        'form-success success';

      feedback.textContent =
        '✓ Votre message a été envoyé avec succès !';

      contactForm.reset();

      submitButton.disabled = false;

      submitButton.textContent =
        'Envoyer le message →';

    }, 1500);

  });


  // ==========================================================
  // SUPPRESSION DES ERREURS PENDANT LA SAISIE
  // ==========================================================

  nameInput.addEventListener('input', function () {

    if (nameInput.value.trim() !== '') {
      removeError(nameInput);
    }

  });


  emailInput.addEventListener('input', function () {

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      emailRegex.test(
        emailInput.value.trim()
      )
    ) {
      removeError(emailInput);
    }

  });


  typeInput.addEventListener('change', function () {

    if (typeInput.value !== '') {
      removeError(typeInput);
    }

  });


  messageInput.addEventListener('input', function () {

    if (messageInput.value.trim().length >= 10) {
      removeError(messageInput);
    }

  });

});

// ================================
// BOUTON RETOUR EN HAUT
// ================================

const scrollToTop = document.getElementById("scrollToTop");

// Afficher le bouton après avoir descendu dans la page
window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        scrollToTop.classList.add("visible");
    } else {
        scrollToTop.classList.remove("visible");
    }
});

// Retour en haut avec défilement fluide
scrollToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});