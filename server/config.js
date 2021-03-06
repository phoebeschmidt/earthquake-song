const homePage = `
<div>
    <p>Welcome to the earthquake-song API!</p>
    You may access the following endpoints: </br></br>
    <a href='/hello'>/hello</a></br>
    <a href='/earthquakes'>/earthquakes</a> </br>
    <a href='/earthquakes?offset=0&pageSize=5'>/earthquakes?offset=0&pageSize=5</a> </br>
    <a href='/sound'>/sound</a> </br> This retrieves a .wav file used for sound in the earthquake-song app.
    </br>
</div>
`;

const config = {
    SUMMARY_EARTHQUAKES_URL: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
    DEFAULT_PAGE_SIZE: 40,
    DEFAULT_OFFSET: 0,
    TIMESCALE_MIN: 0,
    TIMESCALE_MAX: 1000,
    DEPTHSCALE_MIN: 0,
    DEPTHSCALE_MAX: 400,
    MAGSCALE_MIN: 0,
    MAGSCALE_MAX: 1,
    HOMEPAGE_HTML: homePage
};

export default config;
