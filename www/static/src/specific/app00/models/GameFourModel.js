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
        this.animalData = {
            1: {
                "name": "Coala",
                "description": "O coala é um mamífero marsupial que habita na Austrália. O coala alimenta-se exclusivamente de folhas de eucalipto e retira destas não só o alimento, mas também a água de que precisa."
            },
            2: {
                "name": "Macaco",
                "description": "Os macacos são mamíferos que, tal como nós, pertencem à ordem dos primatas. Existem dezenas de espécies de macacos, e grande parte delas habitam em florestas tropicais da América, África e Ásia."
            },
            3: {
                "name": "Hipopótamo",
                "description": "Os hipopótamos são mamíferos herbívoros. O hipopótamo-comum é um animal de grande porte que vive em grupo, em rios da África subsariana."
            },
            4: {
                "name": "Coelho",
                "description": "Os coelhos são mamíferos herbívoros. Estes animais apresentam umas grandes orelhas, uma cauda curta, e correm muito depressa."
            },
            5: {
                "name": "Porco",
                "description": "Os porcos são mamíferos. Estes animais são, tal como nós, omnívoros, o que significa que se alimentam de frutas e vegetais, mas também de carne."
            },
            6: {
                "name": "Ouriço-cacheiro",
                "description": "Os ouriço-cacheiros são animais mamíferos. Estes animais apresentam o corpo coberto de espinhos para se protegerem dos ataques de predadores, e alimentam-se de pequenos insetos."
            },
            7: {
                "name": "Galo e galinha",
                "description": "Galos e galinhas são aves que se alimentam essencialmente de grãos de milho. As galinhas põe ovos, que depois de chocados dão origem aos pintainhos."
            },
            8: {
                "name": "Urso",
                "description": "Os ursos são animais mamíferos. O urso panda-gigante apresenta uma pelagem preta e branca e é um animal omnívoro, embora se alimente quase exclusivamente de folhas de bambu."
            },
            9: {
                "name": "Cão",
                "description": "Os cães são animais mamíferos e foram, provavelmente, o primeiro animal a ser domesticado pelos humanos. Os cães são carnívoros e têm um olfato muito apurado."
            },
            10: {
                "name": "Pinguim",
                "description": "Os pinguins são aves e, consoante a espécie, podem alimentar-se de peixe ou de plâncton. Estes animais são característicos do Hemisfério Sul."
            }
        };
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
         * @param {Number} limit - The biggest number in the array. Always starts in 1.
         */

        let i,
            list = [],
        length = Math.max(num, limit);
        for (i = 1; i <= length; i++) {
            if(i <= limit) {
                list.push(i);
            } else {
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

    _generateCalcs(num, limit1, limit2, hidden) {
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
            possibleValuesTerm2 = this._getPossibleValues(num, limit2);

        for (i = 0; i < num; i++) {
            term1 = possibleValuesTerm1.pop();
            term2 = possibleValuesTerm2.pop();
            result = Math.round(term1 * term2);

            list.push({
                "hidden": hidden ? hidden : this._randomizeTermToHide(),
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
            limit2,
            hidden;

        if (this.level === 1) {
            // 6 calcs
            // term1 - 1 to 5
            // term2 - 1 to 5

            num = 6;
            limit1 = 5;
            limit2 = 5;
            hidden = "result";
        } else if (this.level === 2) {
            // 6 calcs
            // term1 - 1 to 5
            // term2 - 1 to 10

            num = 6;
            limit1 = 5;
            limit2 = 10;
            hidden = "result";
        } else if(this.level === 3) {
            // 6 calcs
            // term1 - 1 to 5
            // term2 - 1 to 5

            num = 6;
            limit1 = 5;
            limit2 = 5;
        } else if (this.level === 4) {
            // 6 calcs
            // term1 - 1 to 5
            // term2 - 1 to 10

            num = 6;
            limit1 = 5;
            limit2 = 10;
        } else if (this.level > 4 && this.level <= 7) {
            // 6 calcs
            // term1 - 1 to 10
            // term2 - 1 to 9
            // avoid 10 x 10 = 100 because of space available

            num = 6;
            limit1 = 10;
            limit2 = 9;
        } else if (this.level > 7) {
            // 12 calcs
            // term1 - 1 to 10
            // term2 - 1 to 9
            // avoid 10 x 10 = 100 because of space available

            num = 12;
            limit1 = 10;
            limit2 = 9;
        }

        this.current = {
            "game": "game-4",
            "level": this.level,
            "numberOfCards": num,
            "calcs": this._generateCalcs(num, limit1, limit2, hidden)
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