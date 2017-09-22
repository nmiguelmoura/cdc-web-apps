/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.states.specificStates.views.GameOneView = class GameOneView extends PIXI.Container {
    constructor(controller) {
        super();
        this._controller = controller;

        this._init();
    }

    disableBtns () {
        this._homeBtn.disable();
        this._answerBtn.disable();
    }

    enableBtns () {
        this._homeBtn.enable();
        this._answerBtn.enable();
    }

    _fadeOutComponents(fadeTime) {
        this.disableBtns();
        //TweenLite.to
        //TweenLite.to
    }

    _fadeInComponents(fadeTime) {
        //TweenLite.to
        //TweenLite.to
        TweenLite.delayedCall(fadeTime, function () {
            this.enableBtns();
        }, [], this);
    }

    _updateComponents (data) {
        this._helperComponent.update(data);
    }

    update(data) {
        let FADE_TIME = 0.5;

        if(data.term2 === 1) {
            // Update components.
            this._updateComponents(data);
            this._fadeInComponents();
        } else {
            this._fadeOutComponents(FADE_TIME);
            TweenLite.delayedCall(FADE_TIME, function () {
                // Update components.
                this._updateComponents(data);

                this._fadeInComponents();
            }, [], this);
        }
    }

    _callback (type, key, btn, event) {
        this._controller.btnClicked(key);
    };

    _addExpressionComponent () {

    }

    _addHelperComponent () {
        this._helperComponent = new nmm.states.specificStates.components.HelperComponent();
        this.addChild(this._helperComponent);
    }

    _addAnswerBtn () {
        this._answerBtn = new nmm.components.TexturedButton({
            texture: PIXI.Texture.fromFrame('btn_answer'),
            x: 333,
            y: 652,
            key: 'answer',
            callback: this._callbackBound
        });
        this.addChild(this._answerBtn);
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

    _init() {
        this._callbackBound = this._callback.bind(this);
        this._addHomeBtn();
        this._addAnswerBtn();
        this._addHelperComponent();
        this._addExpressionComponent();
    }
};
