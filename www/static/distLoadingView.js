/**
 * Created by Nuno on 12/09/17.
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

nmm.states.genericStates.views.LoadingView = function (_PIXI$Container) {
    _inherits(LoadingView, _PIXI$Container);

    function LoadingView() {
        _classCallCheck(this, LoadingView);

        var _this = _possibleConstructorReturn(this, (LoadingView.__proto__ || Object.getPrototypeOf(LoadingView)).call(this));

        _this.name = 'loading';
        _this.INCREMENT_ROTATION = 0.05;
        _this._init();
        return _this;
    }

    _createClass(LoadingView, [{
        key: 'update',
        value: function update() {
            this._loadingIcon.rotation += this.INCREMENT_ROTATION;
        }
    }, {
        key: 'endLoading',
        value: function endLoading() {
            TweenLite.to(this._loadingIcon.scale, 0.5, { x: 1.5, y: 1.5 });
            TweenLite.delayedCall(0.5, function () {
                nmm.runtime.app.pixi.app.ticker.remove(this._onFrameUpdateBound);
            }, [], this);
        }
    }, {
        key: 'startLoading',
        value: function startLoading() {
            if (!this._onFrameUpdateBound) {
                this._onFrameUpdateBound = this.update.bind(this);
            }
            nmm.runtime.app.pixi.app.ticker.add(this._onFrameUpdateBound);
        }
    }, {
        key: '_buildLoader',
        value: function _buildLoader() {
            var graph = new PIXI.Graphics();
            var i = void 0,
                maxCircles = 8,

            // 180 instead of 360 because on angle calculation bellow, its necessary to transform deg to rad,
            // so dont need to divide by 180
            step = 180 / (maxCircles - 1),
                dist = 40,
                radius = 6,
                color = 0xFFFFFF,
                angle = void 0,
                x = void 0,
                y = void 0;
            for (i = 0; i < maxCircles; i++) {
                angle = i * step * Math.PI;
                x = Math.cos(angle) * dist;
                y = Math.sin(angle) * dist;

                graph.beginFill(color, 1 - i * 0.1).lineStyle(1, 0x000000, 1).drawCircle(x, y, radius);
            }
            graph.endFill();

            this._loadingIcon = new PIXI.Sprite(graph.generateTexture());
            this._loadingIcon.position.set(nmm.runtime.app.defaultResolution.width / 2, nmm.runtime.app.defaultResolution.height / 2);
            this._loadingIcon.anchor.set(0.5);
            this._loadingIcon.scale.set(0.5);
            this.addChild(this._loadingIcon);

            graph.clear();
            graph.destroy({ texture: true });
        }
    }, {
        key: '_init',
        value: function _init() {
            this._buildLoader();
        }
    }]);

    return LoadingView;
}(PIXI.Container);
//# sourceMappingURL=distLoadingView.js.map
