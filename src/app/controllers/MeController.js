const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose')
class MeController {
    
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        let courseQuery = Course.find({});  

        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                // [req.query.column]: sử dụng ngoặc vuông để đặt tên biến cho key.
                [req.query.column]: req.query.type
            });
        }

        Promise.all([courseQuery,Course.countDocumentsDeleted()])
            // Promise.all sẽ trả về một promise dạng mảng
            // courses là kết quả của promise .then(courses), deletedCount là kết quả của promise .then(deletedCount) 
            // [courses, deletedCount] là sử dụng destructuring bóc tách các phần tử trong mảng
            .then(([courses, deletedCount]) => 
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses)
                })
            )
            .catch(next)
        
        // Gộp 2 thằng promise này lại chung
        // Course.countDocumentsDeleted()
        //     .then(deletedCount => {
        //         console.log(deletedCount)
        //     })
        //     .catch(next);

        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', {
        //         courses: mutipleMongooseToObject(courses)
        //     }))
        //     .catch(next)
        
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next)
    }
}

module.exports = new MeController();
