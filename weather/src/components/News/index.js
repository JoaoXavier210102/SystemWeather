import React, { useState, useEffect } from "react";

import newsApi from "../../services/newsApi";

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import {
    Paper,
    Typography,
    makeStyles,
    Card,
    CardMedia,
    CardActionArea,
    CardContent,
    Snackbar,
    IconButton,
} from "@material-ui/core";

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        height: "340px",
        width: "100%"
    },
    cardContent: {
        display: "grid",
        justifyContent: "space-between"
    },
    card: {
        display: "flex"
    }
}));

const News = () => {

    const classes = useStyles();

    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(true);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackbarText, setSnackBarText] = useState("");

    useEffect(() => {
        newsApi.get(`/top-headlines?country=br&apiKey=bcd1a8209f704b4ea5b653f36e30cc17&language=pt&pageSize=10`).then((response) => {
            setResponse(response.data.articles);
            setLoading(false);
        }).catch((error) => {
            handleSnackBar(true, "News | Erro ao consultar API News");
            console.log("Falha ao fazer requisição de News", error);
        })
    }, []);

    const handleSnackBar = (value, text) => {
        setSnackBarOpen(value);
        setSnackBarText(text);
    }

    return !loading && (
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
            <Paper>
                <Splide
                    options={{
                        rewind: true,
                        autoplay: true,
                        type: 'loop',
                        speed: 1200,
                        perPage: 1,
                        perMove: 1,
                        focus: 'center',
                    }}
                >
                    {response.map((item) => (
                        <SplideSlide key={item.title}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={item.urlToImage}
                                        title={item.title}
                                    />
                                </CardActionArea>
                                <CardContent className={classes.cardContent}>
                                    <Typography variant="h4">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </SplideSlide>
                    ))}
                </Splide>
            </Paper>
        </>
    )
}

export default News;