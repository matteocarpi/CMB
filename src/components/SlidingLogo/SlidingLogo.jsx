import React, { useRef, useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { useViewportScroll, useTransform } from 'framer-motion'
import { Short, Medium, Long } from './Lines'

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 150px;
  height: 250px;
`

export default function SlidingLogo(props) {
  const ref = useRef()

  const [scrollPercentageStart, setScrollPercentageStart] = useState()
  const [scrollPercentageEnd, setScrollPercentageEnd] = useState()

  const { scrollYProgress } = useViewportScroll()

  useLayoutEffect(() => {
    // Get the distance from the start of the page to the element start
    const rect = ref?.current?.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const offsetTop = rect.top + scrollTop

    const offsetStart = rect.top + scrollTop
    const offsetEnd = offsetTop + rect.height

    const elementScrollStart = offsetStart / document.body.clientHeight
    const elementScrollEnd = offsetEnd / document.body.clientHeight

    setScrollPercentageStart(elementScrollStart)
    setScrollPercentageEnd(elementScrollEnd)
  }, [])

  const translateMedium = useTransform(
    scrollYProgress,
    [scrollPercentageStart - 1, scrollPercentageEnd - 0.05],
    [-400, 0],
  )

  const translateShort = useTransform(
    scrollYProgress,
    [scrollPercentageStart - 0.5, scrollPercentageEnd - 0.05],
    [-600, 0],
  )

  const fadeMedium = useTransform(
    scrollYProgress,
    [scrollPercentageStart - 0.1, scrollPercentageEnd - 0.05],
    [0, 1],
  )

  const fadeShort = useTransform(
    scrollYProgress,
    [scrollPercentageStart - 0.05, scrollPercentageEnd - 0.05],
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
      <Long />
    </Container>
  )
}
