import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Body,
  Container,
  H1,
  Left,
  ListItem,
  Right,
  Thumbnail,
} from "native-base";

const CartItem = (props) => {
  const data = props.item.item.product;
  const [quantity, setQuantity] = useState(props.item.item.quantity);
  return (
    <ListItem style={styles.ListItem} key={Math.random()} avatar>
      <Left>
        <Thumbnail
          source={{
            uri: data.image
              ? data.image
              : "https://cdn.pixabay.com/photo/2012/04/02/17/46/package-25067_1280.png",
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Left>
          <Text>{data.name}</Text>
        </Left>
        <Right>
          <Text>₵ {data.price}</Text>
        </Right>
      </Body>
    </ListItem>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  ListItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
