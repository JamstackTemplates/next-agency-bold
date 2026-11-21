import type { Metadata } from 'next';
import { ClosingBand } from '../../components/closing-band';
import { PasteBucket } from '../../components/art/page-head-art';
import { PageHead } from '../../components/page-head';
import { SectorsBand } from '../../components/page-sections';
import { WorkWall } from '../../components/work-wall';
import { orderedProjects, projectSectors } from '../../content/projects';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Eight recent brand, campaign, motion, digital and print projects pasted up by Loud Hands Studio in Manchester.',
  alternates: { canonical: absoluteUrl('/work/') },
};

export default function WorkPage() {
  return (
    <>
      <PageHead eyebrow="Work · Portfolio" title="The wall." colour="yellow" art={<PasteBucket />}>
        <p>Eight recent projects, pasted up. Filter by what we made.</p>
      </PageHead>

      <WorkWall projects={orderedProjects()} />

      <SectorsBand heading="Sectors we’ve worked in" sectors={projectSectors()} />

      <ClosingBand colour="red">
        <ClosingBand.Heading>Want your poster on this wall?</ClosingBand.Heading>
        <ClosingBand.Body>
          Tell us what you&apos;re launching and who needs to notice. Every project starts with a straightforward enquiry and a first call.
        </ClosingBand.Body>
        <ClosingBand.Actions ctaLabel="Start a project enquiry" />
      </ClosingBand>
    </>
  );
}
