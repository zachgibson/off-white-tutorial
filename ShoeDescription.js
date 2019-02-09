import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Image
} from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export default class extends React.Component {
  constructor(props) {
    super(props);

    const { animatedValue, index } = this.props;

    this.animatedTextScaleVal = animatedValue.interpolate({
      inputRange: [
        deviceWidth * (index - 0.75),
        deviceWidth * index,
        deviceWidth * (index + 0.75)
      ],
      outputRange: [0, 1, 0],
      extrapolate: "clamp"
    });
  }

  render() {
    const {
      description: { quotes, price, name, thumbnails }
    } = this.props;

    return (
      <View style={styles.textContainer}>
        <Animated.View
          style={[
            styles.quotesTextContainer,
            {
              transform: [{ scale: this.animatedTextScaleVal }]
            }
          ]}
        >
          <Text
            style={styles.quotesText}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {quotes}
          </Text>
        </Animated.View>
        <View style={styles.shoeInfoContainer}>
          <Animated.View
            style={{
              transform: [{ scale: this.animatedTextScaleVal }]
            }}
          >
            <Text style={styles.priceText}>${price.toLocaleString()}</Text>
          </Animated.View>
          <Text style={styles.shoeNameText}>{name}</Text>
          <View style={styles.thumbnailsContainer}>
            <View style={styles.thumbnailContainer}>
              <Image
                source={thumbnails[0]}
                style={styles.thumbnail}
                resizeMode="contain"
              />
            </View>
            <View style={styles.thumbnailContainer}>
              <Image
                source={thumbnails[1]}
                style={styles.thumbnail}
                resizeMode="contain"
              />
            </View>
            <View style={styles.thumbnailContainer}>
              <Image
                source={thumbnails[2]}
                style={styles.thumbnail}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4
  },
  nikeLogo: {
    width: 80,
    height: 29,
    flex: 1
  },
  offWhiteDefinitionText: {
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Helvetica Neue"
  },
  scrollView: {
    flex: 1
  },
  textContainer: {
    width: deviceWidth,
    justifyContent: "space-between",
    marginBottom: 48
  },
  quotesTextContainer: {
    justifyContent: "center",
    height: deviceHeight * 0.25
  },
  quotesText: {
    fontSize: 145,
    fontWeight: "700",
    fontFamily: "Helvetica Neue",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -2
  },
  priceText: {
    fontSize: 80,
    fontWeight: "700",
    fontFamily: "Helvetica Neue",
    letterSpacing: -0.25
  },
  shoeNameText: {
    marginBottom: 16,
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.25
  },
  shoeInfoContainer: {
    alignItems: "center"
  },
  thumbnailsContainer: {
    flexDirection: "row"
  },
  thumbnailContainer: {
    marginLeft: 8,
    marginRight: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#000000"
  },
  thumbnail: {
    width: 72,
    height: 48
  },
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
