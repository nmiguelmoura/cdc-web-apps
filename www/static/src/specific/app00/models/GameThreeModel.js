/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.states.specificStates.models.GameThreeModel = class GameThreeModel {
    constructor() {
        // game-3 for button 3 - Calcular
        this.game = null;

        // Game difficulty.
        this.difficulty = null;

        // Variable to store current game data.
        this.current = null;

        this.medalScore = [10, 20, 30, 40, 50, 100, 500];
        this.medalChain = [10, 20, 50];
    }

    generateExercise() {
        let term1 = Math.round(1 + Math.random() * 9),
            term2 = Math.round(1 + Math.random() * 9),
            result = Math.round(term1 * term2),
            hidden;
        if (this.difficulty === 1 || this.difficulty === 2) {
            hidden = 'result';

        } else {
            let rand = Math.round(Math.random() * 60);
            if(rand <= 20) {
                hidden = 'term1';
            } else if (rand >20 && rand <= 40) {
                hidden = 'term2';
            } else if (rand > 40) {
                hidden = 'result';
            }
        }

        this.current = {
            game: this.game,
            difficulty: this.difficulty,
            hidden: hidden,
            term1: term1,
            term2: term2,
            result: result
        };

        return this.current;
    }

    validateAnswer(value) {
        if (this.current.hidden === 'result') {
            return this.current.result === parseInt(value);
        } else if (this.current.hidden === 'term2') {
            return this.current.term2 === parseInt(value);
        } else if (this.current.hidden === 'term1') {
            return this.current.term1 = parseInt(value);
        }
    }

    checkMedalScore(score) {
        let i,
            length = this.medalScore.length;
        score = parseInt(score);

        for (i = 0; i < length; i++) {
            if (this.medalScore[i] === score) {
                // i + i corresponds to the medal level.
                // See config.js for more info.
                return i + 1;
            }
        }
    }

    checkMedalChain(chain) {
        let i,
            length = this.medalChain.length;
        chain = parseInt(chain);

        for (i = 0; i < length; i++) {
            if (this.medalChain[i] === chain) {
                // i + i corresponds to the medal level.
                // See config.js for more info.
                return i + 8;
            }
        }
    }

};