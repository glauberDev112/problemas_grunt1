module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css':'source/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    'dist/styles/main.min.css':'source/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['source/styles/**/*.less'],
                tasks: ['less:development']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                         {
                            match: 'ENDEREÇO_DO_CSS',
                            replacement: './style/main.css'
                         }
                    ]
                },
                files: [
                    {
                        extend: true,
                        flatten: true,
                        src: ['source/index.html'],
                        dest: 'dev/',
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                         {
                            match: 'ENDEREÇO_DO_CSS',
                            replacement: './style/main.min.css'
                         }
                    ]
                },
                files: [
                    {
                        extend: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/',
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                  './index.html': 'source/index.html'
              }
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-replace')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')

    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['less','htmlmin','replace']) 
}
