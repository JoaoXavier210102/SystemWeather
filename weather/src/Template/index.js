import React, { useState, useEffect } from "react";
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography
} from "@material-ui/core";

import weatherApi from "../services/weatherApi";

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `3px solid ${theme.palette.secondary.main}`
    }
}));

const Template = () => {

    const classes = useStyles();
    const keyApi = "98df07f8b5ff4b26895190221222101";
    const [permissionLocalization, setPermissionLocalization] = useState(false);
    const [currentPosition, setCurrentPosition] = useState({});
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        //Pegando a localização do usuário
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            setPermissionLocalization(true)
        }, (error) => {
            console.log(error)
        })

    }, []);

    useEffect(() => {

        if (permissionLocalization) {

            weatherApi.get(`/forecast.json?key=${keyApi}&q=${currentPosition.latitude},${currentPosition.longitude}&aqi=yes&lang=pt`).then((response) => {
                const location = response.data.location;
                // console.log(response.data)
                setCity(location.name);
                setRegion(location.region);
                setLoading(false);
            }).catch((error) => {
                console.log("Erro ao consultar current API Weather", error);
            })
        }

    }, [permissionLocalization, currentPosition.latitude, currentPosition.longitude]);

    return (
        <>
            <AppBar position="static" color="primary" className={classes.appBar}>
                <Toolbar>
                    {loading ? (
                        <Typography variant="h6">
                            Carregando localização...
                        </Typography>
                    ) : (
                    <Typography variant="h6" >
                        {`${city}, ${region}`}
                    </Typography>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
};

export default Template;