/**
 * 用户类别
 */
export type Type = {
    uid: number;
    avatar: string;
    username?: string;
    userAccount: string;
    gender?: number;
    phone?: string;
    email?: string;
    userRole: number;
    remark?: string;
    updateTime: Date;
    createTime: Date;
};