import type { Metadata } from 'next';
import { ClosingBand } from '../../components/closing-band';
import { Setlist } from '../../components/art/page-head-art';
import { PageHead } from '../../components/page-head';
import { FaqSlips, RunningOrder, TimelineStrip } from '../../components/page-sections';
import { availabilityHeadline, business } from '../../content/business';
import { processSteps } from '../../content/process';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Process',
  description: 'How Loud Hands Studio runs a twelve-week project: Listen, Sharpen, Make, Test it out loud, and Launch & turn it up.',
  alternates: { canonical: absoluteUrl('/process/') },
};

export default function ProcessPage() {
  return (
    <>
      <PageHead eyebrow="Process · How we work" title="Running order." colour="ink" art={<Setlist steps={processSteps} />}>
        <p>
          Five steps from half-day workshop to 30-day volume check. Weekly show-and-tells throughout, never a grand reveal on week eleven.
        </p>
      </PageHead>

      <RunningOrder steps={processSteps} />

      <TimelineStrip heading="Twelve weeks on the board." steps={processSteps} />

      <FaqSlips>
        <FaqSlips.Heading>Questions we get asked.</FaqSlips.Heading>
        <FaqSlips.List>
          <FaqSlips.Item question="How soon can you start?">
            <p>
              {availabilityHeadline(business.availability.nextStart)}.
              {business.availability.note ? ` ${business.availability.note}` : ''} Send an enquiry and we&apos;ll reply to arrange a first call — nothing is booked until we&apos;ve both agreed a proposal.
            </p>
          </FaqSlips.Item>

          <FaqSlips.Item question="Do you work with teams outside Manchester?" offset>
            <p>
              Yes. We work remotely across the UK and Europe, with at least one in-person workshop — either around our table on Stevenson Square or at your place.
            </p>
          </FaqSlips.Item>

          <FaqSlips.Item question="Can we just do one step?">
            <p>
              Listen and Sharpen can be booked as a standalone two-week sprint, by enquiry. You leave with the findings sheet, proposition and two creative routes ready to take anywhere.
            </p>
          </FaqSlips.Item>

          <FaqSlips.Item question="Who owns the work?" offset>
            <p>
              Full rights transfer to you on final payment. We keep the right to show the finished work on our wall and in talks.
            </p>
          </FaqSlips.Item>

          <FaqSlips.Item question="What if we hate the first idea?">
            <p>
              Sharpen includes two creative routes and two rounds of review. We&apos;d rather hear what doesn&apos;t land in week two than paint over it in week ten.
            </p>
          </FaqSlips.Item>
        </FaqSlips.List>
      </FaqSlips>

      <ClosingBand colour="red">
        <ClosingBand.Heading>Ready for step one?</ClosingBand.Heading>
        <ClosingBand.Body>
          Send us a project enquiry with what you&apos;re up against and your rough timing. We&apos;ll reply to set up a first call.
        </ClosingBand.Body>
        <ClosingBand.Actions ctaLabel="Start a project enquiry" />
      </ClosingBand>
    </>
  );
}
