/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.states.specificStates.GameOne = class GameOne extends nmm.states.genericStates.TemplateState {

    constructor() {
        super();
        this.name = 'game-1';
        this._delayedTween = null;
    }

    _stateOut() {
        this._view.clear();
        this._view.disableBtns();
    }

    animateIn () {
        super.animateIn();
        this._newExercise();
    }

    btnClicked (key) {
        if(key === 'menu') {
            this._view.disableBtns();
            this._delayedTween.kill();

            nmm.runtime.app.fsm.changeState('menu');
        } else {
            // Check answer.
            let answer = this._view.inputValue;
            let result = this._model.validateAnswer(parseInt(answer));

            if (result) {
                this._view.showCorrect();
                this._delayedTween = TweenLite.delayedCall(2, function () {
                    this._newExercise();
                }, [], this);
            } else {
                this._view.showWrong();
                this._delayedTween = TweenLite.delayedCall(2, function () {
                    this._view.allowNewAnswer();
                }, [], this);
            }
        }
    }

    get currentGame() {
        return this._model.current;
    }

    get currentGameType() {
        return this._model.game;
    }

    _endGame () {
        nmm.runtime.app.fsm.changeState('game-over', {
            stateToGoAfter: 'tab-selection',
            game: this._model.game,
            success: true
        });
    }

    _newExercise () {
        if (this._model.levelCount < 10) {
            let data = this._model.generateExercise();
            this._view.update(data);
        } else {

            let game = this._model.game === 'game-1' ? 1 : 2;
            let medal = nmm.dataModel.storeMedal(game, this._model.level);
            if(medal) {
                this._view.showMedal(game, this._model.level);
                this._delayedTween = TweenLite.delayedCall(2, function () {
                    this._endGame();
                }, [], this);
            }
            else {
                this._endGame();
            }


        }
    }

    _addView () {
        this._view = new nmm.states.specificStates.views.GameOneView(this);
        this.addChild(this._view);
    }

    setParams (options) {
        this._model.game = options.game;
        this._model.level = options.level;
        this._model.levelCount = 0;
    }

    _init() {
        this._model = new nmm.states.specificStates.models.GameOneModel();
        this._addView();
    }

};