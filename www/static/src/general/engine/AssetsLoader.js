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

        this._texturesLoaded = false;
        this._audioLoaded = false;

        return nmm.runtime.singletons.assetsLoader;
    }

    get loader () {
        return this._loader;
    }

    _loadComplete () {
        if (this._texturesLoaded && this._audioLoaded) {
            this._callback();
        }
    }

    _loadAudio () {
        var self = this,
            audio = nmm.app.config.audio;

        // Load audio with soundjs.
        createjs.Sound.on('fileload', function () {
            self._audioLoaded = true;
            self._loadComplete();
        });

        if(audio.alternateExtensions.length > 0) {
            createjs.Sound.alternateExtensions = audio.alternateExtensions;
        }

        audio.files.forEach(function (file) {
            createjs.Sound.registerSound(file.src, file.label);
        });

        audio.spriteSheets.forEach(function (spriteSheet) {
            createjs.Sound.registerSound(spriteSheet);
        });
    }

    _loadTextures () {
        var self = this,
            dpr = nmm.runtime.app.devicePixelRatio;

        this._loader = PIXI.loader;

        nmm.app.config.textures.spriteSheets['ss' + dpr].forEach(function (sprite) {
            self._loader.add(sprite);
        });

        if (nmm.app.config.textures.logo['ss' + dpr]) {
            self._loader.add('logo', nmm.app.config.textures.logo['ss' + dpr]);
        }

        if (nmm.app.config.textures.otherTextures.length > 0) {
            nmm.app.config.textures.otherTextures.forEach(function (texture) {
                self._loader.add(texture.label, texture['ss1']);
            });
        }

        this._loader.load(function (loader, resources) {
            self._texturesLoaded = true;
            self._loadComplete();
        });
    }

    init(callback) {
        this._callback = callback;
        this._loadTextures();
        this._loadAudio();
    }
};