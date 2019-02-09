import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  Animated
} from "react-native";

import AnimatedShoe from "./AnimatedShoe";
import GradientBubble from "./GradientBubble";
import ShoeDescription from "./ShoeDescription";

import nikeLogo from "./assets/nike-logo.png";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const SHOE_IMAGES = [
  require("./assets/retro-high-chicago.png"),
  require("./assets/air-force-one-volt.png"),
  require("./assets/air-serena.png"),
  require("./assets/retro-high-north-carolina.png"),
  require("./assets/chuck-taylors.png")
];

const BUBBLES = [
  { colors: ["#DE1D1D", "#5DDCFF"], locations: [0.26, 0.6, 0.8] },
  { colors: ["#4BF091", "#C1FD49"], locations: [0.3, 0.6, 0.9] },
  { colors: ["#703BAD", "#FE6DCB"], locations: [0.26, 0.6, 0.9] },
  { colors: ["#FF891B", "#5BC0FF"], locations: [0.26, 0.5, 1.0] },
  { colors: ["#3382E7", "#FF6500"], locations: [0.2, 0.6, 1.0] }
];

const SHOE_DESCRIPTIONS = [
  {
    quotes: '"AIR"',
    price: 2200,
    name: "Jordan 1 Retro High Chicago",
    thumbnails: [
      require("./assets/jordan-1-chicago-gallery-1.jpg"),
      require("./assets/jordan-1-chicago-gallery-2.jpg"),
      require("./assets/jordan-1-chicago-gallery-3.jpg")
    ]
  },
  {
    quotes: '"AIR"',
    price: 710,
    name: "Air Force 1 Volt",
    thumbnails: [
      require("./assets/air-force-1-volt-gallery-1.jpg"),
      require("./assets/air-force-1-volt-gallery-2.jpg"),
      require("./assets/air-force-1-volt-gallery-3.jpg")
    ]
  },
  {
    quotes: '"QUEEN"',
    price: 1008,
    name: "Serena Air Max 97",
    thumbnails: [
      require("./assets/queen-gallery-1.jpg"),
      require("./assets/queen-gallery-2.jpg"),
      require("./assets/queen-gallery-3.jpg")
    ]
  },
  {
    quotes: '"AIR"',
    price: 1500,
    name: "Jordan 1 Retro High UNC",
    thumbnails: [
      require("./assets/jordan-1-unc-gallery-1.jpg"),
      require("./assets/jordan-1-unc-gallery-2.jpg"),
      require("./assets/jordan-1-unc-gallery-3.jpg")
    ]
  },
  {
    quotes: '"VULCANIZED"',
    price: 1008,
    name: "Chuck Taylor All Star 70",
    thumbnails: [
      require("./assets/converse-gallery-1.jpg"),
      require("./assets/converse-gallery-2.jpg"),
      require("./assets/converse-gallery-3.jpg")
    ]
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.contentOffsetXVal = new Animated.Value(0);
    this.onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { x: this.contentOffsetXVal } } }],
      { useNativeDriver: true }
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        {BUBBLES.map((gradientData, index) => (
          <GradientBubble
            key={index}
            index={index}
            gradientData={gradientData}
            animatedValue={this.contentOffsetXVal}
          />
        ))}
        <View style={styles.header}>
          <Image
            source={nikeLogo}
            style={styles.nikeLogo}
            resizeMode="contain"
          />
          <View style={{ padding: 4 }}>
            <Text style={styles.offWhiteDefinitionText}>
              OFF-WHITE c/o VIRGIL ABLOH™
            </Text>
            <Text style={styles.offWhiteDefinitionText}>
              Defining the grey area between black
            </Text>
            <Text style={styles.offWhiteDefinitionText}>
              and white as the color Off-White™
            </Text>
          </View>
        </View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          style={styles.scrollView}
          scrollEventThrottle={1}
          onScroll={this.onScroll}
          showsHorizontalScrollIndicator={false}
        >
          {SHOE_DESCRIPTIONS.map((description, index) => (
            <ShoeDescription
              key={description.name}
              index={index}
              description={description}
              animatedValue={this.contentOffsetXVal}
            />
          ))}
        </Animated.ScrollView>
        {SHOE_IMAGES.map((src, index) => (
          <AnimatedShoe
            key={src}
            index={index}
            src={src}
            animatedValue={this.contentOffsetXVal}
          />
        ))}
      </SafeAreaView>
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
    justifyContent: "space-between"
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
  thumbnail: {
    width: 72,
    height: 48,
    marginLeft: 8,
    marginRight: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#000000"
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
