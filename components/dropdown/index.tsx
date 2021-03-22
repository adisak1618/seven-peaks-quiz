import React from 'react'
import styled from 'styled-components'
import { Field, Formik } from 'formik';
import { font } from '../css'

const Wrapper = styled.div`
  select {
    width: 200px;
    border: none;
    border-bottom: 1px solid #000;
    font-family: ${font.Description};
    font-weight: 400;
    font-size: 18px;
    max-width: 100%;
    margin: 0 10px;
    outline:0px;
    outline-color: none;
    background: transparent;
    &:focus {
      border-color: #2a6dc9 !important;
    }
  }
`

type optionType = [string, string]
interface SelectPropsType {
  data: optionType[],
  onSelect?: (value: string) => void
  defaultValue?: string
}

const DropdownSelect = ({ data, defaultValue, onSelect }: SelectPropsType) => {
  return (
    <Wrapper>
      <Formik
        enableReinitialize={true}
        initialValues={{ value: defaultValue }}
        onSubmit={() => { }}
      >
        <Field as="select" name="value" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSelect && onSelect(e.target.value)}>
          {
            data.map(item => (
              <option key={item[0]} value={item[0]}>{item[1]}</option>
            ))
          }
        </Field>
      </Formik>
    </Wrapper>
  )
}

export default DropdownSelect