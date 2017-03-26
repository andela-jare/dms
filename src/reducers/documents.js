export function documents(state = [], action) {
  switch (action.type) {
    case 'DOCUMENT_CREATE_SUCCESS':
    console.log(action.document);
      return action.document;
    case 'DOCUMENT_CREATE_ERROR':
    console.log(action.message);
      return {
        status: true,
        message: action.message
      }
    default:
      return state;
  }
}
