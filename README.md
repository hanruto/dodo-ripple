## 功能
可以用来实现点击时的波纹效果

## 演示
https://sowhitesocoll.github.io/dodo-ripple/

## 使用
安装
```
yarn add 'dodo-ripple'
```
#### RippleBlock的用法
``` jsx
import { RippleBlock } from 'dodo-ripple'
s
const Button = (
  <RippleBlock className="btn">
    Click Here
  </RippleBlock>
)
```

#### withRipple的用法
``` jsx
import { withRipple } from 'dodo-ripple'

const Button = withRipple(
  <button className="btn">Click Here</button>
)
```

#### 只使用Ripple

``` jsx
import { Ripple } from 'dodo-ripple'

class Button extends React.Component {
  $ripple = React.createRef()

  handleMouseDown = e => {
    this.$ripple.current.createRipple(e)
    this.props.onMouseDown && this.props.onMouseDown(e)
  }

  render() {
    const { children, className, ...rest } = this.props

    return (
      <button 
        {...rest}
        className={classnames('btn', 'do-ripple-block', className)} 
        onMouseDown={this.handleMouseDown} 
      >
        <span className="do-ripple-content">{children}</span>
        <Ripple ref={this.$ripple} rippleColor="#39f"/>
      </button>
    )
  }
}
```
* 如果使用第二种方式的话记得要给外层添加.do-ripple-block，同时也要给内容添加 .do-ripple-content，否则会出现样式问题

#### 例子中的相关样式
``` scss
.btn {
  padding: 12px 50px;
  border: 1px solid #ddd;
  border-radius: 30px;
  display: inline-block;
  cursor: pointer;
  font: 400 18px system-ui;
  vertical-align: middle;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;

  &:active,
  &:focus {
    outline: none;
  }
}
```
