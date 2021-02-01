import React from 'react'
import styled, { css } from 'styled-components'
import DownloadIcon from '../../assets/icons/download.svg'

const Container = styled.a``

const StyledDownloadIcon = styled(DownloadIcon)`
  ${({ tiny }) =>
    tiny &&
    css`
      max-width: 20px;
    `}
`

export default function Download({ url, tiny, className }) {
  return (
    <Container className={className} tiny={tiny} href={url} target="_blank">
      <StyledDownloadIcon style={tiny && { width: '20px' }} />
    </Container>
  )
}
