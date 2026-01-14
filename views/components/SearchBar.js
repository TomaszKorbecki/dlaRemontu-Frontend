export function SearchBar({ state, variant = 'inline' }) {
    const isHero = variant === 'hero';
  
    return `
      <section class="
        relative
        ${isHero ? 'bg-white py-24 overflow-hidden z-50 isolate' : ''}
      ">
        <div class="relative max-w-7xl mx-auto px-6 ${isHero ? 'z-10' : ''}">
          <form
            id="searchForm"
            onsubmit="event.preventDefault(); app.router('home');"
            class="flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto"
          >
            <div class="flex items-center gap-3 bg-white rounded-full shadow px-6 py-4 flex-1 w-full">
              <i class="fa-solid fa-magnifying-glass text-stone-400"></i>
              <input
                type="text"
                placeholder="Szukaj produktów (np. Farba)"
                value="${state.filters.keyword}"
                onchange="state.filters.keyword=this.value; app.router('home')"
                class="bg-transparent outline-none text-sm w-full"
              />
            </div>
  
            <div class="relative flex-1 min-w-[280px] w-full">
              <div class="flex items-center gap-3 bg-white rounded-full shadow px-6 py-4">
                <i class="fa-solid fa-location-dot text-stone-400"></i>
                <select
                  class="bg-transparent outline-none text-sm w-full"
                  onchange="state.filters.city=this.value; app.router('home')"
                >
                  ${state.cities.map(
                    c => `<option value="${c}" ${state.filters.city === c ? 'selected' : ''}>${c}</option>`
                  ).join('')}
                </select>
              </div>
            </div>
  
            <button
              type="submit"
              class="bg-[#cd5341] hover:bg-[#993f31] text-white font-semibold px-10 py-4 rounded-full transition"
            >
              Szukaj
            </button>
          </form>
        </div>
      </section>
    `;
  }
  