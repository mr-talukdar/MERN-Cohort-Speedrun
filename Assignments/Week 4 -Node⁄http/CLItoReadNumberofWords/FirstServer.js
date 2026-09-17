const http = require("http");
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead("200", { "content-type": "text/plain" });
    res.end("Hello From Server");
  }
  if (req.method === "GET" && req.url === "/api") {
    res.writeHead("200", { "content-type": "text/plain" });
    res.end("Welcome to Apis");
  }
});
server.listen(3000, () => {
  console.log("server running and started");
});
