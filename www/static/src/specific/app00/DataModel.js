/**
 * Created by Nuno on 20/09/17.
 */
'use strict';

nmm.runtime.singletons = nmm.runtime.singletons || {};
nmm.runtime.singletons.dataModel = null;

nmm.app.DataModel = class DataModel {
    constructor() {
        if (!nmm.runtime.singletons.dataModel) {
            nmm.runtime.singletons.dataModel = this;
        }

        return nmm.runtime.singletons.dataModel;
    }

    setScoreData () {
        let score = {
            "correct": 0,
            "correctChain": 0
        };

        this.storeData('score', score);
    }

    setMedalData() {
        let medals = {
            "game-1": {},
            "game-2": {},
            "game-3": {},
            "game-4": {}
        };

        let i,
            length = 11;
        for (i = 1; i < length; i++) {
            medals["game-1"]["medal-" + i] = false;
            medals["game-2"]["medal-" + i] = false;
            medals["game-3"]["medal-" + i] = false;
            if(i < 6) {
                medals["game-4"]["medal-" + i] = false;
            }
        }

        this.storeData('medals', medals);
    }

    storeData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    breakScoreChain () {
        this._score.correctChain = 0;
        this.storeData('score', this._score);
    }

    storeCorrect () {
        this._score.correct++;
        this._score.correctChain++;
        this.storeData('score', this._score);
        return this._score;
    }

    storeMedal(game, medal) {
        let data = this.getData('medals');
        if(data) {
            if(!data['game-' + game]['medal-' + medal]) {
                data['game-' + game]['medal-' + medal] = true;

                this.storeData('medals', data);
                // Returning true we know the medal was won for the first time.
                return true;
            }
        }
        // Returning false is because something went wrong or the medal
        // was already won.
        return false;
    }

    getData(item) {
        let data = localStorage.getItem(item);
        if (data) {
            return JSON.parse(data);
        }
    }

    getMedals(game) {
        let data = this.getData('medals');

        if (data) {
            let requiredData = data[game];
            if (requiredData) {
                return requiredData;
            }
        }
        return {};
    };

    init () {
        if(!this.getData('medals')) {
            // No medals data stored for this game.
            // Create medals data system.
            this.setMedalData();
        }

        if(!this.getData('score')) {
            // No score data stored for this game.
            // Create score data system.
            this.setScoreData();
        }

        this._score = this.getData('score');
    }
};