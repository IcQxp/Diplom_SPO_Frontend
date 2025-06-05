// export const BASE_API = "https://localhost:7003";
export const BASE_API = "https://lyashovilyabackend.loca.lt";


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
    getUsersRating: `${BASE_API}/api/rating/GetUsersRatings`,
    getAllDisciplines: `${BASE_API}/api/admin/discipline/get-all-disciplines`,
    getAllCriteria: `${BASE_API}/api/admin/get-all-criteria`,
    getAllDocumentTypes: `${BASE_API}/api/admin/documentTypes/get-all-document-types`,
    getAllEmployees: `${BASE_API}/api/admin/employee/get-all-employees`,
    getAllGrades: `${BASE_API}/api/admin/grade/get-all-grades`,
    getAllGroups: `${BASE_API}/api/admin/group/get-all-groups`,
    getAllRoles: `${BASE_API}/api/admin/role`,
    getAllStudents: `${BASE_API}/api/admin/students`,
    getAllLessons: `${BASE_API}/api/admin/lesson/get-all-lessons`,
    getAllStatuses: `${BASE_API}/api/documents/statuses`,
    getUserDocumentByID: (id:number) => `${BASE_API}/api/documents/doc/${id}`,
    updateDocumentStatus: (id:number) => `${BASE_API}/api/documents/update-status/${id}`,

}