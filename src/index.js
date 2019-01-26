import * as React from 'react'
import classnames from 'classnames'
import './index.css'


const dur = 400
const ns = 'http://www.w3.org/2000/svg'

const createSvgEl = (name, attr) => {
  const el = document.createElementNS(ns, name)
  attr = attr || {}
  for (var key in attr) {
    el.setAttribute(key, attr[key])
  }
  return el
}

const createRipple = (x, y, r, c) => {
  const svg = createSvgEl('svg', { class: 'do-ripple' })
  const circle = createSvgEl('circle', {
    cx: x,
    cy: y,
    r: 0,
    fill: c
  })
  const beignAnimate = createSvgEl('animate', {
    attributeName: 'r',
    to: r,
    dur: dur / 1000 + 's',
    fill: "freeze",
    begin: 'indefinite'
  })
  const endAnimate = createSvgEl('animate', {
    attributeName: 'fill',
    to: 'rgba(255, 255, 255, 0)',
    dur: dur / 1000 + 's',
    fill: "freeze",
    begin: 'indefinite'
  })
  circle.appendChild(beignAnimate)
  circle.appendChild(endAnimate)
  svg.appendChild(circle)
  return { el: svg, beginEl: beignAnimate, endEl: endAnimate }
}

export class Ripple extends React.PureComponent {
  $ripples = null

  createRipple = e => {
    if (e.button !== 0) return
    const rippleGroup = this.$ripples
    const target = e.currentTarget

    const { top, left, width: w, height: h } = target.getBoundingClientRect()

    const x = e.clientX - left
    const y = e.clientY - top
    const r = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2))
      + Math.sqrt(Math.pow(w / 2 - x, 2) + Math.pow(h / 2 - y, 2))
    const c = this.props.rippleColor || 'rgba(0, 0, 0, 0.2)'

    const ripple = createRipple(x, y, r, c)
    const rippleSvg = ripple.el
    rippleGroup.appendChild(rippleSvg)
    ripple.beginEl.beginElement()

    const remove = e => {
      target.removeEventListener('mouseup', remove)
      target.removeEventListener('mouseout', remove)
      ripple.endEl.beginElement()
      setTimeout(() => {
        rippleGroup.removeChild(rippleSvg)
      }, dur)
    }

    target.addEventListener('mouseup', remove)
    target.addEventListener('mouseout', remove)
  }

  render() {
    return (
      <div className="do-ripple-group" ref={el => this.$ripples = el} />
    )
  }
}

export class RippleBlock extends React.PureComponent {
  $ripples = null

  handleMouseDown = e => {
    this.props.handleMouseDown && this.props.handleMouseDown(e)
    this.$ripples.createRipple(e)
  }

  render() {
    const { onMouseDown, onMouseUp, children, className, rippleColor, ...rest } = this.props

    return (
      <div
        {...rest}
        className={classnames('do-ripple-block', className)}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <span className="do-ripple-content">{children}</span>
        <Ripple ref={el => this.$ripples = el} rippleColor={rippleColor} />
      </div>
    )
  }
}

export function withRipple(Component, config) {
  const { onMouseDown, children, className } = Component.props

  return class extends React.PureComponent {
    $ripples = null

    handleMouseDown = e => {
      onMouseDown && onMouseDown(e)
      this.$ripples && this.$ripples.createRipple(e)
    }

    render() {
      return React.cloneElement(Component, {
        onMouseDown: this.handleMouseDown,
        className: classnames(className, 'do-ripple-block'),
        children: (
          <React.Fragment>
            <span className="do-ripple-content">{children}</span>,
            <Ripple ref={el => this.$ripples = el} {...config} />
          </React.Fragment>
        )
      })
    }
  }
}