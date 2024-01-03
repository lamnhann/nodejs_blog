# MIDDLEWARE

### Ý nghĩa
- Là phần mềm trung gian (bản thân là 1 thành phần đứng giữa các thành khác làm nhiệm vụ kết nối, trung chuyển, kiểm soát trong mô hình phần mềm ).
- Ví dụ:
    + Browser (client) ====== Request ========> Server(Node)

    + Browser (client) <====== Response ======== Server(Node)

### Vai trò
- Giống như "Bác bảo vệ"

- Ví dụ:
    + Nhà ====================> Bác bảo vệ (middleware) => Sự kiện (soát vé)
    + Nhà <==================== Sự kiện

- Bác bảo vệ trên làm nhiệm vụ gì
1. Soát vé --> Validation --- không có cho về
3. Không cho vào
2. Cho phép vào (Validation pass ---> cho vào)
4. Chỉnh sửa / thay đổi

- Ví dụ cụ thể
```js
app.get('/middleware',
    function (req, res, next) {
        if (['vethuong', 'vevip'].includes(req.query.ve)) {
            next();
        }
    },
    function (req, res, next) {
        res.json({
            message:'Success'
        });
    }
);
```
- Mỗi function tượng trưng như 1 bác bảo vệ
- Nếu function 1 kiểm tra xong sử dụng next() để sang function 2
- Nếu không next thì trang web sẽ bị treo


```js
app.get('/middleware',
    function (req, res, next) {
        if (['vethuong', 'vevip'].includes(req.query.ve)) {
            return next();
        }

        res.status(403).json({
            message: 'Access denied'
        })
    },
    function (req, res, next) {
        res.json({
            message:'Success'
        });
    }
);
```

- Sử dụng đoạn này
```js
res.status(403).json({
    message: 'Access denied'
})
```
- Nếu thoả điều kiện sẽ next tới function 2.
- Nếu không thoả điều kiện sẽ chạy vào đoạn này mà không next qua function 2


```js

app.get('/middleware',
    function (req, res, next) {
        if (['vethuong', 'vevip'].includes(req.query.ve)) {
            req.face= "Gach gach gach";
            next();
        }

        res.status(403).json({
            message: 'Access denied'
        })
    },
    function (req, res, next) {
        res.json({
            message:'Success',
            face: req.face
        });
    }
);
```

- Khi kiểm tra đủ điều kiện ở function 1 trả về req.face. Thì function 2 sẽ nhận lại được req.face đó.


### ứng dụng
- Dựng chức năng xác thực (Authentication)
- Chức năng phân quyển (Authorization)