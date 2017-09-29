/**
 * Created by Nuno on 12/09/17.
 */

'use strict';
nmm.states.specificStates.Menu = class Menu extends nmm.states.genericStates.TemplateState {
    constructor() {
        super();
        this.name = 'menu';
    }

    _stateOut() {
        if(nmm.runtime.app.touchSupport) {
            nmm.observer.unsubscribe('resize', this.windowRotationCheck, this);
            this.windowRotationCheck();
        }
        this._view.clear();
    }

    _stateIn() {
        if(nmm.runtime.app.touchSupport) {
            nmm.observer.subscribe('resize', this.windowRotationCheck, this);
            this.windowRotationCheck();
        }
        this._view.enableBtns();
    }

    windowRotationCheck() {
        var res = nmm.runtime.app.windowResolution;
        if(res.width > res.height) {
            this._view.showRotatePhone();
        } else {
            this._view.hideRotatePhone();
        }
    }

    _checkIfPackageLoaded() {
        let key,
            resources = nmm.runtime.app.assetsLoader.loader.resources;
        for (key in resources) {
            if (resources.hasOwnProperty(key)) {
                if (resources[key].name === nmm.app.config.gameFourTexturePackage[0].label) {
                    return true;
                }
            }
        }
        return false;
    }

    changeState(stateName) {
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

            case 'game-4':
                if (this._checkIfPackageLoaded()) {
                    nmm.runtime.app.fsm.changeState('game-4');
                } else {
                    nmm.runtime.app.fsm.changeState('loading');
                    nmm.runtime.app.fsm.getStateByName('loading').loadSecondaryAssets(nmm.app.config.gameFourTexturePackage, 'game-4', true);
                }
                break;

            default:
                // This on for medals.
                nmm.runtime.app.fsm.changeState(stateName);
                break;
        }
    }

    _addView() {
        this._view = new nmm.states.specificStates.views.MenuView(this);
        this.addChild(this._view);
    }

    _init() {
        this._addView();

        // Initialize pool.
        nmm.pool = new nmm.tools.Pool(130);

        // Initialize music.
        let music = createjs.Sound.play("music");
        music.volume = 0.3;
        music.loop = Number.MAX_SAFE_INTEGER;
    }
};