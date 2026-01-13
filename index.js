import { productDetailView } from './views/ProductDetails.js';
import { SearchBar } from './views/components/SearchBar.js';


const API_URL = 'https://dlaremontu-backend-dev-lukasz.onrender.com/api';

const WINDOW_AREA = 1.8;
const DOOR_AREA = 2.0;
const DEFAULT_COVERAGE = 10;
const DEFAULT_COATS = 2;

const state = {
  categories: [],
  cities: [],
  brands: [],
  searchMode: 'products', // 'products' | 'wholesalers'
  filters: { keyword: '', category: '', city: 'Wszystkie', minPrice:0, maxPrice:1000, selectedBrands:[], attributes: {} },
  wholesalerAssortment: { category: null, keyword: '', prevKeyword: '', openCategories: {}, openSubcategories: {} },
  wholesalerSearch: { query: '' },
  activeWholesalerId: null,
  calc: { mode: 'area', area: 0, walls: [], windows: 0, doors: 0, coats: 2 }
};

const app = {
  init: async () => {
    const container = document.getElementById('app-content');
    try {
      const res = await fetch(`${API_URL}/init`);
      if (!res.ok) throw new Error('Błąd API');
      const data = await res.json();
      state.categories = data.categories;
      state.cities = ['Wszystkie', ...data.cities];
      state.brands = data.brands || [];
      app.router('home');
    } catch (err) {
      console.error(err);
      container.innerHTML = `<div class="text-center p-10 bg-red-50 text-red-700 rounded border border-red-200 mt-10"><h2 class="text-2xl font-bold mb-2">Błąd połączenia z serwerem</h2><p>Uruchom <strong>node server.js</strong>.</p></div>`;
    }
  },

  router: async (view, param = null) => {
    const container = document.getElementById('app-content');
    const isSameHome = view === 'home' && container.dataset.view === 'home';
    container.dataset.sameHome = isSameHome ? '1' : '0';
    if (!isSameHome) container.innerHTML = '<div class="loader"></div>';
    container.dataset.view = view;

    try {
      if (view === 'home') await views.home(container);
      else if (view === 'wholesalersList') await views.wholesalersList(container);

      else if (view === 'productDetail') {
        await productDetailView(container, param, {
          API_URL,
          state,
          renderSearchBar,
          renderAssistantTeaser,
          renderAssistantSection,
          hasUserLocation,
          initLocationsMap
        });
      }      
      else if (view === 'wholesalerDetail') await views.wholesalerDetail(container, param);
      else if (view === 'join') await views.join(container);
      else if (view === 'admin') await views.admin(container);
      if (!isSameHome) window.scrollTo(0, 0);
    } catch (e) {
      container.innerHTML = `<p class="text-red-500 p-4">Błąd: ${e.message}</p>`;
    }
  },

  setFilter: (key, val) => { state.filters[key] = val; if(key==='category') state.filters.attributes={}; app.router('home'); },
  resetToHome: () => { state.searchMode = 'products'; state.filters={keyword:'',category:'',city:'Wszystkie',minPrice:0,maxPrice:1000,selectedBrands:[],attributes:{}}; app.router('home'); },
  goToWholesalerSearch: () => { state.searchMode = 'wholesalers'; app.router('wholesalersList'); },
  
  toggleBrand: (brand) => {
      if (state.filters.selectedBrands.includes(brand)) state.filters.selectedBrands = state.filters.selectedBrands.filter(b => b !== brand);
      else state.filters.selectedBrands.push(brand);
      app.router('home');
  },
  
  setPrice: (val) => { state.filters.maxPrice = val; app.router('home'); },

  // Wholesaler Assortment
  setWholesalerKeyword: (value) => {
    state.wholesalerAssortment.keyword = value;
    if(state.activeWholesalerId) updateWholesalerAssortment(state.activeWholesalerId);
  },
  toggleWholesalerCategory: (category) => {
    state.wholesalerAssortment.openCategories[category] = !state.wholesalerAssortment.openCategories[category];
    if(state.activeWholesalerId) updateWholesalerAssortment(state.activeWholesalerId);
  },
  toggleWholesalerSubcategory: (key) => {
    state.wholesalerAssortment.openSubcategories[key] = !state.wholesalerAssortment.openSubcategories[key];
    if(state.activeWholesalerId) updateWholesalerAssortment(state.activeWholesalerId);
  },

  addProduct: async (e) => {
    e.preventDefault();
    const form = e.target;
    const attributes = {};
    form.querySelectorAll('[data-attr-key]').forEach(input=>{if(input.value) attributes[input.dataset.attrKey]=input.value;});
    const payload = {name:form.pName.value, categoryId:form.pCat.value, attributes, description:form.pDesc.value};
    try { await fetch(`${API_URL}/products`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); alert('Dodano produkt!'); app.router('home'); }
    catch(err){ alert('Błąd'); }
  }
};

async function updateWholesalerAssortment(wholesalerId) {
    const container = document.getElementById('wholesaler-assortment-results');
    if (!container) return;
    try {
        const res = await fetch(`${API_URL}/wholesalers/${wholesalerId}`);
        const data = await res.json();
        const keyword = state.wholesalerAssortment.keyword.toLowerCase();
        const grouped = groupProductsByCategory(data.products);
        if (keyword) {
            Object.entries(grouped).forEach(([category, subcats]) => {
                let catMatch = false;
                Object.entries(subcats).forEach(([subcat, prodList]) => {
                    if (prodList.some(p => p.name.toLowerCase().includes(keyword))) {
                        state.wholesalerAssortment.openSubcategories[`${category}|${subcat}`] = true; catMatch = true;
                    }
                });
                if (catMatch) state.wholesalerAssortment.openCategories[category] = true;
            });
        }
        container.innerHTML = renderWholesalerAssortment(grouped, keyword);
    } catch (e) { console.error(e); }
}

function groupProductsByCategory(products) {
  return products.reduce((acc, p) => {
    const category = p.category_id || 'Inne';
    const subcategory = p.subcategory || 'Pozostałe';
    if (!acc[category]) acc[category] = {};
    if (!acc[category][subcategory]) acc[category][subcategory] = [];
    acc[category][subcategory].push(p);
    return acc;
  }, {});
}

function renderWholesalerAssortment(grouped, keyword) {
  const search = keyword?.toLowerCase() || '';
  if (Object.keys(grouped).length === 0) return `<div class="text-stone-500 italic">Brak produktów.</div>`;
  return `<div class="space-y-6">
      ${Object.entries(grouped).map(([category, subcats]) => {
        const isCategoryOpen = !!state.wholesalerAssortment.openCategories[category];
        return `<div>
            <button onclick="app.toggleWholesalerCategory('${category}')" class="flex items-center gap-2 text-left text-base font-semibold text-stone-900 hover:text-[#cd5341] transition">
              <span class="w-4 text-center select-none">${isCategoryOpen ? '−' : '+'}</span><span>${category}</span>
            </button>
            ${isCategoryOpen ? `<div class="pl-4 mt-3 border-l border-stone-200 space-y-4">
                ${Object.entries(subcats).map(([subcat, products]) => {
                    const subKey = `${category}|${subcat}`;
                    const filteredProducts = products.filter(p => !search || p.name.toLowerCase().includes(search));
                    const isSubOpen = state.wholesalerAssortment.openSubcategories[subKey] || (search && filteredProducts.length > 0);
                    return `<div>
                        <button onclick="app.toggleWholesalerSubcategory('${subKey}')" class="flex items-center gap-2 text-left text-sm font-medium text-stone-700 hover:text-[#cd5341] transition">
                            <span class="w-4 text-center select-none">${isSubOpen ? '−' : '+'}</span><span>${subcat}</span>
                        </button>
                        ${isSubOpen ? `<ul class="mt-2 ml-6 space-y-1 text-sm text-stone-600">
                            ${filteredProducts.length ? filteredProducts.map(p => `
                                <li class="cursor-pointer hover:text-[#cd5341] transition" onclick="app.router('productDetail', '${p.id}')">${highlight(p.name, search)}</li>
                            `).join('') : '<li class="text-stone-400 italic">Brak wyników</li>'}
                        </ul>` : ''}
                    </div>`;
                }).join('')}
            </div>` : ''}
          </div>`;
      }).join('')}
    </div>`;
}

function highlight(text, keyword) {
  if (!keyword) return text;
  return text.replace(new RegExp(`(${keyword})`, 'gi'), '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}

function initLocationsMap({ elementId, locations, height = 256 }) {
  const container = document.getElementById(elementId);
  if (!container) return;
  if (!locations || !locations.length) { container.innerHTML = ''; return; }
  
  container.style.height = `${height}px`;
  if (container._leaflet_id) { container.innerHTML = ''; container._leaflet_id = null; }

  const map = L.map(elementId, { scrollWheelZoom: false });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

  const bounds = [];
  locations.forEach(loc => {
    L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(`<b>${loc.name}</b><br>${loc.address}`);
    bounds.push([loc.lat, loc.lng]);
  });

  setTimeout(() => {
    map.invalidateSize();
    if (bounds.length > 0) map.fitBounds(bounds, { padding: [30, 30] });
  }, 100);
}

// --- WIDOKI ---

const views = {
  home: async container => {
    const isSearchActive = state.filters.keyword || state.filters.category || (state.filters.city && state.filters.city !== 'Wszystkie');
    const params = new URLSearchParams({
        keyword: state.filters.keyword, category: state.filters.category || '',
        city: state.filters.city === 'Wszystkie' ? '' : state.filters.city,
        minPrice: state.filters.minPrice, maxPrice: state.filters.maxPrice
    });
    if (state.filters.selectedBrands.length > 0) params.append('brands', state.filters.selectedBrands.join(','));

    let products = [];
    if (isSearchActive) {
        const res = await fetch(`${API_URL}/products?${params}`);
        products = await res.json();
    }

    // --- SEKCJA SEARCH ---
    const searchHeader = `
      <section class="relative bg-white ${isSearchActive ? 'pt-16 pb-16' : 'py-24'}">
        ${!isSearchActive ? `<div class="absolute top-1/2 right-0 -translate-y-1/2 w-[60%] h-[100%] pointer-events-none z-0"><div class="absolute inset-0 bg-cover bg-center opacity-90" style="background-image: url('./images/1.jpg');"></div></div>` : ''}
        ${isSearchActive ? `<div class="absolute inset-0 overflow-hidden pointer-events-none z-0"><div class="absolute -top-24 left-[15%] w-[250px] h-[250px] bg-[#f1f5f9]" style="border-radius:55% 45% 60% 40% / 40% 60% 45% 55%;"></div><div class="absolute -top-24 right-[6%] w-[440px] h-[380px] bg-[#eef2ff]" style="border-radius:62% 38% 55% 45% / 48% 60% 40% 52%;"></div></div>` : ''}
        
        <div class="relative max-w-7xl mx-auto px-6 z-10">
          <div class="${isSearchActive ? 'flex justify-center' : ''}">
            <div>
              ${!isSearchActive ? `<h1 class="text-4xl md:text-5xl font-bold text-stone-800 mb-4">Remontowe potrzeby?</h1><p class="text-lg text-stone-500 mb-10 max-w-xl">Znajdź wszystko w lokalnych hurtowniach</p>` : ''}
              <form id="searchForm" onsubmit="event.preventDefault(); app.router('home');" class="flex flex-col md:flex-row items-center gap-4 max-w-3xl ${isSearchActive ? 'mx-auto' : ''}">
                <div class="flex items-center gap-3 bg-white rounded-full shadow px-6 py-4 flex-1 w-full">
                  <i class="fa-solid fa-magnifying-glass text-stone-400"></i>
                  <input type="text" id="searchKeyword" placeholder="Szukaj produktów (np. Farba)" value="${state.filters.keyword}" onchange="state.filters.keyword=this.value; app.router('home')" class="bg-transparent outline-none text-sm w-full fixed-search-input"/>
                </div>
                <div class="relative flex-1 min-w-[280px] w-full">
                  <div class="flex items-center gap-3 bg-white rounded-full shadow px-6 py-4">
                    <i class="fa-solid fa-location-dot text-stone-400"></i>
                    <select id="cityInput" class="bg-transparent outline-none text-sm w-full" onchange="state.filters.city=this.value; app.router('home')">
                      ${state.cities.map(c => `<option value="${c}" ${state.filters.city===c?'selected':''}>${c}</option>`).join('')}
                    </select>
                  </div>
                </div>
                <button type="submit" class="bg-[#cd5341] hover:bg-[#993f31] text-white font-semibold px-10 py-4 rounded-full transition">Szukaj</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;

    // --- SEKCJA WYNIKÓW ---
    const resultsSection = isSearchActive ? `
      <section class="max-w-7xl mx-auto px-6 pt-10 pb-20">
        <div class="grid grid-cols-12 gap-8">
            <!-- SIDEBAR FILTRÓW -->
            <aside class="col-span-12 md:col-span-3">
                <div class="bg-white rounded-xl shadow p-6 sticky top-28 space-y-6 border border-stone-200">
                    <div class="flex justify-between items-center">
                        <h3 class="font-bold text-lg">Filtry</h3>
                        <button onclick="app.resetToHome()" class="text-xs text-[#cd5341] hover:underline">Wyczyść</button>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-2 text-sm">Producent</h4>
                        <div class="space-y-2 text-sm max-h-40 overflow-auto">
                            ${state.brands.map(brand => `
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" ${state.filters.selectedBrands.includes(brand) ? 'checked' : ''} onchange="app.toggleBrand('${brand}')">
                                    ${brand}
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-2 text-sm">Cena (do ${state.filters.maxPrice} zł)</h4>
                        <input type="range" min="0" max="1000" step="10" value="${state.filters.maxPrice}" class="w-full accent-[#cd5341]" onchange="app.setPrice(this.value)">
                        <div class="flex justify-between text-xs text-stone-500 mt-1"><span>0</span><span>1000</span></div>
                    </div>
                </div>
            </aside>

            <!-- PRODUKTY -->
            <div class="col-span-12 md:col-span-9">
                <div class="mb-6 flex justify-between items-center">
                    <h1 class="text-2xl font-semibold text-stone-900">Wyniki: <span class="text-[#1e3a8a]">${state.filters.keyword || state.filters.category}</span></h1>
                    <span class="text-sm text-stone-500">Znaleziono: ${products.length}</span>
                </div>
                ${products.length > 0 ? `
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${products.map(p => `
                            <div onclick="app.router('productDetail', '${p.id}')" class="group bg-white rounded-2xl border border-stone-200 hover:border-amber-400 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col overflow-hidden">
                                <div class="relative bg-stone-100 h-40 flex items-center justify-center">
                                    <i class="fa-solid fa-paint-roller text-4xl text-stone-300"></i>
                                    <div class="absolute top-3 left-3 bg-white text-xs font-bold text-amber-600 px-2 py-1 rounded-full shadow">${p.categoryName || ''}</div>
                                </div>
                                <div class="flex flex-col flex-1 p-4">
                                    <h3 class="font-semibold text-sm mb-1 line-clamp-2">${p.name}</h3>
                                    <div class="text-xs text-stone-500 mb-2">Marka: ${p.attributes.brand || 'Inna'}</div>
                                    <div class="mt-auto">
                                        <div class="text-xs uppercase text-stone-500">Cena sugerowana</div>
                                        <div class="text-xl font-bold text-stone-900">${p.price} zł</div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `<div class="text-center py-20 text-stone-500 border rounded-xl bg-stone-50">Brak produktów spełniających kryteria.</div>`}
            </div>
        </div>
      </section>
    ` : '';

    container.innerHTML = `<div class="${container.dataset.sameHome === '1' ? '' : 'fade-in'} space-y-8">${searchHeader}${resultsSection}</div>`;
  },

  wholesalersList: async container => {
    const params = new URLSearchParams();
    if(state.filters.city !== 'Wszystkie') params.append('city', state.filters.city);
    if(state.wholesalerSearch.query) params.append('query', state.wholesalerSearch.query);

    const res = await fetch(`${API_URL}/wholesalers?${params}`);
    const wholesalers = await res.json();
    const mapLocations = wholesalers.map(w => ({ id: w.id, lat: w.lat, lng: w.lng, name: w.name, address: w.address }));

    container.innerHTML = `
      <section class="relative bg-white pt-16 pb-16">
        <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div class="absolute -top-24 left-[15%] w-[250px] h-[250px] bg-[#f1f5f9]" style="border-radius:55% 45% 60% 40% / 40% 60% 45% 55%;"></div>
        </div>
        <div class="relative max-w-7xl mx-auto px-6 z-10">
            <h1 class="text-3xl font-bold mb-6">Znajdź hurtownię</h1>
            <input type="text" placeholder="Wpisz nazwę hurtowni..." class="input mb-6" value="${state.wholesalerSearch.query}" oninput="state.wholesalerSearch.query=this.value; app.router('wholesalersList')">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="space-y-4 max-h-[600px] overflow-auto">
                    ${wholesalers.map(w => `
                        <div onclick="app.router('wholesalerDetail','${w.id}')" class="bg-white border border-stone-200 rounded-lg px-4 py-3 cursor-pointer hover:bg-stone-50 transition relative">
                            <div class="text-[#cd5341] text-base font-medium">${w.name}</div>
                            <div class="text-sm text-stone-500">${w.city}, ${w.address}</div>
                            <div class="text-xs text-stone-400 mt-0.5">${w.hours}</div>
                            <div class="absolute bottom-2 right-3 text-xs text-stone-400">Kliknij →</div>
                        </div>
                    `).join('')}
                </div>
                <div>
                    <div id="wholesalers-map" class="w-full h-[600px] rounded-xl border border-stone-200 bg-stone-100 overflow-hidden"></div>
                </div>
            </div>
        </div>
      </section>
    `;
    initLocationsMap({ elementId: "wholesalers-map", height: 600, locations: mapLocations });
  }, 

  wholesalerDetail: async (container, id) => {
    state.activeWholesalerId = id;
    try {
        const res = await fetch(`${API_URL}/wholesalers/${id}`);
        if (!res.ok) throw new Error('Nie znaleziono');
        const { wholesaler, products } = await res.json();
        const grouped = groupProductsByCategory(products);
        const keyword = state.wholesalerAssortment.keyword;

        container.innerHTML = `
          <div class="relative max-w-7xl mx-auto px-6 py-10 space-y-10 fade-in">
            <nav class="text-sm text-stone-400"><span class="text-[#cd5341] cursor-pointer" onclick="app.router('wholesalersList')">← Wróć do listy</span></nav>
            <div class="bg-white border border-stone-200 rounded-xl p-6 flex flex-col md:flex-row gap-8">
                <div class="flex-1">
                    <h1 class="text-2xl font-semibold text-stone-900">${wholesaler.name}</h1>
                    <div class="text-sm text-stone-500 mt-1">${wholesaler.address}, ${wholesaler.city}</div>
                    <div class="mt-4 text-sm text-stone-600 space-y-1">
                        <div><i class="fa-solid fa-clock mr-2 text-stone-400"></i> ${wholesaler.hours}</div>
                        <div><i class="fa-solid fa-phone mr-2 text-stone-400"></i> ${wholesaler.phone || '-'}</div>
                        <div><i class="fa-solid fa-envelope mr-2 text-stone-400"></i> ${wholesaler.email || '-'}</div>
                    </div>
                </div>
                <div id="wholesaler-detail-map" class="w-full md:w-1/3 h-48 bg-stone-100 rounded-lg border overflow-hidden"></div>
            </div>
            <div class="grid grid-cols-12 gap-8">
                <aside class="col-span-12 lg:col-span-3 space-y-6"><div class="bg-stone-50 p-4 rounded-lg text-sm text-stone-600"><h3 class="font-bold mb-2">O hurtowni</h3><p>Profesjonalne doradztwo i szeroki asortyment.</p></div></aside>
                <main class="col-span-12 lg:col-span-9">
                    <section class="p-6 bg-white rounded-xl border border-stone-200">
                        <h2 class="text-lg font-semibold text-stone-900 mb-4">Asortyment hurtowni</h2>
                        <div class="relative max-w-xl mb-6">
                            <input type="text" value="${keyword}" oninput="app.setWholesalerKeyword(this.value)" placeholder="Szukaj w asortymencie..." class="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg text-sm outline-none focus:border-[#cd5341]">
                            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"></i>
                        </div>
                        <div id="wholesaler-assortment-results">${renderWholesalerAssortment(grouped, keyword)}</div>
                    </section>
                </main>
            </div>
          </div>
        `;
        initLocationsMap({ elementId: "wholesaler-detail-map", height: 192, locations: [{lat: wholesaler.lat, lng: wholesaler.lng, name: wholesaler.name, address: wholesaler.address}] });
    } catch(e) { container.innerHTML = 'Błąd wczytywania hurtowni'; }
  },

// Tu rozpoczyta się sekcja kontaktu

  join: async (container) => {
    const res = await fetch('/views/static/join.html');
    const html = await res.text();
    container.innerHTML = html;
  },
};

// Tu kończy się sekcja kontaktu

document.addEventListener('DOMContentLoaded', () => {
  app.init();
  // Dropdown UI logic
  const moreBtn = document.getElementById('moreBtn');
  const megaMenu = document.getElementById('megaMenu');
  if (moreBtn && megaMenu) {
    moreBtn.addEventListener('click', (e) => { e.stopPropagation(); megaMenu.classList.toggle('hidden'); requestAnimationFrame(() => megaMenu.classList.toggle('opacity-0')); });
    document.addEventListener('click', () => megaMenu.classList.add('hidden', 'opacity-0'));
  }
});

// Helpers
function recalcMaterials() {
    const area = (state.calc.area || 0) * (state.calc.coats || 2);
    const coverage = window.currentProduct?.coverage || 10;
    const result = document.getElementById('paint-result');
    if(result) result.innerText = `${(area / coverage).toFixed(1)} L`;
}
