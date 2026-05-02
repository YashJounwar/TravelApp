import Link from "next/link";
import { assertAdminRole } from "@/lib/auth/admin";
import { AdminAuthGuard } from "@/components/admin/admin-auth-guard";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  assertAdminRole();
  return (
    <AdminAuthGuard>
      <div className="space-y-4">
        <nav className="flex flex-wrap gap-2 rounded-xl border bg-white p-3 text-sm">
          <Link href="/admin">Overview</Link>
          <Link href="/admin/bookings">Bookings</Link>
          <Link href="/admin/vehicles">Vehicles</Link>
          <Link href="/admin/pricing">Pricing</Link>
          <Link href="/admin/routes">Routes</Link>
          <Link href="/admin/drivers">Drivers</Link>
          <Link href="/admin/customers">Customers</Link>
          <Link href="/admin/seo">SEO pages</Link>
        </nav>
        {children}
      </div>
    </AdminAuthGuard>
  );
}
