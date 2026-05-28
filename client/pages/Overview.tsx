import { Layout } from "@/components/Layout";
import { OverviewHero } from "./overview/OverviewHero";
import { OverviewProblems } from "./overview/OverviewProblems";
import { OverviewHowItWorks } from "./overview/OverviewHowItWorks";
import { OverviewUseCases } from "./overview/OverviewUseCases";
import { OverviewCTA } from "./overview/OverviewCTA";

export default function Overview() {
  return (
    <Layout>
      <OverviewHero />
      <OverviewProblems />
      <OverviewHowItWorks />
      <OverviewUseCases />
      <OverviewCTA />
    </Layout>
  );
}
