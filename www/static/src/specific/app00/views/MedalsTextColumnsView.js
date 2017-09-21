/**
 * Created by Nuno on 20/09/17.
 */
'use strict';
nmm.states.specificStates.views.MedalsTextColumnsView = class MedalsTextColumnsView extends PIXI.Container {
    constructor () {
        super();
        this._columns = {};
        this._textStyle = {
            fontFamily: 'Arial',
            fontSize: '20px',
            fill: '#FFFFFF'
        };
        this._medalTextures = {};
        this.COL_1_2_X = 92;
        this.COL_1_1_X = 348;
        this._init ();
    }

    show (data) {
        let medalNum = Object.keys(data["medals"]).length;

        if (medalNum > 5) {
            this._columns[1].visible = true;
            this._columns[0].position.x = this.COL_1_2_X;
        } else {
            this._columns[1].visible = false;
            this._columns[0].position.x = this.COL_1_1_X;
        }

        this._medalTextures[data.currentlyOnGame] = this._medalTextures[data.currentlyOnGame] || PIXI.Texture.fromFrame('medal_' + data.currentlyOnGame);

        let i,
            medalTexture = this._medalTextures[data.currentlyOnGame],
            col,
            medal,
            medalName;
        for(i = 1; i <= medalNum; i++) {
            if (i <= 5) {
                col = 0;
            } else {
                col = 1;
            }

            medalName = "medal-" + i;
            medal = this._columns[col]["medals"][medalName];
            medal.medal.texture = medalTexture;
            medal.text.text = data.texts[medalName];

            medal.alpha = data["medals"][medalName] ? 1 : 0.4;
        }
    }

    _addMedal () {
        let field = new PIXI.Container(),
            medal,
            text;

        medal = new PIXI.Sprite();
        field.addChild(medal);

        text = new PIXI.Text('teste', this._textStyle);
        text.position.set(60, 20);
        field.medal = medal;
        field.text = text;
        field.addChild(text);

        return field;
    }

    _addColumn (colNumber) {
        let col = new PIXI.Container();
        col.position.set(92 + colNumber * 513, 322);

        col.medals = {};

        var i,
            length = 5,
            medal;

        for(i = 0; i < length; i++) {
            medal = this._addMedal();
            medal.position.y = i * 82;
            col.addChild(medal);
            col.medals['medal-' + (i + 1 + 5 * colNumber)] = medal;
        }

        this.addChild(col);

        this._columns[colNumber] = col;
    }

    _init () {
        this._addColumn(0);
        this._addColumn(1);
    }
};
