/**
 * Created by Nuno on 28/09/17.
 */
'use strict';
nmm.states.specificStates.components.InfoComponent = class InfoComponent extends PIXI.Container {
    constructor(controller) {
        super();
        this._controller = controller;
        this.position.set(20, 562);
        this.alpha = 0;
        this._init();
    }

    _callback() {
        this.hide();
        this._controller.endLevel();
    }

    hide() {
        TweenLite.to(this, 0.5, {alpha: 0});
    }

    show(animalData) {
        this._nameField.text = animalData.name;
        this._descriptionField.text = animalData.description;
        TweenLite.to(this, 0.5, {alpha: 1});
        TweenLite.delayedCall(0.5, function () {
            this._nextBtn.show();
        }, [], this);
    }

    _addNextBtn() {
        this._nextBtn = new nmm.components.TexturedButton({
            texture: PIXI.Texture.fromFrame('btn_icon_arrow'),
            x: 885,
            y: 120,
            autoHide: true,
            callback: this._callbackBound
        });
        this._nextBtn.hide();
        this.addChild(this._nextBtn);
    }

    _addFields() {
        let style = {
            fontFamily: 'Arial',
            fontSize: '20px',
            fill: '#444444',
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: 946,
            lineHeight: 28
        };

        this._nameField = new PIXI.Text('', style);
        this._nameField.position.set(20, 20);
        this.addChild(this._nameField);

        style.fontWeight = 'normal';
        this._descriptionField = new PIXI.Text('', style);
        this._descriptionField.position.set(20, 52);
        this.addChild(this._descriptionField);

    }

    _addBg() {
        let bg = new PIXI.Sprite(PIXI.Texture.fromFrame('info_bg'));
        this.addChild(bg);
    }

    _init() {
        this._callbackBound = this._callback.bind(this);
        this._addBg();
        this._addFields();
        this._addNextBtn();
    }
};