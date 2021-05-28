const { User } = require("../../src/app/models");

describe("Authentication", () => {
  it("deve criar um usuário", async () => {
    const user = await User.create({
      name: "Wellington",
      email: "wellington.rocha@luizalabs.com",
      password_hash: "jsh9#$83787*&#*&#*",
    });

    console.log(user);

    expect(user.email).toBe("wellington.rocha@luizalabs.com");
  });
});
