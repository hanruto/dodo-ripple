"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RippleBlock = exports.Ripple = void 0;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var dur = 400;
var ns = 'http://www.w3.org/2000/svg';

var createSvgEl = function createSvgEl(name, attr) {
  var el = document.createElementNS(ns, name);
  attr = attr || {};

  for (var key in attr) {
    el.setAttribute(key, attr[key]);
  }

  return el;
};

var createRipple = function createRipple(x, y, r, c) {
  var svg = createSvgEl('svg', {
    class: 'do-ripple'
  });
  var circle = createSvgEl('circle', {
    cx: x,
    cy: y,
    r: 0,
    fill: c
  });
  var beignAnimate = createSvgEl('animate', {
    attributeName: 'r',
    to: r,
    dur: dur / 1000 + 's',
    fill: "freeze",
    begin: 'indefinite'
  });
  var endAnimate = createSvgEl('animate', {
    attributeName: 'fill',
    to: 'rgba(255, 255, 255, 0)',
    dur: dur / 1000 + 's',
    fill: "freeze",
    begin: 'indefinite'
  });
  circle.appendChild(beignAnimate);
  circle.appendChild(endAnimate);
  svg.appendChild(circle);
  return {
    el: svg,
    beginEl: beignAnimate,
    endEl: endAnimate
  };
};

var Ripple =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Ripple, _React$PureComponent);

  function Ripple() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, Ripple);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Ripple)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.$ripples = null, _this.createRipple = function (e) {
      if (e.button !== 0) return;
      var rippleGroup = _this.$ripples;
      var target = e.currentTarget;

      var _target$getBoundingCl = target.getBoundingClientRect(),
          top = _target$getBoundingCl.top,
          left = _target$getBoundingCl.left,
          w = _target$getBoundingCl.width,
          h = _target$getBoundingCl.height;

      var x = e.clientX - left;
      var y = e.clientY - top;
      var r = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2)) + Math.sqrt(Math.pow(w / 2 - x, 2) + Math.pow(h / 2 - y, 2));
      var c = _this.props.rippleColor || 'rgba(0, 0, 0, 0.2)';
      var ripple = createRipple(x, y, r, c);
      var rippleSvg = ripple.el;
      rippleGroup.appendChild(rippleSvg);
      ripple.beginEl.beginElement();

      var remove = function remove(e) {
        target.removeEventListener('mouseup', remove);
        target.removeEventListener('mouseout', remove);
        ripple.endEl.beginElement();
        setTimeout(function () {
          rippleGroup.removeChild(rippleSvg);
        }, dur);
      };

      target.addEventListener('mouseup', remove);
      target.addEventListener('mouseout', remove);
    }, _temp));
  }

  _createClass(Ripple, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", {
        className: "do-ripple-group",
        ref: function ref(el) {
          return _this2.$ripples = el;
        }
      });
    }
  }]);

  return Ripple;
}(React.PureComponent);

exports.Ripple = Ripple;

var RippleBlock =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(RippleBlock, _React$PureComponent2);

  function RippleBlock() {
    var _getPrototypeOf3;

    var _temp2, _this3;

    _classCallCheck(this, RippleBlock);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _possibleConstructorReturn(_this3, (_temp2 = _this3 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(RippleBlock)).call.apply(_getPrototypeOf3, [this].concat(args))), _this3.$ripples = null, _this3.handleMouseDown = function (e) {
      _this3.props.handleMouseDown && _this3.props.handleMouseDown(e);

      _this3.$ripples.createRipple(e);
    }, _temp2));
  }

  _createClass(RippleBlock, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          onMouseDown = _this$props.onMouseDown,
          onMouseUp = _this$props.onMouseUp,
          children = _this$props.children,
          className = _this$props.className,
          rippleColor = _this$props.rippleColor,
          rest = _objectWithoutProperties(_this$props, ["onMouseDown", "onMouseUp", "children", "className", "rippleColor"]);

      return React.createElement("div", _extends({}, rest, {
        className: (0, _classnames.default)('do-ripple-block', className),
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp
      }), React.createElement("span", {
        className: "do-ripple-content"
      }, children), React.createElement(Ripple, {
        ref: function ref(el) {
          return _this4.$ripples = el;
        },
        rippleColor: rippleColor
      }));
    }
  }]);

  return RippleBlock;
}(React.PureComponent);

exports.RippleBlock = RippleBlock;
