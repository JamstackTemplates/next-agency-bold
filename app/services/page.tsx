import type { Metadata } from 'next';
import { ClosingBand } from '../../components/closing-band';
import { FeeSticker } from '../../components/art/page-head-art';
import { PageHead } from '../../components/page-head';
import { DontDoBand, PricingPanel, ServiceSpecimens } from '../../components/page-sections';
import { formatFee, services } from '../../content/services';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Brand identity, campaigns, motion, websites and print from Loud Hands Studio in Manchester, with transparent starting fees.',
  alternates: { canonical: absoluteUrl('/services/') },
};

export default function ServicesPage() {
  return (
    <>
      <PageHead
        eyebrow="Services & Fees"
        title="Five ways to get heard."
        colour="blue"
        art={<FeeSticker fee={formatFee(Math.min(...services.map(service => service.fromFee)))} />}
      >
        <p>
          Clear deliverables, honest timelines and starting fees in plain sight. No agency jargon, no mystery day-rates.
        </p>
      </PageHead>

      <ServiceSpecimens services={services} />

      <PricingPanel>
        <PricingPanel.Heading>How we price.</PricingPanel.Heading>
        <PricingPanel.Points>
          <PricingPanel.Point term="Fixed-fee proposals">
            Every project gets a written fixed-fee proposal after a first call, so you know the total before we touch a layout.
          </PricingPanel.Point>
          <PricingPanel.Point term="40% deposit to start">
            We ask for 40% once a proposal is agreed, 30% at the midpoint show-and-tell and 30% on final handover.
          </PricingPanel.Point>
          <PricingPanel.Point term="No retainers required">
            Come to us for one loud launch or come back next season. We never lock anyone into a rolling monthly contract.
          </PricingPanel.Point>
        </PricingPanel.Points>
        <PricingPanel.Note>
          All fees shown are starting figures in GBP and exclude VAT. Proposals are confirmed only after a first call and written agreement.
        </PricingPanel.Note>
      </PricingPanel>

      <DontDoBand>
        <DontDoBand.Heading>What we don’t do</DontDoBand.Heading>
        <DontDoBand.List>
          <DontDoBand.Item>Media buying</DontDoBand.Item>
          <DontDoBand.Item>Influencer management</DontDoBand.Item>
          <DontDoBand.Item>Ghost-written thought leadership</DontDoBand.Item>
          <DontDoBand.Item>Logos in 48 hours</DontDoBand.Item>
        </DontDoBand.List>
      </DontDoBand>

      <ClosingBand colour="blue">
        <ClosingBand.Heading>Not sure which one you need?</ClosingBand.Heading>
        <ClosingBand.Body>
          Tell us the problem instead. Send an enquiry and we&apos;ll suggest the right shape of work on a first call.
        </ClosingBand.Body>
        <ClosingBand.Actions ctaLabel="Start a project enquiry" />
      </ClosingBand>
    </>
  );
}
