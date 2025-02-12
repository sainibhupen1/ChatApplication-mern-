

// const express = require("express");
// require("dotenv").config();
// const mongo = require("./MongoDB");
// const Messages = require("./MessageModel");
// const User = require("./loginsignuomodel")
// const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");
// const path = require('path');

// const app = express();
// const server = http.createServer(app);

// // Setting up Socket.IO server
// const io = new Server(server, {
//     cors: {
//         origin: "*", // Allow all origins
//     },
// });

// app.use(express.json());
// app.use(cors());

// const port = process.env.PORT || 3000;
// const _dirname = path.resolve();


// io.on("connection", (socket) => {
//     console.log("🔌 New client connected!");

//     socket.on("newMessage", () => {
//         io.emit("refreshMessages");
//     });

//     socket.on("deleteMessage", () => {
//         io.emit("refreshMessages");
//     });

//     socket.on("disconnect", () => {
//         console.log("❌ Client disconnected!");
//     });
// });





// app.post("/signup", async (req, res) => {
//     try {
//         if (req.body.username && req.body.email && req.body.password) {
//             const user = await User.findOne({ email: req.body.email });
//             if (user) {
//                 return res.status(401).json({
//                     message: "Try different email",
//                     success: false,
//                 });
//             }


//             let users = new User(req.body);
//             let result = await users.save();
//             result = result.toObject();
//             delete result.password;

//             return res.status(200).send({
//                 message: "Account created successfully",
//                 success: true,
//                 result
//             });
//         } else {
//             res.status(401).send({
//                 message: "Something is missing, please check!",
//                 success: false,
//             });
//         }
//     } catch (err) {
//         // console.error(err);
//         res.status(500).json({
//             message: "Server error",
//             success: false,
//         });
//     }
// });



// app.post("/login", async (req, res) => {
//     if (req.body.email && req.body.password) {
//         let users = await User.findOne(req.body).select("-password");

//         if (users) {
//             res.status(200).send({
//                 message: "successfully login",
//                 success: true,
//                 users,
//             });
//         } else {
//             res.status(401).send({
//                 message: "Something is Wrong, please check!",
//                 success: false,
//             });
//         }
//     } else {
//         res.status(401).send({
//             message: "Something is missing, please check!",
//             success: false,
//         });
//     }

// })









// // API to add a new message
// app.post("/message", async (req, res) => {
//     if (req.body.text && req.body.name) {
//         const Mess = new Messages(req.body);
//         await Mess.save();

//         io.emit("refreshMessages"); // Notify all clients about the new message

//         return res.status(200).send({
//             message: "Message sent successfully",
//             success: true,
//             Mess,
//         });
//     } else {
//         return res.status(500).send({
//             message: "Something is missing, text is required!",
//             success: false,
//         });
//     }
// });

// // API to fetch all messages
// app.get("/getmessage", async (req, res) => {
//     const message = await Messages.find().sort({ createdAt: -1 });
//     if (message.length) {
//         res.status(200).send({ message });
//     } else {
//         res.status(200).send({ message: [] });
//     }
// });

// // API to delete a message
// app.delete("/message/:id", async (req, res) => {
//     let result = await Messages.deleteOne({ _id: req.params.id });
//     if (result) {
//         io.emit("refreshMessages"); // Notify all clients about message deletion

//         res.status(200).send({
//             message: "Successfully deleted",
//             success: true,
//         });
//     } else {
//         res.status(500).send({
//             message: "Error deleting message!",
//             success: false,
//         });
//     }
// });

// app.use(express.static(path.join(_dirname, "/frontend/dist")));
// app.get('*', (_, res) => {
//     res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
// })


// // Start the server
// server.listen(port, () => {
//     mongo();
//     console.log(`🚀 Server started on port ${port}`);
// });



const express = require("express");
require("dotenv").config();
const mongo = require("./MongoDB");
const Messages = require("./MessageModel");
const User = require("./loginsignuomodel");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

// 🔹 .env से Variables लोड करें
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const port = process.env.PORT || 5000;

const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL,  // ✅ अब सिर्फ सही Origin अल्लो होगा
        methods: ["GET", "POST", "DELETE"],
        credentials: true
    },
});

app.use(express.json());
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

const _dirname = path.resolve();

// 🟢 Socket.io Events
io.on("connection", (socket) => {
    console.log("🔌 New client connected!");

    socket.on("newMessage", () => {
        io.emit("refreshMessages");
    });

    socket.on("deleteMessage", () => {
        io.emit("refreshMessages");
    });

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected!");
    });
});

// 🔹 Signup API
app.post("/signup", async (req, res) => {
    try {
        if (req.body.username && req.body.email && req.body.password) {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(401).json({ message: "Try different email", success: false });
            }
            let users = new User(req.body);
            let result = await users.save();
            result = result.toObject();
            delete result.password;
            return res.status(200).send({ message: "Account created successfully", success: true, result });
        } else {
            res.status(401).send({ message: "Something is missing, please check!", success: false });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error", success: false });
    }
});

// 🔹 Login API
app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let users = await User.findOne(req.body).select("-password");
        if (users) {
            res.status(200).send({ message: "Successfully login", success: true, users });
        } else {
            res.status(401).send({ message: "Something is wrong, please check!", success: false });
        }
    } else {
        res.status(401).send({ message: "Something is missing, please check!", success: false });
    }
});

// 🔹 Add Message API
app.post("/message", async (req, res) => {
    if (req.body.text && req.body.name) {
        const Mess = new Messages(req.body);
        await Mess.save();
        io.emit("refreshMessages"); // 🔹 Notify all clients
        return res.status(200).send({ message: "Message sent successfully", success: true, Mess });
    } else {
        return res.status(500).send({ message: "Something is missing, text is required!", success: false });
    }
});

// 🔹 Fetch Messages API
app.get("/getmessage", async (req, res) => {
    const message = await Messages.find().sort({ createdAt: -1 });
    if (message.length) {
        res.status(200).send({ message });
    } else {
        res.status(200).send({ message: [] });
    }
});

// 🔹 Delete Message API
app.delete("/message/:id", async (req, res) => {
    let result = await Messages.deleteOne({ _id: req.params.id });
    if (result) {
        io.emit("refreshMessages"); // 🔹 Notify all clients
        res.status(200).send({ message: "Successfully deleted", success: true });
    } else {
        res.status(500).send({ message: "Error deleting message!", success: false });
    }
});

// 🔹 Serve Frontend Files
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// 🔹 Start Server
server.listen(port, () => {
    mongo();
    console.log(`🚀 Server started on port ${port}`);
});
