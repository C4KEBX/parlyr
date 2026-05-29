/* PARLYR landing — Footer */

const Footer = () => {
  const social = [
    { label: 'LinkedIn', href: '#' },
    { label: 'X',        href: '#' },
    { label: 'GitHub',   href: 'https://github.com/C4KEBX' },
  ];

  return (
    <footer style={{
      background: 'var(--void)',
      borderTop: '1px solid var(--carbon)',
      padding: '48px 36px 28px',
    }}>
      <div style={{
        maxWidth: 1500, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        gap: 32,
      }}>
        {/* Logo */}
        <a href="#top"
          aria-label="PARLYR — top of page"
          className="nav-brand"
          style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="assets/logos/parlyr-wordmark-cream.png" alt="PARLYR"
            style={{ height: 16, width: 'auto', display: 'block',
              transition: 'filter 200ms var(--ease-out), transform 200ms var(--ease-out)' }} />
        </a>

        {/* Copyright — centered */}
        <span style={{
          textAlign: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--fog)', letterSpacing: 0,
        }}>
          © 2026 PARLYR · All rights reserved
        </span>

        {/* Social */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {social.map((s) => (
            <a key={s.label} href={s.href} style={{
              fontFamily: '"Helvetica Neue", sans-serif',
              fontSize: 11, fontWeight: 500,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--fog)', textDecoration: 'none',
              transition: 'color 120ms var(--ease-out)',
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--signal)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fog)'}
            >{s.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { Footer });
