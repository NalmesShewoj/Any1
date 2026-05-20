import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Platzhalter für weitere Sections — folgen nach Hero-Review */}
        <section
          id="features"
          aria-label="Features"
          className="border-t border-border-subtle bg-bg-base py-32"
        >
          <div className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Coming next
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Features, App-Showcase, Challenges, FAQ, Footer.
            </h2>
            <p className="mt-4 max-w-2xl text-secondary">
              Diese Sections werden im nächsten Sprint gebaut, sobald der Hero
              abgenommen ist. Sieh dir den Hero oben in Ruhe an.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
