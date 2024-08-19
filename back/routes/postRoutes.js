const router = require('express').Router(); // api path를 전달해 주는 메서드
const { postTask } = require('../controllers/postTask');

router.post('/post_task', postTask);

module.exports = router;
