import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Team } from "./components/sections/Team";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";

function App() {
  // Observes every .reveal element in the document; see the hook for why this
  // is not a <Reveal> wrapper.
  useRevealOnScroll();

  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
