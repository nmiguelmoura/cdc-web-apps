/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.states.specificStates.components.HelperComponent = class HelperComponent extends PIXI.Container {
    constructor() {
        super();

        this._textures = {
            animals: {},
            food: {}
        };

        this.CONTAINER_CENTER = {
            x: 446,
            y: 255
        };

        this.NUMBER_SCALE = 0.4;
        this.FOOD_POSITION = {
            x: 40,
            y: 40
        };

        this.MAX_SCALING = {
            1: 1,
            2: 0.92,
            3: 0.85,
            4: 0.78,
            5: 0.71,
            6: 0.58,
            7: 0.50,
            8: 0.45,
            9: 0.40,
            10: 0.36
        };

        this._init();
    }

    clear() {
        this._container.term1.clear();
        this._container.term2.clear();
        this._container.food.clear();
    }

    update(data) {
        this._textures.animals[data.term1] = this._textures.animals[data.term1] || PIXI.Texture.fromFrame('animal_' + data.term1);
        this._animal.texture = this._textures.animals[data.term1];

        this._container.food.update(data.term1, data.term2, data.result);

        this._container.term1.update(1, data.term1, this.NUMBER_SCALE);
        this._container.term2.update(2, data.term2, this.NUMBER_SCALE);

        this._container.food.scale.set(Math.min(this.MAX_SCALING[data.term1], (1.06 - 0.07 * data.term2)));

        let foodDim = this._container.food.getBounds(),
            term1Dim = this._container.term1.getBounds(),
            term2Dim = this._container.term2.getBounds();

        this._container.term1.position.x = -term1Dim.width;
        this._container.term1.position.y = foodDim.height / 2 + this.FOOD_POSITION.y - term1Dim.height / 2;

        this._container.term2.position.x = foodDim.width / 2 + this.FOOD_POSITION.x - term2Dim.width / 2;

        this._container.lines.clear()
            .lineStyle(2, 0xFFFFFF, 1)
            .moveTo(this.FOOD_POSITION.x, 20)
            .lineTo(this.FOOD_POSITION.x + foodDim.width, 20)
            .moveTo(20, this.FOOD_POSITION.y)
            .lineTo(20, this.FOOD_POSITION.y + foodDim.height);

        if (data.game === 'game-2') {
            this._container.term2.visible = false;
        }

        let containerDim = this._container.getBounds();
        this._container.position.set(this.CONTAINER_CENTER.x - containerDim.width / 2, this.CONTAINER_CENTER.y - containerDim.height / 2);
    }

    _addCentralContainer() {
        // Central container.
        this._container = new PIXI.Container();

        // Food elements container.
        this._container.food = new nmm.states.specificStates.components.FoodComponent();
        this._container.food.position.set(this.FOOD_POSITION.x, this.FOOD_POSITION.y);
        this._container.addChild(this._container.food);

        // Line component.
        this._container.lines = new PIXI.Graphics();
        this._container.addChild(this._container.lines);

        // Multiply signal.
        let multiply = new PIXI.Sprite(PIXI.Texture.fromFrame('font-multiply'));
        multiply.scale.set(this.NUMBER_SCALE);
        this._container.addChild(multiply);

        // Term 1.
        this._container.term1 = new nmm.states.specificStates.components.NumberComponent();
        this._container.addChild(this._container.term1);

        // Term 2.
        this._container.term2 = new nmm.states.specificStates.components.NumberComponent();
        this._container.term2.position.y = -40;
        this._container.addChild(this._container.term2);

        this.addChild(this._container);
    }

    _addAnimal() {
        this._animal = new PIXI.Sprite();
        this._animal.position.set(778, 160);
        this.addChild(this._animal);
    }

    _init() {
        this._addAnimal();
        this._addCentralContainer();
    }
};