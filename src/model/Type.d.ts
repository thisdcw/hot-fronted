/**
 * 用户类别
 */

export declare namespace API {
    type User = {
        uid: number;
        avatar: string;
        username: string;
        userAccount: string;
        gender?: number;
        phone?: string;
        email?: string;
        userRole: number;
        remark?: string;
        updateTime: Date;
        createTime: Date;
    };
    type Apartment = {
        aid: number;
        uid?: number;
        apartmentName: string;
        address: string;
        type: number;
        apartmentStatus: number;
        updateTime: Date;
        createTime: Date;
    }
    type PageResponse<T> = {
        page: number;
        pageSize: number;
        total: number;
        records: T[];
    }
}