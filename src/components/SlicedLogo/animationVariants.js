/* eslint-disable import/prefer-default-export */
const entranceSpeed = 0.8
const exitSpeed = entranceSpeed

const shortLineScale = 6

export const shortLineVariants = {
  start: {
    originY: 'top',
    translateY: '320vh',
    scaleY: shortLineScale,
  },
  enter: {
    scaleY: [shortLineScale, shortLineScale, 1],
    translateY: ['320vh', '0vh', '0vh'],
    transition: {
      duration: entranceSpeed,
      ease: 'easeInOut',
    },
  },
  exit: {
    originY: 'bottom',
    scaleY: [1, shortLineScale, shortLineScale],
    translateY: ['0%', '0%', '-320vh'],
    transition: {
      duration: exitSpeed,
      ease: 'easeInOut',
    },
    transitionEnd: {
      originY: 'top',
      translateY: '320vh',
      scaleY: shortLineScale,
    },
  },
}

const mediumLineScale = 2.3

export const mediumLineVariants = {
  start: {
    originY: 'top',
    translateY: '140vh',
    scaleY: mediumLineScale,
  },
  enter: {
    scaleY: [mediumLineScale, mediumLineScale, 1],
    translateY: ['140vh', '0vh', '0vh'],
    transition: {
      duration: entranceSpeed,
      ease: 'easeInOut',
    },
  },
  exit: {
    originY: 'bottom',
    scaleY: [1, mediumLineScale, mediumLineScale],
    translateY: ['0%', '0%', '-140vh'],
    transition: {
      duration: exitSpeed,
      ease: 'easeInOut',
    },
    transitionEnd: {
      originY: 'top',
      translateY: '140vh',
      scaleY: mediumLineScale,
    },
  },
}

const longLineScale = 1.8

export const longLineVariants = {
  start: {
    originY: 'top',
    translateY: '100vh',
    scaleY: longLineScale,
  },
  enter: {
    scaleY: [longLineScale, longLineScale, 1],
    translateY: ['100vh', '0vh', '0vh'],
    transition: {
      duration: entranceSpeed,
      ease: 'easeInOut',
    },
  },
  exit: {
    originY: 'bottom',
    scaleY: [1, longLineScale, longLineScale],
    translateY: ['0%', '0%', '-100vh'],
    transition: {
      duration: exitSpeed,
      ease: 'easeInOut',
    },
    transitionEnd: {
      originY: 'top',
      translateY: '100vh',
      scaleY: longLineScale,
    },
  },
}
