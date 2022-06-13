import httpService from "./http.service";

const userEndpoint = "user/";
const userServise = {
    get: async() => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async(user) => {
        const { data } = await httpService.put(userEndpoint + user._id, user);
        return data;
    }
};

export default userServise;
