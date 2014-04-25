/**
 * ember-computed-injection v0.1.0
 * (c) 2014 Jay Phelps
 * MIT Licensed
 * https://github.com/jayphelps/ember-computed-injection
 * @license
 */
(function (Ember) {
  var get = Ember.get,
      computed = Ember.computed,
      Container = Ember.Container;

  computed.injection = function (fullName, options) {
    return computed('container', function () {
      var container = get(this, 'container');
      Ember.assert('Ember.computed.injection requires instances to have an instance of Ember.Container at this.container but none was found. You\'re probably manually creating objects? Learn about containers: https://github.com/emberjs/website/pull/1293', container instanceof Container);
      return container.lookup(fullName, options);
    }).readOnly()
  };

})(Ember);