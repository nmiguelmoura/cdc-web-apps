/**
 * Created by Nuno on 20/09/17.
 */
'use strict';
nmm.states.specificStates.models.MedalsModel = class {
    constructor() {
        this.currentlyOnGame = 0;
        this.MAX = 4;
        this._texts = {
            "game-1": {
                "medal-1": "Já conheço a Tabuada do 1!",
                "medal-2": "Já conheço a Tabuada do 2!",
                "medal-3": "Já conheço a Tabuada do 3!",
                "medal-4": "Já conheço a Tabuada do 4!",
                "medal-5": "Já conheço a Tabuada do 5!",
                "medal-6": "Já conheço a Tabuada do 6!",
                "medal-7": "Já conheço a Tabuada do 7!",
                "medal-8": "Já conheço a Tabuada do 8!",
                "medal-9": "Já conheço a Tabuada do 9!",
                "medal-10": "Já conheço a Tabuada do 10!"
            },
            "game-2": {
                "medal-1": "Preenchi a Tabuada do 1!",
                "medal-2": "Preenchi a Tabuada do 2!",
                "medal-3": "Preenchi a Tabuada do 3!",
                "medal-4": "Preenchi a Tabuada do 4!",
                "medal-5": "Preenchi a Tabuada do 5!",
                "medal-6": "Preenchi a Tabuada do 6!",
                "medal-7": "Preenchi a Tabuada do 7!",
                "medal-8": "Preenchi a Tabuada do 8!",
                "medal-9": "Preenchi a Tabuada do 9!",
                "medal-10": "Preenchi a Tabuada do 10!"
            },
            "game-3": {
                "medal-1": "Acertei 10 respostas!",
                "medal-2": "Acertei 20 respostas!",
                "medal-3": "Acertei 30 respostas!",
                "medal-4": "Acertei 40 respostas!",
                "medal-5": "Acertei 50 respostas!",
                "medal-6": "Acertei 100 respostas!",
                "medal-7": "Acertei 500 respostas!",
                "medal-8": "Acertei 10 respostas seguidas!",
                "medal-9": "Acertei 20 respostas seguidas!",
                "medal-10": "Acertei 50 respostas seguidas!"
            },
            "game-4": {
                "medal-1": "Passei o nível 1!",
                "medal-2": "Passei o nível 5!",
                "medal-3": "Passei o nível 8!",
                "medal-4": "Passei o nível 10!",
                "medal-5": "Terminei o jogo com 3 vidas!"
            },

        };
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