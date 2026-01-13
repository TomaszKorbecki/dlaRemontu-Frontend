import { BackgroundBubbles } from './BackgroundBubbles.js';

/**
 * Wspólny layout strony
 * - ustawia tło
 * - dokłada bąbelki
 * - zapewnia poprawny z-index
 */
export function PageLayout({ content }) {
  return `
    <div class="relative">
      ${BackgroundBubbles()}
      <div class="relative z-10">
        ${content}
      </div>
    </div>
  `;
}