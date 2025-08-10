import React, { useState } from "react";
import giaoDichData from "./data";

function App() {
  const [giaoDich, setGiaoDich] = useState(giaoDichData);
  const [formData, setFormData] = useState({
    khachHang: "",
    nhanVien: "",
    soTien: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.khachHang || !formData.nhanVien || !formData.soTien) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (formData.khachHang.length > 30) {
      setError("Tên khách hàng không được quá 30 ký tự!");
      return;
    }
    if (formData.nhanVien.length > 30) {
      setError("Tên nhân viên không được quá 30 ký tự!");
      return;
    }

    const newRecord = {
      id: Date.now(),
      khachHang: formData.khachHang,
      nhanVien: formData.nhanVien,
      soTien: Number(formData.soTien),
      ngayMua: new Date().toLocaleString("vi-VN"),
    };

    setGiaoDich((prev) => [...prev, newRecord]);
    setFormData({ khachHang: "", nhanVien: "", soTien: "" });
    setError("");

    const modalEl = document.getElementById("themModal");
    if (modalEl && window.bootstrap && window.bootstrap.Modal) {
      const bsInstance =
        window.bootstrap.Modal.getInstance(modalEl) ||
        new window.bootstrap.Modal(modalEl);
      bsInstance.hide();
    }
  };

  return (
    <div>
      <div className="topbar d-flex justify-content-between align-items-center flex-wrap bg-dark text-white p-2">
        <div className="fw-bold">Trường Đại học Thủy Lợi</div>
        <div className="d-flex align-items-center flex-wrap">
          <a href="#" className="text-white me-3">Trang chủ</a>
          <a href="#" className="text-white me-3">Quản lý cửa hàng</a>
          <input
            type="text"
            className="form-control form-control-sm ms-3"
            placeholder="Nhập nội dung tìm kiếm"
            style={{ width: "200px" }}
          />
          <button className="btn btn-outline-success btn-sm ms-2">TÌM KIẾM</button>
        </div>
      </div>

      <div className="toolbar d-flex align-items-center flex-wrap gap-2 p-3 bg-light">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#themModal"
        >
          ＋ THÊM
        </button>

        <button className="btn btn-outline-dark">XUẤT RA FILE</button>

        <div className="input-group ms-3" style={{ width: "300px" }}>
          <span className="input-group-text">🔍</span>
          <input type="text" className="form-control" placeholder="Tìm kiếm giao dịch" />
          <button className="btn btn-success">TÌM KIẾM</button>
        </div>

        <div className="d-flex align-items-center ms-auto">
          <span className="me-2">Kết quả</span>
          <select className="form-select w-auto">
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>Tất cả</option>
          </select>
        </div>
      </div>

      <div className="container mt-3">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th><input type="checkbox" /></th>
              <th>Hành động</th>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Nhân viên</th>
              <th>Số tiền</th>
              <th>Ngày mua</th>
            </tr>
          </thead>
          <tbody>
            {giaoDich.map((gd) => (
              <tr key={gd.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <button className="btn btn-sm btn-info">👁</button>
                  <button className="btn btn-sm btn-warning ms-1">✏</button>
                  <button className="btn btn-sm btn-danger ms-1">🗑</button>
                </td>
                <td>{gd.id}</td>
                <td>{gd.khachHang}</td>
                <td>{gd.nhanVien}</td>
                <td>{gd.soTien.toLocaleString()} đ</td>
                <td>{gd.ngayMua}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-danger btn-sm mb-3">DELETE SELECTED RECORDS</button>

        <nav>
          <ul className="pagination justify-content-center">
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">4</a></li>
            <li className="page-item"><a className="page-link" href="#">5</a></li>
          </ul>
        </nav>

        <div className="text-end text-muted">Kết quả 1 trong 20 trang</div>
      </div>

      <div className="footer bg-primary text-white text-center p-3 mt-4">
        <strong>TRƯỜNG ĐẠI HỌC THỦY LỢI</strong><br />
        Địa chỉ: 175 Tây Sơn, Đống Đa, Hà Nội<br />
        Điện thoại: (024) 35633351 - Email: phongdaotao@tlu.edu.vn
      </div>

      <div className="modal fade" id="themModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content border-primary border-2">
            <div className="modal-header">
              <h5 className="modal-title text-primary">Thêm giao dịch</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Khách hàng</label>
                  <input type="text" id="khachHang" value={formData.khachHang} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Nhân viên</label>
                  <input type="text" id="nhanVien" value={formData.nhanVien} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Số tiền</label>
                  <input type="number" id="soTien" value={formData.soTien} onChange={handleChange} className="form-control" />
                </div>

                {error && <div className="text-danger mb-2">{error}</div>}

                <div className="text-end">
                  <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Hủy</button>
                  <button type="submit" className="btn btn-success">Thêm</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
