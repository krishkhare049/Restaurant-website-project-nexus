// Run server-

const http = require("http");
const cluster = require("cluster");
const app = require("./app");
const os = require("os");

const { API_PORT } = process.env;
let numcpu = os.cpus().length;
const server = http.createServer(app);

const PORT = process.env.PORT || API_PORT;
// app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));

// Run server-
// const PORT = process.env.PORT || API_PORT;
// // app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));

// if (cluster.isMaster) {
//   for (let i = 0; i < numcpu; i++) {
//     // const element = numcpu[i];
//     cluster.fork();
//   };
// }
// else {
//   app.listen(PORT, () => console.log(`Server ${process.pid} started on port http://localhost:${PORT}`));
// };

// May be http module is much faster than express app.listen -

if (cluster.isMaster) {
    for (let i = 0; i < numcpu; i++) {
        // const element = numcpu[i];
        cluster.fork();
    };

    // If any worker killed-
    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
}
else {
    // server listening 
    server.listen(PORT, () => {
        console.log(`Server ${process.pid} started on port http://localhost:${PORT}`);
    });
};