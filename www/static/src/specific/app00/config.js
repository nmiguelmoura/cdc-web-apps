/**
 * Created by Nuno on 13/09/17.
 */

nmm.app.config = {
    textures: {
        background: null,
        spriteSheets: {
            ss1: ['static/assets/specific/app00/atlas00@1x.json'],
            ss2: ['static/assets/specific/app00/atlas00@2x.json', 'static/assets/specific/app00/atlas01@2x.json']
        }
    },
    audio: {
        alternateExtensions: [],
        files: [
            {
                src: 'static/assets/specific/app00/audioSprite.mp3',
                label: 'audioSprite'
            }
        ],
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