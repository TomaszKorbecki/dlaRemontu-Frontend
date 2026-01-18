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
import {
    ProductAssistantSection,
    ProductAssistantExtended
  } from './components/ProductAssistantSection.js';

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
  
            <div class="relative z-30 pb-8 max-w-7xl mx-auto px-6">
              ${renderSearchBar()}
            </div>
  
            <div class="fade-in max-w-7xl mx-auto px-6 py-10 space-y-10">
  
              ${ProductBreadcrumb({ product })}
  
              <h1 class="text-3xl font-bold text-stone-900">
                ${product.name}
              </h1>
  
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
  
                <!-- LEWA KOLUMNA -->
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
                  ${ProductAssistantExtended({ product })}
                </div>
  
                <!-- PRAWA KOLUMNA -->
                <div class="lg:col-span-4 space-y-4 lg:sticky lg:top-24 self-start">
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
        </section>
      `
    });
  }
    
