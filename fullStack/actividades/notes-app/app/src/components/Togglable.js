import React, { useState, forwardRef, useImperativeHandle } from 'react'
import proptypes from 'prop-types'

const Togglable = forwardRef(({ children, btnText = 'mostrar' }, ref) => {
  const [visible, setVisible] = useState(false)

  const handleLoginVisible = () => {
    setVisible(true)
  }

  const changeVisibiliti = () => setVisible(!visible)

  useImperativeHandle(ref, () => { return { changeVisibiliti } })

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={handleLoginVisible}>{btnText}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <div style={showWhenVisible}>
          <button onClick={() => setVisible(false)}>cancel</button>
        </div>
      </div>
    </>
  )
})

Togglable.propTypes = {
  btnText: proptypes.string.isRequired
}

export default Togglable
