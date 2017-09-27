/**
 * Created by Nuno on 20/09/17.
 */
'use strict';
nmm.states.specificStates.Medals = class Medals extends nmm.states.genericStates.TemplateState {
    constructor() {
        super();
        this.name = 'medals';
    }

    _stateIn () {
        this._view.enableBtns();
    }

    animateOut(callback) {
        super.animateOut(callback);
        this._view.disableBtns();
    }

    animateIn() {
        super.animateIn();
        this._reset();
    }

    changeState (stateName) {
        nmm.runtime.app.fsm.changeState(stateName);
    }

    btnClicked (key) {
        if(key === 'menu') {
            this.changeState('menu');
        } else if(key === 'next') {
            this.goNext();
        }
    }

    goNext () {
        let data = this._model.showNext();
        this._view.show(data);
    }

    _reset() {
        this._model.reset();
        this._view.reset();
        this.goNext();
    }

    _addView() {
        this._view = new nmm.states.specificStates.views.MedalsView(this);
        this.addChild(this._view);
    }

    _init() {
        this._model = new nmm.states.specificStates.models.MedalsModel();
        this._addView();
    }
};