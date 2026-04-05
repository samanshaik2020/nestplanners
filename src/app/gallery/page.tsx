import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import { GALLERY_IMAGES } from '@/lib/galleryImages';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <SiteHeader solid />

      <section className="relative overflow-hidden px-6 pb-18 pt-34 md:px-8 md:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,191,168,0.13),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.6em] text-[#D4BFA8]">Gallery</p>
          <div className="mt-6 flex flex-col gap-8 border-t border-white/8 pt-10 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl text-5xl font-bold uppercase leading-[0.9] tracking-tight md:text-7xl">
              Visual Library Of Built Atmosphere
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-white/55">
              A curated set of frames from our residential work, balancing structure, light, material warmth, and
              spatial calm.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-8">
        <div className="mx-auto columns-1 max-w-7xl gap-5 space-y-5 sm:columns-2 xl:columns-3">
          {GALLERY_IMAGES.map((image) => (
            <article
              key={image.id}
              className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-[#171717] break-inside-avoid"
            >
              <div className="relative w-full" style={{ aspectRatio: image.aspectRatio }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6">
                <p className="text-[10px] uppercase tracking-[0.42em] text-[#D4BFA8]">{image.tag}</p>
                <h2 className="mt-2 text-xl font-semibold uppercase tracking-[0.08em]">{image.title}</h2>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
