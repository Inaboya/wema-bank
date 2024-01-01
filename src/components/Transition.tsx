import React, { useRef, useEffect, useContext, ReactNode } from 'react'
import { CSSTransition as ReactCSSTransition } from 'react-transition-group'

interface TransitionContextType {
  parent: {
    show?: boolean
    isInitialRender: boolean
    appear?: boolean
  }
}

const TransitionContext = React.createContext<TransitionContextType | undefined>(undefined)

function useIsInitialRender() {
  const isInitialRender = useRef(true)
  useEffect(() => {
    isInitialRender.current = false
  }, [])
  return isInitialRender.current
}

interface CSSTransitionProps {
  show: boolean
  enter?: string
  enterStart?: string
  enterEnd?: string
  leave?: string
  leaveStart?: string
  leaveEnd?: string
  appear?: boolean
  unmountOnExit?: boolean
  tag?: keyof JSX.IntrinsicElements
  children: ReactNode
  [key: string]: any // Allow for any other custom props
}

function CSSTransition({
  show,
  enter = '',
  enterStart = '',
  enterEnd = '',
  leave = '',
  leaveStart = '',
  leaveEnd = '',
  appear,
  unmountOnExit,
  tag = 'div',
  children,
  ...rest
}: CSSTransitionProps) {
  const enterClasses = enter.split(' ').filter((s) => s.length)
  const enterStartClasses = enterStart.split(' ').filter((s) => s.length)
  const enterEndClasses = enterEnd.split(' ').filter((s) => s.length)
  const leaveClasses = leave.split(' ').filter((s) => s.length)
  const leaveStartClasses = leaveStart.split(' ').filter((s) => s.length)
  const leaveEndClasses = leaveEnd.split(' ').filter((s) => s.length)
  const removeFromDom = unmountOnExit

  function addClasses(node: HTMLElement | null, classes: string[]) {
    if (node && classes.length) node.classList.add(...classes)
  }

  function removeClasses(node: HTMLElement | null, classes: string[]) {
    if (node && classes.length) node.classList.remove(...classes)
  }

  const nodeRef = useRef<HTMLElement | null>(null)
  const Component = tag as keyof JSX.IntrinsicElements

  return (
    <ReactCSSTransition
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit={removeFromDom}
      in={show}
      addEndListener={(done) => {
        if (nodeRef.current) {
          nodeRef.current.addEventListener('transitionend', done, false)
        }
      }}
      onEnter={() => {
        if (!removeFromDom && nodeRef.current) {
          // @ts-ignore
          nodeRef.current.style.display = null
        }
        addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses])
      }}
      onEntering={() => {
        removeClasses(nodeRef.current, enterStartClasses)
        addClasses(nodeRef.current, enterEndClasses)
      }}
      onEntered={() => {
        removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses])
      }}
      onExit={() => {
        addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses])
      }}
      onExiting={() => {
        removeClasses(nodeRef.current, leaveStartClasses)
        addClasses(nodeRef.current, leaveEndClasses)
      }}
      onExited={() => {
        removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses])
        if (!removeFromDom && nodeRef.current) {
          nodeRef.current.style.display = 'none'
        }
      }}
    >
      <Component ref={nodeRef} {...rest} style={{ display: !removeFromDom ? 'none' : 'initial' }}>
        {children}
      </Component>
    </ReactCSSTransition>
  )
}

interface TransitionProps extends CSSTransitionProps {
  show: boolean
  appear?: boolean
  [key: string]: any // Allow for any other custom props
}

function Transition({ show, appear, ...rest }: TransitionProps) {
  const { parent } = useContext(TransitionContext) || {}
  const isInitialRender = useIsInitialRender()
  const isChild = show === undefined

  if (isChild && parent) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show || false}
        {...rest}
      />
    )
  }

  const contextValue = React.useMemo(
    () => ({
      parent: {
        show,
        isInitialRender,
        appear,
      },
    }),
    [show]
  )

  return (
    <TransitionContext.Provider value={contextValue}>
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  )
}

export default Transition
