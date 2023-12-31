const Course = require('../models/Course');
const { mongooseToOject } = require('../../util/mongoose')
class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {

        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', {course: mongooseToOject(course)})
            })
            .catch(next);
        
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')  
    }

    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`
        const course = new Course(req.body)
        course.save()
            .then(() => res.redirect(`/me/stored/courses`))
            .catch(error => {
                
            })
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToOject(course)
            }))
            .catch(next)
        
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next){
        // set action bằng req.body.action
        switch(req.body.action) {
            case 'delete':
                // $in: lọc ra các phần tử có trong mảng courseIds
                // vì req.body.courseIds là mảng không được dặt chung với filed
                Course.delete({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid'})
        }
    }
}

module.exports = new CourseController();
