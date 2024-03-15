import {api} from "../axios/index.js";

async function countHits() {
    try {
        await api.get("/slats/hit")
    } catch (ex) {
        console.log(ex?.message)
    }
}

export default countHits