import type { Metadata } from 'next';
import { LoudHand } from '../../components/art/loud-hand';
import { PaperTag } from '../../components/art/paper-tag';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { DirectLinesBand, VisitStudioPanel } from '../../components/page-sections';
import { availabilityHeadline, business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead
        eyebrow="Contact · Project enquiries"
        title={business.enquiries.title}
        colour="red"
        art={<LoudHand compact className="mx-auto w-full lg:scale-110" />}
      >
        <p>{business.enquiries.introduction}</p>
        <p className="mt-5 inline-block -rotate-1 bg-yellow px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#111111]">
          {availabilityHeadline(business.availability.nextStart)}
          {business.availability.note ? ` · ${business.availability.note}` : ''}
        </p>
      </PageHead>

      {/* Enquiry form (or email fallback) beside "What to put in your message" */}
      <section aria-label="Enquiry form and guidance" className="texture-paper pt-6 pb-20 sm:pb-24">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div className="pasted relative">
            <div className="texture-surface tear-both relative px-6 pt-10 pb-10 text-ink sm:px-10 sm:pt-12 sm:pb-12">
              <h2 className="font-display text-[clamp(2.4rem,5vw,3.5rem)] uppercase leading-[0.9]">Send a project enquiry</h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
                For new projects, fee proposals, or press and speaking invitations. Nothing is confirmed until we reply and agree a proposal together.
              </p>

              <div className="mt-8">
                {hosted ? (
                  <JamstacksSupportForm
                    siteId={site.jamstacksSite}
                    embedUrl={site.jamstacksEmbedUrl}
                    email={business.email}
                  />
                ) : (
                  <div className="border-l-4 border-primary bg-bg px-5 py-5 sm:px-6">
                    <p className="font-display text-2xl uppercase leading-none">Write to us directly</p>
                    <p className="mt-3 text-base leading-relaxed">
                      The hosted enquiry form isn&apos;t connected on this build. Email us straight at{' '}
                      <a className="text-link font-mono wrap-anywhere" href={`mailto:${business.email}`}>
                        {business.email}
                      </a>{' '}
                      with the notes alongside and we&apos;ll reply to arrange a first call.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <span className="masking-tape -top-3 left-10 rotate-[-5deg]" aria-hidden="true" />
          </div>

          <aside aria-labelledby="message-checklist-heading" className="lg:pt-6">
            <PaperTag tone="yellow" rotate={-1.5}>
              Handy checklist
            </PaperTag>
            <h2 id="message-checklist-heading" className="mt-4 font-display text-[clamp(2.2rem,4.5vw,3.25rem)] uppercase leading-[0.9] text-ink">
              What to put in your message
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              The form asks only for your name, email and message. Drop whatever you know into the message box:
            </p>
            <ol className="mt-6 list-none border-t-2 border-rule p-0">
              {business.enquiries.usefulToInclude.map((tip, index) => (
                <li key={tip} className="flex items-baseline gap-4 border-b border-rule/30 py-3.5 text-base font-semibold text-ink">
                  <span className="marker w-6 shrink-0 text-[1.75rem] text-primary-ink">{index + 1}</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      {/* Direct lines on yellow band */}
      <DirectLinesBand heading="Direct lines" />

      {/* Visit the studio on plywood hoarding */}
      <VisitStudioPanel
        heading="Visit the studio."
        appointmentNote="Visits by appointment only — studio hours below show when someone is in the room, not a walk-in promise."
      />
    </>
  );
}
