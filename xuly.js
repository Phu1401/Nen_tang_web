// File: script.js

document.addEventListener("DOMContentLoaded", function() {
    const tbody = document.querySelector("tbody");
    const form = document.querySelector("form");
    const modal = document.querySelector("#themModal");
    let currentId = data.length + 1100;

    // Hàm hiển thị dữ liệu
    function renderTable() {
        tbody.innerHTML = "";
        data.forEach(item => {
            const row = `<tr>
        <td><input type="checkbox"></td>
        <td>
          <button class="btn btn-sm btn-info">👁</button>
          <button class="btn btn-sm btn-warning">✏</button>
          <button class="btn btn-sm btn-danger">🗑</button>
        </td>
        <td>${item.id}</td>
        <td>${item.khachHang}</td>
        <td>${item.nhanVien}</td>
        <td>${item.soTien}</td>
        <td>${item.ngayMua}</td>
      </tr>`;
            tbody.innerHTML += row;
        });
    }

    renderTable(); // Hiển thị ban đầu

    // Gắn sự kiện gửi form
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const khachHang = form.querySelector("input[type=text]").value.trim();
        const nhanVien = form.querySelectorAll("input[type=text]")[1].value.trim();
        const soTien = form.querySelector("input[type=number]").value.trim();

        // Kiểm tra hợp lệ
        if (!khachHang || !nhanVien || !soTien) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (khachHang.length > 30) {
            alert("Tên khách hàng không được quá 30 ký tự.");
            return;
        }

        if (nhanVien.length > 30) {
            alert("Tên nhân viên không được quá 30 ký tự.");
            return;
        }

        // Tạo ngày giờ hiện tại
        const now = new Date();
        const ngayMua = now.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }) + " " + now.getHours() + ":" + now.getMinutes();

        // Thêm bản ghi mới
        const newItem = {
            id: ++currentId,
            khachHang,
            nhanVien,
            soTien,
            ngayMua
        };
        data.push(newItem);

        renderTable(); // cập nhật bảng

        form.reset();
        bootstrap.Modal.getInstance(modal).hide(); // đóng popup
    });
});