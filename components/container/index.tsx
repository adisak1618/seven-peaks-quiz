import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin-right: auto;
  margin-left:  auto;
  max-width: 1200px;
  padding-right: 10px;
  padding-left:  10px;
`

type ContainerProps = {
  className?: string
}

const Container: FunctionComponent<ContainerProps> = ({ children, className, ...props }) => (
  <Wrapper className={`${className} container`} {...props}>
    {children}
  </Wrapper>
)
export default Container