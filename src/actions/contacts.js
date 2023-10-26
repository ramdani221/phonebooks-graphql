

export const loadContact = (respon) => dispatch => {
    return dispatch({ type: 'LOAD_CONTACT_SUCCESS', contacts: respon})
}

export const addContact = (respon) => dispatch => {
    dispatch({ type: 'ADD_CONTACT_SUCCESS' })
}

export const updateContact = (respon) => dispatch => {
    console.log(respon)
}
// dispatch => request.put(`phonebooks/${id}`, contact).then(({ data }) => {
//     dispatch({ type: 'UPDATE_CONTACT_SUCCESS', data })
// }).catch(() => {
//     dispatch({ type: 'UPDATE_CONTACT_FAILED' })
// });

export const deleteContact = (id) => dispatch => { }
// request.delete(`phonebooks/${id}`).then(() => {
//     dispatch({ type: 'DELETE_CONTACT_SUCCESS', id })
// }).catch(() => {
//     dispatch({ type: 'DELETE_CONTACT_FAILED' })
// });

export const updateAvatar = (id, file) => dispatch => { }
// request.put(`phonebooks/${id}/avatar`, file, {
//     headers: {
//         'Content-Type': 'multipart/form-data'
//     }
// }).then(({ data }) => {
//     dispatch({ type: 'UPDATE_AVATAR_SUCCESS', data })
// }).catch(() => {
//     dispatch({ type: 'UPDATE_AVATAR_FAILED' })
// });

export const loadPage = (filter) => dispatch => { }
// request.get('phonebooks', { params: filter }).then(({ data }) => {
//     dispatch({ type: 'LOAD_PAGE_SUCCESS', contacts: data })
// }).catch(() => {
//     dispatch({ type: 'LOAD_PAGE_FAILED' })
// });