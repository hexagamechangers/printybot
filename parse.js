const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());