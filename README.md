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
Server runs at `localhost:5000`.


```
cd client/
npm install
npm start
```
Client runs at `localhost:3000`.

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

```
{
    "features": [
        {
            "mag": 2.08,
            "scaledMag": 0.06596858638743457,
            "place": "13km NNE of Indio, California",
            "time": 1521636771920,
            "scaledTime": 1000,
            "updated": 1521636896545,
            "tsunami": 0,
            "gap": 117,
            "nst": 36,
            "coordinates": {
                "latitude": 33.8424988,
                "longitude": -116.1804962,
                "depth": 7.78,
                "scaledDepth": 30.176331576077082
            }
        },
        {
            "mag": 2.1799999999999997,
            "scaledMag": 0.07643979057591622,
            "place": "7km NW of The Geysers, CA",
            "time": 1521635687160,
            "scaledTime": 957.7570289260922,
            "updated": 1521636543698,
            "tsunami": 0,
            "gap": 72,
            "nst": 19,
            "coordinates": {
                "latitude": 38.822834,
                "longitude": -122.8048325,
                "depth": 2.46,
                "scaledDepth": 10.834393746591529
            }
        }
    ],
    "total": 2
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

1. Unit testing. First any logic heavy React components and then more robust testing on server (incl. testing the dataFetcher with mocks)
1. Styling. Make some better x/y adjustments with canvas so content is centered, not cut off. Make buttons a bit prettier.
1. Responsive design. I've done nothing to optimize the display for smaller screens (tablet or mobile)
1. More features
    1. Ability to dynamically choose which parameters to scale* (see note in [reflections](#other-reflections) section)
    1. Ability to control parameters from the UI (# earthquakes displayed, size of canvas, audio sample used, which parameters control the sound, which parameters determine x,y)
    1. Using more data from the api-- ex: adding hover or click functionality that shows where the earthquake took place
    1. Axes with labels (so I can show what the data means instead of explaining in text)
1. Improve "musicality"-- so it sounds more like music and less like a DIY horror movie soundtrack

### Other Reflections ###
I made the decision to use the node/express API to transform the data into what I wanted to use in the client. Although 
the browser could easily perform a simple scaling operation, the idea was to manipulate the data as little as possible 
in the frontend; just display it in the right places! 

But I quickly realized the scaled values rely on dimensions in the client.
(to transform time of an earthquake --> location in canvas, I need to know how big the canvas is. Ideally my max scaled value would be 
{canvasWidth - some padding}, so my points don't display cut off). Right now the API relies on some default values I hard-coded in a config file. This is 
brittle because I just choose some values that look good on an average monitor, which assumes the user is using a browser on a desktop machine. 
The server shouldn't "know" about these dimensions at all. An ideal future feature would be to pass in the min and max scaledValues with the request.

Additionally, it would be awesome if we could dynamically choose which parameters to scale in the request. The server 
currently always scales depth, magnitude, and time. It's hardcoded, which also shows too much "knowledge" of what the client needs in the server.

For the time and scope of this project, I decided to keep a small and easy to maintain API without too many dynamic parts, but this came at the cost of 
a completely separated front- and backend.

### Sources ###

In addition to express, Web Audio API, and react-konva documentation, I got help from these tutorials:

https://codepen.io/SitePoint/pen/JRaLVR

https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
