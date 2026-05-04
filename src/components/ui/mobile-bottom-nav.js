import { HiHome, HiDocumentReport, HiClipboardList, HiUser } from "react-icons/hi";
import NavigationLink from "@/components/ui/navigation-link";

const items = [
  { label: "Beranda", href: "dashboard", icon: HiHome },
  { label: "Lapor", href: "report", icon: HiDocumentReport },
  { label: "Laporan", href: "reports", icon: HiClipboardList },
  { label: "Profil", href: "profile", icon: HiUser },
];

export default function MobileBottomNav({ basePath, active }) {
  const visibleItems = basePath === "/officer" ? items.filter((item) => item.href !== "report") : items;

  return (
    <nav
      className={`mt-auto grid border-t border-gray-200 bg-white ${
        visibleItems.length === 3 ? "grid-cols-3" : "grid-cols-4"
      }`}
    >
      {visibleItems.map((item) => {
        const isActive = active === item.href;
        const finalHref =
          item.href === "profile"
            ? "/login"
            : `${basePath}/${basePath === "/user" && item.href === "reports" ? "history" : item.href}`;

        return (
          <NavigationLink key={item.href} href={finalHref} className={`flex flex-col items-center gap-1 py-2 text-[10px] transition sm:text-xs ${isActive ? "text-emerald-600" : "text-gray-500 hover:text-emerald-600"}`}>
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavigationLink>
        );
      })}
    </nav>
  );
}
