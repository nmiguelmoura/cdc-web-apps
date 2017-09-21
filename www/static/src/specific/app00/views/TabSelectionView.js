/**
 * Created by Nuno on 20/09/17.
 */
'use strict';
nmm.states.specificStates.views.TabSelectionView = class TabSelectionView extends PIXI.Container {
    constructor (controller) {
        super();
        this._controller = controller;

        this._btns = [];

        this.BTN_SPACING = 53;
        this.BTN_WIDTH = 84;
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
            length = 11,
            btn,
            texture,
            key;

        for (i = 0; i < length; i++) {

            if (i < 10) {
                texture = PIXI.Texture.fromFrame('btn_number_' + (i + 1));
                key = i + 1;
            } else {
                texture = PIXI.Texture.fromFrame('btn_home_small');
                key = 'menu';
            }

            btn = new nmm.components.TexturedButton({
                texture: texture,
                key: key,
                x: 332 + (i % 3) * (this.BTN_SPACING + this.BTN_WIDTH),
                y: 190 + Math.floor(i / 3) * (this.BTN_SPACING + this.BTN_HEIGHT),
                callback: this._callbackBound
            });
            this.addChild(btn);
            this._btns.push(btn);
        }
    }

    _addTitle () {
        let title = new PIXI.Sprite(PIXI.Texture.fromFrame('sub_title_0'));
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