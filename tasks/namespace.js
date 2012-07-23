/*
 * grunt-namespace
 * https://github.com/reputation.com/grunt-namespace
 *
 * Copyright (c) 2012 Reputation.com
 * Authored by: Jeff Harnois jeff.harnois@reputation.com
 * Licensed under the MIT license.
 *
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md
  
  // ==========================================================================
  // GLOBAL VARS
  // ==========================================================================
  var file = grunt.file,
      log = grunt.log,
      config = grunt.config;

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('namespace', 'Add a namespace to a file.', function() {
    // make sure we get some data
    if (!this.data) { return false; }
    
    // make sure the destination we get is a file, not a path
    if (this.file.dest[this.file.dest.length - 1] === '/') {
       grunt.fatal('never use path as filename');
       return false;
     }
    
    // send unprocessed file.src object to namespace, it will extract css and tpl as it needs
    var files = this.file.src,
        dest = this.file.dest;
        namespace = '';
    dest = dest.replace("../Assets/","");
    dest = dest.replace("Apps/dist/","");
    namespace = dest.replace("/debug/js/namespace.js","");

    grunt.file.write(dest, grunt.helper('namespace', files, namespace));

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }
    console.log('no errors');
    // 
    // // Otherwise, print a success message.
    log.writeln('File "' + this.file.dest + '" created.');
    return true;
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================
  
  grunt.registerHelper('namespace', function(files, namespace) {
    var contents = '';

    files.map(function(filepath) {
      var raw = file.read(filepath);
      contents += raw;
    });

    return "this." + namespace + " = {\n  " + contents + " \n};";
  });

};