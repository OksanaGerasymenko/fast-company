import httpService from "./http.service";
import { getUserId } from "./localStorage.service";

const userEndpoint = "user/";
const userServise = {
    get: async() => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async(user) => {
        const { data } = await httpService.put(userEndpoint + user._id, user);
        return data;
    },
    getCurrentUser: async() => {
        const { data } = await httpService.get(userEndpoint + getUserId());
        return data;
    }
};

export default userServise;
