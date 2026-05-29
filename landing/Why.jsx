/* PARLYR landing — Why PARLYR
 * Bold editorial typography. Each line reveals on scroll via a
 * left-to-right mask "wipe" that reads like words being typed
 * into existence (without the gimmick of literal character typing).
 */

const WHY_LINES = [
  { word: 'Personalized.', body: 'We build around your brand, not a template.' },
  { word: 'Agile.',        body: 'Sprints not slideshows. We ship in days.' },
  { word: 'Affordable.',   body: 'AI does what a team of ten used to.' },
  { word: 'Effective.',    body: 'Work that performs, not work that wins awards.' },
];

const RevealLine = ({ word, body, idx, isIn }) => {
  // each line starts 240ms after the previous
  const delay = idx * 240;
  return (
    <div style={{
      padding: '36px 0',
      borderBottom: idx < WHY_LINES.length - 1 ? '1px solid var(--carbon)' : 'none',
    }}>
      {/* Big word — mask-wipe reveal */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: '0.08em',
      }}>
        <span
          style={{
            display: 'inline-block',
            fontFamily: '"Gotham", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(56px, 9vw, 144px)',
            lineHeight: 0.92,
            letterSpacing: '-0.035em',
            textTransform: 'uppercase',
            color: 'var(--vanilla-cream)',
            /* The wipe: clip from right side, animate clip to 0 */
            clipPath: isIn
              ? 'inset(0 0% 0 0)'
              : 'inset(0 100% 0 0)',
            transition: `clip-path 900ms cubic-bezier(.7, 0, .15, 1) ${delay}ms`,
          }}
        >
          {word}
        </span>
        {/* Trailing signal-orange "caret" bar that runs alongside the wipe */}
        <span style={{
          position: 'absolute',
          top: 0, bottom: '0.1em',
          left: isIn ? '100%' : '0%',
          width: 4,
          background: 'var(--signal)',
          opacity: isIn ? 0 : 1,
          transition: `left 900ms cubic-bezier(.7, 0, .15, 1) ${delay}ms, opacity 200ms linear ${delay + 880}ms`,
        }}/>
      </div>

      {/* Body line — sits under the big word, fades in after the wipe */}
      <p style={{
        marginTop: 18,
        fontFamily: '"Helvetica Neue", sans-serif',
        fontSize: 'clamp(17px, 1.4vw, 22px)',
        fontWeight: 400, lineHeight: 1.45,
        color: 'var(--fog)',
        margin: '18px 0 0',
        maxWidth: 720,
        opacity: isIn ? 1 : 0,
        transform: isIn ? 'translateY(0)' : 'translateY(8px)',
        transition: `opacity 500ms var(--ease-out) ${delay + 500}ms, transform 500ms var(--ease-out) ${delay + 500}ms`,
      }}>
        {body}
      </p>
    </div>
  );
};

const Why = () => {
  const [ref, isIn] = useReveal({ threshold: 0.2 });
  return (
    <section id="why" ref={ref} style={{
      background: 'var(--ink)',
      padding: '160px 36px 140px',
      borderTop: '1px solid var(--carbon)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1500, margin: '0 auto' }}>
        <div style={{
          opacity: isIn ? 1 : 0,
          transform: isIn ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 700ms var(--ease-out)',
          marginBottom: 56,
        }}>
          <SectionEyebrow num="02 /">Why PARLYR</SectionEyebrow>
          <h2 style={{
            fontFamily: '"Gotham", sans-serif',
            fontSize: 'clamp(32px, 3.5vw, 56px)',
            fontWeight: 900, letterSpacing: '-0.025em',
            lineHeight: 1.0, textTransform: 'uppercase',
            color: 'var(--vanilla-cream)',
            margin: '20px 0 0', maxWidth: 900,
          }}>
            Four things you can<br/>count on.
          </h2>
        </div>

        <div>
          {WHY_LINES.map((l, i) => (
            <RevealLine key={l.word} {...l} idx={i} isIn={isIn} />
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Why });
