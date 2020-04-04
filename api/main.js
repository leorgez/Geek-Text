const { send } = require('micro');
const cors = require('micro-cors')();
const { router, get } = require('microrouter');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const mongoDB = process.env.MONGO_DB || 'test';
const data = require('./data.json');

let conn;
const books = async (req, res) => {
	if (conn == undefined) {
		conn = await MongoClient.connect(mongoUri);
	}
	const col = await conn.db(mongoDB).collection('books');
	const result = await col.find().toArray();

	send(res, 200, result);
}

const bookById = async (req, res) => {
	if (conn == undefined) {
		conn = await MongoClient.connect(mongoUri);
	}
	const col = await conn.db(mongoDB).collection('books');
	const result = await col.findOne({ _id: ObjectID(req.params.id) });

	send(res, 200, result);
};

const booksGenData = async (req, res) => {
	if (conn == undefined) {
		conn = await MongoClient.connect(mongoUri);
	}
	const col = await conn.db(mongoDB).collection('books');

	const result = await col.insertMany(data);

	send(res, 200, result);
};

module.exports = cors(
	router(
		get('/api/v1/books/gen', booksGenData),
		get('/api/v1/books/:id', bookById),
		get('/api/v1/books', books)
	)
);
