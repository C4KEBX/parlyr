/* PARLYR landing — Contact
 * Minimal form (name, email, message), email fallback, repeat CTA.
 * Clean fade-in. No theatrics — this is where action happens.
 */

const Field = ({ label, type = 'text', value, onChange, multiline = false, required }) => {
  const [focus, setFocus] = React.useState(false);
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <label style={{
      display: 'flex', flexDirection: 'column', gap: 8,
      borderBottom: `1px solid ${focus ? 'var(--signal)' : 'var(--carbon)'}`,
      paddingBottom: 12,
      transition: 'border-color 160ms var(--ease-out)',
    }}>
      <span style={{
        fontFamily: '"Helvetica Neue", sans-serif',
        fontSize: 11, fontWeight: 500,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: focus ? 'var(--signal)' : 'var(--fog)',
        transition: 'color 160ms var(--ease-out)',
      }}>
        {label}{required && <span style={{ color: 'var(--signal)', marginLeft: 4 }}>*</span>}
      </span>
      <Tag
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        rows={multiline ? 4 : undefined}
        required={required}
        style={{
          background: 'transparent', border: 'none', outline: 'none',
          padding: 0,
          fontFamily: '"Helvetica Neue", sans-serif',
          fontSize: 18, fontWeight: 400,
          color: 'var(--vanilla-cream)',
          resize: multiline ? 'vertical' : 'none',
          lineHeight: 1.4,
          width: '100%',
        }}
      />
    </label>
  );
};

const SubmitButton = ({ enabled, loading }) => {
  const [hover, setHover] = React.useState(false);
  const active = enabled && !loading;
  return (
    <button
      type="submit"
      disabled={!active}
      onMouseEnter={() => active && setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: '"Helvetica Neue", sans-serif',
        fontWeight: 700,
        fontSize: 15,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '20px 34px',
        borderRadius: 9999,
        border: 'none',
        cursor: active ? 'pointer' : 'not-allowed',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        transition: 'all 180ms var(--ease-out)',
        background: active
          ? (hover ? 'var(--signal-hot)' : 'var(--signal)')
          : 'var(--smoke)',
        color: active ? 'var(--ink)' : 'var(--ash)',
        boxShadow: active && hover
          ? '0 0 0 1px rgba(242,107,31,.6), 0 14px 40px rgba(242,107,31,.45)'
          : 'none',
      }}
    >
      {loading ? 'Sending…' : 'Submit'}
      {!loading && (
        <span style={{
          fontSize: 16, lineHeight: 1,
          transform: hover && active ? 'translateX(3px)' : 'translateX(0)',
          transition: 'transform 180ms var(--ease-out)',
        }}>→</span>
      )}
    </button>
  );
};

const Contact = () => {
  const [ref, isIn] = useReveal({ threshold: 0.15 });
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const canSubmit = form.name.trim().length > 0
    && form.email.trim().includes('@')
    && form.message.trim().split(/\s+/).filter(Boolean).length >= 3;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    const data = new FormData();
    data.append('name', form.name);
    data.append('email', form.email);
    data.append('message', form.message);
    const res = await fetch('https://formspree.io/f/mvzylypd', {
      method: 'POST', body: data,
      headers: { 'Accept': 'application/json' },
    });
    setSubmitting(false);
    if (res.ok) setSent(true);
  };

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <section id="contact" ref={ref} style={{
      background: 'var(--ink)',
      padding: '160px 36px 140px',
      borderTop: '1px solid var(--carbon)',
    }}>
      <div style={{
        maxWidth: 1500, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '0.9fr 1.1fr',
        gap: 96,
        opacity: isIn ? 1 : 0,
        transform: isIn ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 700ms var(--ease-out)',
      }}>
        {/* Left column — copy */}
        <div>
          <SectionEyebrow num="03 /">Contact</SectionEyebrow>
          <h2 style={{
            fontFamily: '"Gotham", sans-serif',
            fontSize: 'clamp(48px, 6vw, 96px)',
            fontWeight: 900, letterSpacing: '-0.03em',
            lineHeight: 0.92, textTransform: 'uppercase',
            color: 'var(--vanilla-cream)',
            margin: '20px 0 28px',
          }}>
            Let's <span style={{ color: 'var(--signal)' }}>talk.</span>
          </h2>
          <p style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontSize: 17, lineHeight: 1.55,
            color: 'var(--fog)', maxWidth: 440, margin: '0 0 36px',
          }}>
            Tell us what you're trying to build. We'll come back with a recommendation, a price, and a date — usually within 48 hours.
          </p>

          <div style={{
            display: 'flex', flexDirection: 'column', gap: 14,
            paddingTop: 24, borderTop: '1px solid var(--carbon)',
          }}>
            <div style={{
              fontFamily: '"Helvetica Neue", sans-serif',
              fontSize: 11, fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--fog)',
            }}>Or skip the form</div>
            <a href="mailto:justin@parlyr.site" style={{
              fontFamily: '"Gotham", sans-serif',
              fontSize: 22, fontWeight: 500,
              color: 'var(--vanilla-cream)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--signal)',
              paddingBottom: 4,
              alignSelf: 'flex-start',
              transition: 'color 160ms var(--ease-out)',
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--signal)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--vanilla-cream)'}
            >justin@parlyr.site</a>
          </div>
        </div>

        {/* Right column — form */}
        <div>
          {!sent ? (
            <form onSubmit={submit} style={{
              display: 'flex', flexDirection: 'column', gap: 32,
            }}>
              <Field label="Your name"    value={form.name}    onChange={set('name')}    required />
              <Field label="Email"        value={form.email}   onChange={set('email')}   type="email" required />
              <Field label="What you're trying to build" value={form.message} onChange={set('message')} multiline required />

              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 8, flexWrap: 'wrap', gap: 16,
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'var(--ash)', letterSpacing: 0,
                }}>
                  We'll reply within 48 hours.
                </span>
                <SubmitButton enabled={canSubmit} loading={submitting} />
              </div>
            </form>
          ) : (
            <div style={{
              padding: '64px 0',
              display: 'flex', flexDirection: 'column', gap: 18,
              alignItems: 'flex-start',
              animation: 'fadeUp 600ms var(--ease-out)',
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '6px 12px',
                background: 'var(--signal)', color: 'var(--ink)',
                fontFamily: '"Helvetica Neue", sans-serif',
                fontWeight: 700, fontSize: 11,
                letterSpacing: '0.18em', textTransform: 'uppercase',
              }}>Message sent</span>
              <h3 style={{
                fontFamily: '"Gotham", sans-serif',
                fontSize: 48, fontWeight: 900,
                letterSpacing: '-0.025em', lineHeight: 1.0,
                textTransform: 'uppercase',
                color: 'var(--vanilla-cream)', margin: 0,
              }}>
                Got it, {form.name.split(' ')[0] || 'friend'}.
              </h3>
              <p style={{
                fontFamily: '"Helvetica Neue", sans-serif',
                fontSize: 17, lineHeight: 1.5,
                color: 'var(--fog)', margin: 0, maxWidth: 460,
              }}>
                We'll be in touch at <strong style={{ color: 'var(--vanilla-cream)', fontWeight: 500 }}>{form.email}</strong> within 48 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Contact });
