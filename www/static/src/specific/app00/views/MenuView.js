/**
 * Created by Nuno on 20/09/17.
 */
'use strict';
nmm.states.specificStates.views.MenuView = class MenuView extends PIXI.Container {
    constructor(controller) {
        super();
        this._controller = controller;
        this._btnInfo = [
            {
                key: 'game-1',
                x: 130,
                y: 430
            },
            {
                key: 'game-2',
                x: 538,
                y: 430
            },
            {
                key: 'game-3',
                x: 130,
                y: 538
            },
            {
                key: 'game-4',
                x: 538,
                y: 538
            },
            {
                key: 'medals',
                x: 333,
                y: 645
            }
        ];

        this._btns = [];

        this._init();
    }

    clear() {
        this._clearTween();
        this._rotatePhone.alpha = 0;
    }

    disableBtns() {
        this._btns.forEach(function (btn) {
            btn.disable();
        });
    }

    enableBtns() {
        this._btns.forEach(function (btn) {
            btn.enable();
        });
    };

    _clearTween() {
        if(this._delayedTween) {
            this._delayedTween.kill();
            this._tween.kill();
        }
    }

    hideRotatePhone() {
        console.log('hide');
        this._clearTween();
        this._rotatePhone.alpha = 0;
    };

    _tweenPhone() {
        this._clearTween();
        this._rotatePhone.alpha = 0;
        this._tween = TweenLite.to(this._rotatePhone, 1, {alpha: 1});
        this._delayedTween = TweenLite.delayedCall(1, function () {
            this._tweenPhone();
        }, [], this);
    }

    showRotatePhone() {
        console.log('show');
        this._rotatePhone.alpha = 1;
        this._tweenPhone();
    };

    _callback(type, key, btn, event) {
        this._controller.changeState(key);
    }

    _addRotatePhone() {
        this._rotatePhone = new PIXI.Sprite(PIXI.Texture.fromFrame('rotatePhone'));
        this._rotatePhone.position.set(915, 15);
        this._rotatePhone.alpha = 0;
        this.addChild(this._rotatePhone);
    }

    _addBtns() {
        var btn;
        this._btnInfo.forEach(function (info, i) {
            btn = new nmm.components.TexturedButton({
                texture: PIXI.Texture.fromFrame('btn_option_' + i),
                x: info.x,
                y: info.y,
                key: info.key,
                enableOnStart: false,
                autoHide: false,
                callback: this._callback.bind(this)
            });
            this.addChild(btn);
            this._btns.push(btn);
        }, this);
    }


    _addTitle() {
        var title = new PIXI.Sprite(PIXI.Texture.fromFrame('title'));
        title.anchor.set(0.5);
        title.position.set(512, 215);
        this.addChild(title);
    }

    _init() {
        this._addTitle();
        this._addBtns();
        this._addRotatePhone();
    }
};