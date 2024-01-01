import React from 'react'

import Badge from './Badge.tsx'
import { getStatus } from '../utils/common.ts'

const BadgeType = React.memo(({ value }: any) => {
  if (!value) return <div />

  return <Badge status={getStatus(value)} title={value} />
})
export default BadgeType
