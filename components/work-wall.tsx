'use client';

import { useEffect, useState } from 'react';
import {
  DISCIPLINE_LABELS,
  DISCIPLINES,
  filterProjects,
  isDiscipline,
  type Discipline,
  type Project,
} from '../content/projects';
import { Icon } from './art/icons';
import { PasteUpWall } from './art/paste-up-wall';
import { PosterArt } from './art/poster-art';
import { PosterCaption } from './poster-caption';

type FilterValue = Discipline | 'all';

const WALL_TILTS = [-2.5, 2.1, -1.7, 2.4, -2.1, 1.6, -2.6, 2.0];

/**
 * Interactive paste-up wall for /work/.
 * - Without JS: filter bar is not shown and all eight posters render in static HTML.
 * - With JS: reads ?discipline= on mount, updates URL with history.replaceState,
 *   marks active PaperTag button with aria-pressed, and announces count in a polite live region.
 */
export function WorkWall({ projects }: { projects: readonly Project[] }) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<FilterValue>('all');

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const param = params.get('discipline');
    if (isDiscipline(param)) {
      setActive(param);
    }
  }, []);

  function selectDiscipline(next: FilterValue) {
    setActive(next);
    const url = new URL(window.location.href);
    if (next === 'all') {
      url.searchParams.delete('discipline');
    } else {
      url.searchParams.set('discipline', next);
    }
    window.history.replaceState(null, '', url.toString());
  }

  const visible = filterProjects(projects, active);
  const countText = `${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`;

  const buttonClass = (pressed: boolean) =>
    `paper-tag inline-flex min-h-11 items-center gap-2 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.1em] transition-[transform,background-color] duration-150 hover:-translate-y-0.5 ${
      pressed ? 'bg-primary text-on-primary' : 'texture-surface text-ink hover:bg-yellow hover:text-[#111111]'
    }`;

  return (
    <>
      {/* Filter strip: appears only once JS is active so no-JS visitors see zero broken controls */}
      {mounted ? (
        <div className="texture-paper pb-8">
          <div className="wrap flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter projects by discipline">
              <button type="button" aria-pressed={active === 'all'} onClick={() => selectDiscipline('all')} className={buttonClass(active === 'all')}>
                <span>All</span>
                <span className="opacity-75">{projects.length}</span>
              </button>

              {DISCIPLINES.map(discipline => {
                const count = projects.filter(p => p.disciplines.includes(discipline)).length;
                const pressed = active === discipline;
                return (
                  <button
                    key={discipline}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => selectDiscipline(discipline)}
                    className={buttonClass(pressed)}
                  >
                    <Icon name={discipline} className="size-4" />
                    <span>{DISCIPLINE_LABELS[discipline]}</span>
                    <span className="opacity-75">{count}</span>
                  </button>
                );
              })}
            </div>

            <p role="status" aria-live="polite" className="marker text-2xl text-primary-ink">
              {countText} on the wall
            </p>
          </div>
        </div>
      ) : null}

      <PasteUpWall ariaLabel="Project wall">
        <ol className="grid list-none grid-cols-1 gap-x-10 gap-y-16 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => {
            const tilt = WALL_TILTS[index % WALL_TILTS.length];
            const stagger = index % 3 === 1 ? 'lg:mt-16' : index % 3 === 2 ? 'lg:mt-6' : '';

            return (
              <li
                key={project.id}
                id={project.id}
                tabIndex={0}
                aria-label={`${project.title} — ${project.client}, ${project.year}`}
                style={{ ['--poster-tilt' as string]: `${tilt}deg` }}
                className={`poster-card scroll-reveal scroll-mt-28 outline-none focus-visible:outline-3 focus-visible:outline-offset-8 focus-visible:outline-[var(--focus)] ${stagger}`}
              >
                <article>
                  <PosterArt
                    colour={project.poster.colour}
                    motif={project.poster.motif}
                    title={project.title}
                    client={project.client}
                    year={project.year}
                    headingLevel="h2"
                  />
                  <PosterCaption project={project} detailed />
                </article>
              </li>
            );
          })}
        </ol>
      </PasteUpWall>
    </>
  );
}
