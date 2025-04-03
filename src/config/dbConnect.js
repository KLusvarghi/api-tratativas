import mongoose from "mongoose"

// mongoose.connect(process.env.DB_CONNECTION_STRING);
mongoose.connect("mongodb+srv://kauaolusvarghi:6uEWkqSRnlGTAgq2@cluster0.osyfrdm.mongodb.net/livraria?retryWrites=true&w=majority&appName=Cluster0");

let db = mongoose.connection;

export default db;


