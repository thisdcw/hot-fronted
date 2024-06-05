import MyAxios from '@/plugins/MyAxios'

export const fetchUserData = async (page: number, pageSize: number) => {
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
        throw error; // 可以选择是否要继续抛出错误，视使用场景而定
    }
};

export const fetchApartmentData = async (page: number, pageSize: number) => {
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
        throw error; // 可以选择是否要继续抛出错误，视使用场景而定
    }
};