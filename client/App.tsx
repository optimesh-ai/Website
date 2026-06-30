import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RouteMeta } from "@/components/site/RouteMeta";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Hammerhead from "./pages/Hammerhead";
import ConfigStudio from "./pages/ConfigStudio";
import Contact from "./pages/Contact";
import EarlyAccess from "./pages/EarlyAccess";
import About from "./pages/About";
import Insights from "./pages/Insights";
import Article from "./pages/Article";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Whitepaper from "./pages/Whitepaper";
import Why from "./pages/Why";
import RuleHawk from "./pages/RuleHawk";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteMeta />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/products/hammerhead" element={<Hammerhead />} />
            <Route path="/products/config-studio" element={<ConfigStudio />} />
            <Route path="/products/rulehawk" element={<RuleHawk />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<Article />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsArticle />} />
            <Route path="/whitepaper" element={<Whitepaper />} />
            <Route path="/why-optimesh" element={<Why />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/overview" element={<Navigate to="/features" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
