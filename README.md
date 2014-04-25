ember-computed-injection
========================

A *really* tiny script for injecting any dependency into an Ember class definition.

## Usage

#### ES5 (traditional)
```javascript
App.MyController = Ember.Controller.extend({
  geolocation: Ember.computed.injection('service:geolocation')
});
```
If the item you are injecting doesn't already exist in the container, you'll need to register it prior:
```javascript
Ember.onLoad('Ember.Application', function (Application) {
  Application.initializer({
    name: 'services',

    initialize: function(container, application) {
      // App.GeolocationService is some hypothetical class you defined prior 
      application.register('service:geolocation', App.GeolocationService);
    }
  });
});
```
#### ES6 Modules (ember-cli/Ember App Kit)
```javascript
var injection = Ember.computed.injection;

var MyController = Ember.Controller.extend({
  geolocation: injection('service:geolocation')
});

export default MyController;
```
Since both ember-cli and Ember App Kit use a customer Resolver, all you need to do is place the item you are injecting inside a pluralized directory name of the same type. e.g. `app/services/geolocation.js`

If you want the injection to be a singleton, [set up an initializer](http://iamstef.net/ember-app-kit/guides/naming-conventions.html#initializers)

## Any gotchas?

Only for users who stray outside the Ember-idiomatic beaten path and manually create class instances.

Instances must have an `Ember.Container` assigned at `this.container`. Ember will handle this for you when resolving routes, controllers, views, etc but if you manually `.create()` a class, it does not come with a container, so it won't be able to resolve your dependency. You can either pass an existing container along or use the container itself to create your class instances.[Learn more](https://github.com/emberjs/website/pull/1293)

## License
MIT Licensed
