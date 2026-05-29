/* PARLYR landing — sticky nav
 * Fades in on scroll-down, hides on scroll-up.
 * (User asked for "standard sticky behavior" — interpretation:
 *  visible when actively reading downward, hides when scrolling back up
 *  so they can see the content unobscured.)
 */

const Nav = () => {
  const [hidden, setHidden] = React.useState(false);   // true → translated up off-screen
  const [scrolled, setScrolled] = React.useState(false); // true → past 24px from top
  const lastY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 80) {
        setHidden(false);              // always show near top
      } else if (y > lastY.current) {
        setHidden(false);              // scrolling DOWN → show
      } else {
        setHidden(true);               // scrolling UP → hide
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'What We Do', href: '#what' },
    { label: 'Why PARLYR', href: '#why' },
    { label: 'Contact',    href: '#contact' },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: scrolled ? '14px 36px' : '22px 36px',
      background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--carbon)' : '1px solid transparent',
      transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
      transition: 'transform 320ms var(--ease-out), padding 220ms var(--ease-out), background 220ms var(--ease-out), border-color 220ms var(--ease-out)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <a href="#top"
        aria-label="PARLYR — home"
        className="nav-brand"
        style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="assets/logos/parlyr-wordmark-cream.png" alt="PARLYR"
          style={{ height: 18, width: 'auto', display: 'block', transition: 'filter 200ms var(--ease-out), transform 200ms var(--ease-out)' }} />
      </a>

      <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
        {links.map((l) => (
          <a key={l.href} href={l.href}
            style={{
              fontFamily: '"Helvetica Neue", sans-serif',
              fontSize: 12, fontWeight: 500,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--vanilla-cream)',
              textDecoration: 'none',
              transition: 'color 120ms var(--ease-out)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--signal)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--vanilla-cream)'}
          >{l.label}</a>
        ))}
        <PrimaryCTA size="sm">Get in Touch</PrimaryCTA>
      </nav>
    </header>
  );
};

Object.assign(window, { Nav });
