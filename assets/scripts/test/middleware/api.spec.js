import assert from 'power-assert';
import * as _ from 'lodash';
import * as api from 'src/middleware/api';

describe('test api', () => {

    const endpoint = 'http://localhost:8080/api/todos';
    let created = {};
    let edited = {};

    it('タスクの登録が出来る', () => {

        const method = api.API_METHOD.POST;
        const requestBody = { task: "test to create todo", completed: false };

        return api.callApi(endpoint, method, requestBody).then(
            response => {
                created = response.data;
                assert(response.data.task === requestBody.task);
                assert(response.data.completed === requestBody.completed);
            })
    });

    it('登録したタスクを参照できる', () => {

        const method = api.API_METHOD.GET;

        return api.callApi(endpoint, method).then(
            response => {
                const target = _.find(response.data, (d) => d.id === created.id);
                assert(target.id === created.id);
                assert(target.task === created.task);
                assert(target.completed === created.completed);
            })
    });

    it('タスクの更新が出来る', () => {

        const method = api.API_METHOD.PUT;
        const requestBody = { id: created.id, task: "test to edit todo", completed: true };

        return api.callApi(endpoint + `/${created.id}`, method, requestBody).then(
            response => {
                edited = response.data;
                assert(edited.id === requestBody.id);
                assert(edited.task === requestBody.task);
                assert(edited.completed === requestBody.completed);
            })
    });

    it('更新したタスクを参照できる', () => {

        const method = api.API_METHOD.GET;

        return api.callApi(endpoint, method).then(
            response => {
                const target = _.find(response.data, (d) => d.id === edited.id);
                assert(target.id === edited.id);
                assert(target.task === edited.task);
                assert(target.completed === edited.completed);
            })
    });

    it('タスクの削除が出来る', () => {

        const method = api.API_METHOD.DELETE;

        return api.callApi(endpoint + `/${created.id}`, method).then(
            response => {
                assert(JSON.stringify(response) === '{}');
            })
    });

    it('削除したタスクは参照できない', () => {

        const method = api.API_METHOD.GET;

        return api.callApi(endpoint, method).then(
            response => {
                const target = _.find(response.data, (d) => d.id === edited.id);
                assert(_.isUndefined(target));
            })
    });
});