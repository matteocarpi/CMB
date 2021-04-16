import React from 'react'
import { Link } from 'gatsby'
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

export default function Download({ link, url, tiny, className }) {
  return (
    <>
      {link ? (
        <Link to={url}>
          <StyledDownloadIcon style={tiny && { width: '20px' }} />
        </Link>
      ) : (
        <Container className={className} tiny={tiny} href={url} target="_blank">
          <StyledDownloadIcon style={tiny && { width: '20px' }} />
        </Container>
      )}
    </>
  )
}
