## Earthquake Song ##

A small web application using React, react-konva, the web audio api, Express, and Node.

### Overview ###

How do all these pieces fit together?

The `/server` directory contains a small Node + Express API. This API consumes the [USGS GeoJson Summary API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson) (documentation can be found [here](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)), performs a simple scaling operation on a few of the data properties, returns these new scaled values and a subset of the data properties. More info in the [Server](#server) section of this README.


The `/client` directory contains a small React app using Facebook's [create-react-app](https://github.com/facebook/create-react-app). It comes with Webpack, Babel, and a small node development server. I left
the create-react-app README intact in that directory for convenience. It has great documentation about how it's built. I chose to use it because it lets me focus on creating a frontend app instead of configuration.

This app calls the node/express API and uses the data and [react-konva](https://github.com/lavrton/react-konva) to draw my graphic on an html5 canvas. React-konva is probably much more than I needed, but it was
semantically react-like and fast to get used to. I created a component called `AudioWrapper` which creates the context necessary for interacting with the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), and passes a "play" function down to its children. More specifics in the [Client](#client) section of this README.


### Dependencies, Limitations, and Running the Project ###

This is the TL;DR.

*Limitations*

I use fetch for http requests from the client. Fetch is supported almost everywhere now, including Edge, but not IE11 or below. Web Audio API has this same restriction.
I recommend viewing the project in Chrome or Firefox.


*Requirements*

Node > 6 and NPM or NPX. I recommend using [NVM](https://github.com/creationix/nvm) from managing local node versions.


*Running the Project*

`cd client/` and `npm install`

`cd ../server/` and `npm install`

from `/server`:

in one terminal tab run: `npm run server`, and in another: `npm run client`.


### Server ###

The most important bits of this are repeated in `/server/README.md`.

`server.js` is the entry point. `router.js` points the various routes to methods on the controller, `/controllers/earthquakeController`, which calls
the services: one to fetch data using `node-fetch` and one to "transform" the data using scaling functions. I wrote a few tests for the scaling functions, which are located in the `/tests` directory.


#### Routes ####

GET `/`

A summary of possible routes with links.

GET `/hello`

Hello world endpoint to check everything is working correctly.

GET `/sound`

Returns a .wav file which is used to create the earthquake sounds in the frontend.

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

### Client ###




### Priorities for Next Steps ###

1. Unit testing. First any logic heavy React components and then more robust testing on server (incl. testing the dataFetcher with mocks)
1. More features-- specifically being able to control parameters from the UI (# earthquakes displayed, size of canvas, audio sample used, which parameters control the sound, which parameters determine x,y)
1. Responsive design. I've done nothing to optimize the display for smaller screens (tablet or mobile)
1. Improve "musicality"-- so it sounds more like music and less like a DIY horror movie soundtrack

### Sources ###

In addition to express, Web Audio API, and react-konva documentation, I got help from these tutorials:

https://codepen.io/SitePoint/pen/JRaLVR

https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
