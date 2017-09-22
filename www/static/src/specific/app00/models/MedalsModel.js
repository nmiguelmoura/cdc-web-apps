/**
 * Created by Nuno on 20/09/17.
 */
'use strict';
nmm.states.specificStates.models.MedalsModel = class {
    constructor() {
        this.currentlyOnGame = 0;
        this.MAX = 4;
        this._texts = nmm.app.config.medals;
    }

    showNext () {
        this.currentlyOnGame++;
        return {
            medals: this._medals["game-" + this.currentlyOnGame],
            texts: this._texts["game-" + this.currentlyOnGame],
            currentlyOnGame: this.currentlyOnGame,
            max: this.MAX
        }
    }

    _resetData() {
        let data = nmm.dataModel.getData('medals');
        if (data) {
            this._medals = data;
        } else {
            this._medals = {};
        }
    }

    reset () {
        this.currentlyOnGame = 0;
        this._resetData();
    }
};