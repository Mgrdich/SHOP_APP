import useLoading from "./useLoading";
import {useAppDispatch} from "./redux";
import {useCallback, useEffect, useRef} from "react";

type returnUseFetchDispatch = {
    isLoading: boolean;
    isError: boolean;
    loadFetch: Function,
};

export default function useFetchDispatch(actionFn: Function): returnUseFetchDispatch {
    const {isLoading, setLoading, isError, setError} = useLoading();
    const dispatch = useAppDispatch();
    const actionFnRef = useRef(actionFn); // always constant

    const loadFetch = useCallback(async function () {
        setLoading(true);
        dispatch(actionFnRef.current())
            .then(function () {
                setLoading(false);
            }).catch(function (err) {
            setError(err.toString());
        });
    }, [dispatch, actionFnRef]);

    // initial Load
    useEffect(function () {
        loadFetch().then();
    }, [loadFetch]);

    return {
        isLoading,
        isError,
        loadFetch: loadFetch
    }
}