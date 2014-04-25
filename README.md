ember-computed-injection
========================

A computed property for injecting any dependency into an Ember class definition. Sort of like `needs` for everything else. Based off [on-going discussion](http://discuss.emberjs.com/t/services-a-rumination-on-introducing-a-new-role-into-the-ember-programming-model/4947/46?u=jayphelps) about a possible Service convention, but not dependent on it what-so-ever. You can inject any object type you want!

## Usage

#### ES5 (traditional)
```javascript
App.ExampleController = Ember.Controller.extend({
  geolocation: Ember.computed.injection('service:geolocation')
});
```
This assumes you have some existing class defined like this:
```javascript
App.GeolocationService = Ember.Object.extend();
```
Notice that Ember will resolve it `service:geolocation => App.GeolocationService` just like it would `controller:example => App.ExampleController`.

Alternatively, you can register things using an initializer, which is useful if the injection should always be a singleton:

```javascript
Ember.onLoad('Ember.Application', function (Application) {
  Application.initializer({
    name: 'services',

    initialize: function(container, application) {
      // App.GeolocationService is some hypothetical class you defined prior 
      application.register('service:geolocation', App.GeolocationService, { singleton: true });
    }
  });
});
```
#### ES6 Modules (ember-cli/Ember App Kit)
```javascript
var injection = Ember.computed.injection;

var ExampleController = Ember.Controller.extend({
  geolocation: injection('service:geolocation')
});

export default ExampleController;
```
Since both ember-cli and Ember App Kit use a customer Resolver, all you need to do is place the item you are injecting inside a pluralized directory name of the same type. e.g. `app/services/geolocation.js`

If you want the injection to be a singleton, [set up an initializer](http://iamstef.net/ember-app-kit/guides/naming-conventions.html#initializers)

## Any gotchas?

Only for users who stray outside the Ember-idiomatic beaten path and manually create class instances.

Instances must have an `Ember.Container` assigned at `this.container`. Ember will handle this for you when resolving routes, controllers, views, etc but if you manually `.create()` a class, it does not come with a container, so it won't be able to resolve your dependency. You can either pass an existing container along or use the container itself to create your class instances.[Learn more](https://github.com/emberjs/website/pull/1293)

## License
MIT Licensed
