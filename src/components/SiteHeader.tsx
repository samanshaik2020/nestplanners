'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader({ solid = true }: { solid?: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5 transition-all duration-500 md:px-8 ${
        solid ? 'border-b border-white/5 bg-[#111111]/90 backdrop-blur-md' : ''
      }`}
    >
      <Link href="/" className="text-2xl font-bold uppercase tracking-[0.25em]">
        OARCH
      </Link>

      <ul className="hidden items-center gap-10 text-xs font-medium uppercase tracking-[0.2em] md:flex">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`transition-colors duration-300 ${
                  active ? 'text-[#D4BFA8]' : 'text-white hover:text-[#D4BFA8]'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] md:hidden">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? 'text-[#D4BFA8]' : 'text-white/75'}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
