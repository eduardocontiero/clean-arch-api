import Broker from "./infra/broker/Broker";
import ItemDAODatabase from "./infra/dao/ItemDAODatabase";
import OrderDAODatabase from "./infra/dao/OrderDAODatabase";
import MysqlConnectionAdapter from "./infra/database/MysqlConnectionAdapter";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import RouteConfig from "./infra/http/RouteConfig";

const repositoryFactory = new DatabaseRepositoryFactory();
const connection = MysqlConnectionAdapter.getInstance();
const orderDAO = new OrderDAODatabase(connection);
const itemDAO = new ItemDAODatabase(connection);
const expressAdapter = new ExpressAdapter();
const broker = new Broker();
new RouteConfig(expressAdapter, repositoryFactory, orderDAO, broker, itemDAO);
expressAdapter.listen(3000);
