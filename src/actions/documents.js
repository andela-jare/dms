import request from 'superagent';

export function createDocument(document) {
  return {
    type: 'DOCUMENT_CREATE_SUCCESS', document
  };
}

export function createDocumentError(message) {
  return {
    type: 'DOCUMENT_CREATE_ERROR', message
  };
}

export function create(document) {
  return function(dispatch) {
    return request.post('http://localhost:3000/documents')
      .send(document)
      .set({ 'x-access-token': localStorage.token })
      .end((err, res) => {
        if (err) {
          console.log(res.body);
          return dispatch(createDocumentError(res.body.message));
        }
        return dispatch(createDocument(res.body.document));
      });
  }
}
