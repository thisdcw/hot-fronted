import MyAxios from '@/plugins/MyAxios'
import {API} from "@/model/Type";

export const fetchUserData = async (page: number, pageSize: number): Promise<API.PageResponse<API.User>> => {
    try {
        const response = await MyAxios.get('/hot/user/all', {
            params: {
                page: page,
                size: pageSize,
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Type list get failed: ", error);
        return {} as API.PageResponse<API.User>;
    }
};

export const fetchApartmentData = async (page: number, pageSize: number):Promise<API.PageResponse<API.Apartment>> => {
    try {
        const response = await MyAxios.get('/hot/apartment/all', {
            params: {
                page: page,
                size: pageSize,
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Type list get failed: ", error);
        return {} as API.PageResponse<API.Apartment>;
    }
};