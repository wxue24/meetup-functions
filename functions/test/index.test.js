const test = require("firebase-functions-test")(
  {
    databaseURL: "https://meetup-462d1.firebaseio.com",
    projectId: "meetup-462d1",
    storageBucket: "meetup-462d1.appspot.com",
  },
  "meetup-462d1-bca6d7fed924.json"
);

const myFunctions = require("../index.js");

describe("Meetup functions", () => {
  const getInstagram = test.wrap(myFunctions.getInstagram);
  const sendOTP = test.wrap(myFunctions.sendOTP);
  const checkOTP = test.wrap(myFunctions.checkOTP);

  afterEach(() => {
    test.cleanup();
  });

  // it("gets instagram handle", async () => {
  //   let data = {
  //     // Get new auth code and paste here each test
  //     code:
  //       "AQBLXmVuIXLvXVgi0KuJxhRgxkFdMj0FVMI5KMiT7A-3gmcCAZhbel9Xq4CvjrLYraUWw0YvpUlPEeeb_z2FfTwrKKj3B1Xx2X8Ecxscr94i4DU7uTeWr149xjdqk36v_rNp48W2Gl1aNC1QUa_fmR7qheC8M3JBNyPm4ZAOEuxx7yGzTWQV13Z-Y10KAnmuo6Je44r1atyXIORXEy-3_30ruuZG5Fmg-5GBdML6akl_Uw",
  //   };
  //   await getInstagram(data).then((result) => {
  //     expect(result.handle).toMatch("wxue.2020");
  //   });
  // });

  // it("throws error when getting instagram handle", async () => {
  //   let data = {
  //     code:
  //       //Expired code
  //       "AQBLXmVuIXLvXVgi0KuJxhRgxkFdMj0FVMI5KMiT7A-3gmcCAZhbel9Xq4CvjrLYraUWw0YvpUlPEeeb_z2FfTwrKKj3B1Xx2X8Ecxscr94i4DU7uTeWr149xjdqk36v_rNp48W2Gl1aNC1QUa_fmR7qheC8M3JBNyPm4ZAOEuxx7yGzTWQV13Z-Y10KAnmuo6Je44r1atyXIORXEy-3_30ruuZG5Fmg-5GBdML6akl_Uw",
  //   };
  //   await getInstagram(data).catch((err) => {
  //     expect(err.code).toMatch("permission-denied");
  //   });
  // });

  // it("sends OTP", async () => {
  //   await sendOTP({ phone: "9099649258" }).then(result => {
  //     expect(result.phone).toMatch("+19099649258")
  //   });
  // })

  // it("does not send OTP for invalid number", async() => {
  //   await sendOTP({phone: "0000000000" }).catch(err => {
  //     expect(err.code).toMatch("failed-precondition");
  //   })
  // })

  // it("checks incorrect OTP", async () => {
  //   const data = {
  //     OTP: "345324",
  //     phone: "+19099649258",
  //   };
  //   await checkOTP(data).catch((err) => {
  //     expect(err.code).toMatch("unknown");
  //   });
  // });

  // it("checks correct OTP", async () => {
  //   const data = {
  //     // Current OTP
  //     OTP: "639375",
  //     phone: "+19099649258",
  //   };
  //   await checkOTP(data).then((result) => {
  //     expect(result.status).toMatch("approved");
  //   });
  // });
});
