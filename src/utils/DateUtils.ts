export const formatDate = (date: Date | string) => {
    // 如果传入的是字符串，将其转换为 Date 对象
    if (typeof date === 'string') {
        date = new Date(date);
    }
    // 检查 date 是否为有效的 Date 对象
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};