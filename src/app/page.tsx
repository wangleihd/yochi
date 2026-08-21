import { Hero } from "@/components/home/Hero";
import { PlatformStrip } from "@/components/home/PlatformStrip";
import { FeaturesPreview } from "@/components/home/FeaturesPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { DeepDive } from "@/components/home/DeepDive";
import { PricingPreview } from "@/components/home/PricingPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformStrip />
      <FeaturesPreview />
      <HowItWorks />
      <DeepDive />
      <PricingPreview />
      <Testimonials />
      <FaqTeaser />
      <FinalCta />
    </>
  );
}
