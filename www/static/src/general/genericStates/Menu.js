/**
 * Created by Nuno on 12/09/17.
 */

'use strict';
nmm.states.genericStates.Menu = class Menu extends nmm.states.genericStates.TemplateState {
    constructor () {
        super();
        this.name = 'menu';

        var n = new PIXI.Graphics();
        n.beginFill(0x0000FF, 1)
            .drawRect(0, 0, 100, 100)
            .endFill();

        this.addChild(n);
    }
};