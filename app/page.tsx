import type { Metadata } from 'next';
import { ClosingBand } from '../components/closing-band';
import {
  ClientQuote,
  Hero,
  ProcessTeaser,
  SelectedWork,
  ServicesList,
  StudioNumbers,
} from '../components/home-sections';
import { Marquee } from '../components/marquee';
import { featuredProjects, marqueeClients } from '../content/projects';
import { services } from '../content/services';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero>
        <Hero.Heading lines={['MAKE', 'IT', 'LOUD.']} />
        <Hero.Panel>
          <Hero.Supporting>
            Brands, campaigns, motion and websites for people with something to say, made on Stevenson Square since 2014.
          </Hero.Supporting>
          <Hero.Actions>
            <Hero.PrimaryAction>Start a project enquiry</Hero.PrimaryAction>
            <Hero.SecondaryAction>See the work</Hero.SecondaryAction>
          </Hero.Actions>
        </Hero.Panel>
      </Hero>

      {/* 2. Client marquee */}
      <Marquee clients={marqueeClients()} />

      {/* 3. Selected work on the paste-up wall */}
      <SelectedWork projects={featuredProjects()}>
        <SelectedWork.Heading>Fresh paste.</SelectedWork.Heading>
        <SelectedWork.Link>See the whole wall</SelectedWork.Link>
      </SelectedWork>

      {/* 4. Services specimen rows */}
      <ServicesList services={services}>
        <ServicesList.Heading>Five ways to get heard.</ServicesList.Heading>
        <ServicesList.Link>See services &amp; fees</ServicesList.Link>
      </ServicesList>

      {/* 5. Process teaser with mixing desk */}
      <ProcessTeaser>
        <ProcessTeaser.Heading>Running order.</ProcessTeaser.Heading>
        <ProcessTeaser.Body>
          <ProcessTeaser.Text>
            Five clear stages over twelve weeks, built in weekly show-and-tells so nothing lands out of the blue.
          </ProcessTeaser.Text>
          <ProcessTeaser.Link>See the running order</ProcessTeaser.Link>
        </ProcessTeaser.Body>
      </ProcessTeaser>

      {/* 6. Studio in numbers */}
      <StudioNumbers>
        <StudioNumbers.Heading>Loud Hands in numbers</StudioNumbers.Heading>
        <StudioNumbers.Grid>
          <StudioNumbers.Stat value="12" label="years making noise" />
          <StudioNumbers.Stat value="140+" label="launches" stagger />
          <StudioNumbers.Stat value="9" label="people" />
          <StudioNumbers.Stat value="1" label="square in Manchester" stagger />
        </StudioNumbers.Grid>
      </StudioNumbers>

      {/* 7. Client quote */}
      <ClientQuote>
        <ClientQuote.Text>
          They took a hot sauce nobody had heard of and made it the thing people photograph at the till.
        </ClientQuote.Text>
        <ClientQuote.Attribution>
          Ada Marlow, founder, Marlow &amp; Daughters
        </ClientQuote.Attribution>
      </ClientQuote>

      {/* 8. Closing call */}
      <ClosingBand colour="blue">
        <ClosingBand.Heading>Got something to shout about?</ClosingBand.Heading>
        <ClosingBand.Body>
          Send a short enquiry with what you&apos;re launching or changing. We&apos;ll reply to arrange a first call — nothing is booked until we&apos;ve both agreed a proposal.
        </ClosingBand.Body>
        <ClosingBand.Actions ctaLabel="Start a project enquiry" />
      </ClosingBand>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
