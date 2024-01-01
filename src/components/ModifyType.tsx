import React, { useCallback } from 'react'
import { Backward5Seconds, Trash } from 'iconsax-react'

import Button from './Button'

interface Imodify {
  handleActionClick: (action: string, item: any) => void
  index: number
  item: any
  column: any
  isLoading: boolean
}

const ModifyType = React.memo(({ handleActionClick, item, column, isLoading }: Imodify) => {
  const memoizedHandleActionClick = useCallback(
    (action: string, items: any) => handleActionClick && handleActionClick(action, items),
    [handleActionClick]
  )
  const show = column?.show || ['edit', 'delete', 'view', 'reset-btn', 'delete-btn']
  const status = item?.status === 'active'

  return (
    <div className="flex w-fit items-center justify-end gap-4">
      {show.includes('toggle') && (
        <Button
          className="flex h-10 items-center justify-center  text-xs md:text-sm"
          btnType={status ? 'outline-red' : 'outline'}
          animate={false}
          disabled={isLoading}
          onClick={() => memoizedHandleActionClick(status ? 'deactivate' : 'activate', item)}
        >
          {status ? 'Deactivate' : 'Activate'}
        </Button>
      )}

      {show.includes('reset-btn') && (
        <Button
          className="flex h-9 items-center justify-center gap-2 text-xs md:text-xs text-[#453DA7]"
          btnType={status ? 'outline-red' : 'outline'}
          animate={false}
          onClick={() => memoizedHandleActionClick('reset-btn', item)}
          style={{ color: '#453DA7' }}
        >
          <Backward5Seconds size="16" className="text-[#453DA7]" />
          Reset Password
        </Button>
      )}
      {show.includes('delete-btn') && (
        <Button
          className="flex h-9 items-center justify-center gap-2 text-xs md:text-xs text-[#B90F17]"
          btnType={status ? 'outline-red' : 'outline'}
          animate={false}
          onClick={() => memoizedHandleActionClick('reset-btn', item)}
          style={{ color: '#B90F17' }}
        >
          <Trash size="14" className="text-[#B90F17]" />
          Delete
        </Button>
      )}
    </div>
  )
})
export default ModifyType
