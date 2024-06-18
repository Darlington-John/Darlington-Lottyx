import { createContext, useEffect, useState} from 'react';

const FormContext = createContext();

const FormProvider = ({ children }) => {
 
  const clearFormState = async () => {
    localStorage.removeItem('hasSeenIntro');
    
    await new Promise((resolve) => setTimeout(resolve, 100));
  };
  

  

  return (
    <FormContext.Provider value={{ 
       clearFormState,
}}>
      {/* <button className='p-4 bg-[#fff] fixed top-0 z-20' onClick={clearFormState}>

      </button> */}
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };
