/**
 * Created by Nuno on 25/09/17.
 */
'use strict';
nmm.states.specificStates.GameThree = class GameThree extends nmm.states.genericStates.TemplateState {
    constructor() {
        super();
        this.name = 'game-3';
        this._delayedTween = null;
    }

    _stateOut() {
        this._view.clear();
        this._view.disableBtns();
    }

    animateIn() {
        super.animateIn();
        this._newExercise(true);
        nmm.dataModel.breakScoreChain();
        this._view.dummyField.show();
    }

    btnClicked(key) {
        if (key === 'menu') {
            this._view.disableBtns();
            if (this._delayedTween) {
                this._delayedTween.kill();
            }

            nmm.runtime.app.fsm.changeState('menu');
        } else {
            // Check answer.
            let answer = this._view.inputValue;
            let result = this._model.validateAnswer(parseInt(answer));

            if (result) {
                createjs.Sound.play('correct');
                this._view.showCorrect();
                let scoreStored = nmm.dataModel.storeCorrect();

                if(this._model.current.hidden === 'term2') {
                    this._view.updateFinalValue('term2', answer);
                }

                let scoreMedal = this._model.checkMedalScore(scoreStored.correct),
                    chainMedal = this._model.checkMedalChain(scoreStored.correctChain);

                if (scoreMedal && nmm.dataModel.storeMedal(3, scoreMedal)) {
                    this._view.showMedal(3, scoreMedal);
                }

                if (chainMedal && nmm.dataModel.storeMedal(3, chainMedal)) {
                    this._view.showMedal(3, chainMedal);
                }

                this._delayedTween = TweenLite.delayedCall(2, function () {
                    this._newExercise();
                }, [], this);
            } else {
                createjs.Sound.play('wrong');
                this._view.showWrong();
                nmm.dataModel.breakScoreChain();
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

    get currentlyHidden() {
        return this._model.current.hidden;
    }

    _newExercise(firstOne) {
        let data = this._model.generateExercise();
        this._view.update(data, firstOne);
    }

    _addView() {
        this._view = new nmm.states.specificStates.views.GameThreeView(this);
        this.addChild(this._view);
    }

    setParams(options) {
        this._model.game = options.game;
        this._model.difficulty = options.difficulty;
    }

    _init() {
        this._model = new nmm.states.specificStates.models.GameThreeModel();
        this._addView();
    };
};