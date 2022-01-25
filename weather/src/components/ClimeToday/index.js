import React, { useState, useEffect } from "react";

import {
    Paper,
    Typography,
    makeStyles,
    Grid,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    Snackbar,
    IconButton,
} from "@material-ui/core";

import CloseIcon from '@material-ui/icons/Close';

import weatherApi from "../../services/weatherApi";

const useStyles = makeStyles((theme) => ({
    location: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    paper: {
        padding: "15px",
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
    }
}));

const ClimeToday = () => {

    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const keyApi = "98df07f8b5ff4b26895190221222101";
    const [currentPosition, setCurrentPosition] = useState({});
    const [permissionLocalization, setPermissionLocalization] = useState(false);
    const [current, setCurrent] = useState({});
    const [forecast, setForecast] = useState({});
    const [location, setLocation] = useState({});
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackbarText, setSnackBarText] = useState("");

    useEffect(() => {

        //Pegando a localização do usuário
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            setPermissionLocalization(true)
        }, (error) => {
            setLoading(false);
            console.log(error)
        })

    }, []);

    useEffect(() => {
        if (permissionLocalization) {

            weatherApi.get(`/forecast.json?key=${keyApi}&q=${currentPosition.latitude},${currentPosition.longitude}&aqi=yes&lang=pt&days=3`).then((response) => {
                setCurrent(response.data.current);
                setForecast(response.data.forecast.forecastday);
                setLocation(response.data.location);
                setLoading(false);
            }).catch((error) => {
                handleSnackBar(true, "ClimeToday | Erro ao consultar API weather");
                console.log("Erro ao consultar current API Weather", error);
            })

        }

    }, [permissionLocalization, currentPosition.latitude, currentPosition.longitude])

    const handleSnackBar = (value, text) => {
        setSnackBarOpen(value);
        setSnackBarText(text);
    }

    return (
        <>
            <Snackbar
                open={snackBarOpen}
                message={snackbarText}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                action={(
                    <>
                        <IconButton size="small" color="inherit" onClick={() => setSnackBarOpen(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                )}
            />
            <Paper className={classes.paper} >
                {loading ? (
                    <CircularProgress size={80} />
                ) : (
                    <>
                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12} className={classes.location}>
                                <Typography align="left">
                                    {`${location.name}, ${location.region}`}
                                </Typography>
                                <Typography align="right">
                                    {`Última atualização: ${current.last_updated}`}
                                </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <Divider light />
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <Grid container>
                                    <Grid item md={6} sm={6} xs={6}>
                                        <Typography variant="h5">
                                            {current.condition.text}
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {`Precipitação: ${current.precip_mm}mm`}
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {`Humidade: ${current.humidity}%`}
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {`Vento: ${current.wind_kph} km/h ${current.wind_dir}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6} sm={6} xs={6} style={{ display: "flex", alignItems: "center" }}>
                                        <img src={current.condition.icon} alt={current.condition.text}/>
                                        <Typography variant="h3">
                                            {`${current.temp_c}°C`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <Grid container spacing={2}>
                                    {forecast.map((item) => {

                                        const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
                                        const days = (new Date(item.date).getDay())

                                        return (
                                            <Grid item md={4} key={item.date}>
                                                <Paper key={item.date} className={classes.clime} variant="outlined">
                                                    <Typography align="center">
                                                        {week[days]}
                                                    </Typography>
                                                    <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                                                        <img src={item.day.condition.icon} alt={item.day.condition.text}/>
                                                        <List>
                                                            <ListItem>
                                                                <ListItemText primary={`${item.day.maxtemp_c}°C`} secondary={`${item.day.mintemp_c}°C`}/>
                                                            </ListItem>
                                                        </List>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                        </Grid>

                    </>
                )}
            </Paper>
        </>
    )
};

export default ClimeToday;