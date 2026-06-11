import { forwardRef, useState } from 'react'

interface BentoGridProps {
  bentoRef: React.RefObject<HTMLDivElement | null>
  cardRefs: React.RefObject<(HTMLDivElement | null)[]>
}

function DeviceCard({ label, perspective, isDimmed, onHoverStart, onHoverEnd }: {
  label: string
  perspective: string
  isDimmed: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}) {
  return (
    <div
      className="flex flex-col items-center justify-center p-6"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        minHeight: '160px',
        cursor: 'pointer',
        opacity: isDimmed ? 0.6 : 1,
        transition: 'transform 0.4s ease, box-shadow 0.4s ease, opacity 0.4s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = 'scale(1.02)'
        el.style.boxShadow = '0px 20px 50px rgba(0, 0, 0, 0.4)'
        onHoverStart()
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = 'scale(1)'
        el.style.boxShadow = 'none'
        onHoverEnd()
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            width: '80%',
            height: '70%',
            borderRadius: '8px',
            background: 'rgba(0, 229, 255, 0.08)',
            border: '1px solid rgba(0, 229, 255, 0.12)',
            transform: perspective,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: 'rgba(0, 229, 255, 0.4)',
          }}
        >
          ⬡
        </div>
      </div>
      <span
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 500,
          fontSize: '13px',
          color: '#A0AEC0',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>(function BentoGrid({ bentoRef, cardRefs }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const cards = [
    { label: 'Desktop Monitor', perspective: 'rotateY(-8deg) scale(0.9)' },
    { label: 'Tablet Portrait', perspective: 'rotateX(5deg) scale(0.85)' },
    { label: 'Laptop 45°', perspective: 'rotateX(15deg) scale(0.8)' },
  ]

  return (
    <div
      ref={bentoRef}
      className="fixed"
      style={{
        zIndex: 3,
        bottom: '40px',
        left: '5%',
        width: '90%',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px',
        transform: 'translateY(100%)',
        opacity: 0,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {cards.map((card, i) => (
          <div
            key={card.label}
            ref={(el) => { if (cardRefs.current) cardRefs.current[i] = el }}
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            <DeviceCard
              label={card.label}
              perspective={card.perspective}
              isDimmed={hoveredIndex !== null && hoveredIndex !== i}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          </div>
        ))}
      </div>
    </div>
  )
})
