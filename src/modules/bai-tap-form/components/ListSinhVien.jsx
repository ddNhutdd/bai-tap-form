import { Component } from "react";
import { connect } from "react-redux";
import {
    xoaSinhVienCreator,
    loadDuLieuChinhSuaNhanVienCreator,
    filterDataListSinhVienCreator,
} from "./../../../redux/form-reducer/form.action";
class ListSinhVien extends Component {
    state = {
        searchString: "",
    };
    handleChange = (event) => {
        const { value } = event.target;
        this.setState({ searchString: value });
    };
    render() {
        return (
            <div className="list-sinh-vien">
                <div className="row">
                    <div className="col-10 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Họ tên sinh viên"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="col-2">
                        <button
                            onClick={() => {
                                this.props.dispatch(
                                    filterDataListSinhVienCreator(
                                        this.state.searchString,
                                    ),
                                );
                            }}
                            className="btn btn-primary"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>maSV</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {(this.props.mangSinhVienFilter.length == 0
                            ? this.props.mangSinhVien
                            : this.props.mangSinhVienFilter
                        ).map((sv) => {
                            return (
                                <tr key={sv.maSinhVien}>
                                    <td>{sv.maSinhVien}</td>
                                    <td>{sv.hoTenSinhVien}</td>
                                    <td>{sv.soDienThoaiSinhVien}</td>
                                    <td>{sv.emailSinhVien}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        "Bạn có chắc muốn xoá hay không?",
                                                    )
                                                ) {
                                                    this.props.dispatch(
                                                        xoaSinhVienCreator({
                                                            id: sv.maSinhVien,
                                                        }),
                                                    );
                                                }
                                            }}
                                            className="btn btn-danger"
                                        >
                                            Xoá
                                        </button>
                                        <button
                                            onClick={() => {
                                                this.props.dispatch(
                                                    loadDuLieuChinhSuaNhanVienCreator(
                                                        sv,
                                                    ),
                                                );
                                            }}
                                            className="btn btn-success"
                                        >
                                            edit
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = (rootReducer) => {
    return {
        mangSinhVien: rootReducer.formReducer.mangSinhVien,
        mangSinhVienFilter: rootReducer.formReducer.mangSinhVienFilter,
    };
};
export default connect(mapStateToProps)(ListSinhVien);
