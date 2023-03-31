import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FormContainer from "../Shared/Form/FormContainer";
import Input from "../Shared/Form/Input";
import Error from "../Shared/Form/Error";
var { height, width } = Dimensions.get("window");
// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.action";
import EasyButton from "../Shared/StyledComponents/EasyButton";

const CheckoutLogin = (props) => {
  const context = useContext(AuthGlobal);
  const [ID, setID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    //console.log(context.stateUser.isAuthenticated);
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("Checkout");
    } else {
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      ID,
      password,
    };
    if (ID === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      props.navigation.navigate("Checkout");
      loginUser(user, context.dispatch);
    }
  };

  return (
    <FormContainer title={"Login Order"}>
      <Input
        placeholder={"Enter ID Number"}
        name={"ID"}
        id={"ID"}
        value={ID}
        onChangeText={(text) => setID(text.toLocaleUpperCase())}
      />
      {/* <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLocaleLowerCase())}
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
            handleSubmit();
          }}
        >
          <Text style={styles.textStyle}>Login</Text>
        </EasyButton>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>

        <EasyButton
          large
          primary
          onPress={() => {
            props.navigation.navigate("Register");
            setEmail("");
            setPassword("");
          }}
        >
          <Text style={styles.textStyle}>Register</Text>
        </EasyButton>
      </View>
      <View style={styles.header}>
        <Image
          source={require("../../assets/campus-logo-2.png")}
          resizeMode="contain"
          style={{ height: 175, borderRadius: 100, marginTop: 30 }}
        />
      </View>
    </FormContainer>
  );
};

export default CheckoutLogin;

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
