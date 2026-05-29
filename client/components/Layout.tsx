import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  /** Set false for pages that render their own footer (rare). */
  footer?: boolean;
}

export function Layout({ children, footer = true }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      {footer && <Footer />}
    </div>
  );
}
