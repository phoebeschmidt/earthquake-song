const homePage = `
<div>
    <p>Welcome to the earthquake-song API!</p>
    You may access the following endpoints: </br></br>
    <a href='/hello'>/</a></br>
    <a href='/earthquakes'>/earthquakes</a> </br>
    <a href='/earthquakes?offset=0&pageSize=5'>/earthquakes?offset=0&pageSize=5</a> </br>
    </br>
</div>
`

const config = {
  SUMMARY_EARTHQUAKES_URL: process.env.SUMMARY_API_URL || "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
  DEFAULT_PAGE_SIZE: 15,
  DEFAULT_OFFSET: 0,
  TIMESCALE_MIN: 0,
  TIMESCALE_MAX: 100,
  LATITUDE_MIN: 0,
  LATITUDE_MAX: 400,
  LONGITUDE_MIN: 0,
  LONGITUDE_MAX: 600,
  HOMEPAGE_HTML: homePage
}

export default config;
