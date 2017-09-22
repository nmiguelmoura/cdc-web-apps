/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.tools.Pool = class {
    constructor(max) {
        this._pool = [];
        this._totalCount = 0;
        this._max = max || 100;
        this._defaultTexture = PIXI.Texture.EMPTY;
    }

    _createNew() {
        if(this._totalCount < this._max) {
            return new PIXI.Sprite();
        } else {
            console.log('POOL MAX REACHED!');
        }
    }

    returnToPool(object) {
        object.scale.set(1);
        object.position.set(0, 0);
        object.anchor.set(0);
        object.pivot.set(0, 0);
        object.texture = this._defaultTexture;
        this._pool.push(object);
    }

    borrowFromPool () {
        if(this._pool.length === 0) {
            return this._createNew();
        } else {
            return this._pool.pop();
        }
    }

};