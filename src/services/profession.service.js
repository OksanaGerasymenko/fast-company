import httpService from "./http.service";

const professionEndpoint = "profession/";

const professsionService = async() => {
    const { data } = await httpService.get(professionEndpoint);
    return data;
};

export default professsionService;
