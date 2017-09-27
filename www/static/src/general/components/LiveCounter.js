/**
 * Created by Nuno on 27/09/17.
 */
'use strict';
nmm.components.LiveCounter = class LiveCounter extends PIXI.Container {
    constructor(max, hspacing) {
        super();
        this._max = max;
        this._hspacing = hspacing;
        this._hearts = [];
        this._init();
    }

    takeLive() {
        let i,
            startIndex = this._hearts.length - 1,
            heart;

        for(i = startIndex; i >= 0; i--) {
            heart = this._hearts[i];

            if(heart.on) {
                heart.on = false;
                TweenLite.to(heart, 0.5, {alpha: 0.2});
                TweenLite.to(heart.scale, 0.5, {x: 0, y: 0, ease: Back.easeIn.config(3)});
                break;
            }
        }
    }

    reset() {
        this._hearts.forEach(function (heart) {
            heart.alpha = 1;
            heart.scale.set(1);
            heart.on = true;
        });
    }

    _addHearts() {
        let i,
            heart,
            texture = PIXI.Texture.fromFrame('heart'),
            dim;

        for(i = 0; i < this._max; i++) {
            heart = new PIXI.Sprite(texture);
            heart.anchor.set(0.5, 0.5);
            heart.on = true;
            if(!dim) {
                dim = heart.getBounds();
            }

            heart.position.x = 0 - i * (dim.width + this._hspacing);
            this.addChild(heart);
            this._hearts.push(heart);
        }
    }

    _init() {
        this._addHearts();
    }
};