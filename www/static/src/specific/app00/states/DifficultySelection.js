/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.states.specificStates.DifficultySelection = class DifficultySelection extends nmm.states.genericStates.TemplateState {
    constructor () {
        super();
        this.name = 'difficulty-selection';

        // This variable holds the game where its intended to go after selection.
        // This might be used to expand the game later on.
        this._gameToGo = null
    }

    animateOut () {
        super.animateOut();
        this._view.disableBtns();
    }

    _stateIn () {
        this._view.enableBtns();
    }

    btnClicked (key) {
        if(key === 'menu') {
            nmm.runtime.app.fsm.changeState('menu');
        } else {
            this._gameToGo = this._gameToGo || 'game-3';

            // Go to state 1. Game 3 shares state with game 1 and 2.
            nmm.runtime.app.fsm.changeState(this._gameToGo, {
                game: this._gameToGo,
                difficulty: key
            });
        }
    }

    setParams (options) {
        this._gameToGo = options.game;
    }

    _addView () {
        this._view = new nmm.states.specificStates.views.DifficultySelectionView(this);
        this.addChild(this._view);
    }

    _init () {
        this._addView();
    }
};