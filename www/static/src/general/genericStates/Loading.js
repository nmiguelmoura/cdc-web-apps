/**
 * Created by Nuno on 12/09/17.
 */

'use strict';
nmm.states.genericStates.Loading = class Loading extends nmm.states.genericStates.TemplateState {
    constructor () {
        super();
        this.name = 'loading';
    }

    destroy () {
        this.removeChild(this._view);
        this._view.destroy();
        this._view = null;

        super.destroy({
            children: true,
            texture: true
        });
    }

    _stateOut () {
        nmm.runtime.app.fsm.destroyState(this.name);
    };

    animateOut () {
        this._view.endLoading();
        super.animateOut();
    }

    _assetsLoaded () {
        console.log('... Loading assets successful');
        nmm.runtime.app.fsm.changeState('logo');
    }

    _loadAssets () {
        nmm.runtime.app.assetsLoader.init(this._assetsLoaded.bind(this));
    }

    _addView () {
        this._view = new nmm.states.genericStates.views.LoadingView();
        this.addChild(this._view);
        this._view.startLoading();
    }

    _init () {
        this._addView();
        this._loadAssets();
    }
};