export async function homeView(container, { state }) {


    const isSearchActive =
    !!state.filters.keyword ||
    !!state.filters.category ||
    state.filters.city !== 'Wszystkie';
  
    container.innerHTML = `
  <div class="${container.dataset.sameHome === '1' ? '' : 'fade-in'}">
  
    <!-- ================= HERO + SEARCH ================= -->
    <section class="relative bg-white ${isSearchActive ? 'pt-16 pb-16' : 'py-24'}">
  
      ${
        !isSearchActive
          ? `
        <div class="absolute top-1/2 right-0 -translate-y-1/2
                    w-[60%] h-full pointer-events-none z-0">
          <div
            class="absolute inset-0 bg-cover bg-center opacity-90"
            style="background-image:url('./images/1.jpg')">
          </div>
        </div>
        `
          : ''
      }
  
      <div class="relative max-w-7xl mx-auto px-6 z-10">
  
        ${
          !isSearchActive
            ? `
          <h1 class="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            Remontowe potrzeby?
          </h1>
          <p class="text-lg text-stone-500 mb-10 max-w-xl">
            Znajdź wszystko w lokalnych hurtowniach
          </p>
          `
            : ''
        }
  
        <form
          id="searchForm"
          class="flex flex-col md:flex-row gap-4 max-w-3xl ${isSearchActive ? 'mx-auto' : ''}"
        >
          <!-- PRODUKT -->
          <div class="flex items-center gap-3 bg-white rounded-full shadow px-6 py-4 flex-1">
            <i class="fa-solid fa-magnifying-glass text-stone-400"></i>
            <input
              id="searchKeyword"
              type="text"
              placeholder="Szukaj produktów (np. Wałek, Farba)"
              value="${state.filters.keyword}"
              class="fixed-search-input bg-transparent outline-none text-sm"
            />
          </div>
  
          <!-- MIASTO -->
          <div class="relative flex-1 min-w-[280px]">
            <div class="flex items-center gap-3 bg-white rounded-full shadow px-6 py-4">
              <i class="fa-solid fa-location-dot text-stone-400"></i>
              <input
                id="cityInput"
                type="text"
                placeholder="Miejscowość"
                value="${state.filters.city === 'Wszystkie' ? '' : state.filters.city}"
                class="bg-transparent outline-none text-sm w-full"
                autocomplete="off"
              />
            </div>
  
            <div
              id="cityDropdown"
              class="hidden absolute top-full left-0 mt-2 w-full
                     bg-white border rounded-xl shadow z-50 max-h-60 overflow-auto"
            >
              ${state.cities
                .map(
                  c => `
                <div
                  data-city="${c}"
                  class="px-4 py-2 hover:bg-stone-100 cursor-pointer"
                >
                  ${c}
                </div>
              `
                )
                .join('')}
            </div>
          </div>
  
          <!-- BUTTON -->
          <button
            type="submit"
            class="bg-[#cd5341] hover:bg-[#993f31]
                   text-white font-semibold px-10 py-4
                   rounded-full transition"
          >
            Szukaj
          </button>
        </form>
      </div>
    </section>
  
    <!-- ================= JAK TO DZIAŁA ================= -->
    ${
      !isSearchActive
        ? `
    <section class="max-w-7xl mx-auto px-6 mt-24">
      <h2 class="text-2xl md:text-3xl font-normal text-stone-700 mb-12">
        Jak działa dlaRemontu?
      </h2>
  
      <div class="grid md:grid-cols-3 gap-12 text-center">
        <div>
          <div class="mx-auto w-40 h-40 flex items-center justify-center
                      text-white text-5xl bg-[#c15b46]
                      rounded-[60%]">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <h3 class="mt-8 font-bold text-lg text-[#c15b46]">
            Wyszukujesz artykuły remontowe
          </h3>
          <p class="mt-4 text-sm text-stone-500 max-w-xs mx-auto">
            Pełen dostęp do lokalnych hurtowni w jednym miejscu. Szukaj produktów, porównuj parametry, zapisuj na liście.
          </p>
        </div>
  
        <div>
          <div class="mx-auto w-40 h-40 flex items-center justify-center
                      text-white text-5xl bg-[#3b4a92]
                      rounded-[55%]">
            <i class="fa-solid fa-truck"></i>
          </div>
          <h3 class="mt-8 font-bold text-lg text-[#3b4a92]">
            Wybierasz lokalną hurtownię
          </h3>
          <p class="mt-4 text-sm text-stone-500 max-w-xs mx-auto">
            Najbliżej? Najdłużej otwarta? Zdecyduj, w którym rejonie miasta planujesz zakupy, a pokierujemy Cię pod drzwi hurtowni.
          </p>
        </div>
  
        <div>
          <div class="mx-auto w-40 h-40 flex items-center justify-center
                      text-white text-5xl bg-[#9aa3d1]
                      rounded-[58%]">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <h3 class="mt-8 font-bold text-lg text-[#9aa3d1]">
            Większe zakupy? Zapytaj o wycenę!
          </h3>
          <p class="mt-4 text-sm text-stone-500 max-w-xs mx-auto">
            Kupujesz lokalnie - płacisz mniej! Prześlij listę zakupów do sklepu, a dostaniesz indywidualną wycenę.
          </p>
        </div>
      </div>
    </section>
    `
        : ''
    }
  
    <!-- ================= CTA DLA HURTOWNI ================= -->
    ${
      !isSearchActive
        ? `
    <section class="max-w-7xl mx-auto px-6 mt-20">
      <!-- KARTA -->
  <div class="relative z-10 bg-[#2d2f44] rounded-[32px] overflow-hidden">

    

    <div class="grid md:grid-cols-2 items-center">

      <!-- TEKST -->
      <div class="p-10 md:p-14 text-white">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 leading-tight">
Prowadzisz sklep lub hurtownię budowlaną?
        </h2>

        <p class="text-stone-300 max-w-md mb-6">
          <br>Zwiększ widoczność swojej firmy i pozwól klientom łatwo znaleźć Twoją ofertę.
        </p>

        <br><button
            onclick="app.router('join')"
          class="inline-flex items-center bg-[#cd5341] hover:bg-[#993f31]
                 transition text-white font-semibold px-6 py-3
                 rounded-full shadow-lg"
        >
          Skontaktuj się z Nami
        </button>
      </div>

      <!-- OBRAZ -->
      <div class="relative p-6 md:p-10">
        <div class="relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute bottom-4 right-4
                   bg-green-400 text-white text-xs font-bold
                   rounded-full w-24 h-24
                   flex items-center justify-center text-center shadow-lg"
          >
            OFERTA<br/>STARTOWA
          </div>
        </div>
      </div>

    </div>
  </div>
    </  ction>
    `
        : ''
    }
  
  </div>
    `;
  
    bindHomeEvents();
  }
  
  /* ================= EVENTS ================= */
  
  function bindHomeEvents() {
    const form = document.getElementById('searchForm');
    const keywordInput = document.getElementById('searchKeyword');
    const cityInput = document.getElementById('cityInput');
    const cityDropdown = document.getElementById('cityDropdown');
  
    if (keywordInput) {
      keywordInput.addEventListener('input', e => {
        state.filters.keyword = e.target.value;
      });
    }
  
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        app.router('productList'); // ⬅️ TU wchodzi osobny widok
      });
    }
  
    if (cityInput && cityDropdown) {
      cityInput.addEventListener('focus', () => {
        cityDropdown.classList.remove('hidden');
      });
  
      cityDropdown.querySelectorAll('[data-city]').forEach(el => {
        el.addEventListener('click', () => {
          state.filters.city = el.dataset.city;
          cityInput.value = el.dataset.city;
          cityDropdown.classList.add('hidden');
        });
      });
  
      document.addEventListener('click', e => {
        if (!cityInput.contains(e.target) && !cityDropdown.contains(e.target)) {
          cityDropdown.classList.add('hidden');
        }
      });
    }
  }
  