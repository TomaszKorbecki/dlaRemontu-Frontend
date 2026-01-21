function renderAssistantCheckbox(
    label,
    {
      optional = false,
      href = '#',
      sponsor = null
    } = {}
  ) {
    return `
      <div class="assistant-item flex items-start gap-3 text-sm">
  
        <!-- CHECKBOX: jedyna akcja stanu -->
        <input
          type="checkbox"
          class="mt-1 cursor-pointer rounded border-stone-300
                 text-[#1e3a8a] focus:ring-[#1e3a8a]"
          onchange="this.closest('.assistant-item')
            .classList.toggle('assistant-done', this.checked)"
        />
  
        <!-- TEKST + LINK + SPONSOR -->
        <div class="flex flex-col gap-1">
  
          <!-- NAZWA / LINK -->
          <a
            href="${href}"
            class="text-stone-700 hover:text-[#1e3a8a] hover:underline"
          >
            ${label}
          </a>
  
          <!-- OPCJONALNE -->
          ${
            optional
              ? `<span class="text-xs text-stone-400 italic">(opcjonalnie)</span>`
              : ``
          }
  
          <!-- SPONSOR -->
          ${
            sponsor
              ? `
<div class="text-xs text-stone-500 flex items-center gap-1">
  <span class="text-yellow-500">★</span>
  <span class="font-medium">Polecany:</span>
  <a href="#" class="text-[#1e3a8a] hover:underline">
    ${sponsor}
  </a>
</div>

              `
              : ``
          }
  
        </div>
      </div>
    `;
  }
  
  
  
  
  function renderAssistantStepHeader(step, title) {
    return `
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-[#cd5341]/10 text-[#cd5341]
                    flex items-center justify-center font-semibold text-xs">
          ${step}
        </div>
        <div class="font-semibold text-stone-800 text-sm">
          ${title}
        </div>
      </div>
    `;
  }
  
  export function ProductAssistantSection() {
    return `
    <section id="assistant-section" class="p-6 space-y-6">
  
      <!-- HEADER -->
      <div>
        <h3 class="text-lg font-semibold text-stone-900">
          Asystent – krok po kroku
        </h3>
        <p class="text-sm text-stone-500 mt-1">
          Przejdź przez kolejne kategorie i zaznacz elementy, które już masz.
          Asystent pomoże sprawdzić kompletność i uzupełnić checklistę.
        </p>
      </div>
  
      <!-- JEDNA KARTA -->
      <div class="bg-stone-50 rounded-xl border border-stone-200 p-6 space-y-8">
  
        <!-- KROK 1 -->
        <div class="space-y-4">
          ${renderAssistantStepHeader(1, 'Przygotowanie')}
          <p class="text-xs text-stone-500">
            Zaznacz elementy, które już masz
          </p>
          <div class="space-y-3 assistant-item">
            ${renderAssistantCheckbox('Szpachle i pace')}
            ${renderAssistantCheckbox('Papier ścierny')}
            ${renderAssistantCheckbox('Grunt', {
                sponsor: 'ATLAS Uni-Grunt'
              })}            
            ${renderAssistantCheckbox('Folia malarska')}
          </div>
        </div>
  
        <hr class="border-stone-200" />
  
        <!-- KROK 2 -->
        <div class="space-y-4">
          ${renderAssistantStepHeader(2, 'Zabezpieczenie')}
          <div class="space-y-3 assistant-item">
            ${renderAssistantCheckbox('Taśmy malarskie', false, 'Tesa Professional')}
            ${renderAssistantCheckbox('Folia ochronna')}
            ${renderAssistantCheckbox('Rękawice', true)}
          </div>
        </div>
  
        <hr class="border-stone-200" />
  
        <!-- KROK 3 -->
        <div class="space-y-4">
          ${renderAssistantStepHeader(3, 'Narzędzia')}
          <div class="space-y-3 assistant-item">
            ${renderAssistantCheckbox('Wałki i pędzle', false, 'ANZA Platinum')}
            ${renderAssistantCheckbox('Kuwety malarskie')}
            ${renderAssistantCheckbox('Drabina', true)}
          </div>
        </div>
  
        <hr class="border-stone-200" />
  
        <!-- KROK 4 -->
        <div class="space-y-3">
          ${renderAssistantStepHeader(4, 'Materiały')}
          <p class="text-sm text-stone-500">
            Materiały zostaną dobrane automatycznie na podstawie wybranego produktu
            i dodane do checklisty.
          </p>
        </div>
  
      </div>
    </section>
    `;
  }
  