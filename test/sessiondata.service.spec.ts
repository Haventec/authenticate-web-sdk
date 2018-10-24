import {expect, tap} from "tapbundle";
import {HT_DataService} from "../ts/ht_data.service";
import {isUndefined} from "util";
import {HT_Data} from "../ts/model/htdata";
import {HT_Session_Data} from "../ts/model/htsessiondata";

tap.test("it should test DataService", async () => {

    let dataService = new HT_DataService(true);

    let fakeResponse = {
        "applicationUuid":"7472a4c0-7e7a-4d4e-908c-7f91af169f67",
        "username":"Zeus",
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

    let data: HT_Data = new HT_Data('testusername', 'testpinhash', 'testSaltBits', 'testConnectorName', 'testConnectorUuid',
    'testApplicationUuid', 'testUserUuid', 'testDeviceUuid', 'testAuthKey', 'testPublicKey', new Date())
    let sessionData: HT_Session_Data = new HT_Session_Data('testAccessToken', 'testAccessTokenType');

    dataService.setData('testusername',data);
    dataService.setSessionData(sessionData);
    
    expect(dataService.getAccessToken()).to.be.equal('testAccessToken');
   
    dataService.updateDataFromResponse(fakeResponse); 
    expect(dataService.getAccessToken()).to.be.equal(fakeResponse.accessToken.token); 
    
    dataService.purge();
    expect(dataService.getAccessToken()).to.be.null;
});


tap.start()