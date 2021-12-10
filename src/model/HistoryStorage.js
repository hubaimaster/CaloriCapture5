const fs =require("react-native-fs");
import API from "../api/API";
class HistoryStorage{
    static #history={
        "aAMRxEJVuXdUQwPSkxU2ME": {
            "2021-12-08": [{"foodList": ["부대찌개","쌀밥"], "amountList": [1.0,1.0]},{"foodList": ["쌀밥"], "amountList": [1.0]}],
            "2021-12-09": [{"foodList":["쌀밥","시레기국","닭볶음탕","백김치","김치","버섯볶음"], "amountList":[1.0,1.0,0.3,0.2,0.2,0.2]}],
        },
    }//key 값은 userid
    static getHistory=(userId)=>{
        let historyList=this.#history[`${userId}`];
        if(historyList==undefined){
            this.#history[`${userId}`] = {};
            historyList=this.#history[`${userId}`];
        }
        return historyList;
    }
    static addHistory(userId,oneMeal){
        this.#history[`${userId}`].append(oneMeal);
    }
    static getSingleFoodInfo=async (foodName)=>{
        const response=await API.logic.runFunction("DB_and_reco_API",
            {
                "cmd":"food.db_find_one",
                "query":foodName
            });
        return response
    }
    static getMultipleFoodInfo=async(...foodNames)=>{
        const response= await API.logic.runFunction("DB_and_reco_API",
            {
                "cmd":"food.db_find_many",
                "query":[...foodNames]
        });
        return response;
    }
}

module.exports=HistoryStorage;