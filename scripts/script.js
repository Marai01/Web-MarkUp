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

// carousel
    const track = document.querySelector('.carousel-track');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const totalItems = items.length;
    const itemWidth = 20; 
    let currentIndex = totalItems;
    let isTransitioning = false;

    items.forEach((item, index) => {
      const cloneFirst = item.cloneNode(true);
      const cloneLast = item.cloneNode(true);
      track.appendChild(cloneFirst); 
      track.insertBefore(cloneLast, track.firstChild); 
    });

    track.style.width = `${(totalItems + 6) * itemWidth}%`; 

    track.style.transform = `translateX(-${itemWidth * currentIndex}%)`;

    function updateCarousel() {
      if (isTransitioning) return;
      isTransitioning = true;
      track.style.transition = 'transform 0.5s ease';
      const offset = -currentIndex * itemWidth;
      track.style.transform = `translateX(${offset}%)`;

      track.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (currentIndex >= totalItems + 3) {
          track.style.transition = 'none';
          currentIndex = 3;
          track.style.transform = `translateX(-${itemWidth * currentIndex}%)`;
        }
        if (currentIndex <= 2) {
          track.style.transition = 'none';
          currentIndex = totalItems + 2;
          track.style.transform = `translateX(-${itemWidth * currentIndex}%)`;
        }
      }, { once: true });
    }

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