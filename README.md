## Earthquake Song ##

A small web application using React, react-konva, the web audio api, Express, and Node.

### Overview ###

How do all these pieces fit together?

The `/server` directory contains a small Node + Express API. This API consumes the 
[USGS GeoJson Summary API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson) 
(documentation can be found [here](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)), 
performs a simple scaling operation on a few properties, returns these new scaled values and a subset of the other properties. 
More info in the [Server](#server) section of this README.


The `/client` directory contains a small React app using Facebook's [create-react-app](https://github.com/facebook/create-react-app). 
It comes with Webpack, Babel, and a small node development server. I left the create-react-app README intact in that 
directory for convenience. It has great documentation about how it's built. 
I chose to use it because it lets me focus on creating a frontend app instead of configuration.

The client calls the node/express API and uses the data and [react-konva](https://github.com/lavrton/react-konva) to draw 
a simple chart on an html5 canvas. React-konva is probably more robust than what I needed, but it was
semantically react-like and fast to learn. I also created a component called `AudioWrapper` which creates the context 
necessary for interacting with the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), and 
passes a "play" function down to its children. More specifics in the [Client](#client) section of this README.


### Dependencies, Limitations, and Running the Project ###

This is the TL;DR.

**Limitations**

I use fetch for http requests from the client. Fetch is supported almost everywhere now, including Edge, but not IE11 or 
below. Web Audio API has this same restriction.
I recommend viewing the project in Chrome or Firefox.

**Requirements**

Node > 6 and NPM or NPX. I recommend using [NVM](https://github.com/creationix/nvm) from managing local node versions.


**Running the Project**

You have to run both the server and the client parts of the application. From the root: 


```
cd server/
npm install
npm start
```

```
cd client/
npm install
npm start
```

**Testing**

You can run `npm test` from either `/client` or `/server` to run the respective tests. Client side tests use jest and enzyme. Server side tests use Mocha and Chai.

**Notes**:

`/client` is built using `create-react-app`. Executing `npm start` watches for changes. See their [documentation](https://github.com/facebook/create-react-app) 
for instructions on building and running in "production mode."

In `/server`, you have the choice of `npm run dev` to watch for changes, or `npm start`. You also have a convenience method 
of `npm run client`, if you don't feel like switching directories to fire up the client app.




### Server ###

The most important bits of this are repeated in `/server/README.md`.

`server.js` is the entry point. `router.js` points the routes to methods on the controller, `/controllers/earthquakeController`. The controller
calls the services: `dataFetcher` and `dataTransforer`. The former consumes the USGS api using `node-fetch`, and the latter transforms 
the data using scaling functions. I wrote a few tests for the scaling functions, which are located in the `/tests` directory.


#### Routes ####

GET `/`

A html page containing a summary of possible routes with links.

GET `/hello`

Hello world endpoint to use as status check.

GET `/sound`

Returns a .wav file which is used to create the earthquake sounds in the frontend.

GET `/earthquakes`

Returns a selection of properties from the [USGS Earthquake Summary feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), ordered by most recently occurring event.

| Query Params  | Description |          
| ------------- |------------- |
| `offset`      | offset for results |
| `pageSize`    | how many results you want returned |


Sample Response
//TODO update sample response!!!!!!!!!!!!!!!!!!
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

**Component Hierarchy**

```
<App>
    <AudioWrapper>
        <Chart>
            <ChartToolbar>
                <button>Play All</button>
            </ChartToolbar>
            <Canvas>
                [
                    <Point />
                    <Point />
                    ...
                    <Point />
                ]
            </Canvas>
        </Chart>
    </AudioWrapper>
</App>
```

`App`

The App component is the top level component. Responsible for calling data, parsing the json, and passing the array
of earthquakes down to its children.

`AudioWrapper`

AudioWrapper fetches the audio sample from the server, creates the audio context, and creates a play() function to play 
the audio sample. It passes this function as a prop to its children.

`Chart`

Chart creates the react-konva canvas and an array of `Point` components with a `ref` to each. It handles "playing" the song by 
calling a method on each child `Point` component with a series of timeouts. Playing back media is one of the few times [React
documentation](https://reactjs.org/docs/refs-and-the-dom.html) recommends using the `ref` property.

The `Canvas` shown in the component hierarchy above is an abstraction of the `<Stage>` and `<Layer>` components `react-konva` uses to
create a canvas in react.

`Point`

Point is a react-konva shape, `Circle`, with a few extra class methods to "focus" itself and call the 'play' prop to play the sample
representing this point.


### Priorities for Next Steps ###

1. More unit testing. First any logic heavy React components and then more robust testing on server (incl. testing the dataFetcher with mocks)
1. More features
    1. Ability to control parameters from the UI (# earthquakes displayed, size of canvas, audio sample used, which parameters control the sound, which parameters determine x,y)
    1. Using more data from the api-- ex: adding hover or click functionality that shows where the earthquake took place
    1. Axes with labels (so I can show what the data means instead of explaining in text)
1. Responsive design. I've done nothing to optimize the display for smaller screens (tablet or mobile)
1. Improve "musicality"-- so it sounds more like music and less like a DIY horror movie soundtrack
1. Styling. Make the text and buttons a bit prettier

### Sources ###

In addition to express, Web Audio API, and react-konva documentation, I got help from these tutorials:

https://codepen.io/SitePoint/pen/JRaLVR

https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
