/**
 * Created by Nuno on 11/09/17.
 */

module.exports= function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        /*watch: {
            files: ['www/static/src/ecma2015/*.js'],
            tasks: ['babel']
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'www/static/src/ecma2015',
                        src: ['*.js'],
                        dest: 'www/static/src/babel'
                    }
                ]
            }
        }*/
    });

    /*grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.config('babel', filepath);
    });

    grunt.registerTask('default', ['babel']);*/
};
