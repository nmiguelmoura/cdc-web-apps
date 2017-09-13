/**
 * Created by Nuno on 12/09/17.
 */
'use strict';
nmm.states.genericStates.TemplateState = class TemplateState extends PIXI.Container {
    constructor (name) {
        super();
        this.name = "";
        this.TWEEN_IN_TIME = 0.5;
        this.TWEEN_OUT_TIME = 0.5;
        this.alpha = 0;
    }

    animateIn () {
        TweenLite.to(this, this.TWEEN_IN_TIME, {alpha: 1});
        TweenLite.delayedCall(this.TWEEN_IN_TIME, function () {
            this._stateIn();
        }, [], this);
    }

    animateOut () {
        TweenLite.to(this, this.TWEEN_OUT_TIME, {alpha: 0});
        TweenLite.delayedCall(this.TWEEN_OUT_TIME, function () {
            this._stateOut();
        }, [], this);
    }

    _stateIn () {}

    _stateOut () {}

    destroy () {
        super.destroy({
            children: true,
            textures: true
        });
    }
};
