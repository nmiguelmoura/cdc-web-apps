/**
 * Created by Nuno on 22/09/17.
 */
'use strict';
nmm.states.specificStates.GameOver = class GameOver extends nmm.states.genericStates.TemplateState {
    constructor() {
        super();
        this.name = 'game-over';
    }

    _stateIn() {
        TweenLite.delayedCall(3, function () {
            console.log(this._stateToGoAfter);
            console.log(this._stateToGoAfter);
            nmm.runtime.app.fsm.changeState(this._stateToGoAfter, {
                game: this._game
            });
        }, [], this);
    }

    setParams(params) {
        this._stateToGoAfter = params.stateToGoAfter;
        this._game = params.game;
        let success = params.success;
        this._view.update(success);
    };

    _addView() {
        this._view = new nmm.states.specificStates.views.GameOverView();
        this.addChild(this._view);
    }

    _init() {
        this._addView();
    }
};
