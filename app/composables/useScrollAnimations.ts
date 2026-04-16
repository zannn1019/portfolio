import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollAnimations() {
  onMounted(async () => {
    gsap.registerPlugin(ScrollTrigger)

    // Wait for full DOM paint — Nuxt async components need extra time
    await nextTick()
    setTimeout(() => {
      setupHeroExit()
      setupWorkCards()
      setupAboutWords()
      setupSkillBars()
      setupSideNav()
    }, 200)
  })

  function setupHeroExit() {
    // Hero title skews & scales away as we scroll into the next section
    gsap.to('.hero__title', {
      skewX: -10,
      scale: 0.72,
      opacity: 0,
      y: -60,
      transformOrigin: 'left center',
      ease: 'none',
      scrollTrigger: {
        trigger: '#work',
        start: 'top 85%',
        end: 'top 10%',
        scrub: 1.8,
      },
    })

    // Eyebrow label fades faster
    gsap.to('.hero__eyebrow, .hero__footer', {
      opacity: 0,
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#work',
        start: 'top 92%',
        end: 'top 60%',
        scrub: 1,
      },
    })
  }

  function setupWorkCards() {
    // Each project card: clip-path reveal from left + slight y movement
    gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
      const isEven = i % 2 === 0

      gsap.fromTo(
        card,
        {
          clipPath: isEven ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
          opacity: 0,
        },
        {
          clipPath: 'inset(0 0% 0 0%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        },
      )

      // Image parallax inside card
      const img = card.querySelector<HTMLElement>('.project-card__image')
      if (img) {
        gsap.fromTo(
          img,
          { y: '6%' },
          {
            y: '-6%',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }
    })
  }

  function setupAboutWords() {
    // Word-by-word opacity reveal on the manifesto statement
    const words = document.querySelectorAll<HTMLElement>('.about__statement .word')
    if (!words.length) return

    gsap.fromTo(
      words,
      { opacity: 0.08 },
      {
        opacity: 1,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about__statement',
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: 1.2,
        },
      },
    )
  }

  function setupSkillBars() {
    gsap.utils.toArray<HTMLElement>('.skill-item__bar-fill').forEach((bar) => {
      const target = bar.dataset.level ? parseFloat(bar.dataset.level) / 100 : 0.75
      gsap.to(bar, {
        scaleX: target,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 85%',
          toggleActions: 'play none none reset',
        },
      })
    })
  }

  function setupSideNav() {
    // Side nav highlights according to active section
    const sections = ['#hero', '#work', '#about', '#contact']
    const navItems = document.querySelectorAll<HTMLElement>('.side-nav__item')

    sections.forEach((id, i) => {
      const el = document.querySelector<HTMLElement>(id)
      if (!el || !navItems[i]) return

      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 60%',
        onEnter: () => setActiveNav(i),
        onEnterBack: () => setActiveNav(i),
      })
    })

    function setActiveNav(index: number) {
      navItems.forEach((item, i) => {
        item.classList.toggle('is-active', i === index)
      })
    }
  }
}
