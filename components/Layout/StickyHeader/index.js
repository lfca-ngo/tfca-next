require('./styles.less')

import { Button, Collapse, Drawer, Typography } from 'antd'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { scroller } from 'react-scroll'

import { useChallenge } from '../../../hooks/useChallenge'
import useIsClient from '../../../hooks/useIsClient'
import { useLists } from '../../../hooks/useTranslation'
import { textReveal } from '../../../utils/animations'
import { Text } from '../../../utils/Text'
import SimpleFooter from '../SimpleFooter'
import Progress from './Progress'

const { Panel } = Collapse

const StickyHeader = () => {
  // const { trackEvent } = useAnalytics()
  const { isMobile } = useIsClient()
  const faqContent = useLists('faq.general')?.items || []
  console.log(faqContent)

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
    // trackEvent('start_challenge')
  }

  const toggleMenu = () => {
    setOpen(!open)
    // trackEvent('toggle_faq', { open: !open })
  }

  const WORDING = customization
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

  // if (!isClient) return null
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
              {WORDING.invited}
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
        <motion.div className="content" style={dynamicStyles.opacity}>
          <Typography.Title className="text-appear-wrapper">
            <motion.span
              animate="visible"
              initial="hidden"
              variants={textReveal}
            >
              {WORDING.title}
            </motion.span>
          </Typography.Title>
          <p className="text-appear-wrapper">
            <motion.span
              animate="visible"
              initial="hidden"
              variants={textReveal}
            >
              Du wurdest eingeladen mit ein paar Klicks etwas fürs Klima zu tun!
              Los geht’s{isMobile ? ` 👇` : ` 👉`}
            </motion.span>
          </p>

          <motion.div
            animate="visible"
            className="start-btn"
            initial="hidden"
            variants={textReveal}
          >
            <Button
              block
              className="ant-btn-xl"
              onClick={handleClick}
              size="large"
              type="primary"
            >
              {`Los geht's`}
            </Button>
          </motion.div>
        </motion.div>

        <SimpleFooter />
      </div>
      <Drawer onClose={toggleMenu} placement="left" title="FAQs" visible={open}>
        <Collapse accordion>
          {faqContent.map((faq, index) => (
            <Panel header={faq.question} key={index}>
              <Text block={faq.answer} />
            </Panel>
          ))}
        </Collapse>
      </Drawer>
    </div>
  )
}

export default StickyHeader
