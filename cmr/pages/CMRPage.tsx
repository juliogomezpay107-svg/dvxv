import { useRef, useEffect } from 'react'
import { CinematicHero } from '../components/CinematicHero'
import { Navbar } from '../components/navbar'
import { ThreeScene } from '../components/ThreeScene'
import { SecondaryContent } from '../components/SecondaryContent'
import { CTASection } from '../components/CTASection'
import { BentoGrid } from '../components/BentoGrid'
import { useAnimationTimeline } from '../hooks/useAnimationTimeline'

export default function CMRPage() {
  const navRef = useRef<HTMLDivElement>(null!)
  const heroTextRef = useRef<HTMLHeadingElement>(null!)
  const videoContainerRef = useRef<HTMLDivElement>(null!)
  const threeContainerRef = useRef<HTMLDivElement>(null!)
  const secondaryTitleRef = useRef<HTMLDivElement>(null!)
  const descriptionRef = useRef<HTMLParagraphElement>(null!)
  const ctaLeftRef = useRef<HTMLDivElement>(null!)
  const ctaRightRef = useRef<HTMLDivElement>(null!)
  const bentoRef = useRef<HTMLDivElement>(null!)
  const bentoCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null!)

  useAnimationTimeline({
    nav: navRef,
    heroText: heroTextRef,
    videoContainer: videoContainerRef,
    threeContainer: threeContainerRef,
    secondaryTitle: secondaryTitleRef,
    description: descriptionRef,
    ctaLeft: ctaLeftRef,
    ctaRight: ctaRightRef,
    bentoGrid: bentoRef,
    bentoCards: bentoCardsRef,
  })

  useEffect(() => {
    const vid = document.querySelector('video')
    if (vid) {
      vid.playbackRate = 0.85
    }
  }, [])

  return (
    <div
      ref={scrollContainerRef}
      className="scroll-container"
      style={{
        position: 'relative',
        background: '#0D0F12',
        overflow: 'visible',
        height: '500vh',
      }}
    >
      <CinematicHero ref={videoContainerRef} />

      <h1
        ref={heroTextRef}
        className="fixed"
        style={{
          zIndex: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 800,
          color: '#FFFFFF',
          letterSpacing: '0.06em',
          textAlign: 'center',
          fontFamily: "'Inter', system-ui, sans-serif",
          textTransform: 'uppercase',
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        REV PRODUCTIONS
      </h1>

      <Navbar ref={navRef} />

      <ThreeScene />

      <SecondaryContent titleRef={secondaryTitleRef} descriptionRef={descriptionRef} />

      <CTASection ctaLeftRef={ctaLeftRef} ctaRightRef={ctaRightRef} />

      <BentoGrid bentoRef={bentoRef} cardRefs={bentoCardsRef} />
    </div>
  )
}
