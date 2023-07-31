import React, { Component } from "react";
import ThongTinSinhVien from "./components/ThongTinSinhVien";
import ListSinhVien from "./components/ListSinhVien";
export default class BaiTapForm extends Component {
    render() {
        return (
            <>
                <div className="container">
                    <ThongTinSinhVien />
                    <ListSinhVien />
                </div>
            </>
        );
    }
}
