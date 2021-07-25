module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      connect: {
        options: {
            port: 9000,
            hostname: 'localhost'
        },
        runtime: {
            options: {
                middleware: function (connect) {
                    return [
                        lrSnippet,
                        mountFolder(connect, 'instrumented'),
                        mountFolder(connect, '.......')
                    ];
                }
            }
        }
    },
    instrument: {
        files: 'src/**/*.js',
        options: {
        lazy: true,
            basePath: "instrumented"
        }
    },
    protractor_coverage: {
        options: {
            keepAlive: true,
            noColor: false,
            coverageDir: 'coverage',
            args: {
                baseUrl: 'http://localhost:9000'
            }
        },
        local: {
            options: {
                configFile: 'config.js'
            }
        }
    },
    makeReport: {
        src: 'coverage/*.json',
        options: {
            type: 'lcov',
            dir: 'coverage',
            print: 'detail'
        }
    }
    });
  
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-protractor-coverage');
  
    // Default task(s).
    grunt.registerTask('default', ['uglify']);
  
  };