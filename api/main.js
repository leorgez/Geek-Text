const { send, json } = require("micro");
const cors = require("micro-cors")();
const { router, get, post } = require("microrouter");

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
const mongoDB = process.env.MONGO_DB || "test";
const data = require("./data.json");

let db; // variable db that will hold things
const initDb = async () => {
  try { // try and catch error in case it doesn't connect
    const conn = await MongoClient.connect(mongoUri);
    db = conn.db(mongoDB);
  } catch (e) {
    console.log("Error connecting to the db", e);
    process.exit(0);
  }
};
const books = async (req, res) => {
  const col = db.collection("books"); // collection of books in db

  let result = await col.find().toArray();
  if (result.length === 0) {
    result = await initializeBooksCollection();
  }

  send(res, 200, result);
};

const initializeBooksCollection = async () => {
  db.collection("books").insertMany(data); // inserting data into db
  return await db
    .collection("books")
    .find()
    .toArray();
};

const bookById = async (req, res) => {
  const col = db.collection("books");
  const result = await col.findOne({ _id: ObjectID(req.params.id) });

  send(res, 200, result);
};

const booksGenData = async (req, res) => {
  const col = db.collection("books");

  const result = await col.insertMany(data);

  send(res, 200, result);
};

const insertReview = async (req, res) => {
  const body = await json(req);
  const col = db.collection("books"); // collection
  const bookId = ObjectID(body.bookId); // an object of bookId
  const book = await col.findOne({ _id: bookId });  // finds book
  const reviews = book.reviews ? book.reviews : []; // if statement if not bring empty
  reviews.push({ // pushes the review onto the book that you are reviewong
    _id: ObjectID(),
    author: body.author,
    content: body.review,
    rating: body.rating
  });

  await col.update({ _id: bookId }, { $set: { reviews } });
  return {
    reviews
  };
};

const booksByAuthor = async (req, res) => {
  const col = db.collection("books");

  console.log(req.params);
  try {
    const params = Number(req.params.author);
    const author = await col.find({ authorId: params }).toArray();
    send(res, 200, author);
  } catch(e) {
    console.log(e);
    send(res, 500, e);
  }
};

// Create one connection to the DB and reuse it
initDb();
module.exports = cors(
  router(
    get("/api/v1/author/:author", booksByAuthor),
    get("/api/v1/books/gen", booksGenData),
    get("/api/v1/books/:id", bookById),
    get("/api/v1/books", books),
    post("/api/v1/books/review", insertReview)
  )
);
