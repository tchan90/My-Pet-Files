import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { Calendar } from 'react-native-calendars';

export default function UserScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();
  // const [value, setValue] = React.useState('');
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [formValues, setFormValues] = React.useState({});
  const [date, setDate] = React.useState('');

  const onSubmit = (data) => {
    setFormValues(data);
  };
  console.log(formValues);

  const formValue = ['species', 'name', 'dob'];

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
  console.log(errors);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.heading}>Add a pet</Text>
      </View>
      {!formValues.species && (
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

      {formValues.species && !formValues.name && (
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

      {formValues.name && (
        <>
          <Text style={styles.label}>Date of Birth</Text>
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
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button mode="contained" upperCase onPress={handleSubmit(onSubmit)}>
          Next
        </Button>
        {(errors.species || errors.name || errors.dob) && (
          <Text style={styles.errorText}>This is required.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
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
