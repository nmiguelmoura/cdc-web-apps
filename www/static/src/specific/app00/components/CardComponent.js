/**
 * Created by Nuno on 27/09/17.
 */
'use strict';
nmm.cardTextures = {};
nmm.states.specificStates.components.CardComponent = class CardComponent extends PIXI.Container {
    constructor(controller) {
        super();
        this._controller = controller;
        this.EXPRESSION_SCALE = 0.5;
        this.selected = null;
        this._gameCardType = null;
        this._init();
    }

    clear() {
        this._expression.alpha = 1;
        this._selector.hide();
        this._expression.clear();
    }

    disableOnEndLevel() {
        this._selector.hide();
        this._expression.hideInput();
    }

    disableSelector() {
        this._expression.alpha = 1;
        this._selector.hide();
        this._expression.resetInput();
        this._bg.texture = this._gameCardType === 'small' ? nmm.cardTextures.small : nmm.cardTextures.big;
    }

    enableSelector() {
        this._expression.alpha = 0.2;
        this._selector.show();
        this._expression.hideInput();
        this._bg.texture = this._gameCardType === 'small' ? nmm.cardTextures.smallNoSelected : nmm.cardTextures.bigNoSelected;
    }

    wrongAnswer(data) {
        this._expression.showCorrection(false, 80);
        this._expression.resetValue();
        this._expression.inputField.setValue("");
    }

    _positionExpression(data) {
        let height = data.numberOfCards === 12 ? 128 : 256;
        let bounds = this._expression.dim;
        this._expression.position.x = 256 - (bounds.width / 2) * this.EXPRESSION_SCALE;
        this._expression.position.y = height / 2 - (bounds.height / 2) * this.EXPRESSION_SCALE;
        this._expression.repositionInputField(data.calcs[this.key]);
    }

    _updateExpression(data) {
        this._expression.update(data.calcs[this.key]);
        TweenLite.delayedCall(0.002, function () {
            this._positionExpression(data);
        }, [], this);
    }

    update(data, key) {
        this._gameCardType = data.numberOfCards === 12 ? 'small' : 'big';
        let height = data.numberOfCards === 12 ? 128 : 256;
        this.key = key;

        this._bg.texture = data.numberOfCards === 12 ? nmm.cardTextures.smallNoSelected : nmm.cardTextures.bigNoSelected;

        this._selector.height = height;
        this._updateExpression(data);
    }

    _callbackSelector(type) {
        nmm.observer.publish('game-four-selector', {key: this.key});
    }

    _addCardSelector() {
        if(!nmm.cardTextures.selector) {
            let graph = new PIXI.Graphics()
                .beginFill(0xFF0000, 0)
                .drawRect(0, 0, 10, 10)
                .endFill();
            nmm.cardTextures.selector = graph.generateTexture();
        }

        this._selector = new nmm.components.TexturedButton({
            texture: nmm.cardTextures.selector,
            autoHide: true,
            callback: this._callbackSelectorBound
        });
        this._selector.width = 512;

        this.addChild(this._selector);
    }

    _addExpression() {
        this._expression = new nmm.states.specificStates.components.ExpressionComponent('game-4');
        this._expression.scale.set(this.EXPRESSION_SCALE);
        this.addChild(this._expression);
    }

    _addBg() {
        this._bg = new PIXI.Sprite();
        this._bg.width = 513;
        this.addChild(this._bg);
    }

    _init() {
        nmm.cardTextures.small = nmm.cardTextures.small || PIXI.Texture.fromFrame('game_bg_small');
        nmm.cardTextures.big = nmm.cardTextures.big || PIXI.Texture.fromFrame('game_bg_big');
        nmm.cardTextures.smallNoSelected = nmm.cardTextures.smallNoSelected || PIXI.Texture.fromFrame('game_bg_small_no_selected');
        nmm.cardTextures.bigNoSelected = nmm.cardTextures.bigNoSelected || PIXI.Texture.fromFrame('game_bg_big_no_selected');
        this._callbackSelectorBound = this._callbackSelector.bind(this);
        this._addBg();
        this._addExpression();
        this._addCardSelector();
    }
};