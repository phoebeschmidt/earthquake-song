## Earthquake-song Server ##

Small node and express server for earthquake-song project. See top-level readme for more specifics about entire project and how this piece
fits in with the rest.

### Routes ###

GET `/earthquakes`

| Query Params  | Description |          
| ------------- |------------- |
| `offset`      | offset for results |
| `pageSize`    | how many results you want returned |

Returns a selection of properties from the [USGS Earthquake Summary feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), ordered by most recently occurring event.

Sample Response

```
{
  features: [
      {
          mag: 1.9,
          place: "89km NW of Larsen Bay, Alaska",
          time: 1521399362054,
          scaledTime: 94.17179965553022,
          updated: 1521399556811,
          tsunami: 0,
          gap: null,
          nst: null,
          coordinates: {
            latitude: 58.0599,
            longitude: -155.1272,
            scaledLatitude: 0.4618104485420839,
            scaledLongitude: 500.0040756807466,
            depth: 49
          }
      },
  ],
  total: 1
}
```
