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

    _callback(type, key, btn, event) {
        this._controller.changeState(key);
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
    }
};