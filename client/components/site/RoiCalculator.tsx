import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/site/primitives";

/* ----------------------------------------------------------------------------
 * RoiCalculator — "what would Optimesh save us?"
 * Six inputs a network lead knows off the top of their head; savings math is
 * shown line-by-line with its assumptions, so the total is defensible.
 * -------------------------------------------------------------------------- */

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

// Model assumptions, surfaced in the UI next to each line.
const REVIEW_TIME_REDUCTION = 0.8; // manual pre-change review largely replaced by ms-fast simulation
const INCIDENTS_CAUGHT = 0.7; // share of change-caused incidents a pre-merge forwarding-plane verdict catches

type Field = {
  key: string;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  default: number;
  prefix?: string;
};

const FIELDS: Field[] = [
  {
    key: "changes",
    label: "Config changes per month",
    hint: "PRs, CRs, tickets — anything that edits a device config",
    min: 5,
    max: 500,
    step: 5,
    default: 40,
  },
  {
    key: "hoursPerChange",
    label: "Engineer-hours per change on review & validation",
    hint: "Peer review, lab checks, the change-window babysit",
    min: 0.5,
    max: 12,
    step: 0.5,
    default: 2,
  },
  {
    key: "hourlyRate",
    label: "Loaded engineer cost per hour",
    hint: "Salary + overhead, fully loaded",
    min: 60,
    max: 300,
    step: 10,
    default: 120,
    prefix: "$",
  },
  {
    key: "incidents",
    label: "Change-caused incidents per year",
    hint: "Outages or degradations traced back to a config change",
    min: 0,
    max: 24,
    step: 1,
    default: 3,
  },
  {
    key: "incidentCost",
    label: "Average cost per incident",
    hint: "Uptime Institute 2025: 54% of serious outages exceed $100K",
    min: 10000,
    max: 1000000,
    step: 10000,
    default: 150000,
    prefix: "$",
  },
  {
    key: "auditSpend",
    label: "Annual firewall / segmentation audit spend",
    hint: "Audits list at $9,200; JumpStarts at $23K–$69K",
    min: 0,
    max: 200000,
    step: 1000,
    default: 25000,
    prefix: "$",
  },
];

const LICENSE_TIERS = [
  { label: "Team — $50K", value: 50000 },
  { label: "Business — $150K", value: 150000 },
  { label: "Enterprise — $400K", value: 400000 },
];

export function RoiCalculator() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(FIELDS.map((f) => [f.key, f.default])),
  );
  const [license, setLicense] = useState(LICENSE_TIERS[0].value);

  const r = useMemo(() => {
    const reviewSavings =
      values.changes * 12 * values.hoursPerChange * values.hourlyRate * REVIEW_TIME_REDUCTION;
    const incidentSavings = values.incidents * values.incidentCost * INCIDENTS_CAUGHT;
    const auditSavings = values.auditSpend;
    const gross = reviewSavings + incidentSavings + auditSavings;
    const net = gross - license;
    const roi = license > 0 ? gross / license : 0;
    const paybackMonths = gross > 0 ? (license / gross) * 12 : Infinity;
    return { reviewSavings, incidentSavings, auditSavings, gross, net, roi, paybackMonths };
  }, [values, license]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      {/* Inputs */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold text-foreground">Your network, in six numbers</p>
        <div className="mt-6 grid gap-6">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`roi-${f.key}`} className="text-sm font-medium text-foreground">
                  {f.label}
                </label>
                <span className="shrink-0 font-mono text-sm tabular-nums text-primary">
                  {f.prefix === "$" ? fmt.format(values[f.key]) : values[f.key]}
                </span>
              </div>
              <input
                id={`roi-${f.key}`}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={values[f.key]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.key]: Number(e.target.value) }))
                }
                className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
                aria-describedby={`roi-${f.key}-hint`}
              />
              <p id={`roi-${f.key}-hint`} className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {f.hint}
              </p>
            </div>
          ))}

          <div>
            <p className="text-sm font-medium text-foreground">Config Studio tier</p>
            <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Config Studio tier">
              {LICENSE_TIERS.map((t) => (
                <button
                  key={t.value}
                  role="radio"
                  aria-checked={license === t.value}
                  onClick={() => setLicense(t.value)}
                  className={
                    license === t.value
                      ? "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
                      : "rounded-lg bg-muted/60 px-4 py-2 text-sm font-medium text-muted-foreground ring-1 ring-inset ring-border transition-colors hover:text-foreground"
                  }
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col rounded-2xl border border-primary/25 bg-primary/[0.04] p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold text-foreground">What that costs you today</p>

        <dl className="mt-6 space-y-4 text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="leading-relaxed text-muted-foreground">
              Manual review &amp; validation time
              <span className="block text-xs text-muted-foreground/70">
                {Math.round(REVIEW_TIME_REDUCTION * 100)}% replaced by millisecond simulation
              </span>
            </dt>
            <dd className="shrink-0 font-mono tabular-nums text-foreground">
              {fmt.format(r.reviewSavings)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="leading-relaxed text-muted-foreground">
              Change-caused incidents
              <span className="block text-xs text-muted-foreground/70">
                {Math.round(INCIDENTS_CAUGHT * 100)}% caught by a pre-merge forwarding-plane verdict
              </span>
            </dt>
            <dd className="shrink-0 font-mono tabular-nums text-foreground">
              {fmt.format(r.incidentSavings)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="leading-relaxed text-muted-foreground">
              Audit &amp; consulting engagements
              <span className="block text-xs text-muted-foreground/70">
                RuleHawk produces the evidence free, on every PR
              </span>
            </dt>
            <dd className="shrink-0 font-mono tabular-nums text-foreground">
              {fmt.format(r.auditSavings)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-primary/20 pt-4">
            <dt className="text-muted-foreground">Optimesh license</dt>
            <dd className="shrink-0 font-mono tabular-nums text-foreground">
              −{fmt.format(license)}
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-8">
          <p className="text-sm text-muted-foreground">Estimated net savings, year one</p>
          <p
            className="mt-1 font-mono text-4xl font-semibold tabular-nums tracking-tight text-primary md:text-5xl"
            aria-live="polite"
          >
            {fmt.format(Math.max(0, r.net))}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {r.roi >= 1 ? (
              <>
                That's a{" "}
                <span className="font-medium text-foreground">
                  {r.roi.toFixed(1)}× return
                </span>{" "}
                — the license pays for itself in{" "}
                <span className="font-medium text-foreground">
                  {r.paybackMonths < 1
                    ? "under a month"
                    : `${Math.ceil(r.paybackMonths)} months`}
                </span>
                .
              </>
            ) : (
              <>At this size, start with RuleHawk and Hammerhead — they're free.</>
            )}
          </p>
          <div className="mt-6">
            <ButtonLink to="/early-access" variant="primary" size="md">
              Get these savings
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground/70">
            Estimate, not a quote. Incident-cost baseline: Uptime Institute
            Annual Outage Analysis 2025. Audit pricing: vendor list prices.
          </p>
        </div>
      </div>
    </div>
  );
}
