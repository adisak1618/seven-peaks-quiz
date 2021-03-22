import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import Header from '../head/index'

const Wrapper = styled.div`
  #loadingSVG {
    background: #FFF;
    width: 100%;
    height: 100%;
    top: 0px;
    display: flex;
    justify-content: center;
    position: absolute;
    img {
      position: fixed;
      width: 200px;
      top: 30%;
    }
  }
  #main {
    position: relative;
  }
`

const MainLayout: FunctionComponent = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <div id="main">
        {children}
      </div>
    </Wrapper>
  )
}

export default MainLayout;