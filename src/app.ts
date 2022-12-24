import express from 'express';
import router from './routs/index.router';
import bodyParser from 'body-parser';

const port = 3000;

const app = express();
app.use(bodyParser.json());

app.use('/api', router);

app.get('*', (req: express.Request, res: express.Response) => {
	res.send('Not a valid rout.');
});

app.listen(port as number, () => {
	console.log(`Started at http://localhost:${port}`);
});

export default app;
