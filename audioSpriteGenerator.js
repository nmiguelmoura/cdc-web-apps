var fs = require('fs'),
    audiosprite = require('audiosprite');

var sourceFolder = 'audio/app00/',
    filePaths = [];

fs.readdir(sourceFolder, function (err, files) {
    if (err) {
        return console.error(err);
    }

    files.forEach(function (file) {
        var extension = file.substr(file.length - 3);
        if (extension === "mp3" || extension === 'wav') {
            filePaths.push(sourceFolder + file);
        }
    });

    buildAudioSprite();
});

function buildAudioSprite() {
    var opts = {
        output: 'www/static/assets/specific/app00/sound/audiosprite',
        export: 'mp3',
        format: 'createjs',
        silence: 1,
        bitrate: 64
    };

    audiosprite(filePaths, opts, function (err, obj) {
        if (err) return console.error(err);

        console.log("-> Audio Sprite created!");

        fs.writeFile("www/static/assets/specific/app00/sound/audiospriteData.json", JSON.stringify(obj, null, 2), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("-> JSON file created!");
        });

    });
}
