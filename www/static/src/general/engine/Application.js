/**
 * Created by Nuno on 11/09/17.
 */
'use strict';
nmm.runtime.singletons = nmm.runtime.singletons || {};
nmm.runtime.singletons.application = null;

nmm.engine.Application = class {

    constructor () {
        // singleton
        if (!nmm.runtime.singletons.application) {
            nmm.runtime.singletons.application = this;
        }

        this.WIDTH = 1024;
        this.HEIGHT = 768;

        return nmm.runtime.singletons.application;
    }

    get defaultResolution () {
        return {
            width: this.WIDTH,
            height: this.HEIGHT
        };
    }

    get devicePixelRatio () {
        let dpr = window.devicePixelRatio;
        return dpr <= 2 ? dpr : 2;
    }

    get pixi () {
        return {
            app: this._pixi,
            renderer: this._pixi.renderer,
            view: this._pixi.view,
            stage: this._pixi.stage
        };
    }

    get windowResolution () {
        return this._resize.windowResolution;
    }

    get margins () {
        return this._resize.margins;
    }

    get resolution () {
        return this._resize.resolution;
    }

    _resizeApp () {
        this._resize = new nmm.engine.Resize (this.pixi.renderer, this.pixi.stage, this.defaultResolution);
        this._resize.init ();
    }

    _setupPIXI () {
        this._pixi = new PIXI.Application(this.WIDTH, this.HEIGHT, {
            resolution: this.devicePixelRatio,
            autoResize: true,
            backgroundColor: 0xFFFFFF
        });

        document.body.appendChild(this._pixi.view);
    }

    init () {
        this._setupPIXI ();
        this._resizeApp();
    }

};

nmm.runtime.app = new nmm.engine.Application ();
nmm.runtime.app.init();