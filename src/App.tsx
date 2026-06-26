import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] overflow-x-hidden font-sans antialiased selection:bg-blue-600/10 selection:text-blue-600">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Modules */}
      <main>
        {/* Section 1: Hero Banner */}
        <Hero />

        {/* Section 2: About Us */}
        <About />

        {/* Section 3: Product Cards */}
        <Products />

        {/* Section 4: Value Propositions */}
        <WhyChooseUs />

        {/* Section 5: Masonry Portfolio Gallery */}
        <Gallery />

        {/* Section 6: Automatic Client Testimonials */}
        <Testimonials />

        {/* Section 7: Accordion Collapsible FAQs */}
        <FAQ />

        {/* Section 8: Final Call-to-Action */}
        <CTA />
      </main>

      {/* Section 9: Detailed Site Footer */}
      <Footer />
    </div>
  );
}
