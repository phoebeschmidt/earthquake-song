import express from 'express';
import router from './router';
const app = express();
const port = process.env.PORT || 5000;

app.use("/", router);

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;
