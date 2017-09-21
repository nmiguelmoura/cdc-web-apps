/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.states.specificStates.models.GameOneModel = class GameOneModel {
    constructor () {
        // game-1 para botão 1 - Descobrir
        // game-2 para botão 2 - Preencher
        this.game = null;

        // Level selected by user.
        this.level = null;

        // Level current count.
        // Always starts at 0.
        this.levelCount = 0;

        // Variable to store current game data.
        this.current = null;
    }

    generateExercise () {
        this.levelCount++;
        this.current = {
            game: this.game,
            term1: this.level,
            term2: this.levelCount,
            result: this.level * this.levelCount
        };
        return this.current;
    }

    validateAnswer (value) {
        if(this.current.game === 'game-1') {
            return this.current.result === parseInt(value);
        } else if (this.current.game === 'game-2') {
            return this.current.term2 === parseInt(value);
        }
    }

};