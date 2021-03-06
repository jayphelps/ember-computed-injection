ember-computed-injection
========================

##### *This project is DEPRECATED. Use [`Ember.inject.controller()`](http://emberjs.com/api/#method_inject_controller) and [`Ember.inject.service()`](http://emberjs.com/api/#method_inject_service) instead; available in [Ember v1.10.0+](http://emberjs.com/blog/2015/02/07/ember-1-10-0-released.html)*

A computed property for injecting any dependency into an Ember class definition. Sort of like `needs` for everything else. Based off [on-going discussion](http://discuss.emberjs.com/t/services-a-rumination-on-introducing-a-new-role-into-the-ember-programming-model/4947/46?u=jayphelps) about a possible Service convention, but not dependent on it what-so-ever. You can inject any object type you want! In fact, you can even use `Ember.computed.injection` as a replacement for `needs` all together.

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

**By default, injections will return a singleton**. You can provide an options hash to change this behavior:

```javascript
App.ExampleController = Ember.Controller.extend({
  geolocation: Ember.computed.injection('service:geolocation', { singleton: false })
});

```
Alternatively, you can globally change this behavior using an initializer:

```javascript
Ember.onLoad('Ember.Application', function (Application) {
  Application.initializer({
    name: 'services',

    initialize: function (container, application) {
      // App.GeolocationService is some hypothetical class you defined prior 
      application.register('service:geolocation', App.GeolocationService, { singleton: false });
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

See the [ES5 usage for more info](#es5-traditional)

## Any gotchas?

Only for users who stray outside the Ember-idiomatic beaten path and manually create class instances.

Instances must have an `Ember.Container` assigned at `this.container`. Ember will handle this for you when resolving routes, controllers, views, etc but if you manually `.create()` a class, it does not come with a container, so it won't be able to resolve your dependency. You can either pass an existing container along or use the container itself to create your class instances.[Learn more](https://github.com/emberjs/website/pull/1293)

## License
MIT Licensed
