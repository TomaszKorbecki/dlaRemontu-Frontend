// views/components/ProductAssistantSection.js

export function ProductAssistantSection({ product }) {
    return `
      <section
        id="assistant-section"
        class="rounded-xl border border-stone-200 bg-white p-6 space-y-6"
      >
  
        <!-- NAGŁÓWEK -->
        <div>
          <h3 class="text-xl font-semibold text-stone-900">
            Kalkulator zużycia
          </h3>
          <p class="text-sm text-stone-600 mt-1">
            Oblicz ile produktu potrzebujesz do swojego projektu.
          </p>
        </div>
  
        <!-- FORMULARZ -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
  
          <!-- POWIERZCHNIA -->
          <div>
            <label class="block text-sm text-stone-500 mb-1">
              Powierzchnia (m²)
            </label>
            <input
              type="number"
              min="0"
              placeholder="np. 45"
              class="w-full border border-stone-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#cd5341]"
              oninput="state.calc.area = +this.value; recalcMaterials()"
            />
          </div>
  
          <!-- LICZBA WARSTW -->
          <div>
            <label class="block text-sm text-stone-500 mb-1">
              Liczba warstw
            </label>
            <input
              type="number"
              min="1"
              value="2"
              class="w-full border border-stone-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#cd5341]"
              oninput="state.calc.coats = +this.value; recalcMaterials()"
            />
          </div>
  
        </div>
  
        <!-- WYNIK -->
        <div class="pt-4 border-t border-stone-200">
          <div class="text-sm text-stone-600">
            Szacowana ilość produktu:
          </div>
          <div
            id="paint-result"
            class="text-2xl font-bold text-stone-900 mt-1"
          >
            —
          </div>
          <div class="text-xs text-stone-400 mt-1">
            Obliczenia bazują na wydajności produktu
            ${product.attributes?.coverage
              ? `<b>${product.attributes.coverage} m² / L</b>`
              : ''}
          </div>
        </div>
  
      </section>
    `;
  }
  
  