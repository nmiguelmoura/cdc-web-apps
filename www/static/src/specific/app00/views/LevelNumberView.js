/**
 * Created by Nuno on 27/09/17.
 */
'use strict';
nmm.states.specificStates.views.LevelNumberView = class LevelNumberView extends PIXI.Container {
    constructor() {
        super();
        this._init();
    }

    update(level) {
        /**
         * Update level text.
         * @param {Number} level - The level number.
         */

        this._field.text = 'Nível ' + level;
    }

    _addField() {
        this._field = new PIXI.Text('', {
            fontFamily: 'Arial',
            fontSize: '80px',
            fill: '#FFFFFF'
        });
        this._field.anchor.set(0.5);
        this._field.position.set(512, 378);
        this.addChild(this._field);
    }

    _init() {
        this._addField();
    }
};