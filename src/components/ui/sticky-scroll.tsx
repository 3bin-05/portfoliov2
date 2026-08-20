'use client';
import { forwardRef } from 'react';
import { ReactLenis } from 'lenis/react';

// Import local WebP and AVIF images
import img1Webp from '@/assets/Gallery/1.webp';
import img1Avif from '@/assets/Gallery/1.avif';
import img2Webp from '@/assets/Gallery/2.webp';
import img2Avif from '@/assets/Gallery/2.avif';
import img3Webp from '@/assets/Gallery/3.webp';
import img3Avif from '@/assets/Gallery/3.avif';
import img4Webp from '@/assets/Gallery/4.webp';
import img4Avif from '@/assets/Gallery/4.avif';
import img5Webp from '@/assets/Gallery/5.webp';
import img5Avif from '@/assets/Gallery/5.avif';
import img6Webp from '@/assets/Gallery/6.webp';
import img6Avif from '@/assets/Gallery/6.avif';
import img7Webp from '@/assets/Gallery/7.webp';
import img7Avif from '@/assets/Gallery/7.avif';
import img8Webp from '@/assets/Gallery/8.webp';
import img8Avif from '@/assets/Gallery/8.avif';
import img9Webp from '@/assets/Gallery/9.webp';
import img9Avif from '@/assets/Gallery/9.avif';
import img10Webp from '@/assets/Gallery/10.webp';
import img10Avif from '@/assets/Gallery/10.avif';
import img11Webp from '@/assets/Gallery/11.webp';
import img11Avif from '@/assets/Gallery/11.avif';
import img12Webp from '@/assets/Gallery/12.webp';
import img12Avif from '@/assets/Gallery/12.avif';

interface StickyScrollProps {
  className?: string;
}

const StickyScroll = forwardRef<HTMLElement, StickyScrollProps>(({ className = '' }, ref) => {
  return (
    <ReactLenis root={false}>
      <main className={`bg-[var(--bg-primary)] transition-colors duration-500 ${className}`} ref={ref}>
        <section className='text-[var(--text-primary)] w-full bg-[var(--bg-primary)] py-2 relative z-10'>
          <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
            <div className='grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4'>
              
              {/* Column 1 (Sticky side column on desktop - Landscapes 1, 2, 5) */}
              <div className='col-span-1 md:col-span-4 md:sticky md:top-20 md:h-[calc(100vh-96px)] grid grid-cols-1 md:grid-rows-3 gap-2 md:gap-4'>
                <figure className='w-full overflow-hidden rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] group'>
                  <picture>
                    <source srcSet={img1Avif} type="image/avif" />
                    <img
                      src={img1Webp}
                      alt='Visual Moment 1'
                      className='transition-[transform,filter] duration-700 ease-out will-change-transform w-full h-48 sm:h-72 md:h-full align-bottom object-cover group-hover:scale-105 group-hover:filter contrast-105'
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                </figure>
                <figure className='w-full overflow-hidden rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] group'>
                  <picture>
                    <source srcSet={img2Avif} type="image/avif" />
                    <img
                      src={img2Webp}
                      alt='Visual Moment 2'
                      className='transition-[transform,filter] duration-700 ease-out will-change-transform w-full h-48 sm:h-72 md:h-full align-bottom object-cover group-hover:scale-105 group-hover:filter contrast-105'
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                </figure>
                <figure className='w-full overflow-hidden rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] group'>
                  <picture>
                    <source srcSet={img5Avif} type="image/avif" />
                    <img
                      src={img5Webp}
                      alt='Visual Moment 5'
                      className='transition-[transform,filter] duration-700 ease-out will-change-transform w-full h-48 sm:h-72 md:h-full align-bottom object-cover group-hover:scale-105 group-hover:filter contrast-105'
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                </figure>
              </div>

              {/* Column 2 (Scrolling middle column - Landscapes & Portraits mix: 6, 3[P], 7, 4[P], 8, 9) */}
              <div className='col-span-1 md:col-span-4 grid gap-2 md:gap-4'>
                <figure className='w-full overflow-hidden rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] group'>
                  <picture>
                    <source srcSet={img6Avif} type="image/avif" />
                    <img
                      src={img6Webp}
                      alt='Visual Moment 6'
                      className='transition-[transform,filter] duration-700 ease-out will-change-transform w-full h-64 sm:h-72 md:h-96 align-bottom object-cover group-hover:scale-105 group-hover:filter contrast-105'
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                </figure>
                <figure className='w-full overflow-hidden rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] group'>
                  <picture>
                    <source srcSet={img3Avif} type="image/avif" />
                    <img
                      src={img3Webp}
                      alt='Visual Moment 3'
                      className='transition-[transform,filter] duration-700 ease-out will-change-transform w-full h-80 sm:h-96 md:h-[450px] align-bottom object-cover group-hover:scale-105 group-hover:filter contrast-105'
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                </figure>
                <figure className='w-full overflow-hidden rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] group'>
                  <picture>
                    <source srcSet={img7Avif} type="image/avif" />
                    <img
                      src={img7Webp}
                      alt='Visual Moment 7'
                      className='transition-[transform,filter] duration-700 ease-out will-change-transform w-full h-64 sm:h-72 md:h-96 align-bottom object-cover group-hover:scale-105 group-hover:filter contrast-105'
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                </figure>
                <figure className='w-full overflow-hidden rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] group'>
                  <picture>
                    <source srcSet={img4Avif} type="image/avif" />
                    <img
                      src={img4Webp}
                      alt='Visual Moment 4'
                      className='transition-[transform,filter] duration-700 ease-out will-change-transform w-full h-80 sm:h-96 md:h-[450px] align-bottom object-cover group-hover:scale-105 group-hover:filter contrast-105'
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                </figure>
                <figure className='w-full overflow-hidden rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] group'>
                  <picture>
                    <source srcSet={img8Avif} type="image/avif" />
                    <img
                      src={img8Webp}
                      alt='Visual Moment 8'
                      className='transition-[transform,filter] duration-700 ease-out will-change-transform w-full h-64 sm:h-72 md:h-96 align-bottom object-cover group-hover:scale-105 group-hover:filter contrast-105'
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                </figure>
                <figure className='w-full overflow-hidden rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] group'>
                  <picture>
                    <source srcSet={img9Avif} type="image/avif" />
                    <img
                      src={img9Webp}
                      alt='Visual Moment 9'
                      className='transition-[transform,filter] duration-700 ease-out will-change-transform w-full h-64 sm:h-72 md:h-96 align-bottom object-cover group-hover:scale-105 group-hover:filter contrast-105'
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                </figure>
              </div>

              {/* Column 3 (Sticky side column on desktop - Landscapes 10, 11, 12) */}
              <div className='col-span-1 md:col-span-4 md:sticky md:top-20 md:h-[calc(100vh-96px)] grid grid-cols-1 md:grid-rows-3 gap-2 md:gap-4'>
                <figure className='w-full overflow-hidden rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] group'>
                  <picture>
                    <source srcSet={img10Avif} type="image/avif" />
                    <img
                      src={img10Webp}
                      alt='Visual Moment 10'
                      className='transition-[transform,filter] duration-700 ease-out will-change-transform w-full h-48 sm:h-72 md:h-full align-bottom object-cover group-hover:scale-105 group-hover:filter contrast-105'
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                </figure>
                <figure className='w-full overflow-hidden rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] group'>
                  <picture>
                    <source srcSet={img11Avif} type="image/avif" />
                    <img
                      src={img11Webp}
                      alt='Visual Moment 11'
                      className='transition-[transform,filter] duration-700 ease-out will-change-transform w-full h-48 sm:h-72 md:h-full align-bottom object-cover group-hover:scale-105 group-hover:filter contrast-105'
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                </figure>
                <figure className='w-full overflow-hidden rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-card)] group'>
                  <picture>
                    <source srcSet={img12Avif} type="image/avif" />
                    <img
                      src={img12Webp}
                      alt='Visual Moment 12'
                      className='transition-[transform,filter] duration-700 ease-out will-change-transform w-full h-48 sm:h-72 md:h-full align-bottom object-cover group-hover:scale-105 group-hover:filter contrast-105'
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                </figure>
              </div>

            </div>
          </div>
        </section>

        {/* Space transition before next section */}
        <div className="h-24 bg-[var(--bg-primary)]"></div>
      </main>
    </ReactLenis>
  );
});

StickyScroll.displayName = 'StickyScroll';

export default StickyScroll;
