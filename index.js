/**
 * @providesModule RotatingView
 */
'use strict';

import _ from 'lodash';
var React = require('react');
var createReactClass = require('create-react-class');
var {
  View,
  Animated,
  StyleSheet
} = require('react-native');
var Orientation = require('react-native-orientation')



var RotatingView = createReactClass({
  getDefaultProps: function() {
    return {
      duration: 120,
    };
  },

  getInitialState: function() {
    return {
      orientation: Orientation.getInitialOrientation() == 'LANDSCAPE' ? 'LANDSCAPE-RIGHT' : 'PORTRAIT',
      animation: new Animated.Value(0)
    };
  },

  componentDidMount: function() {
    Orientation.addSpecificOrientationListener(this._orientationDidChange);
  },

  componentWillUnmout: function() {
    Orientation.removeSpecificOrientationListener(this._orientationDidChange);
  },

  _orientationDidChange: function(orientation) {
    if (orientation === 'LANDSCAPE-LEFT' ||
        orientation === 'LANDSCAPE-RIGHT' ||
        orientation === 'PORTRAIT') {
        this.setState({
          orientation: orientation
        });
    }
    if (orientation === 'LANDSCAPE-LEFT') {
      Animated.timing(
        this.state.animation,
        {
          toValue: 90,
          duration: this.props.duration,
        }
      ).start();
    } else if (orientation === 'LANDSCAPE-RIGHT') {
      Animated.timing(
        this.state.animation,
        {
          toValue: -90,
          duration: this.props.duration,
        }
      ).start();
    } else if (orientation === 'PORTRAIT') {
      Animated.timing(
        this.state.animation,
        {
          toValue: 0,
          duration: this.props.duration,
        }
      ).start();
    }
  },

  render: function() {
    var { orientation, animation } = this.state;
    var {
      style,
      portraitStyle,
      landscapeLeftStyle,
      landscapeRightStyle,
      children,
      ...props
    } = this.props;

    var interpolatedRotateAnimation = animation.interpolate({
      inputRange: [-90, 0, 90],
      outputRange: ['-90deg', '0deg', '90deg']
    });


    var content = (
      <Animated.View
        style={[
          style,
          styles.container,
          {
            transform: [{rotate: interpolatedRotateAnimation}]
          },
          orientation == 'PORTRAIT' ? portraitStyle : null,
          orientation == 'LANDSCAPE-LEFT' ? landscapeLeftStyle : null,
          orientation == 'LANDSCAPE-RIGHT' ? landscapeRightStyle : null
        ]}
        {...props}
      >
        {children}
      </Animated.View>
    );

    return content;
  }
});

var styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  }
});

module.exports = RotatingView;
