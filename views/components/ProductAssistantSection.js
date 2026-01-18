function renderAssistantCheckbox(label, optional = false) {
    return `
      <label class="flex items-start gap-3 text-sm text-stone-600 cursor-pointer">
        <input
          type="checkbox"
          class="mt-1 rounded border-stone-300
                 text-[#1e3a8a] focus:ring-[#1e3a8a]"
          onchange="this.closest('label').classList.toggle('assistant-done', this.checked)"
        />
  
        <span>
          ${label}
          ${optional ? `<em class="text-stone-400 italic">(opcjonalnie)</em>` : ``}
        </span>
      </label>
    `;
  }

export function ProductAssistantSection() {
    return `
    <section
      id="assistant-section"
      class="p-6 space-y-6"
    >
  
      <!-- HEADER -->
      <div>
        <h3 class="text-lg font-semibold text-stone-900">
          Asystent budowlany
        </h3>
        <p class="text-sm text-stone-500 mt-1">
          Lista rzeczy, które mogą być potrzebne do poprawnego wykonania pracy. Dodaj brakujące elementy do listy zakupów aby o niczym nie zapomnieć.
        </p>
      </div>
  
      <!-- KROKI -->
      <div class="relative">
  
        <!-- STRZAŁKI -->
        <button
          onclick="scrollAssistantSteps(-1)"
          class="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2
                 w-8 h-8 rounded-full bg-white border border-stone-300
                 items-center justify-center shadow-sm z-10"
        >‹</button>
  
        <button
          onclick="scrollAssistantSteps(1)"
          class="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2
                 w-8 h-8 rounded-full bg-white border border-stone-300
                 items-center justify-center shadow-sm z-10"
        >›</button>
  
        <!-- LISTA KROKÓW -->
        <div
          id="assistant-steps"
          class="flex gap-6 overflow-x-auto scroll-smooth pb-2"
        >
  
          <!-- KROK 1 -->
          <div class="min-w-[320px] bg-stone-50 rounded-xl border border-stone-200 p-5 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-[#cd5341]/10 text-[#cd5341]
                          flex items-center justify-center font-semibold text-sm">
                1
              </div>
              <div>
                <div class="text-xs uppercase tracking-wide text-stone-500">
                  Krok 1
                </div>
                <div class="font-semibold text-stone-800">
                  Przygotowanie
                </div>
              </div>
            </div>
  
            <p class="text-xs text-stone-500">
              Zaznacz elementy, które już masz
            </p>
  
            <div class="space-y-2">
              ${renderAssistantCheckbox('Szpachle i pace')}
              ${renderAssistantCheckbox('Papier ścierny')}
              ${renderAssistantCheckbox('Grunt')}
              ${renderAssistantCheckbox('Folia malarska')}
            </div>
          </div>
  
          <!-- KROK 2 -->
          <div class="min-w-[320px] bg-stone-50 rounded-xl border border-stone-200 p-5 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-[#cd5341]/10 text-[#cd5341]
                          flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <div>
                <div class="text-xs uppercase tracking-wide text-stone-500">
                  Krok 2
                </div>
                <div class="font-semibold text-stone-800">
                  Narzędzia malarskie
                </div>
              </div>
            </div>
  
            <p class="text-xs text-stone-500">
              Zaznacz elementy, które już masz
            </p>
  
            <div class="space-y-2">
              ${renderAssistantCheckbox('Wałki i pędzle')}
              ${renderAssistantCheckbox('Kuwety malarskie')}
              ${renderAssistantCheckbox('Drabina', true)}
            </div>
          </div>
  
          <!-- KROK 3 – PLACEHOLDER -->
          <div class="min-w-[320px] bg-stone-50 rounded-xl border border-dashed border-stone-300 p-5 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-stone-200 text-stone-500
                          flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <div>
                <div class="text-xs uppercase tracking-wide text-stone-500">
                  Krok 3
                </div>
                <div class="font-semibold text-stone-800">
                  Kolejny etap
                </div>
              </div>
            </div>
  
            <p class="text-sm text-stone-500">
              Ten krok zostanie uzupełniony automatycznie
              na podstawie danych produktu.
            </p>
          </div>
  
        </div>
      </div>
  
      <!-- HELP + CTA -->
      <div
        class="bg-stone-50 border border-dashed border-stone-300
               rounded-xl p-5 flex flex-col md:flex-row
               items-start md:items-center gap-4 mt-6"
      >
        <div class="flex-1">
          <div class="font-semibold text-stone-800">
            Masz wątpliwości?
          </div>
          <p class="text-sm text-stone-600 mt-1">
            Podaj powierzchnię lub wymiary, aby otrzymać spersonalizowaną listę.
          </p>
        </div>
  
        <button
          onclick="openExtendedAssistant()"
          class="text-sm text-[#cd5341] hover:underline font-medium"
        >
          Dopasuj do projektu →
        </button>
      </div>
    </section>
    `;
  }

  export function ProductAssistantExtended () {
    return `
    <section
      id="extended-assistant"
      class="hidden mt-8 bg-white border border-stone-200 rounded-xl p-6 space-y-6"
    >
  
      <!-- HEADER -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-stone-500">
            Podaj metraż lub wymiary, a obliczymy potrzebne ilości materiałów.
          </p>
        </div>
  
        <button
          onclick="toggleExtendedAssistant()"
          class="text-sm text-[#cd5341] hover:underline"
        >
          Zwiń
        </button>
      </div>
      
      <!-- TRYB -->
      <div class="flex gap-4">
        <label class="flex items-center gap-2 text-sm">
          <input type="radio" name="calcMode" value="area" checked onchange="setCalcMode('area')">
          Podaj powierzchnię
        </label>
  
        <label class="flex items-center gap-2 text-sm">
          <input type="radio" name="calcMode" value="walls" onchange="setCalcMode('walls')">
          Podaj wymiary ścian
        </label>
      </div>
  
  
    <!-- POWIERZCHNIA + KOREKTA -->
  <div id="calc-area" class="mt-6">
  
    <div class="flex items-start">
  
      <!-- LEWA: POWIERZCHNIA -->
      <div class="space-y-1">
        <label class="block text-sm text-stone-700">
          Powierzchnia ścian
        </label>
  
        <div class="flex items-center gap-2">
          <input
            type="number"
            min="1"
            placeholder="40"
            class="w-24 border border-stone-300 rounded-md px-3 py-2 text-sm"
            oninput="state.calc.area = +this.value; recalcMaterials()"
          />
          <span class="text-sm text-stone-500">m²</span>
        </div>
      </div>
  
      <!-- SEPARATOR – CAŁA WYSOKOŚĆ -->
      <div class="mx-20 self-stretch flex justify-center">
        <div class="w-px bg-stone-200"></div>
      </div>
  
      <!-- PRAWA: KOREKTA -->
      <div class="space-y-3">
   
  
        <div class="flex gap-8 items-end">
          <div>
            <label class="block text-sm text-stone-500 mb-1">
              Okna
            </label>
            <input
              type="number"
              min="0"
              class="w-24 border border-stone-300 rounded-md px-3 py-2 text-sm"
              oninput="state.calc.windows = +this.value; recalcMaterials()"
            />
          </div>
  
          <div>
            <label class="block text-sm text-stone-500 mb-1">
              Drzwi
            </label>
            <input
              type="number"
              min="0"
              class="w-24 border border-stone-300 rounded-md px-3 py-2 text-sm"
              oninput="state.calc.doors = +this.value; recalcMaterials()"
            />
          </div>
        </div>
  
        <!-- TEKST POMOCNICZY – POD INPUTAMI -->
        <p class="text-xs text-stone-400">
          Odejmujemy standardowe wymiary (okno ~1,8 m², drzwi ~2 m²)
        </p>
      </div>
  
    </div>
  
  </div>
  
  
  
  
  
      <!-- PODSUMOWANIE -->
  <div class="pt-6 border-t border-stone-200 space-y-3">
  
    <div class="mt-1 p-5 rounded-xl bg-stone-50 border border-stone-200">
  
    <div class="text-xs uppercase tracking-wide text-stone-500">
      Podsumowanie
    </div>
  
  <div class="mt-4 grid gap-6 sm:grid-cols-2">
  
    <!-- ================= -->
    <!-- LEWA: ILOŚCI -->
    <!-- ================= -->
    <div class="space-y-4">
  
      <!-- POWIERZCHNIA -->
      <div>
        <div class="text-sm text-stone-600">
          Powierzchnia do malowania
        </div>
        <div class="text-4xl font-bold text-stone-900">
          <span id="final-area">—</span> m²
        </div>
      </div>
  
      <!-- FARBA -->
      <div>
        <div class="text-sm text-stone-600">
          Potrzebna farba
        </div>
        <div
          id="paint-result"
          class="text-xl font-semibold text-stone-800"
        >
          —
        </div>
      </div>
  
    </div>
  
    <!-- ================= -->
    <!-- PRAWA: KOSZTY -->
    <!-- ================= -->
    <div class="space-y-3 text-sm">
  
      <div class="flex items-center gap-2 text-stone-600">
        <span class="text-stone-400">🎨</span>
        <span>Koszt farby</span>
        <span class="ml-auto font-medium text-stone-800">
          ~ <span id="paint-cost">—</span> zł
        </span>
      </div>
  
      <div class="flex items-center gap-2 text-stone-600">
        <span class="text-stone-400">🧰</span>
        <span>Materiały dodatkowe</span>
        <span class="ml-auto font-medium text-stone-800">
          ~ <span id="extras-cost">—</span> zł
        </span>
      </div>
  
      <div class="pt-3 mt-3 border-t border-stone-200
                  flex items-center gap-2 font-medium">
        <span class="text-stone-500">💰</span>
        <span>Szacunkowy koszt całości</span>
        <span class="ml-auto text-base text-stone-900">
          ~ <span id="total-cost">—</span> zł
        </span>
      </div>
  
      <p class="text-xs text-stone-400 pt-1">
        Ceny orientacyjne, na podstawie cen producentów i dostępności lokalnej.
      </p>
  
    </div>
  
  </div>
  
  
    </div>
  
  </div>
  
  

  
  <!-- MATERIAŁY DO PROJEKTU -->
  <div
    id="project-materials"
    class="mt-8 space-y-4 hidden text-sm text-stone-600"
  >
  
  <div class="flex items-center gap-2 text-xs text-stone-500 mb-4">
    <i class="fa-solid fa-wand-magic-sparkles text-[#cd5341]"></i>
    <span>
      Rekomendowane produkty – dobrane automatycznie do Twojego projektu
    </span>
  </div>
  
  
    <div class="mt-6 space-y-4">
  
    <!-- ITEM -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="inline-block w-1.5 h-1.5 rounded-full bg-[#cd5341]/70"></span>
        <span class="font-medium text-stone-800">Grunt</span>
        <span class="text-xs italic text-stone-500">około 4 L</span>
      </div>
  
  <div class="text-xs text-stone-500">
    <a
      href="#"
      class="font-medium text-stone-600 hover:text-stone-800 hover:underline underline-offset-2 transition"
    >
      Atlas Uni-Grunt
    </a>
  </div>
    </div>
  
    <!-- ITEM -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="inline-block w-1.5 h-1.5 rounded-full bg-[#cd5341]/70"></span>
        <span class="font-medium text-stone-800">Taśma malarska</span>
        <span class="text-xs italic text-stone-500">1 rolka (50 m)</span>
      </div>
  
  
    <div class="text-xs text-stone-500">
    <a
      href="#"
      class="font-medium text-stone-600 hover:text-stone-800 hover:underline underline-offset-2 transition"
    >
      Tesa Precision
    </a>
  </div>
    </div>
  
    <!-- ITEM -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="inline-block w-1.5 h-1.5 rounded-full bg-[#cd5341]/70"></span>
        <span class="font-medium text-stone-800">Folia ochronna</span>
        <span class="text-xs italic text-stone-500">1 opakowanie</span>
      </div>
  
  
        <div class="text-xs text-stone-500">
    <a
      href="#"
      class="font-medium text-stone-600 hover:text-stone-800 hover:underline underline-offset-2 transition"
    >
      Motive Cover
    </a>
  </div>
    </div>
  
    <!-- ITEM -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="inline-block w-1.5 h-1.5 rounded-full bg-[#cd5341]/70"></span>
        <span class="font-medium text-stone-800">Kuweta malarska</span>
        <span class="text-xs italic text-stone-500">1 szt.</span>
      </div>
  
  
           <div class="text-xs text-stone-500">
    <a
      href="#"
      class="font-medium text-stone-600 hover:text-stone-800 hover:underline underline-offset-2 transition"
    >
      Hardy 330
    </a>
  </div>
  
    </div>
  
  </div>
  
  </div>
  
  
    <!-- PARTNER LOKALNY -->
  <div id="project-partner" class="mt-6 hidden">
  
    <div class="p-4 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between gap-4">
  
      <div>
        <div class="flex items-center gap-2 text-sm font-medium text-stone-800">
          <span class="text-green-600">✔</span>
          Kupisz wszystko w jednym miejscu
        </div>
        <div class="mt-1 text-sm text-stone-700">
          Hurtownia Budowlana XYZ
        </div>
        <div class="text-xs text-stone-500">
          ul. Przykładowa 12 · 2,3 km od Ciebie
        </div>
      </div>
  
      <a
        href="#"
        class="shrink-0 px-4 py-2 rounded-md bg-[#cd5341] text-white text-sm font-medium hover:opacity-90"
      >
        Zobacz hurtownię
      </a>
  
    </div>
  </div>
  
  
  
  

  
    </section>
    `;
  }    