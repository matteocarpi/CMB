import React, { useRef, useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { useViewportScroll, useTransform } from 'framer-motion'

import { Short, Medium, Long } from './Lines'

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 150px;
  height: 350px;
`

export default function SlidingLogoMobile(props) {
  const ref = useRef()

  const [scrollPercentageStart, setScrollPercentageStart] = useState()

  const { scrollYProgress } = useViewportScroll()

  useLayoutEffect(() => {
    // Get the distance from the start of the page to the element start
    const rect = ref?.current?.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    const offsetStart = rect.top + scrollTop

    const elementScrollStart = offsetStart / document.body.clientHeight

    setScrollPercentageStart(elementScrollStart)
  }, [])

  const startFade = scrollPercentageStart / 2
  const startLong = scrollPercentageStart / 2
  const startMedium = scrollPercentageStart / 2
  const startShort = scrollPercentageStart / 2

  const finishLong = scrollPercentageStart / 1.3
  const finishMedium = scrollPercentageStart / 1.2
  const finishShort = scrollPercentageStart / 1.1

  const translateLong = useTransform(
    scrollYProgress,
    [startLong, finishLong],
    [-600, 0],
  )

  const translateMedium = useTransform(
    scrollYProgress,
    [startMedium, finishMedium],
    [-600, 0],
  )

  const translateShort = useTransform(
    scrollYProgress,
    [startShort, finishShort],
    [-600, 0],
  )

  const fadeMedium = useTransform(
    scrollYProgress,
    [startFade, finishMedium],
    [0, 1],
  )

  const fadeShort = useTransform(
    scrollYProgress,
    [startFade, finishShort],
    [0, 1],
  )

  return (
    <Container ref={ref} {...props}>
      <Short
        style={{ overflow: 'visible', x: translateShort, opacity: fadeShort }}
      />
      <Medium
        style={{ overflow: 'visible', x: translateMedium, opacity: fadeMedium }}
      />
      <Long
        style={{ overflow: 'visible', x: translateLong, opacity: fadeMedium }}
      />
    </Container>
  )
}
