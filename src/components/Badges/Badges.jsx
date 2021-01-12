import React, { useRef, useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import Counter from '../Counter'

import useViewportScroll from '../../hooks/useViewportScroll'
import useViewportHeight from '../../hooks/useViewportHeight'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
`

export default function Badges({ badges }) {
  const ref = useRef()

  const [elementStart, setElementStart] = useState()

  const viewportHeight = useViewportHeight()
  const scrollY = useViewportScroll()

  useLayoutEffect(() => {
    const rect = ref?.current?.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    const offsetStart = rect.top + scrollTop

    setElementStart(offsetStart)
  }, [])

  const inView = elementStart - viewportHeight <= scrollY

  return (
    <Container ref={ref}>
      {badges.map(badge => (
        <Counter
          visible={inView}
          key={badge.title}
          number={badge.number}
          title={badge.title}
        />
      ))}
    </Container>
  )
}
