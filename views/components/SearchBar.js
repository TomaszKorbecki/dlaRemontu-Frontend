export function SearchBar({ state }) {
    const isSearchActive =
      state.filters.keyword ||
      state.filters.category ||
      (state.filters.city && state.filters.city !== 'Wszystkie');
  
    return `
      <section class="relative bg-white ${isSearchActive ? 'pt-16 pb-16' : 'py-24'}">
  
        ${!isSearchActive ? `
          <div class="absolute top-1/2 right-0 -translate-y-1/2 w-[60%] h-[100%] pointer-events-none z-0">
            <div
              class="absolute inset-0 bg-cover bg-center opacity-90"
              style="background-image: url('./images/1.jpg');"
            ></div>
          </div>
        ` : ''}
  
        <div class="relative max-w-7xl mx-auto px-6 z-10">
          <div class="${isSearchActive ? 'flex justify-center' : ''}">
            <div>
  
              ${!isSearchActive ? `
                <h1 class="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
                  Remontowe potrzeby?
                </h1>
                <p class="text-lg text-stone-500 mb-10 max-w-xl">
                  Znajdź wszystko w lokalnych hurtowniach
                </p>
              ` : ''}
  
              <form
                onsubmit="event.preventDefault(); app.router('home');"
                class="flex flex-col md:flex-row items-center gap-4 max-w-3xl ${isSearchActive ? 'mx-auto' : ''}"
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
                      ${state.cities.map(c => `
                        <option value="${c}" ${state.filters.city === c ? 'selected' : ''}>
                          ${c}
                        </option>
                      `).join('')}
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
          </div>
        </div>
      </section>
    `;
  }  