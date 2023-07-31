import { Form } from "./form.const";
export const themSinhVienCreator = (payload) => {
    return {
        type: Form.ThemSinhVien,
        payload,
    };
};
export const xoaSinhVienCreator = (payload) => {
    return {
        type: Form.XoaSinhVien,
        payload,
    };
};
export const chinhSuaSinhVienCreator = (payload) => {
    return {
        type: Form.ChinhSuaSinhVien,
        payload,
    };
};
export const loadDuLieuChinhSuaNhanVienCreator = (payload) => {
    return {
        type: Form.LoadDuLieuChinhSuaNhanVien,
        payload,
    };
};
export const filterDataListSinhVienCreator = (payload) => {
    return {
        type: Form.FilterDataListSinhVien,
        payload,
    };
};
