import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {
  Appbar,
  Text,
  Button,
  TextInput,
  RadioButton,
} from 'react-native-paper';
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
    formState: { dirtyFields, errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const [step, setStep] = useState(1);
  const [showDropDown, setShowDropDown] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [date, setDate] = useState('');
  const [diet, setDiet] = useState([]);

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.navigate('Root', { screen: 'animals' });
    }
  };

  const onSubmit = (data) => {
    setStep(step + 1);
    setFormValues({
      general: {
        name: data.name,
        species: data.species,
        dob: data.dob,
      },
      diet: {
        brand: data.brand,
        duration: data.foodDuration,
        type: data.foodType,
      },
    });
  };

  const submitMoreDiet = (data) => {
    setFormValues({
      ...data,
      diet: {
        ...data.diet,
        brand: data.brand,
        duration: data.foodDuration,
        type: data.foodType,
      },
    });
    reset({
      diet: {
        brand: '',
        duration: '',
        type: '',
      },
      keepDirty: true,
    });
  };

  console.log('formValues', formValues);

  console.log('errors', errors);

  const handleTitle = () => {
    switch (step) {
      case 1:
        return 'Select species';
      case 2:
        return 'Name';
      case 3:
        return 'Date of Birth';
      case 4:
        return 'Diet';
      default:
        return;
    }
  };

  console.log('dirtyFields', dirtyFields);

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

        {step === 4 && (
          <View style={styles.formContainer}>
            {dirtyFields.foodType && dirtyFields.foodDuration && (
              <View>
                <Text>{formValues.diet.type}</Text>
                {formValues.diet.brand !== '' && (
                  <Text>{formValues.diet.brand}</Text>
                )}
                <Text>{formValues.diet.duration}</Text>
              </View>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="Add food type"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="foodType"
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  style={styles.formInput}
                  label="Optional: Brand Name"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="brand"
              defaultValue=""
            />
            <View style={styles.radioButtonsGroup}>
              <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioButton.Group onValueChange={onChange} value={value}>
                    <View style={styles.radioButtons}>
                      <RadioButton value="1" />
                      <Text>Once a day</Text>
                    </View>
                    <View style={styles.radioButtons}>
                      <RadioButton value="2" />
                      <Text>Twice a day</Text>
                    </View>
                    <View style={styles.radioButtons}>
                      <RadioButton value="3" />
                      <Text> More than 3 times a day </Text>
                    </View>
                  </RadioButton.Group>
                )}
                name="foodDuration"
                defaultValue=""
              />
            </View>

            <Button
              style={styles.addMoreButton}
              mode="contained"
              onPress={handleSubmit(submitMoreDiet)}
            >
              + Add More
            </Button>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Next
          </Button>
          {(errors.species ||
            errors.name ||
            errors.dob ||
            errors.food ||
            errors.foodDuration) && (
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
  formInput: {
    marginTop: 20,
  },
  radioButtonsGroup: {
    marginTop: 20,
  },
  radioButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addMoreButton: {
    marginTop: 20,
  },
});
export default UserScreen;
