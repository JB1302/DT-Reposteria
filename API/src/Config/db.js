const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:21313/DTreposteria");
		console.log("MongoDB connected");
	} catch (err) {
		console.error("Database connection error:", err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
