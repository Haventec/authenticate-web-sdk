import {expect, tap} from "tapbundle";
import {HT_TokenService} from "../ts/ht_token.service";

// Test crypto.service.ts
tap.test("it should test token", async () => {

    let testAdminToken = "eyJhbGciOiJFUzM4NCJ9.eyJpc3MiOiJIYXZlbnRlYyIsImV4cCI6MTUwMjM1MTc1MiwiaWF0IjoxNTAyMzQ4MTUyLCJuYmYiOjE1MDIzNDgwMzIsInN1YiI6Imp1c3RpbiIsInJvbGUiOlsiSFRfQURNSU4iXSwiYXBwbGljYXRpb25VVUlEIjoiNWJkNGMxMTQtODg5Yy00NjE1LWEyZTgtY2JmMjlhM2E5ODdmIiwidXNlclVVSUQiOiJmYzljYWEwNy0zNTI3LTQ4NTEtOGQyMS0yNWUxNzYxNWZjZjIiLCJqdGkiOiIwMkpzSW1zdWNBekFZRFJRdXNtbElRIn0.zt_lQ6m0v0t9CUoIne-Glm7NcIhXhzLQuInAS_fbemnYVsm5xtkyfV92DRLpO2l3hyeEngBMQ0M1qxJaBhPv_zso29S5TFDvCXBTrqVgqCw5PDlG1_oRSZyQcW_n5MpW";
    let parsedToken = HT_TokenService.parseJwt(testAdminToken);

    console.log(parsedToken);

    expect(parsedToken.userUUID).to.equal("fc9caa07-3527-4851-8d21-25e17615fcf2");
    expect(parsedToken.applicationUUID).to.equal("5bd4c114-889c-4615-a2e8-cbf29a3a987f");

    expect(parsedToken.role).to.be.instanceof(Array);
    expect(parsedToken.role).to.not.include("HT_AN_ADMIN");
    expect(parsedToken.role).to.not.include("HT_AN_AUDIT");
    expect(parsedToken.role).to.include("HT_ADMIN");

    let testAnAdminToken = "eyJhbGciOiJFUzM4NCJ9.eyJpc3MiOiJIYXZlbnRlYyIsImV4cCI6MTUwMjM1NDA1OSwiaWF0IjoxNTAyMzUwNDU5LCJuYmYiOjE1MDIzNTAzMzksInN1YiI6InFxcSIsInJvbGUiOlsiSFRfQU5fQURNSU4iLCJIVF9BTl9BVURJVCJdLCJhcHBsaWNhdGlvblVVSUQiOiI1YmQ0YzExNC04ODljLTQ2MTUtYTJlOC1jYmYyOWEzYTk4N2YiLCJ1c2VyVVVJRCI6IjEwZmM0MDZlLTc4NTMtNDg0Ni04MjQ5LWUyMWM5M2ZmYTM3MCIsImp0aSI6Imd0ckR6dzY2UG1aYVpfTUdEU1NuVkEifQ.JDIvhgMBGejwMQkMTZfrhRqtqWSU46oXpDL6PmMrxOOFlsBx3QjGAZlvBNSmwxF9imyFd0Z-WxUrOycsq8Yfr1XyDjW2dHOFSaFWeiuZz-kQ4K4u92QZPZaimYKwneER";
    let parsedToken2 = HT_TokenService.parseJwt(testAnAdminToken);
    expect(parsedToken2.role).to.be.instanceof(Array);
    expect(parsedToken2.role).to.include("HT_AN_ADMIN");
    expect(parsedToken2.role).to.include("HT_AN_AUDIT");
    expect(parsedToken2.role).to.not.include("HT_ADMIN");
});

tap.start()