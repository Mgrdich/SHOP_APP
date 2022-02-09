import useLoading from "./useLoading";
import {useAppDispatch} from "./redux";
import {useCallback, useEffect, useRef, useState} from "react";

type returnUseFetchDispatch = {
    isLoading: boolean; // initial
    isRefreshing: boolean; // ongoing
    isError: boolean;
    fetchAgainFn: Function,
    fetchAgainTimeStampFn: Function
};

/**
 * @description initial fetching and a functionality to an request indicator and re-fetching functionality
 * */
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
                // latest timeStamped request time
                timeStamp.current = new Date();
                 setRefreshing(false);
            }).catch(function (err) {
            setError(err.toString());
        });
    }, [dispatch, actionFnRef, timeStamp]);


    const fetchAgainTimeStampFn = useCallback(async function (interval: number = 15000) {
        // continue with checking
        let newTime_ms :number = new Date().getTime();
        let lastTimeStamp = timeStamp.current;

        if(!lastTimeStamp || (Math.abs(newTime_ms - lastTimeStamp?.getTime()) > interval)) {
            return fetchAgainFn();
        }
    }, [timeStamp, fetchAgainFn]);

    // initial Load
    useEffect(function () {
        fetchAgainFn().then(function () {
            setLoading(false);
        }).catch(function (err) {
            setError(err.toString());
        });
    }, [fetchAgainFn]);

    return {
        isLoading,
        isRefreshing,
        isError,
        fetchAgainFn: fetchAgainFn,
        fetchAgainTimeStampFn: fetchAgainTimeStampFn
    };
}