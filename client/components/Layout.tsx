import { Header } from "./Header";
import { Footer } from "./Footer";
import { CursorTrail, MorphingBlob } from "./site/CursorTrail";

interface LayoutProps {
  children: React.ReactNode;
  /** Set false for pages that render their own footer (rare). */
  footer?: boolean;
}

export function Layout({ children, footer = true }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      {/* Background morphing blobs */}
      <MorphingBlob className="left-[-10%] top-[-10%] w-[500px] h-[500px]" color="#3b82f6" duration={12} />
      <MorphingBlob className="right-[-10%] bottom-[-10%] w-[400px] h-[400px]" color="#8b5cf6" duration={15} />
      <MorphingBlob className="left-[30%] bottom-[20%] w-[300px] h-[300px]" color="#06b6d4" duration={10} />

      {/* Cursor trail effect */}
      <CursorTrail enabled={true} color="#3b82f6" size={30} />

      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      {footer && <Footer />}
    </div>
  );
}
