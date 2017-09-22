/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.foodTextures = {};
nmm.states.specificStates.components.FoodComponent = class FoodComponent extends PIXI.Container {
    constructor () {
        super();
        this._sprites = [];
    }

    clear() {
        this._sprites.forEach(function (sp) {
            this.removeChild(sp);
            nmm.pool.returnToPool(sp);
        }, this);
        this._sprites.splice(0);
    }

    _compose (term1, term2, result) {
        let i,
            length = this._sprites.length,
            texture,
            sp,
            x,
            y;

        const HORIZONTAL_SPACING = 160,
            VERTICAL_SPACING = 95;

        nmm.foodTextures[term1] = nmm.foodTextures[term1] || PIXI.Texture.fromFrame('obj_' + term1);
        texture = nmm.foodTextures[term1];

        for (i = 0; i < length; i++) {
            sp = this._sprites[i];
            sp.texture = texture;

            x = (i % term2) * HORIZONTAL_SPACING;
            y = Math.floor(i / term2) * VERTICAL_SPACING;
            sp.position.set(x, y);
        }
    }

    _adjustNumberOfSprites(value) {
        let spritesLength = this._sprites.length,
            diff = spritesLength - value,
            i,
            sp;
        if(diff > 0) {
            for(i = value; i < spritesLength; i++) {
                sp = this._sprites[i];
                this.removeChild(sp);
                nmm.pool.returnToPool(sp);
            }
            this._sprites.splice(value, diff);
        } else if (diff < 0){
            for(i = 0; i < Math.abs(diff); i++) {
                sp = nmm.pool.borrowFromPool();
                this._sprites.push(sp);
                this.addChild(sp);
            }
        }
    }

    update(term1, term2, result) {
        term1 = term1 || 0;
        term2 = term2 || 0;
        result = result || 0;
        this._adjustNumberOfSprites(result.toString());
        this._compose(term1, term2, result);
    }
};