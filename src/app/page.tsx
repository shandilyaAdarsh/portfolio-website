import { PortalGlow } from "@/components/ui/portal-glow";
import { PageTransition } from "@/components/ui/page-transition";
import { HeroSection } from "@/components/sections/hero-section";
import { IntroSection } from "@/components/sections/intro-section";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { TypographicStatement } from "@/components/sections/typographic-statement";
import { AboutSection } from "@/components/sections/about-section";
import { MetricsSection } from "@/components/sections/metrics-section";
import { ExperienceOverview } from "@/components/sections/experience-overview";
import { SkillsOverview } from "@/components/sections/skills-overview";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      {/* ========================================================================= */}
      {/* FIXED VISUAL ANCHOR LAYER: The Persistent Black Hole Singularity          */}
      {/* ========================================================================= */}
      <PortalGlow />

      {/* ========================================================================= */}
      {/* SCROLLING CONTENT LAYER: Moves over & around the fixed Black Hole        */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full">
        <PageTransition>
          {/* 01: Hero Asymmetrical Editorial Poster */}
          <HeroSection />

          {/* 02: Editorial Statement & Intro */}
          <IntroSection />

          {/* 03: Selected Work Editorial Case Studies */}
          <ProjectsPreview />

          {/* 04: Large Typographic Interstitial 01 */}
          <TypographicStatement
            phrase={["BUILD.", "SHIP.", "ITERATE."]}
            subtext="DISCIPLINE • CONTINUOUS DELIVERY"
          />

          {/* 05: About & Focus Areas Index */}
          <AboutSection />

          {/* 06: Verified Metrics & Impact */}
          <MetricsSection />

          {/* 07: Timeline & Career Experience */}
          <ExperienceOverview />

          {/* 08: Large Typographic Interstitial 02 */}
          <TypographicStatement
            phrase={["FROM", "SYSTEM", "TO USER."]}
            subtext="END-TO-END FULL-STACK ARCHITECTURE"
          />

          {/* 09: Typographic Skills Index */}
          <SkillsOverview />

          {/* 10: Huge Typographic Contact CTA */}
          <ContactSection />
        </PageTransition>
      </div>
    </>
  );
}
