/**
 * Created by Nuno on 22/09/17.
 */
'use strict';
nmm.states.specificStates.views.GameOverView = class GameOverView extends PIXI.Container {
    constructor() {
        super();
        this._init();
    }

    update(success) {
        this._mc.gotoAndStop(success);
    }

    _addMC() {
        this._mc = new PIXI.extras.AnimatedSprite([
            PIXI.Texture.fromFrame('retry'),
            PIXI.Texture.fromFrame('success')
        ]);
        this._mc.anchor.set(0.5);
        this._mc.position.set(512, 384);
        this._mc.rotation = -Math.PI / 8.2;
        this.addChild(this._mc);
    };

    _init() {
        this._addMC();
    }
};