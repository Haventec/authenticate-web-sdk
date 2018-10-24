import {expect, tap} from "tapbundle";
import {isUndefined} from "util";
import {HT_Data} from "../ts/model/htdata";
import {HaventecAuthenticateClient} from "../ts/api/haventec.client";

tap.test("it should test HaventecAuthenticateClient API", async () => {

    let haventecAuthenticateClient = new HaventecAuthenticateClient(true);

    let fakeResponse = {
        "applicationUuid":"7472a4c0-7e7a-4d4e-908c-7f91af169f67",
        "username":"testusername",
        "deviceUuid":"b42713aa-ee1d-489e-9fb6-3621140dcc35",
        "authKey":"Mwpb0QDijruk/9Wv9BRe2jAd5aXbgJ/EJ+eNpfpQXirAsJm/GK7WzOV25uOlabH9FFhPBEIB4yLWqc4l0e2h13rjzzxXJf4cUW+7c7D5H2LInLdIFl2gnxONgnsYB6ENvyHMDeQqAgXNdk07l88Eyh+4eKqLgSpAB12/LXjST+/2JL+7Uc2jRK2vBwyp21G0fvasC8vanw6FwYZp8RXkFEsrfWq3yib8Vr1duRZciB8qZbvsagI1DhF6uI+xPoNDogFE6DlJG6aK85ktz+uFPdZGk6EgfyDzikKIm/51lUf/5aR+TJSZm8IFOk37ydMoly9Z6aqd5r2QHmmnoGAWt/cFiomalsAXYJvgUb3NlhmrSqVD393rlTvc5fPpcssgQPLteeIcTz6FweiHyBOglC2wK2RjDfYwvTfoP3OHnFbQfS1DM7BUu9pXn3bvjYWl1wlWQlWJrn4/DpvQnrP+kg==",
        "accessToken":{
            "token":"eyJhbGciOiJFUzM4NCJ9.eyJpc3MiOiJIYXZlbnRlYyIsImV4cCI6MTUwMDQ2MzU1NCwiaWF0IjoxNTAwNDU5OTU0LCJuYmYiOjE1MDA0NTk4MzQsInN1YiI6IlpldXMiLCJyb2xlIjpbIkhUX0FETUlOIl0sImFwcGxpY2F0aW9uVVVJRCI6Ijc0NzJhNGMwLTdlN2EtNGQ0ZS05MDhjLTdmOTFhZjE2OWY2NyIsInVzZXJVVUlEIjoiNDVkZDIxMzUtOTkxNy00NzIzLTk4NjctYWM3ZWExNTUzMTMzIiwianRpIjoiXzZXRVZJTmdPbG92VUtvbmZuOVhhdyJ9.06GeGkXYuDOCB7A36QnFr0vTNCXZ2RBQV0Sdp-KnwhhZWeJpGqa0aNk_7dqOEZaOX2fQ37zUZLcSumIrOfKMxHYZmEhDDmPFGcpgU8UXaSrk3DKP-jJR975jml_zFNcD",
            "type":"JWT"
        },
        "deviceName":"My Device",
        "status":"SUCCESS",
        "result":"Changed"
    };

    let fakeResponseNonAdmin = {
        "applicationUuid":"7472a4c0-7e7a-4d4e-908c-7f91af169f67",
        "username":"testusername",
        "deviceUuid":"b42713aa-ee1d-489e-9fb6-3621140dcc35",
        "authKey":"Mwpb0QDijruk/9Wv9BRe2jAd5aXbgJ/EJ+eNpfpQXirAsJm/GK7WzOV25uOlabH9FFhPBEIB4yLWqc4l0e2h13rjzzxXJf4cUW+7c7D5H2LInLdIFl2gnxONgnsYB6ENvyHMDeQqAgXNdk07l88Eyh+4eKqLgSpAB12/LXjST+/2JL+7Uc2jRK2vBwyp21G0fvasC8vanw6FwYZp8RXkFEsrfWq3yib8Vr1duRZciB8qZbvsagI1DhF6uI+xPoNDogFE6DlJG6aK85ktz+uFPdZGk6EgfyDzikKIm/51lUf/5aR+TJSZm8IFOk37ydMoly9Z6aqd5r2QHmmnoGAWt/cFiomalsAXYJvgUb3NlhmrSqVD393rlTvc5fPpcssgQPLteeIcTz6FweiHyBOglC2wK2RjDfYwvTfoP3OHnFbQfS1DM7BUu9pXn3bvjYWl1wlWQlWJrn4/DpvQnrP+kg==",
        "accessToken":{
            "token":"eyJhbGciOiJFUzM4NCJ9.eyJpc3MiOiJIYXZlbnRlYyIsImV4cCI6MTUwMjM1NDA1OSwiaWF0IjoxNTAyMzUwNDU5LCJuYmYiOjE1MDIzNTAzMzksInN1YiI6InFxcSIsInJvbGUiOlsiSFRfQU5fQURNSU4iLCJIVF9BTl9BVURJVCJdLCJhcHBsaWNhdGlvblVVSUQiOiI1YmQ0YzExNC04ODljLTQ2MTUtYTJlOC1jYmYyOWEzYTk4N2YiLCJ1c2VyVVVJRCI6IjEwZmM0MDZlLTc4NTMtNDg0Ni04MjQ5LWUyMWM5M2ZmYTM3MCIsImp0aSI6Imd0ckR6dzY2UG1aYVpfTUdEU1NuVkEifQ.JDIvhgMBGejwMQkMTZfrhRqtqWSU46oXpDL6PmMrxOOFlsBx3QjGAZlvBNSmwxF9imyFd0Z-WxUrOycsq8Yfr1XyDjW2dHOFSaFWeiuZz-kQ4K4u92QZPZaimYKwneER",
            "type":"JWT"
        },
        "deviceName":"My Device",
        "status":"SUCCESS",
        "result":"Changed"
    };

    let fakeResponseAdmin = {
        "applicationUuid":"7472a4c0-7e7a-4d4e-908c-7f91af169f67",
        "username":"testusername",
        "deviceUuid":"b42713aa-ee1d-489e-9fb6-3621140dcc35",
        "authKey":"Mwpb0QDijruk/9Wv9BRe2jAd5aXbgJ/EJ+eNpfpQXirAsJm/GK7WzOV25uOlabH9FFhPBEIB4yLWqc4l0e2h13rjzzxXJf4cUW+7c7D5H2LInLdIFl2gnxONgnsYB6ENvyHMDeQqAgXNdk07l88Eyh+4eKqLgSpAB12/LXjST+/2JL+7Uc2jRK2vBwyp21G0fvasC8vanw6FwYZp8RXkFEsrfWq3yib8Vr1duRZciB8qZbvsagI1DhF6uI+xPoNDogFE6DlJG6aK85ktz+uFPdZGk6EgfyDzikKIm/51lUf/5aR+TJSZm8IFOk37ydMoly9Z6aqd5r2QHmmnoGAWt/cFiomalsAXYJvgUb3NlhmrSqVD393rlTvc5fPpcssgQPLteeIcTz6FweiHyBOglC2wK2RjDfYwvTfoP3OHnFbQfS1DM7BUu9pXn3bvjYWl1wlWQlWJrn4/DpvQnrP+kg==",
        "accessToken":{
            "token":"eyJhbGciOiJFUzM4NCJ9.eyJpc3MiOiJIYXZlbnRlYyIsImV4cCI6MTUwMjM1MTc1MiwiaWF0IjoxNTAyMzQ4MTUyLCJuYmYiOjE1MDIzNDgwMzIsInN1YiI6Imp1c3RpbiIsInJvbGUiOlsiSFRfQURNSU4iXSwiYXBwbGljYXRpb25VVUlEIjoiNWJkNGMxMTQtODg5Yy00NjE1LWEyZTgtY2JmMjlhM2E5ODdmIiwidXNlclVVSUQiOiJmYzljYWEwNy0zNTI3LTQ4NTEtOGQyMS0yNWUxNzYxNWZjZjIiLCJqdGkiOiIwMkpzSW1zdWNBekFZRFJRdXNtbElRIn0.zt_lQ6m0v0t9CUoIne-Glm7NcIhXhzLQuInAS_fbemnYVsm5xtkyfV92DRLpO2l3hyeEngBMQ0M1qxJaBhPv_zso29S5TFDvCXBTrqVgqCw5PDlG1_oRSZyQcW_n5MpW",
            "type":"JWT"
        },
        "deviceName":"My Device",
        "status":"SUCCESS",
        "result":"Changed"
    };

    haventecAuthenticateClient.purge();

    expect(haventecAuthenticateClient.getUserUuid()).to.be.equal(undefined);
    expect(haventecAuthenticateClient.getApplicationUuid()).to.be.equal(undefined);

    haventecAuthenticateClient.initialize('domain', 'applicationUuid');

    expect(haventecAuthenticateClient.getUserUuid()).to.be.equal(undefined);
    expect(haventecAuthenticateClient.getApplicationUuid()).to.be.equal(undefined);

    expect(haventecAuthenticateClient.getUsername()).to.be.undefined;

    haventecAuthenticateClient.signUp('testusername', 'test@haventec.com');

    haventecAuthenticateClient.updateDataFromResponse(fakeResponse);

    expect(haventecAuthenticateClient.getUsername()).to.be.equal('testusername');
    expect(haventecAuthenticateClient.getAccessToken()).to.be.equal('eyJhbGciOiJFUzM4NCJ9.eyJpc3MiOiJIYXZlbnRlYyIsImV4cCI6MTUwMDQ2MzU1NCwiaWF0IjoxNTAwNDU5OTU0LCJuYmYiOjE1MDA0NTk4MzQsInN1YiI6IlpldXMiLCJyb2xlIjpbIkhUX0FETUlOIl0sImFwcGxpY2F0aW9uVVVJRCI6Ijc0NzJhNGMwLTdlN2EtNGQ0ZS05MDhjLTdmOTFhZjE2OWY2NyIsInVzZXJVVUlEIjoiNDVkZDIxMzUtOTkxNy00NzIzLTk4NjctYWM3ZWExNTUzMTMzIiwianRpIjoiXzZXRVZJTmdPbG92VUtvbmZuOVhhdyJ9.06GeGkXYuDOCB7A36QnFr0vTNCXZ2RBQV0Sdp-KnwhhZWeJpGqa0aNk_7dqOEZaOX2fQ37zUZLcSumIrOfKMxHYZmEhDDmPFGcpgU8UXaSrk3DKP-jJR975jml_zFNcD');
    expect(haventecAuthenticateClient.getDeviceUuid()).to.be.equal('b42713aa-ee1d-489e-9fb6-3621140dcc35');
    expect(haventecAuthenticateClient.getAuthKey()).to.be.equal('Mwpb0QDijruk/9Wv9BRe2jAd5aXbgJ/EJ+eNpfpQXirAsJm/GK7WzOV25uOlabH9FFhPBEIB4yLWqc4l0e2h13rjzzxXJf4cUW+7c7D5H2LInLdIFl2gnxONgnsYB6ENvyHMDeQqAgXNdk07l88Eyh+4eKqLgSpAB12/LXjST+/2JL+7Uc2jRK2vBwyp21G0fvasC8vanw6FwYZp8RXkFEsrfWq3yib8Vr1duRZciB8qZbvsagI1DhF6uI+xPoNDogFE6DlJG6aK85ktz+uFPdZGk6EgfyDzikKIm/51lUf/5aR+TJSZm8IFOk37ydMoly9Z6aqd5r2QHmmnoGAWt/cFiomalsAXYJvgUb3NlhmrSqVD393rlTvc5fPpcssgQPLteeIcTz6FweiHyBOglC2wK2RjDfYwvTfoP3OHnFbQfS1DM7BUu9pXn3bvjYWl1wlWQlWJrn4/DpvQnrP+kg==');

    let hashedPin = haventecAuthenticateClient.getHashPin('1234');
    // expect(hashedPin).to.be.a("string");

    expect(haventecAuthenticateClient.isAdmin()).to.be.true;

    expect(haventecAuthenticateClient.getUserUuid()).to.equal("45dd2135-9917-4723-9867-ac7ea1553133");
    expect(haventecAuthenticateClient.getApplicationUuid()).to.equal("7472a4c0-7e7a-4d4e-908c-7f91af169f67");

    haventecAuthenticateClient.invalidateToken();

    expect(haventecAuthenticateClient.getUserUuid()).to.be.equal(undefined);
    expect(haventecAuthenticateClient.getApplicationUuid()).to.equal("7472a4c0-7e7a-4d4e-908c-7f91af169f67");

    haventecAuthenticateClient.purge();

    expect(haventecAuthenticateClient.getUserUuid()).to.be.equal(undefined);
    expect(haventecAuthenticateClient.getApplicationUuid()).to.be.equal(undefined);

    expect(haventecAuthenticateClient.getUsername()).to.be.undefined;
    expect(haventecAuthenticateClient.getAccessToken()).to.be.null;

    expect(haventecAuthenticateClient.isAdmin()).to.be.false;

    haventecAuthenticateClient.initialize('domain', 'applicationUuid');
    haventecAuthenticateClient.updateDataFromResponse(fakeResponseNonAdmin);

    expect(haventecAuthenticateClient.isAdmin()).to.be.false;

    haventecAuthenticateClient.updateDataFromResponse(fakeResponseAdmin);

    expect(haventecAuthenticateClient.isAdmin()).to.be.true;
});


tap.start()