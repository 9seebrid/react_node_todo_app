const express = require('express'); // express 모듈 불러오기
const cors = require('cors'); // cors 모듈 불러오기
const PORT = 8080; // 포트 설정

const app = express(); // express 모듈을 사용하기 위해 app 변수에 할당

// const corsOptions = {
//   origin: 'http://localhost:3000', // 허용할 주소
//   credentials: true, // 자격 증명을 사용하도록 설정
// };

// const corsOptions2 = ['http://localhost:3000', 'http://localhost:3001']; // 허용할 주소 여러개일 경우 배열로 처리

app.use(cors()); // cors 사용 설정 http, https 프로토콜을 사용하는 서버간의 통신을 허용한다
app.use(express.json()); // json 형식 사용 설정

app.get('/', (req, res) => {
  res.send('Hello World!'); // get 요청 시 Hello World! 출력
}); // get 요청 시 실행할 함수

// app.get('/get_tasks', async (req, res) => {
//   try {
//     const result = await database.query('SELECT * FROM task'); // 데이터베이스에서 TEST_DB 테이블의 모든 데이터를 가져온다.
//     return res.status(200).json(result.rows);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

app.use(require('./routes/getRoutes')); // getRoutes.js 파일 사용
app.use(require('./routes/postRoutes')); // postRoutes.js 파일 사용
app.use(require('./routes/deleteRoutes')); // deleteRoutes.js 파일 사용
app.use(require('./routes/updateRoutes')); // updateRoutes.js 파일 사용

app.listen(PORT, () => console.log(`Server is runnig on ${PORT}`)); // 서버 실행 시 메세지 출력
