import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

var { width } = Dimensions.get("window");
const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </ScrollView>
  );
};

export default FormContainer;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 400,
    paddingBottom: 100,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
});
