import styled from 'styled-components'
import { font } from '../css'

interface TitleType {
  padding?: string
}

const Title = styled.span<TitleType>`
  font-family: ${font.Title};
  font-weight: 900;
  margin: 0px;
  line-height: 1.2;
  font-size: 48px;
  ${p => p.padding === undefined ? '' : `padding: ${p.padding};`}
`

export const H1 = styled(Title)`
  font-size: 48px;
`

export const H2 = styled(Title)`
  font-size: 36px;
`

export const H3 = styled(Title)`
  font-size: 32px;
`

export const H4 = styled(Title)`
  font-size: 26px;
`

export const P = styled.p`
  font-family: ${font.Description};
`

export const Article = styled.article`
  font-family: ${font.Description};
  a {
    color: #000 !important;
  }
  img {
    width: auto;
    height: auto;
    max-width: 100%;
  }
  // iframe {
  //   width: 100%;
  // }
`