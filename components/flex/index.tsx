import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
type justifyValue = 'space-between' | 'center' | 'flex-end' | 'space-around' | 'space-evenly' | 'flex-start'
type alignItemsValue = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
export interface RowProps {
  justify?: justifyValue
  alignItem?: alignItemsValue
  nowrap?: boolean
}

export interface ColumnProps {
  fill?: any
  alignSelf?: string
  flexGrow?: string
  basis?: string
  fullWidth?: boolean
  padding?: string
  col?: number
  colLg?: number
  colMd?: number
  colSm?: number
  colXs?: number
}

export const Row = styled.div<RowProps>`
  display: flex;
  justify-content: ${p => p.justify === undefined ? 'flex-start' : p.justify};
  align-items: ${p => p.alignItem === undefined ? 'stretch' : p.alignItem};
  flex-wrap: ${p => p.hasOwnProperty('nowrap') ? 'nowrap' : 'wrap'};
`

export const Column = styled.div<ColumnProps>`
  max-width: 100%;
  box-sizing: border-box;
  ${p => p.col !== undefined ? `max-width: ${Math.round((p.col / 12) * 100000000) / 1000000}%;` : ''}
  ${p => p.padding === undefined ? 'padding: 0px;' : `padding: ${p.padding};`}
  ${p => p.hasOwnProperty('alignSelf') ? `align-self: ${p.alignSelf};` : ''}
  ${p => p.hasOwnProperty('fill') ? 'flex: 1 !important; min-width: 0;' : ''}
  ${p => p.hasOwnProperty('flexGrow') ? `flex-grow: ${p.flexGrow};` : ''}
  ${p => p.hasOwnProperty('basis') ? `flex-basis: ${p.basis};` : ''};
  ${p => p.hasOwnProperty('fullWidth') ? 'flex: 1 100%;' : ''}

  @media (min-width: 0px) {
    ${p => p.colXs !== undefined ? `flex: 0 0 ${Math.round((p.colXs / 12) * 100000000) / 1000000}%;` : ''}
    ${p => p.colXs !== undefined ? `max-width: ${Math.round((p.colXs / 12) * 100000000) / 1000000}%;` : ''}
  }
  
  @media (min-width: 576px) {
    ${p => p.colSm !== undefined ? `flex: 0 0 ${Math.round((p.colSm / 12) * 100000000) / 1000000}%;` : ''}
    ${p => p.colSm !== undefined ? `max-width: ${Math.round((p.colSm / 12) * 100000000) / 1000000}%;` : ''}
  }

  @media (min-width: 768px) {
    ${p => p.colMd !== undefined ? `flex: 0 0 ${Math.round((p.colMd / 12) * 100000000) / 1000000}%;` : ''}
    ${p => p.colMd !== undefined ? `max-width: ${Math.round((p.colMd / 12) * 100000000) / 1000000}%;` : ''}
  }

  @media (min-width: 992px) {
    ${p => p.colLg !== undefined ? `flex: 0 0 ${Math.round((p.colLg / 12) * 100000000) / 1000000}%;` : ''}
    ${p => p.colLg !== undefined ? `max-width: ${Math.round((p.colLg / 12) * 100000000) / 1000000}%;` : ''}
  }

  @media (min-width: 1200px) {
    ${p => p.col !== undefined ? `flex: 0 0 ${Math.round((p.col / 12) * 100000000) / 1000000}%;` : ''}
    ${p => p.col !== undefined ? `max-width: ${Math.round((p.col / 12) * 100000000) / 1000000}%;` : ''}
  }
`