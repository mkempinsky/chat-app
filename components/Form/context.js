import React from 'react';

const FormContext = React.createContext('form-context');

export const Provider = FormContext.Provider;
export const Consumer = FormContext.Consumer;
