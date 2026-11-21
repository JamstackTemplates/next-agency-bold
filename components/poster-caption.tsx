import { DISCIPLINE_LABELS, type Project } from '../content/projects';
import { Icon } from './art/icons';

/** Hand-cut paper slip taped under a poster: client or sector, year, disciplines and, on /work/, brief and outcome. */
export function PosterCaption({ project, detailed = false }: { project: Project; detailed?: boolean }) {
  return (
    <div className="pasted relative z-10 mx-3 -mt-3 rotate-[-0.6deg]">
      <div className="texture-surface tear-bottom px-4 pt-3 pb-4 text-ink">
        <div className="flex items-baseline justify-between gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
          <span className="truncate">{detailed ? project.sector : project.client}</span>
          <span>{project.year}</span>
        </div>
        {detailed ? (
          <>
            <p className="mt-2 text-[0.95rem] leading-snug text-ink">{project.brief}</p>
            <p className="mt-2 text-[0.95rem] font-bold leading-snug text-primary-ink">{project.outcome}</p>
          </>
        ) : null}
        <ul className="mt-2.5 flex list-none flex-wrap gap-x-3 gap-y-1 p-0 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
          {project.disciplines.map(d => (
            <li key={d} className="inline-flex items-center gap-1">
              <Icon name={d} className="size-4 text-primary-ink" />
              {DISCIPLINE_LABELS[d]}
            </li>
          ))}
        </ul>
      </div>
      <span className="masking-tape -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[3deg]" />
    </div>
  );
}
