import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  children: ReactNode
}

function Modal({ children }: ModalProps) {
  return createPortal(
    <div
      className="w-[90%] lg:w-1/3 fixed top-1/2 left-1/2 transform opacity-3 -translate-x-1/2 -translate-y-1/2 z-50 bg-white mx-auto my-5"
      style={{ boxShadow: '0 0 60px rgba(0, 0, 0, 5)', borderRadius: '20px' }}
    >
      <div className="w-full h-full flex flex-col items-start">{children}</div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  )
}

export default Modal
