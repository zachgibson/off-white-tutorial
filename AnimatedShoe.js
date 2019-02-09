import React from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";

const { width: deviceWidth } = Dimensions.get("window");

export default class extends React.Component {
  constructor(props) {
    super(props);

    const { animatedValue, index } = this.props;

    this.animatedShoeScaleVal = animatedValue.interpolate({
      inputRange: [
        deviceWidth * (index - 0.8),
        deviceWidth * index,
        deviceWidth * (index + 0.2)
      ],
      outputRange: [0, 1, 0],
      extrapolate: "clamp"
    });
    this.animatedShoeRotationVal = animatedValue.interpolate({
      inputRange: [
        deviceWidth * (index - 1),
        deviceWidth * index,
        deviceWidth * (index + 0.5)
      ],
      outputRange: ["270deg", "0deg", "-360deg"],
      extrapolate: "clamp"
    });
  }

  render() {
    return (
      <View pointerEvents="none" style={styles.shoeImageContainer}>
        <View>
          <Animated.Image
            source={this.props.src}
            resizeMode="contain"
            style={[
              styles.shoe,
              {
                transform: [
                  { scale: this.animatedShoeScaleVal },
                  {
                    rotate: this.animatedShoeRotationVal
                  }
                ]
              }
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shoeImageContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center"
  },
  shoe: {
    width: deviceWidth,
    marginTop: -80,
    shadowColor: "#000",
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 0,
      height: 50
    },
    shadowRadius: 50,
    overflow: "visible"
  }
});
