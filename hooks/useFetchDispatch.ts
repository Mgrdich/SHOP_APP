import useLoading from "./useLoading";
import {useAppDispatch} from "./redux";
import {useCallback, useEffect, useRef, useState} from "react";

type returnUseFetchDispatch = {
    isLoading: boolean; // initial
    isError: boolean;
    isRefreshing: boolean; // ongoing
    fetchAgainFn: Function,
    fetchAgainTimeStampFn: Function
};

export default function useFetchDispatch(actionFn: Function): returnUseFetchDispatch {
    const {isLoading, setLoading, isError, setError} = useLoading();
    const [isRefreshing, setRefreshing] = useState(false);
    const dispatch = useAppDispatch();
    const actionFnRef = useRef(actionFn); // always constant

    const timeStamp = useRef<Date>();

    const fetchAgainFn = useCallback(async function () {
        setRefreshing(true);
        dispatch(actionFnRef.current())
            .then(function () {
                timeStamp.current = new Date();
                setRefreshing(false);
            }).catch(function (err) {
            setError(err.toString());
        });
    }, [dispatch, actionFnRef, timeStamp]);


    const fetchAgainTimeStampFn = useCallback(async function (interval: number = 30000) {
        timeStamp.current = timeStamp.current ? timeStamp.current : new Date();
        // continue with checking
        let newTime_ms :number = new Date().getTime();

        let timeStamp_ms = timeStamp.current?.getTime();

        if(Math.abs(newTime_ms - timeStamp_ms) > interval) {
            return fetchAgainFn();
        }
    }, [timeStamp, fetchAgainFn])

    // initial Load
    useEffect(function () {
        fetchAgainFn().then(function () {
            setLoading(false);
        });
    }, [fetchAgainFn]);

    return {
        isLoading,
        isRefreshing,
        isError,
        fetchAgainFn: fetchAgainFn,
        fetchAgainTimeStampFn: fetchAgainTimeStampFn
    }
}