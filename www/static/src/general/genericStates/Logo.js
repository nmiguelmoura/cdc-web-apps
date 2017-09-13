/**
 * Created by Nuno on 12/09/17.
 */

'use strict';
nmm.states.genericStates.Logo = class Logo extends nmm.states.genericStates.TemplateState {
    constructor () {
        super();
        this.name = 'logo';
        this.DURATION = 2.5;
        this._init();
    }

    _stateOut () {
        this.removeChild(this._view);
        this._view.destroy();
        this._view = null;
        this.destroy();
        nmm.runtime.app.fsm.destroyState(this.name);
    }

    _addView () {
        this._view = new nmm.states.genericStates.views.LogoView();
        this.addChild(this._view);
    }

    _init () {
        this._addView();
        TweenLite.delayedCall(this.DURATION, function () {
            nmm.runtime.app.fsm.changeState('menu');
        }, [], this);
    }
};