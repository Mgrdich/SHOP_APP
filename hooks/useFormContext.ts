import {useContext , createContext} from "react";

const formContext = createContext({});


export default function useFormContext () {
    return  useContext(formContext);
}