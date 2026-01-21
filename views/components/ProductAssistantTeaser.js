// views/components/ProductAssistantTeaser.js

export function ProductAssistantTeaser() {
    return `
      <section
        class="rounded-2xl border border-stone-200 bg-white px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
      >
        <div class="flex items-center gap-4">
          
          <!-- IKONA -->
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6e4df]"
          >
            <!-- prosty piktogram wałka -->
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6.5C4 5.12 5.12 4 6.5 4H14.5C15.88 4 17 5.12 17 6.5C17 7.88 15.88 9 14.5 9H6.5C5.12 9 4 7.88 4 6.5Z"
                fill="#cd5341"
              />
              <path
                d="M14 9V12C14 12.55 14.45 13 15 13H17C17.55 13 18 13.45 18 14V20"
                stroke="#cd5341"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
  
          <!-- TEKST -->
          <div>
            <h3 class="text-lg font-semibold text-stone-900 leading-tight">
              Sprawdź, czy masz wszystko przed rozpoczęciem pracy.
            </h3>
            <p class="text-sm text-stone-600">
              Asystent pomoże Ci przejść przez kolejne etapy i uzupełnić checklistę.
            </p>
          </div>
        </div>
  
        <!-- CTA -->
        <button
          type="button"
          class="text-base font-medium text-blue-700 hover:underline"
          onclick="document.getElementById('assistant-section')?.scrollIntoView({ behavior: 'smooth' })"
        >
          Sprawdź checklistę →
        </button>
      </section>
    `;
  }
  