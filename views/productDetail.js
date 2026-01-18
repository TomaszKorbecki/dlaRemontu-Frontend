import { productDetailTemplate } from './productDetail.template.js';

export async function productDetailView(
  container,
  productId,
  {
    API_URL,
    state,
    renderSearchBar,
    hasUserLocation,
    initLocationsMap
  }
) {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`);

    if (!res.ok) {
      container.innerHTML =
        '<p class="p-6 text-red-600">Nie znaleziono produktu</p>';
      return;
    }

    const { product, availability } = await res.json();

    // ✅ inicjalizacja stanu wariantu (raz)
    state.selectedVariant ??= {
      color: 'cream',
      capacity: '2.5'
    };

    // ✅ render widoku
    container.innerHTML = productDetailTemplate({
      product,
      availability,
      state,
      renderSearchBar,
      hasUserLocation
    });

    // ✅ OBSŁUGA CUSTOM DROPDOWNÓW
    container.addEventListener('click', e => {
      const option = e.target.closest('.config-option');
      const dropdown = e.target.closest('.config-dropdown.custom');

      // klik poza dropdown
      if (!dropdown) return;

      // klik w OPCJĘ
      if (option) {
        const key = dropdown.dataset.config;
        const value = option.dataset.value;

        state.selectedVariant[key] = value;

        // update tekstu
        dropdown.querySelector('.config-value').textContent =
          option.textContent;

        // active state
        dropdown
          .querySelectorAll('.config-option')
          .forEach(btn => btn.classList.remove('active'));

        option.classList.add('active');

        // zamknij menu
        dropdown.classList.remove('open');
        return;
      }

      // klik w pigułę → toggle
      dropdown.classList.toggle('open');
    });

    container.addEventListener('click', e => {
        if (e.target.dataset.action === 'increase') {
          state.cartQty++;
          container.querySelector('.qty-value').textContent =
            `${state.cartQty} szt.`;
        }
      
        if (e.target.dataset.action === 'decrease' && state.cartQty > 1) {
          state.cartQty--;
          container.querySelector('.qty-value').textContent =
            `${state.cartQty} szt.`;
        }
      
        if (e.target.closest('.add-to-list-btn')) {
          console.log('Dodaj do listy:', {
            productId,
            variant: state.selectedVariant,
            qty: state.cartQty
          });
        }
      });      

        // ✅ MAPA DOSTĘPNOŚCI
        if (hasUserLocation()) {
            requestAnimationFrame(() => {
              setTimeout(() => {
                initLocationsMap({
                  elementId: 'product-map-canvas',
                  locations: availability.map(a => ({
                    lat: a.lat,
                    lng: a.lng,
                    name: a.name,
                    address: a.address
                  }))
                });
              }, 0);
            });
          } else {
            const mapEl = container.querySelector('#product-map');
            if (!mapEl) return;
      
            mapEl.insertAdjacentHTML(
              'afterbegin',
              `
                <img
                  src="/images/poland-outline.jpg"
                  class="absolute inset-0 m-auto w-[240px] opacity-25 pointer-events-none"
                  alt=""
                />
              `
            );
      
            mapEl.insertAdjacentHTML(
              'beforeend',
              `
                <div class="absolute inset-0 bg-white/70 flex items-center justify-center">
                  <div class="bg-white rounded-lg shadow-md px-4 py-4 w-[90%] max-w-xs">
                    <div class="font-semibold text-sm mb-1">
                      Sprawdź dostępność
                    </div>
                    <p class="text-xs text-stone-500 mb-3">
                      Wybierz miasto, aby zobaczyć sklepy w okolicy
                    </p>
                    <div class="flex gap-2">
                      <input
                        id="productCityInput"
                        type="text"
                        placeholder="Miasto…"
                        class="flex-1 border rounded px-2 py-1 text-sm"
                        onkeydown="if(event.key==='Enter'){applyCityFromProduct()}"
                      />
                      <button
                        onclick="applyCityFromProduct()"
                        class="bg-[#cd5341] text-white text-sm px-3 py-1.5 rounded"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              `
            );
          }
      
        } catch (err) {
          console.error(err);
          container.innerHTML =
            '<p class="p-6 text-red-600">Błąd ładowania produktu</p>';
        }
      }
      