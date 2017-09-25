/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.numberComponentTextures = {
    red: {},
    yellow: {},
    blue: {}
};
nmm.states.specificStates.components.NumberComponent = class NumberComponent extends PIXI.Container {
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

    _compose (term, value) {
        let valueLength = value.length,
            i,
            v,
            color;

        switch (term) {
            case 'term1':
                color = 'red';
                break;
            case 'term2':
                color = 'yellow';
                break;
            case 'result':
            default:
                color = 'blue';
                break;

        }

        let incremented = 0,
            sp;

        const SPACING = 15;

        for(i = 0; i < valueLength; i++) {
            v = value[i];
            sp = this._sprites[i];
            nmm.numberComponentTextures[color][v] = nmm.numberComponentTextures[color][v] || PIXI.Texture.fromFrame('font-' + v + '-' + color);
            sp.texture = nmm.numberComponentTextures[color][v];
            sp.position.x = incremented;
            incremented += (sp.getBounds().width + SPACING);
        }
    }

    _adjustNumberOfSprites(value) {
        let valueLength = value.length,
            spritesLength = this._sprites.length,
            diff = spritesLength - valueLength,
            i,
            sp;
        if(diff > 0) {
            for(i = valueLength; i < spritesLength; i++) {
                sp = this._sprites[i];
                this.removeChild(sp);
                nmm.pool.returnToPool(sp);
            }
            this._sprites.splice(valueLength, diff);
        } else if (diff < 0){
            for(i = 0; i < Math.abs(diff); i++) {
                sp = nmm.pool.borrowFromPool();
                this._sprites.push(sp);
                this.addChild(sp);
            }
        }
    }

    updateInt(term, scale) {
        this.scale.set(1);
        let value = 'i';
        this._adjustNumberOfSprites(value);
        this._compose(term, 'i');
        this.scale.set(scale || 1);
    }

    update(term, value, scale) {
        if(arguments.length === 0) {
            // reset
            this.clear();
        } else {
            this.scale.set(1);
            value = value >=0 ? value.toString() : '0';
            this._adjustNumberOfSprites(value);
            this._compose(term, value);
            this.scale.set(scale || 1);
        }
    }
};