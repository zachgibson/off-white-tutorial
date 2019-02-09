import React from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
const ballWidth = deviceWidth * 1.25;
const initialTop = -ballWidth * 0.1;
const initialLeft = -ballWidth * 0.2;

export default class extends React.Component {
  constructor(props) {
    super(props);

    const { animatedValue, index } = this.props;

    this.animatedBubbleTranslateYVal = animatedValue.interpolate({
      inputRange: [
        deviceWidth * (index - 1),
        deviceWidth * (index - 0.25),
        deviceWidth * index,
        deviceWidth * (index + 0.25),
        deviceWidth * (index + 1)
      ],
      outputRange: [
        deviceHeight - ballWidth / 2,
        initialTop - 40,
        initialTop,
        initialTop - 40,
        deviceHeight - ballWidth / 2
      ]
    });
    this.animatedBubbleTranslateXVal = animatedValue.interpolate({
      inputRange: [
        deviceWidth * (index - 1),
        deviceWidth * index,
        deviceWidth * (index + 1)
      ],
      outputRange: [
        initialLeft + (deviceWidth + initialLeft),
        initialLeft,
        initialLeft
      ]
    });
    this.animatedBubbleScaleVal = animatedValue.interpolate({
      inputRange: [
        deviceWidth * (index - 1),
        deviceWidth * (index - 0.4),
        deviceWidth * index,
        deviceWidth * (index + 0.4),
        deviceWidth * (index + 1)
      ],
      outputRange: [
        48 / ballWidth,
        48 / ballWidth,
        1.5,
        48 / ballWidth,
        48 / ballWidth
      ]
    });
  }

  render() {
    const {
      gradientData: { colors, locations }
    } = this.props;

    return (
      <Animated.View
        style={{
          position: "absolute",
          top: initialTop,
          left: initialLeft,
          width: ballWidth,
          height: ballWidth,
          transform: [
            { translateX: this.animatedBubbleTranslateXVal },
            { translateY: this.animatedBubbleTranslateYVal }
          ]
        }}
      >
        <Animated.View
          style={{
            transform: [{ scale: this.animatedBubbleScaleVal }],
            width: ballWidth,
            height: ballWidth,
            borderRadius: ballWidth / 2,
            overflow: "hidden"
          }}
        >
          <LinearGradient
            colors={colors}
            locations={locations}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 0.0 }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      </Animated.View>
    );
  }
}
