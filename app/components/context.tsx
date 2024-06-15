import React, { createContext, useState, useEffect } from 'react';

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formState, setFormState] = useState(() => {
    // Check if window object exists (indicates browser environment)
    if (typeof window !== 'undefined') {
      const savedState = JSON.parse(localStorage.getItem('formState'));
      return savedState || { // Use default values if no data in localStorage
        password: '',
        number: '',
        email: '',
        firstName: '',
        surname: '',
      };
    } else {
      // Default state for server-side rendering (optional)
      return {
        password: '',
        number: '',
        email: '',
        firstName: '',
        surname: '',
      };
    }
  });
  const clearFormState = async () => {
    localStorage.removeItem('formState');
    setFormState({
      password: '',
      number: '',
      email: '',
      firstName: '',
      surname: '',
    });
    localStorage.removeItem('hasSeenIntro');
    // Wait for a short period (optional)
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShowIntro(true);
  };
  // Save data to localStorage whenever formState changes
  useEffect(() => {
    localStorage.setItem('formState', JSON.stringify(formState));
  }, [formState]);

  const updateFormState = (key, value) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const [showIntro, setShowIntro] = useState(() => {
    // Check if window object exists (indicates browser environment)
    if (typeof window !== 'undefined') {
      const hasSeenIntro = localStorage.getItem('hasSeenIntro') === 'true';
      return hasSeenIntro;
    } else {
      // Default value for server-side rendering (optional)
      return true;
    }
  });


  const handleDismissIntro = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };
  return (
    <FormContext.Provider value={{ 
      formState, updateFormState, clearFormState,
       showIntro, setShowIntro, handleDismissIntro }}>
      {/* <button className='p-4 bg-[#fff] fixed top-0 z-20' onClick={clearFormState}>
        Clear
      </button> */}
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };
