/**
 * Created by Nuno on 25/09/17.
 */
'use strict';
nmm.states.specificStates.GameFour = class GameFour extends nmm.states.genericStates.TemplateState {
    constructor() {
        super();
        this.name = 'game-4';

        this.ANSWER_INTERVAL = 1.5;

        this._delayedTween = null;
        this._timerTween = {};
    }

    _clearAllTimers() {
        var key;
        for(key in this._timerTween) {
            if(this._timerTween.hasOwnProperty(key)) {
                this._timerTween[key].kill();
            }
        }
    }

    _stateOut() {
        this._viewGame.clear();
    }

    animateOut(callback) {
        this._clearAllTimers();
        nmm.observer.unsubscribe('game-four-selector', this.selectorChange, this);
        nmm.observer.unsubscribe('game-four-answer', this.answer, this);
        super.animateOut(callback);
        this._viewGame.disableBtns();
    }

    _stateIn() {
        this._viewGame.enableBtns();
    }

    animateIn() {
        nmm.observer.subscribe('game-four-selector', this.selectorChange, this);
        nmm.observer.subscribe('game-four-answer', this.answer, this);
        this._model.reset();
        this._newLevel();
        super.animateIn();
    }

    get currentGame() {
        return this._model.current.calcs[this._model.selected];
    }

    selectorChange(data) {
        this._model.selected = data.key;
        this._viewGame.manageSelectors(data.key);
    }

    answer(data) {
        if(this._timerTween[data.key]) {
            this._timerTween[data.key].kill();
        }

        this._timerTween[data.key] = TweenLite.delayedCall(this.ANSWER_INTERVAL, function () {
            let answer = this._model.validateAnswer(data.value, data.key);
            if(answer) {
                this._viewGame.removeCard(data.key);

                if(this._model.selected === data.key) {
                    this._model.selected = this._viewGame.manageSelectors();
                }

                if(this._model.correct === this._model.current.numberOfCards) {
                    // end game
                    let medalLevel = this._model.checkIfMedalLevel();
                    if(medalLevel && nmm.dataModel.storeMedal(4, medalLevel)) {
                        this._showMedal(medalLevel);
                    }

                    console.log('show animal info');

                    /*
                    if(this._model.level < 10) {
                        console.log('GO TO NEXT LEVEL');
                    } else if (this._model.level === 10) {
                        console.log('WIN');
                    }
                    */

                    if(this._model.level === 10 && this._model.lives === 3) {
                        let medalWon = nmm.dataModel.storeMedal(4, 5);
                        if(medalWon) {
                            this._showMedal(5);
                        }
                    }
                }
            } else {
                this._viewGame.wrongAnswer(data.key);

                this._model.lives--;

                console.log('LOOSE 1 LIVE');
                if(this._model.lives === 0) {
                    this._viewGame.disableCards();


                    if(this._model.correct === 0) {
                        this._viewGame.resetAnimalTexture();
                    }

                    TweenLite.delayedCall(1, function () {
                        nmm.runtime.app.fsm.changeState('game-over', {stateToGoAfter: 'menu', success: false});
                    }, [], this);
                }
            }
        }, [], this);
    }

    btnClicked (key) {
        if(key === 'menu') {
            this._viewGame.disableBtns();
            if(this._delayedTween) {
                this._delayedTween.kill();
            }

            nmm.runtime.app.fsm.changeState('menu');
        } else {
            //
        }
    }

    _showGame() {
        this._viewGame.update(this._model.current);
        this.selectorChange({key: 0});
        TweenLite.to(this._viewGame, 0.5, {alpha: 1});
    }

    _showLevelNumber() {
        TweenLite.to(this._viewGame, 0.5, {alpha: 0});
        TweenLite.delayedCall(2, function () {
            this._showGame();
        }, [], this)
    }

    _newLevel() {
        this._timerTween = {};
        this._model.selected = 0;
        this._model.correct = 0;
        let data = this._model.newLevel();

        this._levelNumberView.update(data.level);
        this._showLevelNumber();
    }

    _showMedal(level) {
        this._medalPopup.show(4, level);
    }

    _addMedalPopupComponent() {
        this._medalPopup = new nmm.components.MedalPopupComponent([
            PIXI.Texture.fromFrame('medal_1'),
            PIXI.Texture.fromFrame('medal_2'),
            PIXI.Texture.fromFrame('medal_3'),
            PIXI.Texture.fromFrame('medal_4')
        ]);
        this.addChild(this._medalPopup);
    }

    _addViews() {
        this._levelNumberView = new nmm.states.specificStates.views.LevelNumberView();
        this.addChild(this._levelNumberView);

        this._viewGame = new nmm.states.specificStates.views.GameFourView(this);
        this.addChild(this._viewGame);

        this._addMedalPopupComponent();
    }

    _init() {
        this._model = new nmm.states.specificStates.models.GameFourModel();
        this._addViews();
    }
};