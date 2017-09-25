/**
 * Created by Nuno on 22/09/17.
 */
'use strict';
nmm.components.MedalPopupComponent = class MedalPopupComponent extends PIXI.Container {
    constructor(frames) {
        super();
        this._frames = frames;
        this._textStyle = {
            fontFamily: 'Arial',
            fontSize: '16px',
            fill: 0x000000,
            wordWrap: true,
            wordWrapWidth: 160,
            lineHeight: 24
        };
        this._init();
    }

    show(game, level) {
        TweenLite.to(this, 0.5, {x: 796});
        TweenLite.to(this, 0.5, {x: 1025, delay: 3});
        this._medal.gotoAndStop(game - 1);
        this._field.text = nmm.app.config.medals["game-" + game]["medal-" + level];
    }

    _addField() {
        this._field = new PIXI.Text('', this._textStyle);
        this._field.position.set(60, 12);
        this.addChild(this._field);
    }

    _addMedal() {
        this._medal = new PIXI.extras.AnimatedSprite(this._frames);
        this._medal.position.set(5, 0);
        this.addChild(this._medal);
    }

    _addBg() {
        let graph = new PIXI.Graphics()
            .beginFill(0xFFFFFF, 0.9)
            .drawRect(0, 0, 10, 10)
            .endFill();

        let bg = new PIXI.Sprite(graph.generateTexture());
        bg.width = 230;
        bg.height = 68;
        this.addChild(bg);
    }

    _init() {
        this.position.set(1025, 10);
        this._addBg();
        this._addMedal();
        this._addField();
    }
};