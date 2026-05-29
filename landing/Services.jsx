/* PARLYR landing — What We Do
 * Compact 4-up grid of service pillars. Cards slide up + fade in
 * staggered left → right when the section enters the viewport.
 */

const SERVICES = [
  {
    n: '01',
    title: 'AI Workflow Automation',
    body: 'Replace 20 manual workflows with one agentic loop. We architect, your team operates.',
    tags: ['n8n', 'Temporal', 'Webhooks'],
  },
  {
    n: '02',
    title: 'Multi-Agent Systems',
    body: 'Coordinated agents that triage, reason, and act across channels. Built on Anthropic.',
    tags: ['Anthropic', 'LangGraph', 'Vercel'],
  },
  {
    n: '03',
    title: 'Consulting',
    body: 'Audit, blueprint, roadmap. Strategic guidance from a team that has shipped it before.',
    tags: ['Audit', 'Strategy', 'Roadmap'],
  },
];

const ServiceCard = ({ s, isIn, idx }) => {
  const [hover, setHover] = React.useState(false);
  const delay = idx * 120;
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? 'var(--graphite)' : 'transparent',
        padding: '36px 26px 30px',
        display: 'flex', flexDirection: 'column', gap: 14,
        minHeight: 320,
        position: 'relative',
        cursor: 'default',
        transition: 'background 220ms var(--ease-out), transform 220ms var(--ease-out)',
        transform: isIn ? 'translateY(0)' : 'translateY(32px)',
        opacity: isIn ? 1 : 0,
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform, background',
        transitionDuration: '700ms, 700ms, 220ms',
        transitionTimingFunction: 'var(--ease-out)',
      }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--signal)',
      }}>{s.n}</div>

      <h3 style={{
        fontFamily: '"Gotham", sans-serif',
        fontWeight: 900, fontSize: 26, lineHeight: 1.0,
        letterSpacing: '-0.015em', textTransform: 'uppercase',
        color: 'var(--vanilla-cream)', margin: 0,
      }}>{s.title}</h3>

      <p style={{
        fontFamily: '"Helvetica Neue", sans-serif',
        fontSize: 14, lineHeight: 1.55,
        color: 'var(--fog)', margin: 0,
      }}>{s.body}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
        {s.tags.map((t) => (
          <span key={t} style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontWeight: 500, fontSize: 11,
            padding: '4px 10px', borderRadius: 9999,
            background: 'var(--graphite)', color: 'var(--fog)',
            border: '1px solid var(--carbon)',
          }}>{t}</span>
        ))}
      </div>
    </article>
  );
};

const Services = () => {
  const [ref, isIn] = useReveal();
  return (
    <section id="what" ref={ref} style={{
      background: 'var(--ink)',
      padding: '140px 36px 120px',
      borderTop: '1px solid var(--carbon)',
    }}>
      <div style={{ maxWidth: 1500, margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          gap: 40, marginBottom: 64, flexWrap: 'wrap',
        }}>
          <div style={{
            opacity: isIn ? 1 : 0,
            transform: isIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 700ms var(--ease-out)',
          }}>
            <SectionEyebrow num="01 /">What We Do</SectionEyebrow>
            <h2 style={{
              fontFamily: '"Gotham", sans-serif',
              fontSize: 'clamp(40px, 5.5vw, 80px)',
              fontWeight: 900, letterSpacing: '-0.03em',
              lineHeight: 0.94, textTransform: 'uppercase',
              color: 'var(--vanilla-cream)',
              margin: '20px 0 0', maxWidth: 1000,
            }}>
              Three services,<br/>
              <span style={{ color: 'var(--signal)' }}>end to end.</span>
            </h2>
          </div>
          <p style={{
            opacity: isIn ? 1 : 0,
            transform: isIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 700ms var(--ease-out) 100ms',
            fontFamily: '"Helvetica Neue", sans-serif',
            fontSize: 15, lineHeight: 1.55,
            color: 'var(--fog)', maxWidth: 340, margin: 0,
          }}>
            Pick one, or all three. We handle the full scope — strategy through ship.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'var(--carbon)',
          border: '1px solid var(--carbon)',
        }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.n} s={s} isIn={isIn} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Services });
