/**
 * Created by Nuno on 25/09/17.
 */
'use strict';
nmm.states.specificStates.models.GameFourModel = class GameFourModel {
    constructor() {
        this.level = null;
        this.lives = null;
        this.current = null;
        this.selected = null;
        this.correct = null;
    }

    checkIfMedalLevel() {
        let medalLevel = null;
        switch(this.level) {
            case 1:
                medalLevel = 1;
                break;

            case 5:
                medalLevel = 2;
                break;

            case 8:
                medalLevel = 3;
                break;

            case 10:
                medalLevel = 4;
                break;
        }

        return medalLevel;
    }

    validateAnswer(value, key) {
        value = parseInt(value);
        let calc = this.current.calcs[key];
        if(value === calc[calc.hidden]) {
            this.correct++;
            return true;
        }

        return false;
    }

    _getPossibleValues(num, limit) {
        /**
         * Builds a list (array) with all possible values for a given term, and shuffles the positions.
         * @param {Number} num - Number of values needed.
         * @param {Number} limit - The biggest number in the array. Always starts in 1.
         */

        let i,
            list = [];
        for (i = 1; i <= num; i++) {
            if(i <= limit) {
                // If i less or equal to limit, use i value.
                list.push(i);
            } else {
                // If i bigger than limit, generate random value between 1 and limit.
                list.push(Math.round(1 + Math.random() * (limit - 1)));
            }
        }

        return nmm.tools.utils.shuffleArray(list);
    }

    _randomizeTermToHide() {
        let rand = Math.round(Math.random() * 60);
        if(rand <= 20) {
            return 'term1';
        } else if(rand > 20 && rand <= 40) {
            return 'term2';
        } else {
            return 'result';
        }
    }

    _generateCalcs(num, limit1, limit2) {
        /**
         * Generates random calculations with term1, term2 and result.
         * @param {Number} num - Number of different calculations to generate.
         * @param {Number} limit1 - The max term1 value to generate. Generate between 1 and limit. Max 10.
         * @param {Number} limit2 - The max term2 value to generate. Generate between 1 and limit. Max 10.
         * @return {Object} - The object returned has all calculations generated.
         */

        let i,
            term1,
            term2,
            result,
            list = [],
            possibleValuesTerm1 = this._getPossibleValues(num, limit1),
            possibleValuesTerm2 = this._getPossibleValues(num, limit1);

        for (i = 0; i < num; i++) {
            term1 = possibleValuesTerm1.pop();
            term2 = possibleValuesTerm2.pop();
            result = Math.round(term1 * term2);

            list.push({
                "hidden": this._randomizeTermToHide(),
                "term1": term1,
                "term2": term2,
                "result": result,
                "key": i
            });
        }

        return list;
    }

    newLevel() {
        /**
         * Creates a new level.
         */

        this.level++;

        // num - number of calcs.
        let num,

            // limit - max value for term. Min is always 1.
            limit1,
            limit2;

        if (this.level <= 2) {
            // 6 calcs
            // term1 - 1 to 5
            // term2 - 1 to 5

            num = 6;
            limit1 = 5;
            limit2 = 5;
        } else if (this.level > 2 && this.level <= 4) {
            // 6 calcs
            // term1 - 1 to 5
            // term2 - 1 to 10

            num = 6;
            limit1 = 5;
            limit2 = 10;
        } else if (this.level > 4 && this.level <= 7) {
            // 6 calcs
            // term1 - 1 to 10
            // term2 - 1 to 10

            num = 6;
            limit1 = 10;
            limit2 = 10;
        } else if (this.level > 7) {
            // 12 calcs
            // term1 - 1 to 10
            // term2 - 1 to 10

            num = 12;
            limit1 = 10;
            limit2 = 10;
        }

        this.current = {
            "game": "game-4",
            "level": this.level,
            "numberOfCards": num,
            "calcs": this._generateCalcs(num, limit1, limit2)
        };

        return this.current;
    }

    reset() {
        /**
         * Reset current game for level 0 and lives to 3.
         */
        this.level = 0;
        this.lives = 3;
    }
};