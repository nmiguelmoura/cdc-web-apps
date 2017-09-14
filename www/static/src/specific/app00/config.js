/**
 * Created by Nuno on 13/09/17.
 */
'use strict';
nmm.app.config = {
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
            ss1: ['static/assets/specific/app00/atlas00@1x.json'],
            ss2: ['static/assets/specific/app00/atlas00@2x.json', 'static/assets/specific/app00/atlas01@2x.json']
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
            {
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
            }
        ]
    }
};