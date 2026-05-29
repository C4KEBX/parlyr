/* PARLYR landing — shared reveal hook + small primitives */

// IntersectionObserver-based reveal. Returns [ref, isIn].
const useReveal = (opts = {}) => {
  const ref = React.useRef(null);
  const [isIn, setIn] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIn(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...opts }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, isIn];
};

// Primary CTA pill — signal orange.
const PrimaryCTA = ({ children = 'Get in Touch', href = '#contact', size = 'md' }) => {
  const [h, setH] = React.useState(false);
  const sizes = {
    sm: { padding: '13px 22px', fontSize: 12 },
    md: { padding: '17px 28px', fontSize: 14 },
    lg: { padding: '20px 34px', fontSize: 15 },
  };
  return (
    <a href={href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: '"Helvetica Neue", sans-serif',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        background: h ? 'var(--signal-hot)' : 'var(--signal)',
        color: 'var(--ink)',
        borderRadius: 9999,
        cursor: 'pointer',
        boxShadow: h
          ? '0 0 0 1px rgba(242,107,31,.6), 0 14px 40px rgba(242,107,31,.45)'
          : 'none',
        transition: 'all 180ms var(--ease-out)',
        display: 'inline-flex', alignItems: 'center', gap: 12,
        textDecoration: 'none',
        ...sizes[size],
      }}>
      {children}
      <span style={{
        fontSize: 16, lineHeight: 1,
        transform: h ? 'translateX(3px)' : 'translateX(0)',
        transition: 'transform 180ms var(--ease-out)',
      }}>→</span>
    </a>
  );
};

// Section eyebrow — small caps with hairline rule
const SectionEyebrow = ({ children, num }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 14,
    fontFamily: '"Helvetica Neue", sans-serif',
    fontSize: 11, fontWeight: 500,
    letterSpacing: '0.32em', textTransform: 'uppercase',
    color: 'var(--signal)',
  }}>
    <span style={{ width: 28, height: 1, background: 'var(--signal)' }}/>
    {num && <span style={{ color: 'var(--signal)', fontFamily: 'var(--font-mono)', letterSpacing: 0 }}>{num}</span>}
    <span>{children}</span>
  </div>
);

Object.assign(window, { useReveal, PrimaryCTA, SectionEyebrow });
