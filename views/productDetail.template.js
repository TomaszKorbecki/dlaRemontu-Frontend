import { PageLayout } from './layouts/PageLayout.js';
import { BackgroundBubbles } from './layouts/BackgroundBubbles.js';

import { ProductSidePanel } from './components/ProductSidePanel.js';
import { ProductBreadcrumb } from './components/ProductBreadcrumb.js';
import { ProductInfoBox } from './components/ProductInfoBox.js';
import { ProductSummaryBox } from './components/ProductSummaryBox.js';
import { ProductGallery } from './components/ProductGallery.js';
import { ProductSpecs } from './components/ProductSpecs.js';
import { ProductDescription } from './components/ProductDescription.js';
import { ProductAssistantTeaser } from './components/ProductAssistantTeaser.js';
import { ProductConfigurator } from './components/ProductConfigurator.js';
import { AddToListBox } from './components/AddToListBox.js';
import { ProductAssistantSection } from './components/ProductAssistantSection.js';

export function productDetailTemplate({
  product,
  availability,
  state,
  renderSearchBar,
  hasUserLocation
}) {
  return PageLayout({
    content: `
      <section class="relative overflow-hidden isolate pt-24">
        ${BackgroundBubbles()}

        <div class="relative z-10">

          <!-- SEARCH -->
          <div class="relative z-30 pb-8 max-w-7xl mx-auto px-6">
            ${renderSearchBar()}
          </div>

          <!-- CONTENT -->
<div class="fade-in max-w-7xl mx-auto px-6 py-10 space-y-10
            pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-10">

            ${ProductBreadcrumb({ product })}

            <h1 class="text-3xl font-bold text-stone-900">
              ${product.name}
            </h1>

            <!-- GRID -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

              <!-- LEFT COLUMN -->
              <div class="lg:col-span-8 space-y-8">

                ${ProductConfigurator({ state })}

                <div class="grid md:grid-cols-2 gap-6">
                  ${ProductInfoBox({ product })}
                  ${ProductSummaryBox()}
                </div>

                ${ProductAssistantTeaser()}
                ${ProductGallery({ images: product.images || [] })}
                ${ProductDescription({ description: product.description })}
                ${ProductSpecs({ specs: product.specs || {} })}
                ${ProductAssistantSection({ product })}

              </div>

              <!-- RIGHT COLUMN (DESKTOP ONLY) -->
              <div class="hidden lg:block lg:col-span-4 space-y-4 lg:sticky lg:top-24 self-start">

                ${AddToListBox({ state })}

                ${ProductSidePanel({
                  product,
                  availability,
                  state,
                  hasUserLocation
                })}

              </div>

            </div>
          </div>
        </div>

       <!-- MOBILE ACTION BAR -->
<div
  class="mobile-action-bar fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-stone-200"
  style="padding-bottom: env(safe-area-inset-bottom);"
>
  <div class="max-w-7xl mx-auto px-6">
    <div class="py-3 flex flex-col gap-3">

      <button
        class="w-full h-12 rounded-xl
               bg-[#1e3a8a] text-white text-sm font-medium">
        Dodaj do checklisty
      </button>

      <button
        onclick="openProductMap()"
        class="w-full h-12 rounded-xl
               border border-stone-300 text-stone-700 text-sm font-medium">
        Mapa i sklepy
      </button>

    </div>
  </div>
</div>






      </section>
    `
  });
}
