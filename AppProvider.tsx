import * as React from 'react';
import AppContext from './AppContext';

const AppProvider = (props: any) => {
  return (
    <AppContext.Provider
      value={{
        owner: props.ownerData,
        pets: props.petsData,
        vet: props.vetData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export default AppProvider;
