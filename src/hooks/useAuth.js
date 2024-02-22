import {useState, useEffect} from "react";
import axios from "axios";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    console.log("code:", code);
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || 'http://localhost:8000'

    useEffect(() => {
        let ignore = false;
        console.log("ignore", ignore);
        if (!ignore) {
            axios
                .post(`${BASE_URL}/signin`, {
                    code,
                })
                .then((res) => {
                    console.log("line 20");
                    setAccessToken(res.data.accessToken);
                    setRefreshToken(res.data.refreshToken);
                    setExpiresIn(res.data.expiresIn);
                    const {accessToken, refreshToken, expiresIn} = res.data;
                    console.table({
                        accessToken,
                        refreshToken,
                        expiresIn,
                    });
                    // remove the code from the URL
                    window.history.pushState({}, null, "/");
                })
                .catch((err) => {
                    // redirect the user to the home page
                    // window.location = "/";
                    window.history.pushState({}, null, "/");
                    console.log(err);
                });
        }

        return () => {
            ignore = true;
        };
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        const interval = setInterval(() => {
            axios
                .post(`${BASE_URL}/refresh`, {
                    refreshToken,
                })
                .then((res) => {
                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, (expiresIn - 60) * 1000); // one minute before it expires * 1000 to convert to milliseconds

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return accessToken;
}
