import {createContext} from "react";

export const FormContext = createContext<{}>({});

const FormProvider = ({children}) => {
    return (
        <FormContext.Provider value={{}}>
            {children}
        </FormContext.Provider>
    );
};

export default FormProvider;