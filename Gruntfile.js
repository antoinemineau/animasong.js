module.exports = function(grunt) {
    var banner = '/*\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
        ' *\n' +
        ' * This program is free software: you can redistribute it and/or modify\n' +
        ' * it under the terms of the GNU General Public License as published by\n' +
        ' * the Free Software Foundation, either version 3 of the License, or\n' +
        ' * (at your option) any later version.\n' +
        ' *\n' +
        ' * This program is distributed in the hope that it will be useful,\n' +
        ' * but WITHOUT ANY WARRANTY; without even the implied warranty of\n' +
        ' * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n' +
        ' * GNU General Public License for more details.\n' +
        ' *\n' +
        ' * You should have received a copy of the GNU General Public License\n' +
        ' * along with this program.  If not, see <http://www.gnu.org/licenses/>.\n' +
        ' **/\n';
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: banner
            },
            dist: {
                src: [
                    'node_modules/handlebars/dist/handlebars.js',
                    'node_modules/dancer/dancer.js',
                    'src/*.js',
                    'src/plugins/*.js',
                    'src/providers/*.js'
                ],
                dest: 'dist/animasong-standalone.js',
            }
        },
        uglify: {
            options: {
                banner: banner
            },
            build: {
                src: ['dist/animasong-standalone.js'],
                dest: 'dist/animasong-standalone.min.js'
            }
        },
        jshint: {
            files: ['src/*.js']
        },
        nodeunit: {
            all: [
                'test/*_test.js'
            ]
        },
        handlebars: {
            options: {
                namespace: '<%= pkg.name %>' + '.Templates'
            },
            all: {
                files: {
                    "src/templates.js": ["assets/templates/*.hbs"]
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "assets/css/animasong.css": "assets/less/animasong.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true,
                },
                files: {
                    "assets/css/animasong.min.css": "assets/less/animasong.less"
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-less');
    
    grunt.registerTask('default', ['concat', 'uglify', 'handlebars', 'less']);
};