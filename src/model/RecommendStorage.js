import API from "../api/API"

class RecommendStorage{
    static #main_dish = [
        "김치찌개", "피자", "양념치킨", "조기구이", "라면", "김치볶음밥", "카레덮밥", "육개장",
        "된장찌개", "잔치국수", "닭볶음탕", "삼계탕", "불고기", "떡국", "칼국수"
    ]
    static #side_dish = [
        "오곡밥", "배추김치", "멸치볶음", "오징어튀김", "돼지고기장조림",
        "닭강정", "두부", "마늘쫑무침", "미역국", "콩나물무침", "현미밥"
    ]
    static getMainDish(){
        return this.#main_dish;
    }
    static getSideDish(){
        return this.#side_dish;
    }
    static getRecommendFood=async(drisForMeal,...foodRecCandies)=>{
        return API.logic.runFunction("DB_and_reco_API",
            {
                "cmd":"reco.make_reco_ranks",
                "query":{
                    "dris":drisForMeal,
                    "food_set":[...foodRecCandies]
                }
            }).then((response)=>{return response;}).catch(console.log)
    }
}

module.exports = RecommendStorage;