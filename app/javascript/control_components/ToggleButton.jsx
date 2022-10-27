import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

export default class ToggleButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, isOn, handleClick } = this.props

    const classes = classnames({
      ToggleButton: true,
      active: isOn
    })

    return (
      <div className={classes} onClick={handleClick}>
        {text}
      </div>
    )
  }
}

ToggleButton.propTypes = {
  // text: PropTypes.string.isRequired,
  isOn: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
}
