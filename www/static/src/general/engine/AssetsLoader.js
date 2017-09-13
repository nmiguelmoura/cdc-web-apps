/**
 * Created by Nuno on 13/09/17.
 */

nmm.runtime.singletons = nmm.runtime.singletons || {};
nmm.runtime.singletons.assetsLoader = null;

nmm.engine.AssetsLoader = class {
    constructor() {
        if (!nmm.runtime.singletons.assetsLoader) {
            nmm.runtime.singletons.assetsLoader = this;
        }

        return nmm.runtime.singletons.assetsLoader;
    }

    get loader () {
        return this._loader;
    }

    _loadSprites () {
        var self = this;

        this._loader = PIXI.loader;

        var textures = nmm.app.config.textures.SPRITESHEETS['ss' + nmm.runtime.app.devicePixelRatio].forEach(function (sprite) {
            self._loader.add(sprite);
        });

        if (nmm.app.config.textures.background) {
            this._loader.add(nmm.app.config.textures.background);
        }

        this._loader.load(function (loader, resources) {
            self._callback();
        });
    }

    init(callback) {
        this._callback = callback;
        this._loadSprites();
    }
};