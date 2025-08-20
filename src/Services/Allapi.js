import { serverURL } from "./ServerURL"
import { commonAPI } from "./CommonAPI"

//api call

export const registerAPI = (reqBody) => {
    return commonAPI('POST', `${serverURL}/api/register`, reqBody, {})
}
export const LoginAPI = (reqBody) => {
    return commonAPI('POST', `${serverURL}/api/login`, reqBody, {})
}
export const GoogleLoginAPI = (reqBody) => {
    return commonAPI('POST', `${serverURL}/api/google-login`, reqBody, {})
}

export const uploadBookAPI = (reqBody, reqHeader) => {
    return commonAPI('POST', `${serverURL}/api/addBook`, reqBody, reqHeader)
}
export const getHomeBooksAPI = () => {
    return commonAPI('GET', `${serverURL}/api/homeBooks`)
}
export const getAllBooksAPI = (SearchKey,reqHeader) => {
    return commonAPI('GET', `${serverURL}/api/allbooks?search=${SearchKey}`,'',reqHeader)
}
export const getABookAPI = (id,reqHeader) => {
    return commonAPI('GET', `${serverURL}/api/getAbook/${id}`,'',reqHeader)
}
//.....................................ADMIN........................................

export const getAdminAllBookAPI = (reqHeader) => {
    return commonAPI('GET', `${serverURL}/api/admin-allbooks`,'',reqHeader)}


    export const adminApprovedBookAPI = (reqBody,reqHeader) => {
    return commonAPI('PUT', `${serverURL}/api/admin-approvedBook`,reqBody,reqHeader)}


    export const getadminAllUsersAPI = (reqHeader) => {
    return commonAPI('get', `${serverURL}/api/admin-allUsers`,"",reqHeader)
}

export const uploadjobAPI = (reqBody, reqHeader) => {
    return commonAPI('POST', `${serverURL}/api/admin-addJobs`, reqBody, reqHeader)
}

  export const getadminAllJobsAPI = (reqHeader) => {
    return commonAPI('get', `${serverURL}/api/admin-allJobs`,"",reqHeader)
}

  export const deleteJobsAPI = (id) => {
    return commonAPI('delete', `${serverURL}/api/admin-deleteJobs/${id}`,{},{})
}


   export const updateAdminAPI = (reqBody,reqHeader) => {
    return commonAPI('PUT', `${serverURL}/api/updateAdmin`,reqBody,reqHeader)}

  export const getAdminDetailsAPI = (reqHeader) => {
    return commonAPI('get', `${serverURL}/api/admin-Details`,"",reqHeader)
}
   export const makePaymentAPI = (reqBody,reqHeader) => {
    return commonAPI('PUT', `${serverURL}/api/makepayment`,reqBody,reqHeader)}
