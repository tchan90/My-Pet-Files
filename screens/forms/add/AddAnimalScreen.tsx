import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Platform,
  Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {
  Avatar,
  Appbar,
  Text,
  Button,
  TextInput,
  RadioButton,
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { Calendar } from 'react-native-calendars';
import * as ImagePicker from 'expo-image-picker';

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

const durationText = (duration) => {
  if (duration === '1') {
    return 'Once a day';
  }
  if (duration === '2') {
    return 'Twice a day';
  }
  if (duration === '3') {
    return 'More than 3 times a day';
  }
};

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
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
      diet: [
        {
          type: data.foodType,
          brand: data.brand,
          duration: data.foodDuration,
        },
      ],
    });
  };
  console.log(formValues);

  // const submitMoreDiet = (data) => {
  //   const newList = diet.concat({
  //     brand: data.brand,
  //     duration: data.foodDuration,
  //     type: data.foodType,
  //   });

  //   setDiet(newList);
  //   resetDataList({
  //     foodType: '',
  //     brand: '',
  //     foodDuration: '',
  //   });
  // };

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
      case 5:
        return 'Upload Image';
      default:
        return;
    }
  };

  const renderFoodItem = ({ item }) => (
    <View style={styles.dietContent}>
      <View style={styles.dietText}>
        <View style={styles.dietPill}>
          <Text style={styles.dietHeading}>Type</Text>
        </View>
        <Text> {item.foodType}</Text>
      </View>

      {item.brand ? (
        <View style={styles.dietText}>
          <View style={styles.dietPill}>
            <Text style={styles.dietHeading}>Brand</Text>
          </View>
          <Text> {item.brand}</Text>
        </View>
      ) : null}

      <View style={styles.dietText}>
        <View style={styles.dietPill}>
          <Text style={styles.dietHeading}>Duration</Text>
        </View>
        <Text> {durationText(item.foodDuration)}</Text>
      </View>
    </View>
  );

  console.log('errors', errors);

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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.formContainer}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    label="Add food type"
                    value={value || ''}
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
                    value={value || ''}
                    onChangeText={onChange}
                  />
                )}
                name="brand"
                defaultValue=""
              />
              <View style={styles.radioButtonsGroup}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
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
            </View>
          </TouchableWithoutFeedback>
        )}

        {step === 5 && (
          <View style={styles.formContainer}>
            <View style={styles.imageFormContainer}>
              {image ? (
                <Image source={{ uri: image }} style={styles.avatarImage} />
              ) : (
                <Avatar.Icon icon={'camera'} style={styles.cameraIcon} />
              )}
              <Button
                mode="outlined"
                onPress={pickImage}
                style={styles.uploadButton}
              >
                Choose a photo of your pet!
              </Button>
              <Text>If you want to choose one later, just click 'Next'</Text>
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Next
          </Button>
          {(errors.species ||
            errors.name ||
            errors.dob ||
            errors.foodDuration ||
            errors.foodType) && (
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
  // Used for food list
  dietContent: {
    width: '100%',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'lightgrey',
  },
  dietText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 5,
  },
  dietPill: {
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  dietHeading: {
    fontWeight: 'bold',
    color: 'grey',
  },
  avatarImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
  },
  imageFormContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cameraIcon: {
    height: 200,
    width: 200,
    backgroundColor: 'grey',
    overflow: 'hidden',
    borderRadius: 100,
  },
  uploadButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  //
  foodAddedPrompt: {
    marginTop: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'lightgrey',
  },
});
export default UserScreen;
