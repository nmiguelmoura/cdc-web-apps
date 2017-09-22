/**
 * Created by Nuno on 12/09/17.
 */

'use strict';
nmm.states.specificStates.Menu = class Menu extends nmm.states.genericStates.TemplateState {
    constructor () {
        super();
        this.name = 'menu';
    }

    _stateIn () {
        this._view.enableBtns();
    }

    changeState (stateName) {
        this._view.disableBtns();

        switch (stateName) {
            case 'game-1':
                nmm.runtime.app.fsm.changeState('tab-selection', {
                    game: "game-1"
                });
                break;

            case 'game-2':
                nmm.runtime.app.fsm.changeState('tab-selection', {
                    game: "game-2"
                });
                break;

            case 'game-3':
                nmm.runtime.app.fsm.changeState('difficulty-selection', {
                    game: "game-3"
                });
                break;

            default:
                //This on for medals and game-4
                nmm.runtime.app.fsm.changeState(stateName);
                break;
        }
    }

    _addView () {
        this._view = new nmm.states.specificStates.views.MenuView(this);
        this.addChild(this._view);
    }

    _init () {
        this._addView();

        // Initialize pool.
        nmm.pool = new nmm.tools.Pool(130);
    }
};