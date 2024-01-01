import React from 'react'
import { isEqual } from 'lodash'
import { Checkbox } from '../utils/customCheckbox'

const SelectionType = React.memo(({ selectedRows, handleRowSelection, index, item }: any) => (
  <Checkbox
    checked={selectedRows.some((row: any) => isEqual(row, item))}
    onChange={() => handleRowSelection(item)}
    key={index}
  />
))

export default SelectionType
