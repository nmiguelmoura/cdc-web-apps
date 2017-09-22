/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.states.specificStates.GameOne = class GameOne extends nmm.states.genericStates.TemplateState {

    constructor() {
        super();
        this.name = 'game-1';
    }

    animateIn () {
        super.animateIn();
        this._newExercise();
    }

    btnClicked (key) {
        if(key === 'menu') {
            nmm.runtime.app.fsm.changeState('menu');
        } else {
            // Check answer.
        }
    }

    _newExercise () {
        if (this._model.levelCount < 10) {
            let data = this._model.generateExercise();
            this._view.update(data);
        } else {
            console.log('END EXERCISE');
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