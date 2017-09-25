/**
 * Created by Nuno on 13/09/17.
 */
'use strict';
nmm.app.config = {
    // Set if loading state is to be destroyed after initial loading,
    // or to be kept to load more assets.
    destroyLoadingAfterInit: false,
    // Set color for html body.
    backgroundColorDocument: 0x1ABC9C,

    // Set url for body tile.
    tileURL: 'static/assets/general/tile.png',

    // Set PIXI transparent background.
    transparent: true,

    // Set background color for PIXI app. Only used if transparent is false.
    backgroundColorPIXI: null,

    // Set DOM elements. Create a div aligned and resizable with the canvas.
    DOMElements: true,

    // URL for textures.
    textures: {
        // Set url for spriteSheets.
        spriteSheets: {
            ss1: [
                'static/assets/specific/app00/images/sprites/atlas00@1x.json'
            ],
            ss2: [
                'static/assets/specific/app00/images/sprites/atlas00@2x.json',
                'static/assets/specific/app00/images/sprites/atlas01@2x.json',
                'static/assets/specific/app00/images/sprites/atlas02@2x.json'
            ]
        },

        // Set url for logo.
        logo: {
            ss1: 'static/assets/general/logo.png',
            ss2: 'static/assets/general/logo@2x.png'
        },

        // Set url for other image files.
        otherTextures: [
            /*{
                label: 'abc',
                ss1: 'static/assets/general/filename.png',
                ss2: 'static/assets/general/filename@2x.png'
            }*/
        ]
    },

    gameFourTexturePackage: [
        {
            label: 'level-1',
            ss1: 'static/assets/specific/app00/images/loose/game_animal_1.jpg',
            ss2: 'static/assets/specific/app00/images/loose/game_animal_1.jpg'
        },
        {
            label: 'level-2',
            ss1: 'static/assets/specific/app00/images/loose/game_animal_2.jpg',
            ss2: 'static/assets/specific/app00/images/loose/game_animal_2.jpg'
        },
        {
            label: 'level-3',
            ss1: 'static/assets/specific/app00/images/loose/game_animal_3.jpg',
            ss2: 'static/assets/specific/app00/images/loose/game_animal_3.jpg'
        },
        {
            label: 'level-4',
            ss1: 'static/assets/specific/app00/images/loose/game_animal_4.jpg',
            ss2: 'static/assets/specific/app00/images/loose/game_animal_4.jpg'
        },
        {
            label: 'level-5',
            ss1: 'static/assets/specific/app00/images/loose/game_animal_5.jpg',
            ss2: 'static/assets/specific/app00/images/loose/game_animal_5.jpg'
        },
        {
            label: 'level-6',
            ss1: 'static/assets/specific/app00/images/loose/game_animal_6.jpg',
            ss2: 'static/assets/specific/app00/images/loose/game_animal_6.jpg'
        },
        {
            label: 'level-7',
            ss1: 'static/assets/specific/app00/images/loose/game_animal_7.jpg',
            ss2: 'static/assets/specific/app00/images/loose/game_animal_7.jpg'
        },
        {
            label: 'level-8',
            ss1: 'static/assets/specific/app00/images/loose/game_animal_8.jpg',
            ss2: 'static/assets/specific/app00/images/loose/game_animal_8.jpg'
        },
        {
            label: 'level-9',
            ss1: 'static/assets/specific/app00/images/loose/game_animal_9.jpg',
            ss2: 'static/assets/specific/app00/images/loose/game_animal_9.jpg'
        },
        {
            label: 'level-10',
            ss1: 'static/assets/specific/app00/images/loose/game_animal_10.jpg',
            ss2: 'static/assets/specific/app00/images/loose/game_animal_10.jpg'
        }
    ],

    // URL and data for audio.
    audio: {
        // Include alternate extensions: ['ogg'].
        alternateExtensions: [],

        // Import audio files no sprited.
        files: [
            /*{
                src: 'static/assets/specific/app00/audioSprite.mp3',
                label: 'audioSprite'
            }*/
        ],

        // Import data for audio sprites.
        spriteSheets: [
            /*{
                "src": "static/assets/specific/app00/audioSprite_.mp3",
                "data": {
                    "audioSprite": [
                        {
                            "id": "silence",
                            "startTime": 0,
                            "duration": 1000
                        },
                        {
                            "id": "correct",
                            "startTime": 2000,
                            "duration": 1817.6643990929708
                        },
                        {
                            "id": "music",
                            "startTime": 5000,
                            "duration": 24058.775510204083
                        },
                        {
                            "id": "wrong",
                            "startTime": 31000,
                            "duration": 2433.1746031746065
                        }
                    ]
                }
            }*/
        ]
    },
    medals: {
        "game-1": {
            "medal-1": "Já conheço a Tabuada do 1!",
            "medal-2": "Já conheço a Tabuada do 2!",
            "medal-3": "Já conheço a Tabuada do 3!",
            "medal-4": "Já conheço a Tabuada do 4!",
            "medal-5": "Já conheço a Tabuada do 5!",
            "medal-6": "Já conheço a Tabuada do 6!",
            "medal-7": "Já conheço a Tabuada do 7!",
            "medal-8": "Já conheço a Tabuada do 8!",
            "medal-9": "Já conheço a Tabuada do 9!",
            "medal-10": "Já conheço a Tabuada do 10!"
        },
        "game-2": {
            "medal-1": "Preenchi a Tabuada do 1!",
            "medal-2": "Preenchi a Tabuada do 2!",
            "medal-3": "Preenchi a Tabuada do 3!",
            "medal-4": "Preenchi a Tabuada do 4!",
            "medal-5": "Preenchi a Tabuada do 5!",
            "medal-6": "Preenchi a Tabuada do 6!",
            "medal-7": "Preenchi a Tabuada do 7!",
            "medal-8": "Preenchi a Tabuada do 8!",
            "medal-9": "Preenchi a Tabuada do 9!",
            "medal-10": "Preenchi a Tabuada do 10!"
        },
        "game-3": {
            "medal-1": "Acertei 10 respostas!",
            "medal-2": "Acertei 20 respostas!",
            "medal-3": "Acertei 30 respostas!",
            "medal-4": "Acertei 40 respostas!",
            "medal-5": "Acertei 50 respostas!",
            "medal-6": "Acertei 100 respostas!",
            "medal-7": "Acertei 500 respostas!",
            "medal-8": "Acertei 10 respostas seguidas!",
            "medal-9": "Acertei 20 respostas seguidas!",
            "medal-10": "Acertei 50 respostas seguidas!"
        },
        "game-4": {
            "medal-1": "Passei o nível 1!",
            "medal-2": "Passei o nível 5!",
            "medal-3": "Passei o nível 8!",
            "medal-4": "Passei o nível 10!",
            "medal-5": "Terminei o jogo com 3 vidas!"
        }
    }
};