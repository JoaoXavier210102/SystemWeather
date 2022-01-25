import React, { useEffect, useState } from "react";

import {
    Grid,
    Paper,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    makeStyles,
    CircularProgress,
    Snackbar,
    IconButton,
} from "@material-ui/core";

import { GiEcology } from "react-icons/gi";
import CloseIcon from '@material-ui/icons/Close';

import newsApi from "../../services/newsApi";

const useStyles = makeStyles(() => ({
    paper: {
        padding: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        display: "flex",
        alignItems: "center"
    },
    card: {
        display: "flex",
    },
    cardMedia: {
        height: "100%",
        width: "300px"
    },
    cardActionArea: {
        width: "300px"
    }
}))

const SustainabilityNews = () => {

    const classes = useStyles();

    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackbarText, setSnackBarText] = useState("");

    useEffect(() => {
        newsApi.get("/everything?q=sustentabilidade&language=pt&apiKey=bcd1a8209f704b4ea5b653f36e30cc17&pageSize=3").then((response) => {
            setResponse(response.data.articles);
            setLoading(false);
        }).catch((error) => {
            handleSnackBar(true, "SustainabilityNews | Erro ao consultar API News");
            console.log("Falha ao fazer requisição de SustainabilityNews", error);
        })
    }, []);

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
            <Paper className={classes.paper}>
                {loading ? (
                    <CircularProgress />
                ) : (

                    <Grid container spacing={2}>
                        <Grid item md={12} sm={12} xs={12} className={classes.title}>
                            <GiEcology size={30} />
                            <Typography variant="h6" style={{ marginLeft: "5px" }}>
                                Notícias sobre Sustentabilidade
                            </Typography>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <Grid container spacing={2}>
                                {response.map((item) => (
                                    <Grid item md={12} sm={12} xs={12} key={item.title}>
                                        <Card className={classes.card} >
                                            <CardActionArea className={classes.cardActionArea}>
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image={item.urlToImage}
                                                />
                                            </CardActionArea>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom >
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="caption">
                                                    {item.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </>
    )
}

export default SustainabilityNews;