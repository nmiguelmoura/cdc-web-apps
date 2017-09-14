/**
 * Created by Nuno on 12/09/17.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

nmm.states.genericStates.TemplateState = function (_PIXI$Container) {
    _inherits(TemplateState, _PIXI$Container);

    function TemplateState(name) {
        _classCallCheck(this, TemplateState);

        var _this = _possibleConstructorReturn(this, (TemplateState.__proto__ || Object.getPrototypeOf(TemplateState)).call(this));

        _this.name = "";
        _this.TWEEN_IN_TIME = 0.5;
        _this.TWEEN_OUT_TIME = 0.5;
        _this.alpha = 0;
        return _this;
    }

    _createClass(TemplateState, [{
        key: "animateIn",
        value: function animateIn() {
            TweenLite.to(this, this.TWEEN_IN_TIME, { alpha: 1 });
            TweenLite.delayedCall(this.TWEEN_IN_TIME, function () {
                this._stateIn();
            }, [], this);
        }
    }, {
        key: "animateOut",
        value: function animateOut() {
            TweenLite.to(this, this.TWEEN_OUT_TIME, { alpha: 0 });
            TweenLite.delayedCall(this.TWEEN_OUT_TIME, function () {
                this._stateOut();
            }, [], this);
        }
    }, {
        key: "_stateIn",
        value: function _stateIn() {}
    }, {
        key: "_stateOut",
        value: function _stateOut() {}
    }, {
        key: "destroy",
        value: function destroy() {
            _get(TemplateState.prototype.__proto__ || Object.getPrototypeOf(TemplateState.prototype), "destroy", this).call(this, {
                children: true,
                textures: true
            });
        }
    }]);

    return TemplateState;
}(PIXI.Container);
//# sourceMappingURL=distTemplateState.js.map
