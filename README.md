ember-computed-injection
========================

A tiny script for injecting any dependency into an Ember class definition.

### Usage


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
#### ES6 (ember-cli/Ember App Kit)
```javascript
var injection = Ember.computed.injection;

var MyController = Ember.Controller.extend({
  geolocation: injection('service:geolocation')
});

export default MyController;
```
Since both ember-cli and Ember App Kit use a customer Resolver, all you need to do is place the item you are injecting inside a pluralized directory name of the same type. e.g. `app/services/geolocation.js`