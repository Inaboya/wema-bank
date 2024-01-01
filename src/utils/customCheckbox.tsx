import classNames from 'classnames'
import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode, Ref, forwardRef } from 'react'

export type InputSize = 'medium' | 'large'
export type InputType = 'text' | 'email' | 'tel' | 'password'

export type InputProps = {
  id?: string
  name?: string
  label?: string
  className?: string
  group?: ReactNode
  ref?: Ref<HTMLInputElement>
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Checkbox: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, label, className = '', ...props }, ref) => (
    <div
      className={classNames('relative flex flex-col justify-center', {
        [className as string]: className,
      })}
    >
      <div className="flex items-center">
        <input
          id={id}
          ref={ref}
          name={name}
          aria-label={label}
          type="checkbox"
          className={classNames(
            'relative mr-2 inline-flex h-4 w-4 cursor-pointer rounded  border border-gray-300 text-indigo-500 checked:border-gray-800  checked:bg-gray-100 checked:text-gray-200 focus:ring-gray-800 focus:ring-opacity-25'
          )}
          {...props}
        />
        {label && (
          <label htmlFor={name} className="leading-1 cursor-pointer text-sm text-gray-600">
            {label}
          </label>
        )}
      </div>
    </div>
  )
)
