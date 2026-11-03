export const APP_NAME = "LeaseLens";
export const APP_TAGLINE = "Every Lease. Clearly Understood.";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
export const dashboardNavigation = [
 { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" }, { label: "All Leases", href: "/leases", icon: "Files" }, { label: "Upload Lease", href: "/leases/upload", icon: "FileUp" }, { label: "AI Analysis", href: "/leases/demo-lease/analysis", icon: "Sparkles" }, { label: "Expiring Leases", href: "/expiring-leases", icon: "CalendarClock" }, { label: "Reports", href: "/reports", icon: "ChartNoAxesCombined" },
] as const;
export const supportNavigation = [{ label: "Settings", href: "/settings", icon: "Settings2" }, { label: "Help & Support", href: "/help", icon: "CircleHelp" }] as const;
