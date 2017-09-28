/**
 * Created by Nuno on 25/09/17.
 */
'use strict';
nmm.states.specificStates.views.GameFourView = class GameFourView extends PIXI.Container {
    constructor(controller) {
        super();
        this._controller = controller;
        this._cardsPool = [];
        this._cardsOnStage = [];
        this._delayedCall = null;
        this._init();
    }

    clear() {
        // TODO: clear all expressions
        // this._expressionComponent.clear();
        this._cardsOnStage.forEach(function (card) {
            this.removeChild(card);
            card.clear();
            this._cardsPool.push(card);
        }, this);

        this._cardsOnStage = [];

        if(this._delayedCall) {
            this._delayedCall.kill();
        }

        this.resetAnimalTexture();
        this.info.hide();
    }

    resetAnimalTexture() {
        this._animalPicture.texture = PIXI.Texture.EMPTY;
    }

    disableBtns () {
        this._homeBtn.disable();
    }

    enableBtns () {
        this._homeBtn.enable();
    }

    disableCards() {
        this._cardsOnStage.forEach(function (card) {
            card.disableOnEndLevel();
        });
    }

    _findIndexOfCardOnStageList(key) {
        let i,
            length = this._cardsOnStage.length;

        for(i = 0; i < length; i++) {
            if(this._cardsOnStage[i].key === key) {
                return i;
            }
        }
    }

    wrongAnswer(key) {
        this._lives.takeLive();
        let i = this._findIndexOfCardOnStageList(key),
            card = this._cardsOnStage[i];

        card.wrongAnswer();
    }

    _tweenCardOut(card) {
        TweenLite.to(card, 0.5, {alpha: 0});
        this._delayedCall = TweenLite.delayedCall(0.5, function () {
            card.clear();
            let i = this._findIndexOfCardOnStageList(card.key);
            this.removeChild(card);
            this._cardsOnStage.splice(i, 1);
            this._cardsPool.push(card);
        }, [], this);
    }

    removeCard(key) {
        this._cardsOnStage.forEach(function (card) {
            if(key === card.key) {
                this._tweenCardOut(card);
            }
        }, this);
    }

    _searchForFirstNotSelected() {
        let i,
            length = this._cardsOnStage.length;

        for(i = 0; i < length; i++) {
            if(!this._cardsOnStage[i].selected) {
                return this._cardsOnStage[i].key;
            }
        }
    }

    manageSelectors(selected) {
        selected = selected || this._searchForFirstNotSelected();
        this._cardsOnStage.forEach(function (card) {
            if(card.key === selected) {
                card.disableSelector();
                card.selected = true;
            } else {
                card.enableSelector();
                card.selected = false;
            }
        });

        return selected;
    }

    _placeCards(data) {
        var i,
            length = data.numberOfCards,
            card,
            x,
            y,
            rows = length / 2,
            rowHeight = 768 / rows;

        for (i = 0; i < length; i++) {
            x = (i % 2) * 512;
            y = Math.floor(i / 2) * rowHeight;
            card = this._cardsPool.pop();
            card.alpha = 1;
            card.position.set(x, y);
            card.update(data, i);
            this.addChild(card);
            this._cardsOnStage.push(card);
        }
    }

    update(data) {
        if(data.level === 1) {
            this._lives.reset();
        }
        TweenLite.delayedCall(0.5, function () {
            this._animalPicture.texture = PIXI.Texture.fromImage('level-' + data.level);
        }, [], this);
        this._placeCards(data);
        this.setChildIndex(this._lives, this.children.length - 1);
        this.setChildIndex(this._homeBtn, this.children.length - 1);
    }

    _callback (type, key, btn, event) {
        this._controller.btnClicked(key);
    };

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

    _addInfo() {
        this.info = new nmm.states.specificStates.components.InfoComponent(this._controller);
        this.addChild(this.info);
    }

    _addLivesCounter() {
        this._lives = new nmm.components.LiveCounter(3, 0);
        this._lives.position.set(995, 25);
        this.addChild(this._lives);
    }

    _addCards() {
        var i,
            length = 12,
            card;

        for(i = 0; i < length; i++) {
            card = new nmm.states.specificStates.components.CardComponent(this._controller);
            this._cardsPool.push(card);
        }
    }

    _addAnimalPicture() {
        this._animalPicture = new PIXI.Sprite();
        this.addChild(this._animalPicture);
    }

    _init() {
        this._callbackBound = this._callback.bind(this);

        this._addAnimalPicture();
        this._addCards();
        this._addLivesCounter();

        this._addInfo();

        this._addHomeBtn();
    }
};