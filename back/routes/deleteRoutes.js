const router = require('express').Router(); // api path를 전달해 주는 메서드
const { deleteTask } = require('../controllers/deleteTask');

router.delete('/delete_task/:itemId', deleteTask);

module.exports = router;
