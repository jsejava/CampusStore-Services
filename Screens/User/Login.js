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
import FormContainer from "../../Screens/Shared/Form/FormContainer";
import Input from "../../Screens/Shared/Form/Input";
import Error from "../Shared/Form/Error";
var { height, width } = Dimensions.get("window");
// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.action";
import EasyButton from "../Shared/StyledComponents/EasyButton";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [ID, setID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    //console.log(context.stateUser.isAuthenticated);
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("User Profile");
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
      loginUser(user, context.dispatch);
    }
  };

  return (
    <FormContainer title={"Login"}>
      <Input
        placeholder={"Enter ID Nber"}
        name={"ID"}
        id={"ID"}
        value={ID}
        onChangeText={(text) => setID(text.toLocaleUpperCase())}
      />

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

export default Login;

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
