module.exports = function SortMiddleware(req, res, next) {
    // _sort: là tên biến
    res.locals._sort = {
        enabled: false,
        type: 'default'
    };

    if (req.query.hasOwnProperty('_sort')) {
        // Cách 1
        // res.locals._sort.enabled = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.colum = req.query.column;

        // Tương đương cách 1
        // Hợp nhất 2 object nếu trùng key sẽ ghi đè key của object sau cho object trước đó.
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        })
    }

    next()
}