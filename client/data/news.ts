import type { Block } from "@/data/articles";

export interface NewsItem {
  slug: string;
  headline: string;
  date: string; // ISO yyyy-mm-dd
  category: string;
  dek: string;
  body: Block[];
  link?: { label: string; href: string };
}

export const news: NewsItem[] = [
  {
    slug: "nvidia-inception",
    headline: "Optimesh Technologies Accepted to the NVIDIA Inception Program",
    date: "2026-04-22",
    category: "Programs",
    dek: "Optimesh Technologies has joined NVIDIA Inception, gaining access to technical resources and a community of AI-first startups.",
    link: {
      label: "Learn more about NVIDIA Inception",
      href: "https://www.nvidia.com/en-us/startups/",
    },
    body: [
      {
        type: "p",
        text: "Optimesh Technologies has been accepted into NVIDIA Inception, the program NVIDIA runs to support startups building with accelerated computing and AI.",
      },
      {
        type: "p",
        text: "The fit is a natural one. Config Studio's diagnosis and remediation pipeline is AI-driven, and the verification work underneath it is computationally demanding. Inception gives our team access to technical resources, go-to-market support, and a community of companies working on adjacent problems.",
      },
      {
        type: "p",
        text: "It also reinforces a thesis we keep coming back to. As AI takes on a larger role in operating critical infrastructure, the tooling that checks its decisions has to be every bit as serious as the models making them.",
      },
      {
        type: "p",
        text: "We will share more as the work progresses. If you operate a network and want to put Optimesh Technologies to work in your environment, we would like to hear from you.",
      },
    ],
  },
  {
    slug: "a16z-speedrun",
    headline: "A Note on Our a16z Speedrun Decision",
    date: "2026-05-07",
    category: "Programs",
    dek: "Earlier this year, Optimesh Technologies received an offer from a16z Speedrun. After careful thought, we decided not to pursue the program at this time. We are grateful to the team for one of the cleanest processes we have been through.",
    link: {
      label: "Learn more about a16z Speedrun",
      href: "https://a16z.com/speedrun/",
    },
    body: [
      {
        type: "p",
        text: "Earlier this year, Optimesh Technologies was selected for a16z Speedrun, the accelerator Andreessen Horowitz runs for early-stage founders. After careful consideration, we made the difficult decision not to pursue the program at this time.",
      },
      {
        type: "p",
        text: "Speedrun is excellent. The team, the cohort, and the process were all exceptional, and we want to be clear that the decision had nothing to do with the program itself. The fit for where Optimesh Technologies is right now turned out to be different from what we expected when we applied.",
      },
      {
        type: "p",
        text: "We are grateful to the a16z team for their time, their conviction, and one of the cleanest, most respectful processes we have been through as founders. The bar they set is the bar we want to hold ourselves to.",
      },
      {
        type: "p",
        text: "We will keep building. If you operate a network and want to put Optimesh Technologies to work in your environment, we would like to hear from you.",
      },
    ],
  },
  {
    slug: "angel-round",
    headline: "Optimesh Technologies Raises an Angel Round",
    date: "2026-03-11",
    category: "Funding",
    dek: "New backing from angels and operators to build the verification layer for AI-driven networks.",
    body: [
      {
        type: "p",
        text: "We have closed an angel round to accelerate Optimesh Technologies's mission of bringing fast, trustworthy, offline intelligence to network infrastructure.",
      },
      {
        type: "p",
        text: "The funding lets us invest in the core engine behind Hammerhead's forwarding-plane simulation and in Config Studio's verified remediation, while we work hands-on with our earliest network partners.",
      },
      {
        type: "p",
        text: "We are especially glad to have backers who have run production networks themselves and have felt firsthand the problem we are setting out to solve.",
      },
      {
        type: "p",
        text: "There is more to come. If running Optimesh Technologies against your own environment sounds useful, request early access.",
      },
    ],
  },
];

export function getSortedNews(): NewsItem[] {
  return [...news].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug);
}
