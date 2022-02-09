import {useState} from "react";

export default function useLoading(defErrorMessage?: string): {
    isLoading: boolean,
    setLoading: Function,
    isError: boolean,
    setError: Function,
    errorMessage: string,
    unsetError: Function
} {
    const [isLoading, setterLoading] = useState<boolean>(false);
    const [isError, setterError] = useState<boolean>(false);
    const [errorMessage, setterErrorMessage] = useState<string>(defErrorMessage || 'something went wrong');

    const setError = function (msg: string) {
        setterError(true);
        setterErrorMessage(msg);
        setterLoading(false);
    };

    const unsetError  = function () {
        setterError(false);
    };

    const setLoading = function (value: boolean) {
        setterError(false);
        setterLoading(value);
    };

    return {
        isLoading,
        setLoading,
        isError,
        unsetError,
        errorMessage,
        setError
    };
}