/**
 * Dekoracyjne bąbelki tła używane globalnie
 * Element layoutu – bez logiki, bez danych
 */
export function BackgroundBubbles() {
    return `
      <!-- BĄBELKI – SEKCJA HERO -->
      <div
        class="absolute inset-x-0 top-0 h-[340px]
               overflow-hidden pointer-events-none z-0"
      >
  
        <!-- BĄBELEK LEWY (hero) -->
        <div
          class="absolute
                 -top-16 left-[10%]
                 w-[180px] h-[180px]
                 md:-top-24 md:left-[15%]
                 md:w-[250px] md:h-[250px]
                 bg-[#f1f5f9]"
          style="border-radius:55% 45% 60% 40% / 40% 60% 45% 55%;"
        ></div>
  
        <!-- BĄBELEK PRAWY (desktop) -->
        <div
          class="hidden md:block absolute
                 -top-24 right-[6%]
                 w-[440px] h-[380px]
                 bg-[#eef2ff]"
          style="
            border-radius:
              62% 38% 55% 45% /
              48% 60% 40% 52%;
          "
        ></div>
  
      </div>
  
      <!-- BĄBELKI – TŁO POZA KARTĄ -->
      <div class="hidden md:block absolute inset-0 pointer-events-none z-0">
  
        <!-- BĄBELEK TŁA (dekoracyjny) -->
        <div
          class="absolute
                 -bottom-[220px] -left-[260px]
                 w-[520px] h-[520px]"
          style="
            background:#6b70a3;
            opacity:0.15;
            border-radius:55% 45% 60% 40% / 40% 60% 45% 55%;
          "
        ></div>
  
      </div>
    `;
  }  