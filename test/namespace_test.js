var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['schultz'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'helper': function(test) {
    test.expect(1);
    // tests here
    var f = [
      'test/main.mustache'
    ],
    ns = "test",
    contents = grunt.helper('namespace',f, ns),
    expected = "this.test = {\n  // Assist with code organization, by breaking up logical components of code\n// into modules.\nmodule: function() {\n// Internal module cache.\nvar modules = {};\n\n// Create a new module reference scaffold or load an existing module.\nreturn function(name) {\n  // If this module has already been created, return it.\n  if (modules[name]) {\n    return modules[name];\n  }\n\n  // Create a module and save it under this name\n  return modules[name] = { Views: {} };\n};\n}(),\n\nfetchAndRender: function(tpl,info) {\nwindow.Templates = window.templates || {};\n\n// make sure that the template has been Templatized\nif (Templates[tpl]) {\n  var h = Hogan.compile(Templates[tpl]);\n  var partial = {};\n  if (info && info.partial) {\n    if (typeof(info.partial) === \'object\') {\n      if (info.partial.length > 1) {\n        partial.partial = Hogan.compile(Templates[info.partial.shift()]);\n      }\n      for (var i in info.partial) {\n        partial[info.partial[i]] = Hogan.compile(Templates[info.partial[i]]);\n      }\n    } else {\n      // include the partial as {{> partial}} and {{> partialName}} so it can be referenced with and without a wrapper\n      partial.partial = Hogan.compile(Templates[info.partial]);\n      partial[info.partial] = Hogan.compile(Templates[info.partial]);\n    }\n    return h.render(info,partial);\n  } else if (info){\n    return h.render(info);\n  } else {\n    return h.render();\n  }\n}\n},\n\n// Keep active application instances namespaced under an app object.\napp: _.extend({}, Backbone.Events) \n};";
    
    test.equal(contents, expected, 'Should return markup with inline styles.');
    test.done();
  }
};