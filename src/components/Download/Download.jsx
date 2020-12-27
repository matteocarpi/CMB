import React from 'react'
import styled from 'styled-components'
import DownloadIcon from '../../assets/icons/download.svg'

const Container = styled.a``

export default function Download({ url }) {
  return (
    <Container href={url} target="_blank">
      <DownloadIcon />
    </Container>
  )
}
