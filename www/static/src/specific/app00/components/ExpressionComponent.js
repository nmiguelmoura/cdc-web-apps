/**
 * Created by Nuno on 22/09/17.
 */
'use strict';
nmm.states.specificStates.components.ExpressionComponent = class ExpressionComponent extends PIXI.Container {
    constructor() {
        super();

        this.MULTIPLY_WIDTH = 83;
        this.EQUAL_WIDTH = 78;
        this.SPACING = 50;

        this._correctionPos = null;

        this._init();
    }

    clear() {
        this._term1.clear();
        this._term2.clear();
        this._result.clear();
        this.inputField.hide();
    }

    updateNumber(term, value) {
        let object;
        if (term === 'result') {
            object = this._result;
        } else if (term === 'term2') {
            object = this._term2;
        } else if (term === 'term1') {
            object = this._term1;
        }

        if(value !== undefined && value !== null && value !== "") {
            object.update(term, value);
        } else {
            object.update();
        }
    }

    update(data) {
        this.resetInput();
        this._correction.hide();
        this._term1.update('term1', data.term1, 1);
        this._term2.update('term2', data.term2, 1);
        this._result.update('result', data.result, 1);

        this._repositionElements(data);

        if (data.hidden === 'result') {
            this._result.update();
        } else if (data.hidden === 'term2') {
            this._term2.update();
        } else if(data.hidden === 'term1') {
            this._term1.update();
        }
    }

    _changeHandler(value) {
        let gameData = this.parent._controller.currentGame;
        if(value) {
            value = parseInt(value);
            value = value.toString();
            if(gameData.game === 'game-1') {
                value = value.substring(0, 3);
            } else if (gameData.game === 'game-2') {
                value = value.substring(0, gameData.term2.toString().length);
            }

            this.updateNumber(gameData.hidden, value);

        } else {
            this.updateNumber(gameData.hidden, value);
        }
        this.inputField.setValue(value);
    };

    resetInput() {
        this.inputField.show();
        this.inputField.setValue("");
        this.inputField.focus();
    }

    wrongAnswer() {
        this._correction.show(0, {x: this._correctionPos, y: 220}, false);
        this.inputField.hide();
    }

    correctAnswer() {
        this._correction.show(1, {x: this._correctionPos, y: 220}, true);
        this.inputField.hide();
    }

    resetAnswer(hidden) {
        this.resetInput();

        if (hidden === 'result') {
            this._result.update();
        } else if (hidden === 'term2') {
            this._term2.update();
        } else if(hidden === 'term1') {
            this._term1.update();
        }
    }

    repositionInputField(data) {
        let pos;
        if(data.hidden === 'result') {
            pos = this.toGlobal(this._result.position);
        } else if (data.hidden === 'term2') {
            pos = this.toGlobal(this._term2.position);
        } else if (data.hidden === 'term1') {
            pos = this.toGlobal(this._term1.position);
        }
        this.inputField.setPosition({
            left: pos.x,
            top: pos.y
        })
    }

    _repositionLine(x, width) {
        this._line.position.x = x -20;
        this._line.width = width + 40;
    }

    _repositionElements(data) {
        // Update term1 dimensions.
        let term1Dim = this._term1.getBounds(),
            term2Dim = this._term2.getBounds(),
            resultDim = this._result.getBounds(),
            increment = term1Dim.width + this.SPACING;

        if(data.hidden === 'term1') {
            this._repositionLine(0, term1Dim.width);
            this.inputField.setDimensions({
                width: term1Dim.width + 40
            });
        }

        // Position multiply.
        this._multiply.position.x = increment;
        increment += this.MULTIPLY_WIDTH + this.SPACING;

        // Position term2.
        this._term2.position.x = increment;
        if (data.hidden === 'term2') {
            this._repositionLine(increment, term2Dim.width);
            this.inputField.setDimensions({
                width: term2Dim.width + 40
            });
            this._correctionPos = this._term2.position.x + term2Dim.width / 2;
        }
        increment += term2Dim.width + this.SPACING;

        // Position equal sign.
        this._equal.position.x = increment;
        increment += this.EQUAL_WIDTH + this.SPACING;

        // Position result.
        this._result.position.x = increment;
        if (data.hidden === 'result') {
            this._repositionLine(increment, resultDim.width);
            this.inputField.setDimensions({
                width: resultDim.width + 40
            });
            this._correctionPos = this._result.position.x + resultDim.width / 2;
        }
    }

    _addCorrectionMC() {
        this._correction = new nmm.components.CorrectionMC();
        this.addChild(this._correction);
    }

    _addInputField() {
        this.inputField = new nmm.dom.InputField({
            type: 'number',
            height: 150,
            display: 'none',
            trackChange: true,
            callback: this._changeHandler.bind(this)
        });
        this.inputField.style.opacity = 0;
        this.inputField.enable();
    };

    _addLine() {
        this._line = new PIXI.Sprite(PIXI.Texture.fromFrame('answerLine'));
        this._line.position.y = 140;
        this.addChild(this._line);
    }

    _addSymbols() {
        this._multiply = new PIXI.Sprite(PIXI.Texture.fromFrame('font-multiply'));
        this._multiply.position.y = 20;
        this.addChild(this._multiply);

        this._equal = new PIXI.Sprite(PIXI.Texture.fromFrame('font-equal'));
        this._equal.position.y = 30;
        this.addChild(this._equal);
    }

    _addNumbers() {
        this._term1 = new nmm.states.specificStates.components.NumberComponent();
        this.addChild(this._term1);

        this._term2 = new nmm.states.specificStates.components.NumberComponent();
        this.addChild(this._term2);

        this._result = new nmm.states.specificStates.components.NumberComponent();
        this.addChild(this._result);
    }

    _init() {
        this._addNumbers();
        this._addSymbols();
        this._addLine();
        this._addInputField();
        this._addCorrectionMC();
    }
};