# react-native-rotating-view

**Creates a view that rotates when the device's orientation changes**

## Installation

```
npm install --save react-native-rotating-view
```

This package depends on [`react-native-orientation`](https://github.com/yamill/react-native-orientation),
please make sure you follow the instructions for manual linking.

Do not forget to add `Orientation.lockToPortrait()` in your initial view to lock orientation and enable the effect.

## Usage

```js
var RotatingView = require('react-native-rotating-view');

...
  <RotatingView 
    portraitStyle={{ ... }}
    landscapeRightStyle={{ ... }}
    landscapeLeftStyle={{ ... }}
  >
    <YourElement />
  </RotatingView>
...
```

## Demo

We use `react-native-rotating-view` in **Apperture** [iOS](https://itunes.apple.com/app/id1314756787) / [Android](https://play.google.com/store/apps/details?id=com.aperture)



## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Wassim Gharbi
