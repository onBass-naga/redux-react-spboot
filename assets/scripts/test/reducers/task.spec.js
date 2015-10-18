import assert from 'power-assert';
import * as _ from 'lodash';
import { task as reduce } from './../../src/reducers/';

describe('test reducers', () => {

    it('LOADING_TASK_SUCCESS', () => {

        const action = {
            type: "LOAD_TASKS_SUCCESS",
            response: {
                data: [
                    {"id": 1, "task": "reduxのドキュメントを読む", "completed": true},
                    {"id": 3, "task": "SpringBootで開発環境を作る", "completed": true}
                ]
            }
        };

        const expected = '{"tasks":[{"id":1,"task":"reduxのドキュメントを読む","completed":true},{"id":3,"task":"SpringBootで開発環境を作る","completed":true}],"isFetching":false}';
        const actual = reduce(null, action);
        assert (JSON.stringify(actual) === expected);
    });

});