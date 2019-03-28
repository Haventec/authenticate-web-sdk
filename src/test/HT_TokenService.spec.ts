import {HT_TokenService} from '../helpers/ht_token.service';
import { Error } from '../model/error';

describe("HT_TokenService", function () {
    it("ignores and returns undefined for undefined/null inputs", function () {
        expect(HT_TokenService.parseJwt(null)).toBeUndefined();
    });

    it("parses and returns expected object on valid JWT", function () {
        let resposne: Object = HT_TokenService.parseJwt("eyJraWQiOiJkZjQ3NTRjMi1jODYwLTQyNGItODU2Yi1kMTgwNzE4YzEyNmYiL\
        CJhbGciOiJFUzM4NCJ9.eyJhdWQiOiJodHRwczovL2FwaS5oYXZlbnRlYy5jb20iLCJleHAiOjE1ODM0ODA2NDMsImxvZ2lu\
        X2hpbnQiOiJldmFuQGdtYWlsLmNvbSIsInNjb3BlIjoib3BlbmlkIiwicmVzcG9uc2VfdHlwZSI6ImNvZGUiLCJyZWRpcmVjd\
        F91cmkiOiJodHRwczovL2xvY2FsaG9zdDo5MDMxL3NwL2V5SnBjM01pT2lKb2RIUndjenBjTDF3dllYQnBMbWhoZG1WdWRHVmp\
        MbU52YlNKOS9jYi5vcGVuaWQiLCJzdGF0ZSI6IkxzVlB5eTlIVUNkdjg1NXI5eDdDaHIzVkpoMms5NyIsIm5vbmNlIjoiQW5FM\
        1FxemFZZFVSUzZaUUdJTm5KVCIsImNsaWVudF9pZCI6ImU0N2UzZDFjLTFhMDEtNDZkMy1iNTgzLWJhMDZkZjU5ZGZhOCJ9.-sN\
        tjIuuHaJWM_yCCGs9HSIlcRYHKmDRwr2Ilec7-dZpZIw0eeIopZF0QFzlxqZyVSstcdyVYDc0mJKJMw_KgA7wqt8tL7bc6wEK-eY\
        EntfKtXAPX31U2OtwTXisgOjD");
        expect(resposne).toBeDefined();
        expect(resposne['login_hint']).toBe("evan@gmail.com");
    });

    it("throws exception for invalid token string", function () {
        try{
            HT_TokenService.parseJwt("eyJraWQiOiJkZjQ3NTRjMi1jODYwLTQyNGmJKJMw_KgA7wqt8tL7bc6wEK-eY\
            EntfKtXAPX31U2OtwTXisgOjD");
            fail();
        } catch (e){
            expect(e).toBe(Error.PARSING_ERROR);
        }
    });
}); 