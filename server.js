const http=require("http")
const app=require("./app")

const PORT=process.env.PORT||80;
const server=http.createServer(app);
server.listen(PORT,'0.0.0.0')

