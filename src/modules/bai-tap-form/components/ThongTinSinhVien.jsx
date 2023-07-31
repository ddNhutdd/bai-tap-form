import { Component } from "react";
import { connect } from "react-redux";
import {
    themSinhVienCreator,
    chinhSuaSinhVienCreator,
} from "../../../redux/form-reducer/form.action";
class ThongTinSinhVien extends Component {
    maps = {
        maSinhVien: "Mã sinh viên",
        hoTenSinhVien: "họ tên sinh viên",
        soDienThoaiSinhVien: " số điện thoại sinh viên",
        emailSinhVien: "email sinh viên",
    };
    state = {
        value: {
            maSinhVien: "",
            hoTenSinhVien: "",
            soDienThoaiSinhVien: "",
            emailSinhVien: "",
        },
        touch: {
            maSinhVien: false,
            hoTenSinhVien: false,
            soDienThoaiSinhVien: false,
            emailSinhVien: false,
        },
        error: {
            maSinhVien: "",
            hoTenSinhVien: "",
            soDienThoaiSinhVien: "",
            emailSinhVien: "",
        },
    };
    handleChange = (event) => {
        const { id, value } = event.target;
        //validation
        let newError = {};
        for (const key in this.state.touch) {
            if (this.state.touch[key]) {
                const __value = key === id ? value : this.state.value[key];
                switch (key) {
                    case "maSinhVien": {
                        if (/^\d*$/.test(__value) === false) {
                            newError[key] = "Mã sinh viên phải là số.";
                        }
                        break;
                    }
                    case "soDienThoaiSinhVien": {
                        if (
                            /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(__value) ===
                            false
                        ) {
                            newError[key] =
                                "Số điện thoại không đúng định dạng.";
                        }
                        break;
                    }
                    case "emailSinhVien": {
                        if (
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                                __value,
                            ) === false
                        ) {
                            newError[key] = "Email không đúng định dạng.";
                        }
                        break;
                    }
                }
                if (__value.length === 0) {
                    newError[key] = this.maps[key] + " không được bỏ trống";
                }
            }
        }
        // cập nhật giá trị state
        this.setState({
            value: {
                ...this.state.value,
                [id]: value,
            },
            error: newError,
        });
    };
    handleFocus = (event) => {
        const { id } = event.target;
        this.setState({
            touch: {
                ...this.state.touch,
                [id]: true,
            },
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        for (const key in this.state.value) {
            if (this.state.value[key].length === 0) {
                return;
            }
            if (this.state.error[key]?.length > 0) {
                alert(this.state.error[key]);
                return;
            }
        }
        const creator = this.props.sinhVienChinhSua
            ? chinhSuaSinhVienCreator
            : themSinhVienCreator;
        this.props.dispatch(creator(this.state.value));
        this.setState({
            value: {
                maSinhVien: "",
                hoTenSinhVien: "",
                soDienThoaiSinhVien: "",
                emailSinhVien: "",
            },
            touch: {
                maSinhVien: false,
                hoTenSinhVien: false,
                soDienThoaiSinhVien: false,
                emailSinhVien: false,
            },
            error: {
                maSinhVien: "",
                hoTenSinhVien: "",
                soDienThoaiSinhVien: "",
                emailSinhVien: "",
            },
        });
    };
    static getDerivedStateFromProps(props, state) {
        if (props.sinhVienChinhSua) {
            if (
                props.sinhVienChinhSua?.maSinhVien !== state.value?.maSinhVien
            ) {
                return {
                    ...state,
                    value: props.sinhVienChinhSua,
                };
            }
        }
        return null;
    }
    render() {
        return (
            <div className="thong-tin">
                <div className="thong-tin__title">Thông tin sinh viên</div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="maSinhVien" className="form-label">
                                Mã sinh viên
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="maSinhVien"
                                onChange={() => {
                                    this.handleChange(event);
                                }}
                                onFocus={() => {
                                    this.handleFocus(event);
                                }}
                                value={this.state.value.maSinhVien}
                                disabled={
                                    this.props.sinhVienChinhSua != null
                                        ? true
                                        : false
                                }
                            />
                            <div
                                id="maSinhVienError"
                                className="form-text text text-danger"
                            >
                                {this.state.error.maSinhVien}
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <label
                                htmlFor="hoTenSinhVien"
                                className="form-label"
                            >
                                Họ tên
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="hoTenSinhVien"
                                onChange={() => {
                                    this.handleChange(event);
                                }}
                                onFocus={() => {
                                    this.handleFocus(event);
                                }}
                                value={this.state.value.hoTenSinhVien}
                            />
                            <div
                                id="hoTenSinhVienError"
                                className="form-text text text-danger"
                            >
                                {this.state.error.hoTenSinhVien}
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <label
                                htmlFor="soDienThoaiSinhVien"
                                className="form-label"
                            >
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="soDienThoaiSinhVien"
                                onChange={() => {
                                    this.handleChange(event);
                                }}
                                onFocus={() => {
                                    this.handleFocus(event);
                                }}
                                value={this.state.value.soDienThoaiSinhVien}
                            />
                            <div
                                id="soDienThoaiSinhVienError"
                                className="form-text text text-danger"
                            >
                                {this.state.error.soDienThoaiSinhVien}
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <label
                                htmlFor="emailSinhVien"
                                className="form-label"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="emailSinhVien"
                                onChange={() => {
                                    this.handleChange(event);
                                }}
                                onFocus={() => {
                                    this.handleFocus(event);
                                }}
                                value={this.state.value.emailSinhVien}
                            />
                            <div
                                id="soDienThoaiError"
                                className="form-text text text-danger"
                            >
                                {this.state.error.emailSinhVien}
                            </div>
                        </div>
                    </div>
                    {!this.props.sinhVienChinhSua ? (
                        <button className="btn btn-success">Thêm</button>
                    ) : (
                        <button className="btn btn-success">Chỉnh sửa</button>
                    )}
                </form>
            </div>
        );
    }
}
const mapStateToProps = (rootReducer) => {
    return {
        sinhVienChinhSua: rootReducer.formReducer.sinhVienChinhSua,
    };
};
export default connect(mapStateToProps)(ThongTinSinhVien);
