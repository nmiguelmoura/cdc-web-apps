/**
 * Created by Nuno on 20/09/17.
 */
'use strict';
nmm.states.specificStates.views.MedalsView = class MedalsView extends PIXI.Container {
    constructor (controller) {
        super();
        this._controller = controller;
        this._iconTextures = {};
        this._init();
    }

    show (data) {
        this._iconTextures['icon_' + data.currentlyOnGame] = this._iconTextures['icon_' + data.currentlyOnGame] || PIXI.Texture.fromFrame('btn_option_' + (data.currentlyOnGame - 1));
        this._gameIcon.texture = this._iconTextures['icon_' + data.currentlyOnGame];
        this._info.show(data);

        if(data.currentlyOnGame === data.max) {
            this._nextBtn.visible = false;
            this._nextBtn.disable();

        }
    }

    reset () {
        this._nextBtn.visible = true;
    }

    disableBtns () {
        this._homeBtn.disable();
        this._nextBtn.disable();
    }

    enableBtns () {

        this._homeBtn.enable();
        this._nextBtn.enable();
    }

    _callback (type, key, btn, event) {
        this._controller.btnClicked(key);
    };

    _addInfo () {
        this._info = new nmm.states.specificStates.components.MedalsTextColumnsView();
        this.addChild(this._info);
    }

    _addNextBtn () {
        this._nextBtn = new nmm.components.TexturedButton({
            texture: PIXI.Texture.fromFrame('btn_icon_arrow'),
            x: 936,
            y: 712,
            key: 'next',
            callback: this._callbackBound
        });
        this.addChild(this._nextBtn);
    }

    _addHomeBtn () {
        this._homeBtn = new nmm.components.TexturedButton({
            texture: PIXI.Texture.fromFrame('btn_icon_home'),
            x: 10,
            y: 10,
            key: 'menu',
            callback: this._callbackBound
        });
        this.addChild(this._homeBtn);
    }

    _addGameIcon () {
        this._gameIcon = new PIXI.Sprite();
        this._gameIcon.position.set(334, 182);
        this.addChild(this._gameIcon);
    }

    _addTitle () {
        let title = new PIXI.Sprite(PIXI.Texture.fromFrame('sub_title_2'));
        title.anchor.set(0.5);
        title.position.set(512, 106);
        this.addChild(title);
    }

    _init () {
        this._callbackBound = this._callback.bind(this);

        this._addTitle();
        this._addGameIcon();
        this._addHomeBtn();
        this._addNextBtn();
        this._addInfo();
    }
};