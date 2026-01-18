import { BackgroundBubbles } from './layouts/BackgroundBubbles.js';

let cachedProducts = null;
let lastFetchKey = '';
    
export async function productListView(container, { state, API_URL }) {



  /* ================= FETCH (CACHED) ================= */

const fetchKey = JSON.stringify({
    keyword: state.filters.keyword || '',
    category: state.filters.category || '',
    city: state.filters.city !== 'Wszystkie' ? state.filters.city : ''
  });
  
  let products;
  
  if (!cachedProducts || fetchKey !== lastFetchKey) {
    const params = new URLSearchParams({
      keyword: state.filters.keyword || '',
      category: state.filters.category || '',
      city: state.filters.city !== 'Wszystkie' ? state.filters.city : ''
    });
  
    const res = await fetch(`${API_URL}/products?${params}`);
    cachedProducts = await res.json();
    lastFetchKey = fetchKey;
  }
  
  products = cachedProducts;
  
  /* ================= FILTERING (LOCAL, FAST) ================= */
  
  if (state.filters.selectedBrands.length > 0) {
    products = products.filter(p =>
      state.filters.selectedBrands.includes(p.attributes?.brand)
    );
  }
  
  products = products.filter(p => p.price <= state.filters.maxPrice);
  

  /* ================= HEADER (JAK DAWNIEJ) ================= */

  const searchHeader = `
    <section class="relative bg-white py-24">

      <!-- BĄBELKI -->
      ${BackgroundBubbles()}

      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="flex justify-center">
          <div>

            <form
              class="flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto"
              onsubmit="event.preventDefault(); app.router('productList');"
            >

              <!-- PRODUKT -->
              <div class="flex items-center gap-3 bg-white rounded-full shadow px-6 py-4 flex-1 w-full">
                <i class="fa-solid fa-magnifying-glass text-stone-400"></i>
                <input
                  type="text"
                  placeholder="Szukaj produktów (np. Farba)"
                  value="${state.filters.keyword}"
                  onchange="state.filters.keyword=this.value; app.router('productList')"
                  class="bg-transparent outline-none text-sm w-full fixed-search-input"
                />
              </div>

              <!-- MIASTO -->
              <div class="relative flex-1 min-w-[280px] w-full">
                <div class="flex items-center gap-3 bg-white rounded-full shadow px-6 py-4">
                  <i class="fa-solid fa-location-dot text-stone-400"></i>
                  <select
                    class="bg-transparent outline-none text-sm w-full"
                    onchange="state.filters.city=this.value; app.router('productList')"
                  >
                    ${state.cities.map(c =>
                      `<option value="${c}" ${state.filters.city === c ? 'selected' : ''}>${c}</option>`
                    ).join('')}
                  </select>
                </div>
              </div>

              <!-- BUTTON -->
              <button
                type="submit"
                class="bg-[#cd5341] hover:bg-[#993f31] text-white font-semibold px-10 py-4 rounded-full transition"
              >
                Szukaj
              </button>

            </form>

          </div>
        </div>
      </div>
    </section>
  `;

  /* ================= LISTA + FILTRY ================= */

  const productsSection = `
    <section class="max-w-7xl mx-auto px-6 pt-10 pb-20 fade-in">
      <div class="grid grid-cols-12 gap-8">

        <!-- SIDEBAR -->
        <aside class="col-span-12 md:col-span-3">
          <div class="bg-white rounded-xl shadow p-6 sticky top-28 space-y-6 border border-stone-200">
            <div class="flex justify-between items-center">
              <h3 class="font-bold text-lg">Filtry</h3>
              <button onclick="app.resetToHome()" class="text-xs text-[#cd5341] hover:underline">
                Wyczyść
              </button>
            </div>

            <div>
              <h4 class="font-semibold mb-2 text-sm">Producent</h4>
              <div class="space-y-2 text-sm max-h-40 overflow-auto">
                ${state.brands.map(brand => `
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      ${state.filters.selectedBrands.includes(brand) ? 'checked' : ''}
                    onchange="app.toggleBrand('${brand}'); app.updateProductList()"
                    />
                    ${brand}
                  </label>
                `).join('')}
              </div>
            </div>

            <div>
              <h4 class="font-semibold mb-2 text-sm">
                Cena (do ${state.filters.maxPrice} zł)
              </h4>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value="${state.filters.maxPrice}"
                class="w-full accent-[#cd5341]"
            onchange="app.setPrice(this.value); app.updateProductList()"
              />
            </div>
          </div>
        </aside>

        <!-- PRODUKTY -->
        <div class="col-span-12 md:col-span-9">
          <div class="mb-6 flex justify-between items-center">
            <h1 class="text-2xl font-semibold text-stone-900">
              Wyniki
            </h1>
            <span class="text-sm text-stone-500">
              Znaleziono: ${products.length}
            </span>
          </div>

          ${
            products.length
              ? `
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${products.map(p => `
                <div
                  onclick="app.router('productDetail', '${p.id}')"
                  class="group bg-white rounded-2xl border border-stone-200
                         hover:border-[#cd5341] shadow-sm hover:shadow-md
                         transition cursor-pointer overflow-hidden"
                >
                  <div class="relative bg-stone-100 h-40 flex items-center justify-center">
                    <i class="fa-solid fa-paint-roller text-4xl text-stone-300"></i>
                    <div class="absolute top-3 left-3 bg-white text-xs font-bold
                                text-amber-600 px-2 py-1 rounded-full shadow">
                      ${p.categoryName || ''}
                    </div>
                  </div>

                  <div class="p-4 flex flex-col">
                    <h3 class="font-semibold text-sm mb-1 line-clamp-2">
                      ${p.name}
                    </h3>
                    <div class="text-xs text-stone-500 mb-2">
                      Marka: ${p.attributes?.brand || 'Inna'}
                    </div>
                    <div class="mt-auto text-xl font-bold text-stone-900">
                      ${p.price} zł
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            `
              : `
            <div class="text-center py-20 text-stone-500 border rounded-xl bg-stone-50">
              Brak produktów spełniających kryteria
            </div>
            `
          }
        </div>
      </div>
    </section>
  `;

  /* ================= RENDER ================= */

  container.innerHTML = `
    ${searchHeader}
    ${productsSection}
  `;
}
