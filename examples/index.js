import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { RippleBlock, Ripple } from '../src'
import './index.scss'

class Button extends React.Component {
  $ripple = React.createRef()

  handleMouseDown = e => {
    this.$ripple.current.createRipple(e)
    this.props.onMouseDown && this.props.onMouseDown(e)
  }

  render() {
    const { children, className, ...rest } = this.props

    return (
      <button className={classnames('btn', 'do-ripple-block', className)} onMouseDown={this.handleMouseDown} {...rest}>
        <span className="do-ripple-content">{children}</span>
        <Ripple ref={this.$ripple} rippleColor="rgba(0, 0, 0, 0.2)" />
      </button>
    )
  }
}

const code1 = `<RippleBlock className="btn">
  Click Here
</RippleBlock>
`

const code2 = `<RippleBlock className="btn" rippleColor="#f93">
  Click Here
</RippleBlock>

<RippleBlock 
  className="btn primary-btn" 
  rippleColor="rgba(255, 255, 255, 0.4)"
>
  Click Here
</RippleBlock>
`

const code3 = `class Button extends React.Component {
  $ripple = React.createRef()

  handleMouseDown = e => {
    this.$ripple.current.createRipple(e)
    this.props.onMouseDown && this.props.onMouseDown(e)
  }

  render() {
    const { children, className, ...rest } = this.props

    return (
      <button className={classnames('btn', 'do-ripple-block', className)} 
        onMouseDown={this.handleMouseDown} 
        {...rest}
      >
        <span className="do-ripple-content">{children}</span>
        <Ripple ref={this.$ripple} rippleColor="rgba(0, 0, 0, 0.2)" />
      </button>
    )
  }
}`
class App extends React.Component {
  render() {
    return (
      <div>
        <h2>How to use ... ?</h2>
        <h3>Ripple Block</h3>
        <pre><code>{code1}</code></pre>
        <RippleBlock className="btn">
          Click Here
        </RippleBlock>

        <h3>Modify Color</h3>
        <pre><code>{code2}</code></pre>
        <RippleBlock className="btn" rippleColor="#f93">
          Click Here
        </RippleBlock>
        <RippleBlock className="btn primary-btn" rippleColor="rgba(255, 255, 255, 0.4)">
          Click Here
        </RippleBlock>

        <h3>Custom</h3>
        <pre><code>{code3}</code></pre>
        <Button>
          Click Here
        </Button>
      </div>
    )
  }
}


const root = document.getElementById('root')

ReactDOM.render(<App />, root)
