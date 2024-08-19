const database = require('../database/database');

exports.getTasks = async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await database.query('SELECT * FROM task where userId = $1 ORDER BY created_at DESC', [userId]); // 데이터베이스에서 task 테이블의 유저 아이디를 검색하여 가져온다
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: 'Get Items Fail' + error });
  }
}; // getTasks 함수 생성
