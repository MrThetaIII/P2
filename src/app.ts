import express from 'express';
const port = 3000;

const app = express();
app.use(express.static('media'));

app.get('*', (req: express.Request, res: express.Response) => {
	res.send(
		'Not a valid rout.'
	);
});

app.listen(port as number, () => {
	console.log(`Started at http://localhost:${port}`);
});

export default app;
