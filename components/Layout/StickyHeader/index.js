require('./styles.less')

import { Drawer } from 'antd'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import React, { useEffect, useState } from 'react'

// import { scroller } from 'react-scroll'
import { useChallenge } from '../../../hooks/useChallenge'
import { useIsMobile } from '../../../hooks/useIsClient'
import { useBlocks } from '../../../hooks/useTranslation'
import { NAVBAR_HEIGHT_XS } from '../../../utils'
import { text } from '../../../utils/Text'
import { Hero } from '../../Elements/Hero'
import { QuestionAnswer } from '../../Elements/QuestionAnswer'
import SimpleFooter from '../SimpleFooter'
import Progress from './Progress'

const SCROLL_RANGE = [0, 200]
const LOGO_SIZE_RANGE = [65, 40]
const COLOR_RANGE = [`rgba(255, 255, 255, 0.5)`, `rgba(255, 255, 255, 1)`]
const TEXT_UP_RANGE = [30, 0]
const OPACITY_RANGE = [1, 0]
const TEXT_Y = 200

const StickyHeader = () => {
  const isMobile = useIsMobile()

  const [open, setOpen] = useState(false)
  const { customization, progress, setProgress } = useChallenge()

  // Framer animations for the header
  const { scrollY } = useViewportScroll()
  const logoSize = useTransform(scrollY, SCROLL_RANGE, LOGO_SIZE_RANGE)
  const opacity = useTransform(scrollY, SCROLL_RANGE, OPACITY_RANGE)
  const color = useTransform(scrollY, SCROLL_RANGE, COLOR_RANGE)
  const textUp = useTransform(scrollY, SCROLL_RANGE, TEXT_UP_RANGE)

  const dynamicStyles = isMobile
    ? {
        logo: { width: logoSize },
        opacity: { opacity: opacity },
        textUp: { y: textUp },
      }
    : {
        textUp: { y: TEXT_Y }, // on desktop text is never visible
      }

  // show progress as soon as the user stars scrolling
  useEffect(
    () =>
      scrollY.onChange((latest) => {
        if (progress === 0 && latest > SCROLL_RANGE[1]) setProgress(0.25)
        else if (progress === 0.25 && latest <= SCROLL_RANGE[1]) setProgress(0)
      }),
    [scrollY, progress, setProgress]
  )

  const handleClick = () => {
    // scroller.scrollTo('switch_energy', {
    //   offset: NAVBAR_HEIGHT_XS,
    //   smooth: true,
    // })
  }

  const toggleMenu = () => {
    setOpen(!open)
  }

  const inviteText = useBlocks('header.invited')
  const inviteTextCustom = useBlocks('header.invited.custom')
  const invite = customization
    ? text(inviteTextCustom, { name: customization.from })
    : text(inviteText)

  return (
    <header className="header">
      <motion.div className="header-inner" style={{ background: color }}>
        <div className="header-inner-content">
          <div
            className="header-logo"
            onClick={() => setProgress(progress + 1)}
          >
            <motion.img src="/images/logo.svg" style={dynamicStyles.logo} />
          </div>
          <div className="challenge-bar">
            <div className="challenge-name text-appear-wrapper">
              <motion.span style={dynamicStyles.textUp}>
                Energy Challenge
              </motion.span>
            </div>
            <div className="challenge-invitee text-appear-wrapper">
              <motion.span style={dynamicStyles.textUp}>{invite}</motion.span>
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
        </div>
      </motion.div>

      <div className={`header-outer`}>
        <div className="placeholder" />
        <Hero dynamicStyles={dynamicStyles} onClick={handleClick} />
        <SimpleFooter />
      </div>
      <Drawer onClose={toggleMenu} placement="left" title="FAQs" visible={open}>
        <QuestionAnswer />
      </Drawer>
    </header>
  )
}

export default StickyHeader
