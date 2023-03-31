import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormContainer from "../../Screens/Shared/Form/FormContainer";
import Input from "../../Screens/Shared/Form/Input";
import Error from "../Shared/Form/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
var { height, width } = Dimensions.get("window");
import Toast from "react-native-toast-message";
import EasyButton from "../Shared/StyledComponents/EasyButton";

const Register = (props) => {
  const [ID, setID] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (ID === "" || password === "" || phone === "" || name === "") {
      setError("Please fill in the form correctly");
    }
    let user = {
      ID: ID,
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };
    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Enter ID Number"}
          name={"ID"}
          id={"ID"}
          value={ID}
          onChangeText={(text) => setID(text.toLocaleUpperCase())}
        />
        <Input
          placeholder={"Phone Number"}
          name={"phone"}
          id={"phone"}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        {/* <Input
          placeholder={"Enter Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        /> */}
        <Input
          placeholder={"Enter Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
          <EasyButton
            large
            primary
            onPress={() => {
              register();
            }}
          >
            <Text style={styles.textStyle}>Register</Text>
          </EasyButton>
        </View>
        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
          <Text style={styles.middleText}>Don't have an account yet?</Text>

          <EasyButton
            large
            primary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={styles.textStyle}>Back To Login</Text>
          </EasyButton>
        </View>
        <View style={styles.header}>
          <Image
            source={require("../../assets/campus-logo-2.png")}
            resizeMode="contain"
            style={{ height: 100 }}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: width / 20,
  },
});
