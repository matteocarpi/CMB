/* eslint-disable import/prefer-default-export */
const entranceSpeed = 0.8
const exitSpeed = entranceSpeed

const shortLineScale = 7
const mediumLineScale = 3
const longLineScale = 2.3

export const shortLineVariants = {
  start: {
    originY: 'top',
    translateY: '370vh',
    scaleY: shortLineScale,
  },
  enter: {
    scaleY: [shortLineScale, shortLineScale, 1],
    translateY: ['370vh', '0vh', '0vh'],
    transition: {
      duration: entranceSpeed,
      ease: 'easeInOut',
    },
  },
  exit: {
    originY: 'bottom',
    scaleY: [1, shortLineScale, shortLineScale],
    translateY: ['0%', '0%', '-370vh'],
    transition: {
      duration: exitSpeed,
      ease: 'easeInOut',
    },
    transitionEnd: {
      originY: 'top',
      translateY: '370vh',
      scaleY: shortLineScale,
    },
  },
}

export const mediumLineVariants = {
  start: {
    originY: 'top',
    translateY: '170vh',
    scaleY: mediumLineScale,
  },
  enter: {
    scaleY: [mediumLineScale, mediumLineScale, 1],
    translateY: ['170vh', '0vh', '0vh'],
    transition: {
      duration: entranceSpeed,
      ease: 'easeInOut',
    },
  },
  exit: {
    originY: 'bottom',
    scaleY: [1, mediumLineScale, mediumLineScale],
    translateY: ['0%', '0%', '-170vh'],
    transition: {
      duration: exitSpeed,
      ease: 'easeInOut',
    },
    transitionEnd: {
      originY: 'top',
      translateY: '170vh',
      scaleY: mediumLineScale,
    },
  },
}

export const longLineVariants = {
  start: {
    originY: 'top',
    translateY: '120vh',
    scaleY: longLineScale,
  },
  enter: {
    scaleY: [longLineScale, longLineScale, 1],
    translateY: ['120vh', '0vh', '0vh'],
    transition: {
      duration: entranceSpeed,
      ease: 'easeInOut',
    },
  },
  exit: {
    originY: 'bottom',
    scaleY: [1, longLineScale, longLineScale],
    translateY: ['0%', '0%', '-120vh'],
    transition: {
      duration: exitSpeed,
      ease: 'easeInOut',
    },
    transitionEnd: {
      originY: 'top',
      translateY: '120vh',
      scaleY: longLineScale,
    },
  },
}
