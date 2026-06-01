import Link from "next/link";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/pipeline", label: "Pipeline" },
  { href: "/referrals", label: "Partners" },
  { href: "/activity", label: "Activity" },
];

export default function Sidebar() {
  return (
    <aside className="w-[220px] shrink-0 border-r border-sand bg-linen min-h-screen px-5 py-7">
      <Link
        href="/"
        className="text-[1.2rem] font-black tracking-[-0.04em] text-transparent inline-block mb-1"
        style={{ WebkitTextStroke: "1.3px #5C3D2E" }}
      >
        forma
      </Link>
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-fog mb-8">
        Admin
      </p>

      <nav className="space-y-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="block px-3 py-2 rounded-[8px] text-[0.86rem] text-bark hover:bg-white hover:text-espresso transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
