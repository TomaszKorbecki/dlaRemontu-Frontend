export function CtaBubbles() {
    return `
      <!-- LEWY BĄBEL – ATAKUJĄCY -->
      <div
        class="hidden md:block absolute
               left-[-220px]
               top-[-10%]
               w-[430px] h-[400px]
               bg-[#eef2ff]
               opacity-100
               pointer-events-none
               z-10"
        style="border-radius:48% 52% 60% 40% / 55% 45% 55% 45%;">
      </div>
  
      <!-- PRAWY BĄBEL -->
      <div
        class="absolute
               right-[-140px]
               bottom-[-140px]
               w-[280px] h-[420px]
               bg-[#f1f5f9]
               opacity-70
               pointer-events-none
               z-0"
        style="border-radius:62% 38% 55% 45% / 48% 60% 40% 52%;">
      </div>
    `;
  }
  