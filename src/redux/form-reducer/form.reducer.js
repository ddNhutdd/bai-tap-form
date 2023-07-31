import { Form } from "./form.const";
const STATE_DEFAULT = {
    mangSinhVien: [],
    sinhVienChinhSua: null,
    mangSinhVienFilter: [],
};
export const formReducer = (state = STATE_DEFAULT, action) => {
    switch (action.type) {
        case Form.ThemSinhVien: {
            let index = state.mangSinhVien.findIndex(
                (n) => n.maSinhVien == action.payload.maSinhVien,
            );
            if (index != -1) {
                alert("Mã sinh viên đã tồn tại trên hệ thống");
                return { ...state };
            }
            state.mangSinhVien.push(action.payload);
            state.mangSinhVien = [...state.mangSinhVien];
            // sau khi thêm sinh viên thành công
            state.mangSinhVienFilter = [];
            return { ...state };
        }
        case Form.XoaSinhVien: {
            let newMangSinhVien = state.mangSinhVien.filter(
                (sv) => sv.maSinhVien != action.payload.id,
            );
            state.mangSinhVien = [...newMangSinhVien];
            if (state.sinhVienChinhSua) {
                if (state.sinhVienChinhSua.maSinhVien == action.payload.id) {
                    state.sinhVienChinhSua = null;
                }
            }
            // sau khi xoá sinh viên thành công
            if (state.mangSinhVienFilter.length > 0) {
                const newMangSinhVienFilter = state.mangSinhVienFilter.filter(
                    (sv) => sv.maSinhVien != action.payload.id,
                );
                state.mangSinhVienFilter = newMangSinhVienFilter;
            }
            return { ...state };
        }
        case Form.LoadDuLieuChinhSuaNhanVien: {
            state.sinhVienChinhSua = action.payload;
            state.sinhVienChinhSua = { ...state.sinhVienChinhSua };
            return { ...state };
        }
        case Form.ChinhSuaSinhVien: {
            let indexSinhVienChinhSua = state.mangSinhVien.findIndex(
                (n) => n.maSinhVien == action.payload.maSinhVien,
            );
            if (indexSinhVienChinhSua == -1) return { ...state };
            state.mangSinhVien[indexSinhVienChinhSua] = action.payload;
            state.mangSinhVien = [...state.mangSinhVien];
            state.sinhVienChinhSua = null;
            // sau khi chinh sửa sinh viên thành công
            if (state.mangSinhVienFilter.length > 0) {
                let indexSinhVienChinhSuaFilter =
                    state.mangSinhVienFilter.findIndex(
                        (n) => n.maSinhVien == action.payload.maSinhVien,
                    );
                if (indexSinhVienChinhSuaFilter != -1) {
                    state.mangSinhVienFilter[indexSinhVienChinhSuaFilter] =
                        action.payload;
                }
            }
            return { ...state };
        }
        case Form.FilterDataListSinhVien: {
            if (state.mangSinhVien.length > 0) {
                let searchString = action.payload;
                if (!searchString) {
                    state.mangSinhVienFilter = [];
                    return { ...state };
                }
                searchString = searchString.replace(/\s/g, "").toLowerCase();
                const result = state.mangSinhVien.filter((sv) => {
                    return sv.hoTenSinhVien
                        .replace(/\s/g, "")
                        .toLowerCase()
                        .includes(searchString);
                });
                if (result.length <= 0) {
                    alert(
                        "Không tìm thấy dữ liệu của sinh viên " + searchString,
                    );
                }
                state.mangSinhVienFilter = result;
            }
            return { ...state };
        }
        default:
            return state;
    }
};
