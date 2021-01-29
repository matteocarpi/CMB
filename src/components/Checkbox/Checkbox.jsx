import React, { useState } from 'react'
import styled from 'styled-components'
import CheckedBox from '../../assets/icons/checked-box.svg'
import Box from '../../assets/icons/box.svg'

const CheckboxContainer = styled.label`
  cursor: pointer;
`

const Name = styled.span`
  font-size: 20px;
  white-space: nowrap;
`

const Input = styled.input`
  opacity: 0;
`

export default function Checkbox({ name, list, setList }) {
  const [checked, setChecked] = useState(false)

  const handleCheck = e => {
    setChecked(e.target.checked)

    if (e.target.checked) {
      setList([...list, name])
    } else {
      setList(list.filter(item => item !== name))
    }
  }

  return (
    <CheckboxContainer>
      {checked ? <CheckedBox /> : <Box />}
      <Input type="checkbox" checked={checked} onChange={handleCheck} />
      <Name>{name}</Name>
    </CheckboxContainer>
  )
}
