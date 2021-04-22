import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          User: {
            screens: {
              UserScreen: 'user',
            },
          },
          Animals: {
            screens: {
              AnimalsScreen: 'animals',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
