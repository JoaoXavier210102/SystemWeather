import React from "react";
import ClimeToday from "../../components/ClimeToday";
import News from "../../components/News";
import AgricultureNews from "../../components/AgricultureNews";
import SustainabilityNews from "../../components/SustainabilityNews";

import {
    Grid,
} from "@material-ui/core";

const Home = () => {

    return (
        <Grid
            container
            spacing={2}
            direction="row"
            alignItems="flex-start"

        >
            <Grid item md={4} sm={12} xs={12}>
                <ClimeToday />
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
                <News />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <AgricultureNews />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <SustainabilityNews />
            </Grid>
        </Grid>
    )
};

export default Home;