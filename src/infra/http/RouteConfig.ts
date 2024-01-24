import SimulateFreight from "../../application/usecase/simulate_freight/SimulateFreight";
import DefaultFreightCalculator from "../../domain/entity/DefaultFreightCalculator";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import PlaceOrderController from "../controller/PlaceOrderController";
import MysqlConnectionAdapter from "../database/MysqlConnectionAdapter";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import Http from "./Http";

export default class RouteConfig {
    constructor(http: Http, repositoryFactory: RepositoryFactory) {

        http.on("/orders", "post", async function (params: any, body: any) {
          
            const placeOrderController = new PlaceOrderController(repositoryFactory);
            return placeOrderController.execute(params, body);


        });

        http.on("/simulate-freight", "post", async function (params: any, body: any) {
            const simulateFreight = new SimulateFreight(new ItemRepositoryDatabase(MysqlConnectionAdapter.getInstance()), new DefaultFreightCalculator());

            const input = body;
            return await simulateFreight.execute(input);

        });


    }
}