import { forwardRef } from 'react'

export const Navbar = forwardRef<HTMLDivElement>(function Navbar(_, ref) {
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full flex items-center justify-between px-[5%] py-6"
      style={{
        zIndex: 100,
        background: 'transparent',
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease',
        opacity: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: '1.25rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
        }}
      >
        REV
      </span>

      <div
        style={{
          width: '52px',
          height: '28px',
          borderRadius: '9999px',
          background: '#1E222B',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
        }}
      >
        <div
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: '#FFFFFF',
            position: 'absolute',
            top: '3px',
            left: '3px',
            transition: 'transform 0.4s ease',
            transform: 'translateX(0)',
          }}
        />
      </div>
    </div>
  )
})
