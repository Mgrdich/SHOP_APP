import {useContext} from "react";
import {FormContext} from "../components/UI/FormProvider";

export default function useFormContext () {
    return  useContext(FormContext);
}