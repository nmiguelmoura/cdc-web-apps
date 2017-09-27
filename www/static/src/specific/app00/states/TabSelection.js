/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.states.specificStates.TabSelection = class TabSelection extends nmm.states.genericStates.TemplateState {
    constructor () {
        super();
        this.name = 'tab-selection';

        // This variable holds the game where its intended to go after selection.
        // Thats because this state is show before game-1 and game-2.
        this._gameToGo = null;
    }

    animateOut (callback) {
        super.animateOut(callback);
        this._view.disableBtns();
    }

    _stateIn () {
        this._view.enableBtns();
    }

    btnClicked (key) {
        if(key === 'menu') {
            nmm.runtime.app.fsm.changeState('menu');
        } else {
            this._gameToGo = this._gameToGo || 'game-1';

            // Use game-1 in state because game 1 and 2 share the same state.
            nmm.runtime.app.fsm.changeState('game-1', {
                game: this._gameToGo,
                level: key
            });
        }
    }

    setParams (options) {
        this._gameToGo = options.game;
    }

    _addView () {
        this._view = new nmm.states.specificStates.views.TabSelectionView(this);
        this.addChild(this._view);
    }

    _init () {
        this._addView();
    }
};