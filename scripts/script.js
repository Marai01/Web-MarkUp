const toggleBtn = document.querySelector('.toggle_btn');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    const dropdownMenu = document.querySelector('.dropdown_menu');

    toggleBtn.onclick = function () {
      dropdownMenu.classList.toggle('open');
      const isOpen = dropdownMenu.classList.contains('open');

      toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';
    }

    function showCookiePopup() {
      const popup = document.getElementById("cookie-popup");
      if (!localStorage.getItem("cookiesAccepted")) {
        popup.classList.add("show");
        console.log(Cookies)
      }
    }

    function acceptCookies() {
      localStorage.setItem("cookiesAccepted", "true");
      document.getElementById("cookie-popup").classList.remove("show");
    }

    window.onload = showCookiePopup;
    window.onload = function () {
      localStorage.removeItem("cookiesAccepted");
      showCookiePopup();
    };

    const track = document.querySelector('.carousel-track');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const totalItems = items.length;
    const itemWidth = 20; // Percentage breedte per item (5 items per keer zichtbaar)
    let currentIndex = totalItems; // Start op het eerste "echte" item
    let isTransitioning = false;

    // Clone first and last items for seamless looping
    items.forEach((item, index) => {
      const cloneFirst = item.cloneNode(true);
      const cloneLast = item.cloneNode(true);
      track.appendChild(cloneFirst); // Add clones at the end
      track.insertBefore(cloneLast, track.firstChild); // Add clones at the start
    });

    // Update de breedte van de track dynamisch
    track.style.width = `${(totalItems + 6) * itemWidth}%`; // 6 extra items (3 voor en 3 na)

    // Startpositie om eerste echte item in het midden te zetten
    track.style.transform = `translateX(-${itemWidth * currentIndex}%)`;

    // Functie om de carousel te updaten
    function updateCarousel() {
      if (isTransitioning) return;
      isTransitioning = true;
      track.style.transition = 'transform 0.5s ease';
      const offset = -currentIndex * itemWidth;
      track.style.transform = `translateX(${offset}%)`;

      // Controleer of we naar een gekloond item gaan en spring indien nodig
      track.addEventListener('transitionend', () => {
        isTransitioning = false;
        // Spring naar het begin als we aan het einde van de echte items zijn
        if (currentIndex >= totalItems + 3) {
          track.style.transition = 'none'; // Geen animatie
          currentIndex = 3; // Ga naar het eerste echte item
          track.style.transform = `translateX(-${itemWidth * currentIndex}%)`;
        }
        // Spring naar het einde als we aan het begin van de echte items zijn
        if (currentIndex <= 2) {
          track.style.transition = 'none'; // Geen animatie
          currentIndex = totalItems + 2; // Ga naar het laatste echte item
          track.style.transform = `translateX(-${itemWidth * currentIndex}%)`;
        }
      }, { once: true });
    }

    // Event listeners voor de knoppen
    document.querySelector('.prev-btn').addEventListener('click', () => {
      if (isTransitioning) return;
      currentIndex--;
      updateCarousel();
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
      if (isTransitioning) return;
      currentIndex++;
      updateCarousel();
    });