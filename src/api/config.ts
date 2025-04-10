export const BASE_API = "https://localhost:7003";

export const endpoints= {
    getUserDocuments: (id:number) => `${BASE_API}/api/documents/${id}`,
    getMe: `${BASE_API}/api/auth/me`,
    deleteDocument: (docID:number) => `${BASE_API}/api/documents/delete/${docID}`,
    updateDocument: (docID:number) => `${BASE_API}/api/documents/update/${docID}`,
    downloadDocument: `${BASE_API}/api/documents/upload`,
    getAllDocuments: `${BASE_API}/api/documents`,
    getUserRating: (userID:number) => `${BASE_API}/api/rating/${userID}`,
    getAllCritea: `${BASE_API}/api/rating/categories`,
    getUserByID:  (userID:string) =>  `${BASE_API}/api/students/${userID}`,
    getTopRating: (count:number,criteriaId?:string) => `${BASE_API}/api/rating/top-students?count=${count}&criteriaId=${criteriaId&&criteriaId}`,
    getTopRatingWithCriteriaArray: `${BASE_API}/api/rating/top-students-array`,
    getUsersRating: `${BASE_API}/api/rating/GetUsersRatings`

}