import mongoose from "mongoose";    

export default function connectToDB () {
    const dbUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/db-mern-ticket";

    try{
        mongoose.connect(dbUrl);
    } catch (error) {
        console.error("Failed to connect to database", error);
        process.exit(1);
    }

    const dbConnection = mongoose.connection;

    dbConnection.on("connected", () => {
        console.log(`Database berhasil connect ${dbUrl}`);
    });

    dbConnection.on("error", (err) => {
        console.error(`Database connection error: ${err}`);
    });

}