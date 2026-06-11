import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TimelineRefs {
  nav: React.RefObject<HTMLDivElement | null>
  heroText: React.RefObject<HTMLHeadingElement | null>
  videoContainer: React.RefObject<HTMLDivElement | null>
  threeContainer: React.RefObject<HTMLDivElement | null>
  secondaryTitle: React.RefObject<HTMLDivElement | null>
  description: React.RefObject<HTMLParagraphElement | null>
  ctaLeft: React.RefObject<HTMLDivElement | null>
  ctaRight: React.RefObject<HTMLDivElement | null>
  bentoGrid: React.RefObject<HTMLDivElement | null>
  bentoCards: React.RefObject<(HTMLDivElement | null)[]>
}

export function useAnimationTimeline(refs: TimelineRefs) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const { nav, heroText, videoContainer, secondaryTitle, description, ctaLeft, ctaRight, bentoGrid, bentoCards } = refs

      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      })

      if (nav.current) {
        timeline.fromTo(
          nav.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' },
          0,
        )
      }

      if (videoContainer.current) {
        timeline.to(
          videoContainer.current,
          { opacity: 0, filter: 'blur(10px)', duration: 0.8 },
          1.0,
        )
      }

      if (heroText.current) {
        timeline.to(
          heroText.current,
          { scale: 0.95, opacity: 0, duration: 0.6, ease: 'cubic-bezier(0.25, 1, 0.5, 1)' },
          1.0,
        )
      }

      timeline.to(
        { val: 0 },
        {
          val: 1,
          duration: 0.3,
          onUpdate: function () {
            document.documentElement.style.setProperty(
              '--cmr-bg',
              `rgba(13, 15, 18, ${0.3 + (this.targets()[0] as { val: number }).val * 0.7})`,
            )
          },
          onComplete: () => {
            document.body.style.background = '#0D0F12'
          },
        },
        1.0,
      )

      if (secondaryTitle.current) {
        const words = secondaryTitle.current.querySelectorAll('.reveal-word')
        timeline.fromTo(
          words,
          { y: '100%' },
          { y: '0%', duration: 0.6, stagger: 0.05, ease: 'power3.out' },
          1.8,
        )
      }

      if (description.current) {
        timeline.fromTo(
          description.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          2.0,
        )
      }

      if (ctaLeft.current) {
        timeline.fromTo(
          ctaLeft.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4 },
          2.3,
        )
      }

      if (ctaRight.current) {
        timeline.fromTo(
          ctaRight.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4 },
          2.4,
        )
      }

      if (bentoGrid.current) {
        timeline.fromTo(
          bentoGrid.current,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, ease: 'power4.out' },
          2.7,
        )
      }

      const cards = bentoCards.current?.filter(Boolean) ?? []
      if (cards.length > 0) {
        timeline.fromTo(
          cards,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'elastic.out(1, 0.75)' },
          3.0,
        )
      }

      ScrollTrigger.create({
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          timeline.progress(self.progress)
        },
      })
    })

    return () => ctx.revert()
  }, [refs])
}
