/**
 * Created by Nuno on 20/09/17.
 */
'use strict';
nmm.states.specificStates.views.DifficultySelectionView = class DifficultySelectionView extends PIXI.Container {
    constructor (controller) {
        super();
        this._controller = controller;

        this._btns = [];

        this.BTN_SPACING = 48;
        this.BTN_HEIGHT = 88;

        this._init();
    }

    disableBtns () {
        this._btns.forEach(function (btn) {
            btn.disable();
        });
    }

    enableBtns () {
        this._btns.forEach(function (btn) {
            btn.enable();
        });
    }

    _callback (type, key, btn, event) {
        this._controller.btnClicked(key);
    };

    _addBtns () {
        var i,
            length = 4,
            btn,
            key,
            names= [
                'btn_easy',
                'btn_medium',
                'btn_hard',
                'btn_home_big'
            ];

        for (i = 0; i < length; i++) {
            if (i < 3) {
                key = i + 1;
            } else {
                key = 'menu';
            }

            btn = new nmm.components.TexturedButton({
                texture: PIXI.Texture.fromFrame(names[i]),
                key: key,
                x: 332,
                y: 190 + i * (this.BTN_SPACING + this.BTN_HEIGHT),
                callback: this._callbackBound
            });
            this.addChild(btn);
            this._btns.push(btn);
        }
    }

    _addTitle () {
        let title = new PIXI.Sprite(PIXI.Texture.fromFrame('sub_title_1'));
        title.anchor.set(0.5);
        title.position.set(512, 106);
        this.addChild(title);
    }

    _init () {
        this._callbackBound = this._callback.bind(this);

        this._addTitle();
        this._addBtns();
    }
};