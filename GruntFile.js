/**
 * Created by Nuno on 11/09/17.
 */

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        /*watch: {
         files: ['www/static/src/ecma2015/*.js'],
         tasks: ['babel']
         },*/
        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'www/static/src/',
                        src: ['**/*.js'],
                        dest: 'grunt_temp_folder/babel/'
                    }
                ]
            }
        },
        uglify: {
            libs: {
                files: {
                    'www/static/dist/libs.js': [
                        'node_modules/createjs-soundjs/lib/soundjs-0.6.2.min.js',
                        'node_modules/gsap/src/minified/easing/EasePack.min.js',
                        'node_modules/gsap/src/minified/TweenLite.min.js',
                        'node_modules/pixi.js/dist/pixi.min.js'
                    ]
                }
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'grunt_temp_folder/babel/',
                        src: ['**/*.js'],
                        dest: 'grunt_temp_folder/uglify/'
                    }
                ]
            }
        },
        concat: {
            options: {
                banner: '/*Created by Nuno Machado --> http://github.com/nmiguelmoura*/\n'
            },
            engine: {
                src: [
                    'grunt_temp_folder/uglify/general/namespace.js',
                    'grunt_temp_folder/uglify/general/genericStates/TemplateState.js',
                    'grunt_temp_folder/uglify/general/genericStates/views/LogoView.js',
                    'grunt_temp_folder/uglify/general/genericStates/Logo.js',
                    'grunt_temp_folder/uglify/general/genericStates/views/LoadingView.js',
                    'grunt_temp_folder/uglify/general/genericStates/Loading.js',
                    'grunt_temp_folder/uglify/general/tools/Pool.js',
                    'grunt_temp_folder/uglify/general/tools/utils.js',
                    'grunt_temp_folder/uglify/general/components/LiveCounter.js',
                    'grunt_temp_folder/uglify/general/components/MedalPopupComponent.js',
                    'grunt_temp_folder/uglify/general/components/CorrectionMC.js',
                    'grunt_temp_folder/uglify/general/components/Button.js',
                    'grunt_temp_folder/uglify/general/components/TexturedButton.js',
                    'grunt_temp_folder/uglify/general/dom/InputField.js',
                    'grunt_temp_folder/uglify/general/dom/Div.js',
                    'grunt_temp_folder/uglify/general/engine/AssetsLoader.js',
                    'grunt_temp_folder/uglify/general/engine/FSM.js',
                    'grunt_temp_folder/uglify/general/engine/Resize.js',
                    'grunt_temp_folder/uglify/general/engine/Observer.js',
                    'grunt_temp_folder/uglify/general/engine/Application.js',
                ],
                dest: 'grunt_temp_folder/concat/engine.js',
            },
            app00: {
                src: [
                    'grunt_temp_folder/concat/engine.js',
                    'grunt_temp_folder/uglify/specific/app00/**/**/*.js'
                ],
                dest: 'www/static/dist/app00.js',
            }
        },
        clean: {
            build: {
                src: ['grunt_temp_folder']
            }
        }
    });

    /*grunt.loadNpmTasks('grunt-contrib-watch');

     grunt.event.on('watch', function(action, filepath, target) {
     grunt.config('babel', filepath);
     });*/

    grunt.registerTask('default', ['babel', 'uglify', 'concat', 'clean']);
};
