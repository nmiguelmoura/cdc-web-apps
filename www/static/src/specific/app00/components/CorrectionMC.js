/**
 * Created by Nuno on 22/09/17.
 */
'use strict';
nmm.correctionTextures = {};
nmm.states.specificStates.components.CorrectionMC = class CorrectionMC extends PIXI.extras.AnimatedSprite {
    constructor() {
        nmm.correctionTextures.correct = nmm.correctionTextures.correct || PIXI.Texture.fromFrame('certo');
        nmm.correctionTextures.wrong = nmm.correctionTextures.wrong || PIXI.Texture.fromFrame('errado');
        super([nmm.correctionTextures.wrong, nmm.correctionTextures.correct]);
        this.anchor.set(0.5);
        this._init();
    }

    hide() {
        this.alpha = 0;
    }

    hideAnimated() {
        TweenLite.to(this, 0.3, {alpha: 0});
        TweenLite.to(this.scale, 0.3, {x: 0, y: 0});
    }

    show(type, position, fixed) {
        // type - boolean.
        //       true or 1 for correct.
        //       false or 0 for wrong.

        // position is the new position where it will appear.
        // fixed - boolean.
        //         true - stays visible after certain amount of time.
        //         false - goes invisible after a certain amount of time.

        this.alpha = 0;
        this.scale.set(2);
        this.gotoAndStop(type);
        this.position.set(position.x, position.y);
        TweenLite.to(this, 0.5, {alpha: 1});
        TweenLite.to(this.scale, 1, {x: 1, y: 1, ease: Elastic.easeOut.config(1, 0.3)});

        if(!fixed) {
            TweenLite.delayedCall(2, function () {
                this.hideAnimated();
            }, [], this);
        }
    }

    _init() {
        this.alpha = 0;
    }
};