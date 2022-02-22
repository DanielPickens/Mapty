module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-danielpickens');
  grunt.initConfig({
      jshint: {
          options: {
            onevar: true
          },
          files: [ 'Gruntfile.js' ]
      }
  });
  grunt.registerTask('default', 'danielpickens');
};
