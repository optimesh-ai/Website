import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-spectrum-cyan/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-spectrum-purple/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 text-center max-w-md">
          <div className="mb-8">
            <div className="text-8xl font-bold text-spectrum-cyan/30 mb-4">404</div>
            <div className="h-1 w-24 bg-gradient-to-r from-spectrum-cyan to-spectrum-purple mx-auto mb-6" />
          </div>

          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Sector Not Found
          </h1>
          <p className="text-foreground/70 mb-8 text-lg">
            This network zone doesn't exist. Perhaps it's still in development or has been decommissioned.
          </p>

          <div className="space-y-4">
            <p className="text-sm text-spectrum-cyan font-mono">
              Route: {location.pathname}
            </p>
            <a
              href="/"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-spectrum-cyan text-background font-bold rounded-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all transform hover:scale-105"
            >
              Return to Network Hub
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
