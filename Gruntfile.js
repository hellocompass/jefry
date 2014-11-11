module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      build: {
        src: ['www_dev/js/**/*.js'],
        dest: 'www/js/black_in.js'
      }
    },

    copy: {
      scripts: {
        cwd: 'www_dev/js',
        src: ['**/*.js'],
        dest: 'www/js',
        expand: true
      },

      images: {
        cwd: 'www_dev/img',
        src: [ '**/*' ],
        dest: 'www/img',
        expand: true
      },

      html: {
        cwd: 'www_dev',
        src: [ '*' ],
        dest: 'www',
        expand: true
      }
    },

    clean: {
      build: {
        src: [ 'www/js' ]
      },
      stylesheets: {
        src: [ 'www/css/**/*.css', '!www/css/application.css' ]
      },
      scripts: {
        src: [
          'www/js/**/*.js',
          'www/js/**/*.jsx',
          'www_dev/js/components/**/*.js',
          'www_dev/js/routers/blackin_router.js',
          '!www_dev/js/components/**/*.jsx',
          '!www/js/black_in.js' ]
      },
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'www_dev/css',
          src: ['application.scss'],
          dest: 'www/css',
          ext: '.css'
        }]
      }
    },

    cssmin: {
      build: {
        files: {
          'www/css/application.css': [ 'www/css/application.css' ]
        }
      }
    },

    react: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'www_dev/js',
            src: ['**/*.jsx'],
            dest: 'www_dev/js',
            ext: '.js'
          }
        ]
      }
    },

    uglify: {
      build: {
        files: {
          'www/js/black_in.js': [ 'www/js/black_in.js' ]
        }
      }
    },

    jasmine : {
      src : ['www/js/**/*.js'],
      options: {
        specs : 'spec/**/*spec.js',
        helpers: 'spec/helpers/*.js',
        keepRunner: true
      }
    },

  });

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.registerTask(
    'stylesheets',
    'Compiles the stylesheets.',
    ['sass', 'cssmin', 'clean:stylesheets']
  );

  grunt.registerTask(
    'devStylesheets',
    'Compiles the stylesheets.',
    ['sass', 'clean:stylesheets']
  );

  grunt.registerTask(
    'scripts',
    'Compiles the JavaScript files.',
    ['react:build', 'browserify:build', 'uglify', 'clean:scripts']
  );

  grunt.registerTask(
    'devScripts',
    'Compiles, but does not minify scripts,',
    ['react:build', 'browserify:build', 'clean:scripts']
  );

  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory.',
    ['clean:build', 'copy:html', 'stylesheets', 'scripts', 'copy:images']
  );

  grunt.registerTask(
    'devBuild',
    'Compiles all of the assets and copies the files to the build directory, without minification.',
    ['clean:build', 'copy:html', 'devStylesheets', 'devScripts', 'copy:images']
  );

  grunt.registerTask(
    'spec',
    'Run Jasmine tests.',
    ['copy:vendorScripts', 'coffee', 'jasmine']
  );

  grunt.registerTask('default', []);

};
