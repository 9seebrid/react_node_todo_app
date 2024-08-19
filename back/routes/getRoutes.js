const router = require('express').Router(); // api path를 전달해 주는 메서드
const { getTasks } = require('../controllers/getTasks');

router.get('/get_tasks/:userId', getTasks); // 컨트롤러 함수 연결 get_tasks 요청 시 getTasks 함수 실행 / :은 정해지지 않은 문자열을 의미 userId는 파라미터로 사용

module.exports = router; // router 변수를 모듈로 사용할 수 있도록 설정
