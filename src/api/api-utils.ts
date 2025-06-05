import axios from "axios";
import { endpoints } from "./config";
import { RatingWithCriteria } from "../components/Ratings/RatingWithArray";

const axiosRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, token?: string, data?: any) => {
  try {
    const headers = {
      'bypass-tunnel-reminder':'1',
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios({ method, url, headers, data });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};

const axiosDocumentRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, token: string, formData: FormData) => {
  try {
    const headers = {
      'bypass-tunnel-reminder':'1',
      'Content-Type': 'multipart/form-data',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios({ method, url, headers, data: formData });
    // return response.data;
    console.log(response);
    return response;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};



const getUserDocuments = (token: string, id: number) =>
  axiosRequest('get', endpoints.getUserDocuments(id), token);

const getMe = (token: string) =>
  axiosRequest('get', endpoints.getMe, token);

const deleteDocument = (token: string, docID: number) =>
  axiosRequest("delete", endpoints.deleteDocument(docID), token);

const updateDocument = (token: string, docID: number, formData: FormData) =>
  axiosDocumentRequest("put", endpoints.updateDocument(docID), token, formData);

const downloadDocument = (token: string, formData: FormData) =>
  axiosDocumentRequest("post", endpoints.downloadDocument, token, formData);

const getAllDocuments = (token: string) =>
  axiosRequest("get", endpoints.getAllDocuments, token);

const getUserRating = (userID: number) =>
  axiosRequest("get", endpoints.getUserRating(userID));

const getPostUserRating = (data:number[]) =>
  axiosRequest("post", endpoints.getUsersRating,"",data);

const getAllCritea = () =>
  axiosRequest("get", endpoints.getAllCritea);

const getUserByID = (userID: string) =>
  axiosRequest("get", endpoints.getUserByID(userID));

const getTopRating = (count: number, criteriaId?: string) =>
  axiosRequest("get", endpoints.getTopRating(count, criteriaId != undefined ? criteriaId : ""));

const getTopRatingWithCriteriaArray = (data: RatingWithCriteria) =>
  axiosRequest("post", endpoints.getTopRatingWithCriteriaArray, "", data);

const getAllDisciplines = () =>  axiosRequest("get",endpoints.getAllDisciplines);
const getAllStudents = () =>  axiosRequest("get",endpoints.getAllStudents);
const getAlldocumentTypes = () =>  axiosRequest("get",endpoints.getAllDocumentTypes);
const getAllEmployees = () =>  axiosRequest("get",endpoints.getAllEmployees);
const getAllGrades= () =>  axiosRequest("get",endpoints.getAllGrades);
const getAllGroups = () =>  axiosRequest("get",endpoints.getAllGroups);
const getAllLessons = () =>  axiosRequest("get",endpoints.getAllLessons);
const getAllRoles = () =>  axiosRequest("get",endpoints.getAllRoles);
const getAllStatuses = () =>  axiosRequest("get",endpoints.getAllStatuses);
const getUserDocumentByID = (docId:number) => axiosRequest("get",endpoints.getUserDocumentByID(docId));
const  updateDocumentStatus = (
  documentId: number,
  model: DocumentStatusUpdateModel) => axiosRequest("put",endpoints.updateDocumentStatus(documentId),"",model);
export interface DocumentStatusUpdateModel {
  StatusId: number; // ID нового статуса документа
  CriteriaId?: number | null; // ID критерия (может быть null)
  EmployeeId?: number | null; // ID сотрудника, выполняющего проверку (может быть null)
  DocumentTypeId?: number | null; // ID типа документа (может быть null)
  Score?: number | null; // Оценка документа (может быть null)
}




export {
  getUserDocuments,
  getMe,
  deleteDocument,
  updateDocument,
  downloadDocument,
  getAllDocuments,
  getUserRating,
  getAllCritea,
  getUserByID,
  getTopRating,
  getTopRatingWithCriteriaArray,
  getPostUserRating,
  getAllDisciplines,
  getAllStudents,
  getAlldocumentTypes,
  getAllEmployees,
  getAllGrades,
  getAllGroups,
  getAllLessons,
  getAllRoles ,
  getAllStatuses,
  getUserDocumentByID,
  updateDocumentStatus,
}