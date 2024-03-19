//  스키마 작성 요령!!
// 1. 제일 먼저 mongoose 입력하면 const mongoose = require("mongoose"); <-이부분은 자동생성됨
// 2. const userSchema = mongoose.Schema({}) <- userSchama의 user부분은 걍 내가 알아서 임의로지음
// 3. cosnt User = mongoose.model("user",userSchema) <- User나 user, userSchema의 user부분등은 임의로 알아서 지음
// 4. module.exports = {User} <- exports과정 절대 누락되지않게 신경쓸 것! User부분은 임의로지음

const mongoose = require("mongoose");
// => 해당 라인은 스키마 파일 만들 때, mongoose라고 입력하고 엔터 치면 알아서 선언해줌!

// const UserSchema = mongoose.Schema();
// mongoose.model("user", UserSchema);
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      // required : true는 반드시 받아야하는 데이터를 의미함.
    },
    name: {
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        required: true,
      },
    },
    age: Number,
    email: String,
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = { User };
// exports과정 누락되지 않도록 꼭 유의!
