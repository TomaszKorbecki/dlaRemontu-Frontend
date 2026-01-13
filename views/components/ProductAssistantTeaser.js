// views/components/ProductAssistantTeaser.js

export function ProductAssistantTeaser() {
    return `
      <div class="rounded-xl border border-stone-200 p-6 bg-white">
        <h3 class="font-semibold mb-2">
          Nie wiesz ile kupić?
        </h3>
  
        <p class="text-sm text-stone-600 mb-4">
          Skorzystaj z kalkulatora i sprawdź ile produktu potrzebujesz.
        </p>
  
        <button
          class="bg-[#cd5341] hover:bg-[#993f31] text-white text-sm font-semibold px-6 py-3 rounded-full transition"
          onclick="document.getElementById('assistant-section')?.scrollIntoView({ behavior: 'smooth' })"
        >
          Oblicz ilość
        </button>
      </div>
    `;
  }
  