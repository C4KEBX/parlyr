/* PARLYR landing — Hero
 * Full-viewport. Headline staggers in word-by-word on load.
 * Subheadline + CTA fade up after.
 */

const HERO_LINES = [
  ['Creative', 'solutions,'],
  ['engineered', 'with', 'AI.'],
];

const Hero = () => {
  // Total word count across lines, used to compute the CTA delay.
  let idx = 0;
  const totalWords = HERO_LINES.reduce((n, l) => n + l.length, 0);
  const WORD_DUR = 80;          // ms between word starts
  const BASE_DELAY = 220;       // initial pause

  return (
    <section id="top" style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'var(--ink)',
      overflow: 'hidden',
      paddingTop: 120,
      display: 'flex', alignItems: 'center',
    }}>
      {/* Hex pattern, very subtle, top-right */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('assets/patterns/hex-network.svg')",
        backgroundSize: '950px auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top right',
        opacity: 0.22,
        pointerEvents: 'none',
      }}/>
      {/* Radial vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 50%, transparent 0%, var(--ink) 75%)',
        pointerEvents: 'none',
      }}/>

      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 1500, margin: '0 auto',
        padding: '0 36px',
      }}>
        {/* Eyebrow */}
        <div style={{
          opacity: 0, animation: 'fadeUp 600ms var(--ease-out) 100ms forwards',
          marginBottom: 28,
        }}>
          <SectionEyebrow num="00 /">A creative solutions company, powered by AI</SectionEyebrow>
        </div>

        {/* Staggered headline */}
        <h1 style={{
          fontFamily: '"Gotham", sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(64px, 10vw, 180px)',
          lineHeight: 0.88,
          letterSpacing: '-0.035em',
          textTransform: 'uppercase',
          color: 'var(--vanilla-cream)',
          margin: 0,
          maxWidth: 1300,
        }}>
          {HERO_LINES.map((line, lineI) => (
            <span key={lineI} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em' }}>
              {line.map((word, wordI) => {
                const delay = BASE_DELAY + idx * WORD_DUR;
                idx += 1;
                const isAccent = word === 'AI.';
                return (
                  <span key={wordI} style={{
                    display: 'inline-block',
                    marginRight: '0.28em',
                    color: isAccent ? 'var(--signal)' : 'inherit',
                    opacity: 0,
                    transform: 'translateY(60%)',
                    animation: `wordIn 700ms var(--ease-out) ${delay}ms forwards`,
                  }}>{word}</span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Subheadline + CTA */}
        <div style={{
          marginTop: 36,
          display: 'flex', flexDirection: 'column', gap: 32,
          maxWidth: 720,
        }}>
          <p style={{
            opacity: 0,
            animation: `fadeUp 700ms var(--ease-out) ${BASE_DELAY + totalWords * WORD_DUR + 200}ms forwards`,
            fontFamily: '"Helvetica Neue", sans-serif',
            fontSize: 'clamp(17px, 1.4vw, 22px)',
            fontWeight: 400, lineHeight: 1.45,
            color: 'var(--fog)',
            margin: 0,
            textWrap: 'pretty',
          }}>
            Personalized work for brands, agencies, and ambitious teams. We architect the systems and ship the work — end to end.
          </p>

          <div style={{
            opacity: 0,
            animation: `fadeUp 700ms var(--ease-out) ${BASE_DELAY + totalWords * WORD_DUR + 380}ms forwards`,
          }}>
            <PrimaryCTA size="lg">Get in Touch</PrimaryCTA>
          </div>
        </div>
      </div>

      {/* Scroll cue, bottom right */}
      <div style={{
        position: 'absolute', bottom: 28, right: 36,
        fontFamily: 'var(--font-mono)', fontSize: 10,
        color: 'var(--ash)', letterSpacing: '0.18em', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 10,
        opacity: 0,
        animation: `fadeUp 700ms var(--ease-out) ${BASE_DELAY + totalWords * WORD_DUR + 600}ms forwards`,
      }}>
        <span>Scroll</span>
        <span style={{
          width: 40, height: 1, background: 'var(--ash)',
          display: 'inline-block', position: 'relative',
        }}>
          <span style={{
            position: 'absolute', right: 0, top: -2.5,
            width: 6, height: 6, borderRight: '1px solid var(--ash)',
            borderTop: '1px solid var(--ash)',
            transform: 'rotate(135deg)',
          }}/>
        </span>
      </div>

      <style>{`
        @keyframes wordIn {
          0%   { opacity: 0; transform: translateY(60%) }
          100% { opacity: 1; transform: translateY(0) }
        }
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(16px) }
          100% { opacity: 1; transform: translateY(0) }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Hero });
