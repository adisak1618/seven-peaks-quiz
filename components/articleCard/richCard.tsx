import React from 'react'
import styled from 'styled-components'
import { Column, Row, RowProps } from '../flex'
import { font, colour } from '../css'

interface WrapperProps {
  height: string
  bgUrl: string
  color?: labelColorType
}

type labelColorType = 'green' | 'red' | 'lightBlue' | 'yellow'

const labelColorPicker = (color?: labelColorType) => {
  switch (color) {
    case 'green':
      return colour.LabelGreen
    case 'red':
      return colour.LabelRed
    case 'lightBlue':
      return colour.LabelLightBlue
    case 'yellow':
      return colour.LabelYellow
    default:
      return 'green'
  }
}

const Wrapper = styled(Row) <WrapperProps & RowProps>`
  height: ${p => p.height};
  ${p => (p.bgUrl === undefined || p.bgUrl === "") ? `background: url('/assets/Logo-white.png') ${colour.Blue} no-repeat` : `background: url(${p.bgUrl}) no-repeat`};
  background-size: ${p => p.bgUrl === undefined ? '' : 'cover'};
  background-position: ${p => p.bgUrl === undefined ? 'center 80px' : 'center'};
  border-bottom: 3px solid ${p => labelColorPicker(p.color)};
  box-sizing: border-box;
  cursor: pointer;
`

type TitleFontSizeType = '26px' | '24px' | '20px' | '18px' | '16px'
interface HeadlineType {
  titleFontSize?: TitleFontSizeType
  lineClamp?: number
}

const Headline = styled(Column) <HeadlineType>`
  background: ${colour.MainLight};
  padding: 10px;
  width: 100%;
  h3.title {
    margin: 0px;
    font-family: ${font.Title};
    color: ${colour.White};
    font-size: ${p => p.titleFontSize === undefined ? '24px' : p.titleFontSize};
    display: -webkit-box;
    -webkit-line-clamp: ${p => p.lineClamp === undefined ? 3 : p.lineClamp};
    -webkit-box-orient: vertical;  
    overflow: hidden;
    padding-bottom: 3px;
  }
  div.sort-descriotion {
    color: ${colour.White};
    font-family: ${font.Description};
    margin-top: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
`

interface CardDataType {
  thumbnail?: string
  headline?: string,
  descriotion?: string
}

interface RichCardType extends HeadlineType {
  data: CardDataType
  height?: string
  color?: labelColorType
  showDescription?: boolean
  showThumbnail?: boolean
}

const RichCard = ({ data, height = '420px', color, showDescription = true, showThumbnail = true, titleFontSize, lineClamp = 3 }: RichCardType) => {
  return (
    <Wrapper as="article" color={color} alignItem={showThumbnail ? "flex-end" : "stretch"} height={height} bgUrl={(showThumbnail && data.thumbnail) ? data.thumbnail : ""}>
      <Headline titleFontSize={titleFontSize} lineClamp={lineClamp}>
        <h3 className="title">{data.headline}</h3>
        {showDescription && data.descriotion && <div className="sort-descriotion" dangerouslySetInnerHTML={{ __html: data.descriotion }} />}
      </Headline>
    </Wrapper>
  )
}

export default RichCard