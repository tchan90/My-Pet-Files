// Register Modal
import * as React from 'react';
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

const Register = ({ modalVisible, closeModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressOut={closeModal}
      >
        <Text style={styles.loginTitle}>Register your account</Text>
        <TouchableWithoutFeedback style={styles.loginContainer}>
          <View style={styles.innerContainer}>
            <View style={{ marginTop: 15 }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    label="First Name"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
                name="firstName"
                defaultValue=""
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    label="Last Name"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
                name="lastName"
                defaultValue=""
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    label="Password"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
                name="password"
                defaultValue=""
              />
            </View>
            <Button
              mode="contained"
              icon="login"
              style={styles.button}
              labelStyle={styles.buttonText}
              contentStyle={styles.buttonBody}
              onPress={() => setModalVisible(true)}
            >
              Submit
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTitle: {
    fontSize: 30,
    fontFamily: Platform.OS === 'ios' ? 'Cochin' : 'serif',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  innerContainer: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 250,
    marginTop: 16,
  },
  buttonBody: {
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Register;
