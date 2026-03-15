import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';

const GALLERY = [
  { id: 1018, width: 1200, height: 820, title: 'Atrium Light Court', tag: 'Residence 01' },
  { id: 1025, width: 1200, height: 1500, title: 'Terraced Facade', tag: 'Residence 02' },
  { id: 1036, width: 1200, height: 900, title: 'Material Palette', tag: 'Studio Detail' },
  { id: 1040, width: 1200, height: 1350, title: 'Pool Edge Horizon', tag: 'Wellness Wing' },
  { id: 1043, width: 1200, height: 860, title: 'Dining Pavilion', tag: 'Interior View' },
  { id: 1050, width: 1200, height: 1500, title: 'Concrete Stair Hall', tag: 'Circulation' },
  { id: 1067, width: 1200, height: 880, title: 'Evening Exterior', tag: 'Mountain House' },
  { id: 1074, width: 1200, height: 1420, title: 'Bedroom Frame', tag: 'Private Suite' },
];

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
          {GALLERY.map((image) => (
            <article
              key={image.id}
              className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-[#171717] break-inside-avoid"
            >
              <Image
                src={`https://picsum.photos/id/${image.id}/${image.width}/${image.height}`}
                alt={image.title}
                width={image.width}
                height={image.height}
                className="h-auto w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
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
