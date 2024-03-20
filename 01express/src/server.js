// promise - 성공과 실패를 내보냄. 성패를 출력해내는 기계라고 보면 쉽다.
// 성공시 .then(인자값 배출) 실패시 catch로 잡아주기.
// 비동기가 아님!! call back을 좀 더 편안하게 만들어준 디자인 패턴
// promise를 만들기 위해서 함수에 async만 붙여주면 됨.
// async는 성공만 출력 _ 실패가 없음!!! 따라서 실패에 대한 대비로 try~catch구문 사용
// await를 사용하기 위해선 반드시 함수에 async를 붙여서 사용해줘야만 함!
// promise를 기다렸다가 자료를 시작
// await 뒤에는 promise가 온다고 보면 됩니다..?ㅜㅜ?

const express = require("express");
// npm i express로 설치한 파일이 node_modules에 저장이 되는데,
// 이 파일을 현재 경로로 가져와 사용하기 위해 선언해줘야 함.

const app = express();

const mongoose = require("mongoose");
// npm i mongoose 설치한파일 가져옴
// mongoose 설치하면 pending?이 메시지로 출력됨..!
// promise(pending) - 대기하다..? 기다리고 있음

const { User } = require("./model/User.js");
// require은 외부 모듈 가져올때 사용합니당

const dotenv = require("dotenv");
// mongo url 패스워드값 감추기 위해 사용하는 환경

// const users = [];

dotenv.config();
// 사용 할 때는 MONGO_URL로 작성되었던 모든 변수 부분에
//  pocess.env.MONGO_URL 을 대체하여 작성해주면 된다.

// let result = mongoose.connect(MONGO_URL);
// mongodb에 대한 connect가 promise임...?ㅜㅜ pending이 뜸. 상태..ㅜㅜ???
// console.log(result);

// mongoose.connect(MONGO_URL).then(function (result) {
//   return console.log(result);
// });

// function fn(){}
// => async function fn(){}
// const fn = function(){}
// => const fn = async function(){}
// fn()
// async는 성공만 하기 때문에 try~catch문으로 잡아줘야함!

// const fn = new Promise(function (resolve, reject) {});

const server = async function () {
  // ㄱ. async를 만나면 promise가 실행이 되고 (resolve, 실행값만이 나온다?)
  try {
    await mongoose.connect(process.env.MONGO_URL); // promise. <pending>되는거 콘솔창에서 확인할 수 있었을거예요 ( mongoose.connect(MONGO_URL) 까지 부분 저장했을때.)
    // async~await로 비동기처럼 사용할 수 있다? 이해 잘 안됨 ㅜㅜ
    console.log("db connected");
    app.use(express.json());

    app.get("/user", async function (req, res) {
      //get = read랑 동일
      // express().get("/", function (req, res) {
      // 01
      // return res.send({ user: users });
      // return res.send("Hello Worldddddfadfsdfd");
      try {
        const users = await User.find({});
        return res.send({ users });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.post("/user", async function (req, res) {
      // post = create랑 동일
      // req(require)는 받을때, res(response)는 보낼때
      // 01
      // users.push({
      //   name: req.body.name,
      //   age: req.body.age,
      // });
      // // users.push({ name: "홍길동", age: 30 });
      // return res.send({ success: true });

      // 02
      // let username = req.body.username;
      // let name = req.body.name;

      try {
        let { username, name } = req.body; // req.body => body값에서 받아서 username과 name에 넣음
        if (!username) {
          return res.status(400).send({ error: "유저네임이 없습니다." });
        }
        if (!name || !name.first || !name.last) {
          return res.status(400).send({ error: "성 또는 이름이 없습니다." });
        }

        const user = new User(req.body);
        await user.save(); // await 뒤에는 무조건 promise가 온다...?, 몽구스...?:/
        res.send(user);
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    // get http://localhost:3000/user => user list
    // get http://localhost:3000/user/:userId => user id만! -userId는 파라미터
    // put http://localhost:3000/user/:userId => user id만!
    // del http://localhost:3000/user/:userId => user id만!

    // post http://localhost:3000/user

    console.log("hello");

    app.listen(3000);
  } catch (error) {
    console.log("오류!");
  }
};

server();

// express().listen(3000);
// 3000번 포트 연결

// $('선택자').css().attr().click().addClass....
