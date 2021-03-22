import React from 'react'
import styled from 'styled-components'
import { font, colour } from '../css'

const Wrapper = styled.div`
  display: inline-block;
  font-family: ${font.Description};
  font-weight: 400;
  background: ${colour.Main};
  padding: 5px 8px;
  padding-left: 32px;
  border-radius: 5px;
  color: ${colour.White};
  font-size: 16px;
  background: url(/assets/bookmarkon-icon@2x.svg) no-repeat #09357b;
  background-position: 12px;
  cursor: pointer;
  user-select: none;
`

interface ButtonType {
  title: string
  onClick?: () => void
}

const Button = ({ title, onClick }: ButtonType) => {
  return (
    <Wrapper onClick={onClick}>
      {title}
    </Wrapper>
  )
}

export default Button