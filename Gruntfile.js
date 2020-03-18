// 封装函数
module.exports = function(grunt){
    // 项目和任务
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        // 任务选项，覆盖内置默认值
        connect: {
            port: 9000,
            open: true,
            livereload: 38729,
            hostname: 'localhost'
        },
        // 任意指定目标
        development:{
            // 目标选项，覆盖任务选项
            options:{
                middleware: function(connect){
                    return [
                        connect.static('src')
                    ];
                }
            }
        },
        clean: ['report/**/*.*'],
        jshint: {
            options: {
                jshint:'.jshintrc',
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
                reporter: './reporter.js',
                reporterOutput: 'report/jshint.xml',
                force: true
            },
            build: ['Gruntfile.js', 'src/**/*.js','!src/bower_components/**/*'],
        },
        htmlhint_inline: {
            options:{
                htmlhintrc: '.htmlhintrc',
                reporter: './htmlreporter.js',
                reporterOutput: 'report/htmlhint.xml',
                force: true
            },
            dest: {
                src: ['src/**/*.html', '!src/bower_components/**/*']
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc',
                quiet_all: true,
                absoluteFilePathsForFormatters: true,
                formatters:[{id: 'csslint-xml', dest: 'report/csslint.xml'}],
                force: true
            },
            strict: {
                options: {
                  import: 2
                },
                src: ['src/**/*.css']
            }
        },

        // development watch 
        watch: {
            build: ['src/**/*.js', 'src/**/*.css'],
            tasks: ['clean', 'jshint', 'csslint', 'htmlhint_inline'],
            options: {spawn: false}
        }

    });

    // 自动加载所有插件任务
    require('load-grunt-tasks')(grunt);
    // 如果未按照上述插件，需手动通知
    // ==================================================
    // =   grunt.loadNpmTasks('grunt-contrib-concat');  =
    // ==================================================


    // 默认任务
    grunt.registerTask('default', ['clean','jshint', 'csslint', 'htmlhint_inline']);
}