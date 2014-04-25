/**
 * ember-computed-injection v0.0.1
 * (c) 2014 Jay Phelps
 * MIT Licensed
 * https://github.com/jayphelps/ember-computed-injection
 * @license
 */
(function (Ember) {
  var get = Ember.get,
      computed = Ember.computed;

  computed.injection = function (fullName, options) {
    return computed('container', function () {
      return get(this, 'container').lookup(fullName, options);
    }).readOnly()
  };

})(Ember);