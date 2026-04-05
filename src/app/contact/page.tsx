import SiteHeader from '@/components/SiteHeader';
import { CONTACT_DETAILS } from '@/lib/contactDetails';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <SiteHeader solid />

      <section className="px-6 pb-18 pt-34 md:px-8 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.6em] text-[#D4BFA8]">Contact</p>
          <div className="mt-6 grid gap-10 border-t border-white/8 pt-10 lg:grid-cols-[1fr,1fr]">
            <div>
              <h1 className="text-5xl font-bold uppercase leading-[0.9] tracking-tight md:text-7xl">
                NP Design Studio LLP
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
                Official studio details for Next Planners, including our website, registered location, year founded,
                industry, and design specializations.
              </p>
            </div>

            <div className="rounded-[30px] border border-[#D4BFA8]/18 bg-[linear-gradient(180deg,#171717,#121212)] p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.38em] text-[#D4BFA8]">Website</p>
                  <a
                    href={CONTACT_DETAILS.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-lg text-white transition hover:text-[#D4BFA8]"
                  >
                    {CONTACT_DETAILS.website}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.38em] text-[#D4BFA8]">Founded</p>
                  <p className="mt-2 text-lg text-white">{CONTACT_DETAILS.founded}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[10px] uppercase tracking-[0.38em] text-[#D4BFA8]">Location</p>
                  <p className="mt-2 text-lg text-white">{CONTACT_DETAILS.location}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.38em] text-[#D4BFA8]">Industry</p>
                  <p className="mt-2 text-lg text-white">{CONTACT_DETAILS.industry}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.38em] text-[#D4BFA8]">Company</p>
                  <p className="mt-2 text-lg text-white">{CONTACT_DETAILS.companyName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <form className="rounded-[30px] border border-white/10 bg-[#141414] p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {['Full Name', 'Email Address', 'Project Location', 'Estimated Timeline'].map((label) => (
                <label key={label} className="block">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4BFA8]">{label}</span>
                  <input
                    type={label.includes('Email') ? 'email' : 'text'}
                    className="mt-3 w-full border-b border-white/15 bg-transparent pb-3 text-sm text-white outline-none transition focus:border-[#D4BFA8]"
                  />
                </label>
              ))}
            </div>

            <label className="mt-8 block">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4BFA8]">Project Brief</span>
              <textarea
                rows={6}
                className="mt-3 w-full resize-none border-b border-white/15 bg-transparent pb-3 text-sm text-white outline-none transition focus:border-[#D4BFA8]"
              />
            </label>

            <button
              type="button"
              className="mt-8 rounded-full bg-[#D4BFA8] px-8 py-4 text-xs font-bold uppercase tracking-[0.35em] text-black transition hover:bg-white"
            >
              Send Inquiry
            </button>
          </form>

          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#161616,#101010)] p-8">
            <p className="text-[10px] uppercase tracking-[0.42em] text-[#D4BFA8]">Specialties</p>
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-white/58">
              <p>{CONTACT_DETAILS.specialties}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

