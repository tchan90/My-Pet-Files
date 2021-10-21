import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Appbar, Text, Button, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { Calendar } from 'react-native-calendars';

const speciesList = [
  {
    label: 'Dog',
    value: 'dog',
  },
  {
    label: 'Cat',
    value: 'cat',
  },
];

const UserScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(1);
  const [showDropDown, setShowDropDown] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [date, setDate] = useState('');

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.navigate('Root', { screen: 'animals' });
    }
  };

  const onSubmit = (data) => {
    setStep(step + 1);
    setFormValues(data);
  };
  // console.log(formValues);

  // console.log(errors);

  const handleTitle = () => {
    switch (step) {
      case 1:
        return 'Select species';
      case 2:
        return 'Name';
      case 3:
        return 'Date of Birth';
      default:
        return;
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={handleTitle()} subtitle="Add Pet" />
      </Appbar.Header>
      <View style={styles.container}>
        <StatusBar style="light" />
        {step === 1 && (
          <View style={styles.formContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange } }) => (
                <DropDown
                  label={'Species'}
                  mode={'outlined'}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={value}
                  setValue={onChange}
                  list={speciesList}
                />
              )}
              name="species"
              defaultValue=""
            />
          </View>
        )}

        {step === 2 && (
          <View style={styles.formContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange } }) => (
                <TextInput label="Name" value={value} onChangeText={onChange} />
              )}
              name="name"
              defaultValue=""
            />
          </View>
        )}

        {step === 3 && (
          <View style={styles.formContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <Calendar
                  onDayPress={(day) => {
                    setDate(day.dateString);
                    onChange(day.dateString);
                  }}
                  markedDates={{
                    [date]: {
                      selected: true,
                      selectedColor: '#6a00ff',
                      selectedTextColor: '#ffffff',
                    },
                  }}
                  monthFormat={'MMM yyyy'}
                  hideExtraDays={true}
                  firstDay={1}
                  onPressArrowLeft={(subtractMonth) => subtractMonth()}
                  onPressArrowRight={(addMonth) => addMonth()}
                  enableSwipeMonths={true}
                />
              )}
              name="dob"
              defaultValue=""
            />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Next
          </Button>
          {(errors.species || errors.name || errors.dob) && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  formContainer: {
    marginTop: 100,
  },
  buttonContainer: {
    width: '100%',
    height: '14%',
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    paddingTop: 5,
    marginTop: 5,
  },
  label: {
    marginTop: 30,
    fontSize: 15,
    color: 'grey',
  },
});
export default UserScreen;
