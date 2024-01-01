import classNames from 'classnames'
import { capitalizeString } from '../utils/common'

export type BadgeTypes = 'inactive' | 'processing' | 'success' | 'failed'

interface IEmptyData {
  status?: BadgeTypes
  title?: string
  bgColor?: string
  textColor?: string
  icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
}

const textMap: { [key in BadgeTypes]: string } = {
  inactive: 'text-[#27A713]',
  processing: 'text-[#FF9900]',
  success: 'text-[#27A713]',
  failed: 'text-[#FF0000]',
}

const bgMap: { [key in BadgeTypes]: string } = {
  inactive: 'bg-gray-300',
  processing: 'bg-orange-100',
  success: 'bg-green-100',
  failed: 'bg-red-100',
}

const Badge = ({ title, status: Status, icon: Icon }: IEmptyData) => {
  const status = Status?.toLowerCase() as BadgeTypes
  return (
    <span
      className={classNames(
        'flex items-center justify-center rounded-full px-2.5 py-0.5 text-xxs font-medium max-w-[75px]',
        textMap[status],
        bgMap[status]
      )}
    >
      {Icon && <Icon className={classNames('mr-1 h-3/5 w-3/5')} />}
      {`${capitalizeString(title as string)}`}
    </span>
  )
}

export default Badge
