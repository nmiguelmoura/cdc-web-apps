/**
 * Created by Nuno on 25/09/17.
 */
'use strict';
nmm.states.specificStates.views.GameThreeView = class GameThreeView extends PIXI.Container {
    constructor(controller) {
        super();
        this._controller = controller;
        this._init();
    }

    clear() {
        this._helperComponent.clear();
        this._expressionComponent.clear();
    }

    get inputValue() {
        return this._expressionComponent.inputField.getValue();
    }

    disableBtns() {
        this._homeBtn.disable();
        this._answerBtn.disable();
    }

    enableBtns() {
        this._homeBtn.enable();
        this._answerBtn.show();
    }

    _fadeOutComponents(fadeTime) {
        this.disableBtns();
        TweenLite.to(this._helperComponent._container, fadeTime, {alpha: 0});
        TweenLite.to(this._expressionComponent, fadeTime, {alpha: 0});
    }

    _fadeInComponents(fadeTime) {
        TweenLite.to(this._helperComponent._container, fadeTime, {alpha: 1});
        TweenLite.to(this._expressionComponent, fadeTime, {alpha: 1});
        TweenLite.delayedCall(fadeTime, function () {
            this.enableBtns();
        }, [], this);
    }

    showMedal(game, level) {
        this._medalPopup.show(game, level);
    }

    allowNewAnswer() {
        this._expressionComponent.resetAnswer(this._controller.currentlyHidden);
        this._answerBtn.show();
    }

    showWrong() {
        this._expressionComponent.wrongAnswer();
    }

    showCorrect() {
        this._expressionComponent.correctAnswer();
    }

    _updateComponents(data) {
        let globalScale = nmm.runtime.app.scale;
        if (data.difficulty === 1) {
            this._helperComponent.update(data);
        }
        this._expressionComponent.update(data);
        TweenLite.delayedCall(0.002, function () {
            this._expressionComponent.position.x = 512 - this._expressionComponent.getBounds().width / (2 * globalScale);
            this._expressionComponent.repositionInputField(data);
        }, [], this);
    }

    update(data, firstOne) {
        let FADE_TIME = 0.2;

        if (firstOne) {
            this._updateComponents(data);
            this._fadeInComponents(data);

            if (data.difficulty === 1) {
                this._helperComponent.visible = true;
                this._expressionComponent.y = 462;
            } else {
                this._helperComponent.visible = false;
                this._expressionComponent.y = 250;
            }
        } else {
            this._fadeOutComponents(FADE_TIME);
            TweenLite.delayedCall(FADE_TIME, function () {
                // Update components.
                this._updateComponents(data);
                this._fadeInComponents();
            }, [], this);
        }
    }

    updateFinalValue(term, value) {
        this._helperComponent.updateFinalValue(term, value);
    }

    _callback(type, key, btn, event) {
        this._controller.btnClicked(key);
    };

    _addMedalPopupComponent() {
        this._medalPopup = new nmm.components.MedalPopupComponent([
            PIXI.Texture.fromFrame('medal_1'),
            PIXI.Texture.fromFrame('medal_2'),
            PIXI.Texture.fromFrame('medal_3'),
            PIXI.Texture.fromFrame('medal_4')
        ]);
        this.addChild(this._medalPopup);
    }

    _addExpressionComponent() {
        this._expressionComponent = new nmm.states.specificStates.components.ExpressionComponent();
        this._expressionComponent.scale.set(0.8);
        this.addChild(this._expressionComponent);
    }

    _addHelperComponent() {
        this._helperComponent = new nmm.states.specificStates.components.HelperComponent();
        this.addChild(this._helperComponent);
    }

    _addAnswerBtn() {
        this._answerBtn = new nmm.components.TexturedButton({
            texture: PIXI.Texture.fromFrame('btn_answer'),
            x: 333,
            y: 652,
            key: 'answer',
            autoHide: true,
            callback: this._callbackBound,
            keyCode: 13
        });
        this.addChild(this._answerBtn);
    }

    _addHomeBtn() {
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
        this._addMedalPopupComponent();
    }
};