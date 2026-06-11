interface CTASectionProps {
  ctaLeftRef: React.RefObject<HTMLDivElement | null>
  ctaRightRef: React.RefObject<HTMLDivElement | null>
}

export function CTASection({ ctaLeftRef, ctaRightRef }: CTASectionProps) {
  return (
    <div
      className="fixed flex gap-4"
      style={{
        zIndex: 3,
        bottom: '320px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <div ref={ctaLeftRef} style={{ opacity: 0 }}>
        <button
          style={{
            background: '#FFFFFF',
            color: '#0D0F12',
            border: 'none',
            borderRadius: '9999px',
            padding: '14px 28px',
            fontWeight: 600,
            fontSize: '14px',
            fontFamily: "'Inter', system-ui, sans-serif",
            cursor: 'pointer',
            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.transform = 'scale(1.03)'
            el.style.boxShadow = '0px 10px 30px rgba(255, 255, 255, 0.15)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.transform = 'scale(1)'
            el.style.boxShadow = 'none'
          }}
        >
          Explore Our Work
        </button>
      </div>
      <div ref={ctaRightRef} style={{ opacity: 0 }}>
        <button
          style={{
            background: 'transparent',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '9999px',
            padding: '14px 28px',
            fontWeight: 600,
            fontSize: '14px',
            fontFamily: "'Inter', system-ui, sans-serif",
            cursor: 'pointer',
            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), background 0.3s ease, border-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.transform = 'scale(1.03)'
            el.style.borderColor = 'rgba(255, 255, 255, 0.9)'
            el.style.background = 'rgba(255, 255, 255, 0.05)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.transform = 'scale(1)'
            el.style.borderColor = 'rgba(255, 255, 255, 0.3)'
            el.style.background = 'transparent'
          }}
        >
          Get in Touch
        </button>
      </div>
    </div>
  )
}
