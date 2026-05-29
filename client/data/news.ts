import type { Block } from "@/data/articles";

export interface NewsItem {
  slug: string;
  headline: string;
  date: string; // ISO yyyy-mm-dd
  category: string;
  dek: string;
  body: Block[];
}

export const news: NewsItem[] = [
  {
    slug: "nvidia-inception",
    headline: "Optimesh Accepted to the NVIDIA Inception Program",
    date: "2026-04-22",
    category: "Programs",
    dek: "Optimesh has joined NVIDIA Inception, gaining access to technical resources and a community of AI-first startups.",
    body: [
      {
        type: "p",
        text: "Optimesh has been accepted into NVIDIA Inception, the program NVIDIA runs to support startups building with accelerated computing and AI.",
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
        text: "We will share more as the work progresses. If you operate a network and want to put Optimesh to work in your environment, we would like to hear from you.",
      },
    ],
  },
  {
    slug: "a16z-speedrun",
    headline: "Optimesh Accepted to a16z Speedrun",
    date: "2026-04-02",
    category: "Programs",
    dek: "We are joining a16z's Speedrun program to accelerate our work on fast, verifiable intelligence for network operations.",
    body: [
      {
        type: "p",
        text: "Optimesh has been accepted into a16z Speedrun, the accelerator Andreessen Horowitz runs for early-stage founders.",
      },
      {
        type: "p",
        text: "Our mission is a focused one. We want to make it possible to know what a network change will do before it ships. Speedrun gives us the capital, the mentorship, and the network to move toward that goal faster.",
      },
      {
        type: "p",
        text: "We are grateful for the conviction in what we are building, and we are looking forward to working alongside the other teams in the cohort.",
      },
      {
        type: "p",
        text: "If you want to follow along or partner with us early, request access and we will be in touch.",
      },
    ],
  },
  {
    slug: "angel-round",
    headline: "Optimesh Raises an Angel Round",
    date: "2026-03-11",
    category: "Funding",
    dek: "New backing from angels and operators to build the verification layer for AI-driven networks.",
    body: [
      {
        type: "p",
        text: "We have closed an angel round to accelerate Optimesh's mission of bringing fast, trustworthy, offline intelligence to network infrastructure.",
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
        text: "There is more to come. If running Optimesh against your own environment sounds useful, request early access.",
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
