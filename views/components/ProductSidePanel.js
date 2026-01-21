export function ProductSidePanel({
    product,
    availability,
    state,
    hasUserLocation
  }) {
    return `
      <div class="space-y-6">
  
        <!-- CENA / DOSTĘPNOŚĆ -->
        <div class="bg-white rounded-xl border border-stone-200 p-4 space-y-2">
          <div class="text-xs uppercase tracking-wide text-stone-500">
            Cena producenta (sugerowana)
          </div>
  
          <div class="text-2xl font-bold text-stone-900">
            ${product.price || '—'} zł / szt.
          </div>
  
          ${
            hasUserLocation()
              ? `
                <div class="text-xs text-stone-500">
                  Dostępny w <b>${availability?.length || 0} sklepach</b>
                </div>
              `
              : `
                <div class="text-xs text-stone-400 italic">
                  Wybierz miasto, aby sprawdzić dostępność
                </div>
              `
          }
        </div>
  
        <!-- MIASTO -->
        ${
          hasUserLocation()
            ? `
              <div class="text-xs text-stone-500">
                Dostępność w:
                <span class="font-semibold text-stone-800">
                  ${state.filters.city}
                </span>
                <button
                  onclick="showProductCityOverlay()"
                  class="ml-2 text-[#cd5341] hover:underline"
                >
                  zmień
                </button>
              </div>
            `
            : ``
        }
  
        <!-- MAPA (ZAWSZE W DOM, NIGDY NIE UKRYTA) -->
        <div class="space-y-2">
  
          <!-- Nagłówek: tylko mobile / tablet -->
          <div class="text-sm font-semibold text-stone-800 lg:hidden">
            Sklepy w pobliżu
          </div>
  
          <div
            id="product-map"
            class="relative rounded-xl border border-stone-200
                   bg-stone-100 overflow-hidden
                   h-56 sm:h-64"
          >
            <div
              id="product-map-canvas"
              class="w-full h-full"
            ></div>
          </div>
  
        </div>
  
      </div>
    `;
  }
  