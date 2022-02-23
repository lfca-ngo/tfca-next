require('./styles.less')

import { Drawer } from 'antd'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { scroller } from 'react-scroll'

import { useChallenge } from '../../../hooks/useChallenge'
import useIsClient from '../../../hooks/useIsClient'
import { Hero } from '../../Elements/Hero'
import { QuestionAnswer } from '../../Elements/QuestionAnswer'
import SimpleFooter from '../SimpleFooter'
import Progress from './Progress'

const StickyHeader = () => {
  const { isMobile } = useIsClient()

  const [open, setOpen] = useState(false)
  const { customization, progress, setProgress } = useChallenge()

  const { scrollY } = useViewportScroll()
  const logoSize = useTransform(scrollY, [0, 200], [65, 40])
  const opacity = useTransform(scrollY, [0, 200], [1, 0])
  const color = useTransform(
    scrollY,
    [0, 200],
    [`rgba(255, 255, 255, 0.5)`, `rgba(255, 255, 255, 1)`]
  )
  const textUp = useTransform(scrollY, [0, 200], [30, 0])

  useEffect(
    () =>
      scrollY.onChange((latest) => {
        if (progress === 0 && latest > 200) setProgress(0.25)
        else if (progress === 0.25 && latest <= 200) setProgress(0)
      }),
    [scrollY, progress, setProgress]
  )

  const handleClick = () => {
    scroller.scrollTo('switch_energy', { offset: -75, smooth: true })
  }

  const toggleMenu = () => {
    setOpen(!open)
  }

  const textBlocks = customization
    ? {
        invited: `eingeladen von ${customization.from}`,
        title: `Hi ${customization.to}, bereit für deine Challenge?`,
      }
    : {
        invited: `eingeladen`,
        title: `Tu was fürs Klima in 5 Minuten`,
      }

  const dynamicStyles = isMobile
    ? {
        logo: { width: logoSize },
        opacity: { opacity: opacity },
        textUp: { y: textUp },
      }
    : {
        logo: { width: '120px' },
        textUp: { y: 200 },
      }

  return (
    <div>
      <motion.div className="header-inner" style={{ background: color }}>
        <div className="header-logo" onClick={() => setProgress(progress + 1)}>
          <motion.img src="/images/logo.svg" style={dynamicStyles.logo} />
        </div>
        <div className="challenge-bar">
          <div className="challenge-name text-appear-wrapper">
            <motion.span style={dynamicStyles.textUp}>
              Energy Challenge
            </motion.span>
          </div>
          <div className="challenge-invitee text-appear-wrapper">
            <motion.span style={dynamicStyles.textUp}>
              {textBlocks.invited}
            </motion.span>
          </div>
        </div>

        <Progress step={progress} total={1} />

        <nav className="header-navigation">
          <button
            className={`hamburger hamburger--spin ${open && 'is-active'}`}
            onClick={toggleMenu}
            type="button"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </nav>
      </motion.div>

      <div className={`header-outer`}>
        <div className="placeholder" />
        <Hero
          dynamicStyles={dynamicStyles}
          onClick={handleClick}
          textBlocks={textBlocks}
        />
        <SimpleFooter />
      </div>
      <Drawer onClose={toggleMenu} placement="left" title="FAQs" visible={open}>
        <QuestionAnswer />
      </Drawer>
    </div>
  )
}

export default StickyHeader
