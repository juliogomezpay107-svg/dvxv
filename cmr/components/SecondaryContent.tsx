import { forwardRef } from 'react'

interface SecondaryContentProps {
  titleRef: React.RefObject<HTMLDivElement | null>
  descriptionRef: React.RefObject<HTMLParagraphElement | null>
}

export const SecondaryContent = forwardRef<HTMLDivElement, SecondaryContentProps>(function SecondaryContent({ titleRef, descriptionRef }) {
  const words = ['Excellence', 'in', 'Everything', 'We Do']

  return (
    <div
      className="fixed"
      style={{
        zIndex: 3,
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        width: '80%',
        maxWidth: '800px',
        pointerEvents: 'none',
      }}
    >
      <div ref={titleRef} style={{ overflow: 'hidden', marginBottom: '16px' }}>
        <h2
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
            letterSpacing: '-0.01em',
            lineHeight: 1.25,
            color: '#FFFFFF',
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.15em',
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="reveal-word"
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                transform: 'translateY(100%)',
              }}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h2>
      </div>
      <p
        ref={descriptionRef}
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
          lineHeight: 1.6,
          color: '#A0AEC0',
          maxWidth: '560px',
          margin: '0 auto',
          opacity: 0,
        }}
      >
        We craft premium digital experiences at the intersection of technology,
        design, and cinematic storytelling.
      </p>
    </div>
  )
})
