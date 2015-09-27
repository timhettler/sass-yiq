'use strict';

module.exports = function (grunt) {
  // Loads in any grunt tasks in the package.json file
  require('load-grunt-tasks')(grunt);

  var taskConfig = {
    githooks: {
      all: {
        'pre-commit': 'test sassdoc',
      }
    },

    clean: {
      test: ['test/output']
    },

    rubySass: { // test with Ruby version of Sass
      test: 'mkdir -p test/output/rubySass && sass test/tests.scss test/output/rubySass/test.css --sourcemap=none'
    },

    mochacli: { // uses LibSass
      all: ['test/test_shim.js']
    },

    sassdoc: {
      src: 'src/sass/'
    }
  };

  grunt.renameTask('exec', 'rubySass');
  grunt.initConfig(taskConfig);

  grunt.registerTask('test', ['githooks', 'clean:test', 'rubySass:test', 'mochacli']);
  grunt.registerTask('default', ['test']);

};