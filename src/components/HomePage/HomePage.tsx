import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { FC, useState } from "react"
import FileUpload from "../FileUpload/FileUpload";
import FileDownload from "../FileDownload/FileDownload";
import { StudentList } from "../StudentList/StudentList";
import { GenderComponent } from "../Gender/Gender";
import AuthComponent from "../../auth/auth";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { FilesList } from "../FilesList/FilesList";

export const HomePage:FC = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [pdfFile, setPdfFile] = useState<string | null>(null);
    const [pdfError, setPdfError] = useState<string>('');
  
    const allowedFiles = ['application/pdf'];
    const handleFile = (e:React.ChangeEvent<HTMLInputElement>) => {
      let selectedFile = e.target.files?.[0];
      // console.log(selectedFile.type);
      if (selectedFile) {
        if (selectedFile && allowedFiles.includes(selectedFile.type)) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            setPdfError('');
            setPdfFile(e.target?.result as string | null);
          }
        }
        else {
          setPdfError('Not a valid pdf: Please select only PDF');
          setPdfFile('');
        }
      }
      else {
        console.log('please select a PDF');
      }
    }


    return (
        <div className="container">
      {/* Upload PDF */}
      <form>
        <label><h5>Upload PDF</h5></label>
        <br></br>
        <input type='file' className="form-control"
          onChange={handleFile}></input>
        {/* we will display error message in case user select some file
        other than pdf */}
        {pdfError && <span className='text-danger'>{pdfError}</span>}
      </form>
      {/* View PDF */}
      <h5>View PDF</h5>
      <div className="viewer">
        {/* render this if we have a pdf file */}
        {pdfFile && (<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfFile}
            plugins={[defaultLayoutPluginInstance]}></Viewer>
        </Worker>
        )}
        {/* render this if we have pdfFile state null   */}
        {!pdfFile && <>No file is selected yet</>}
        <FileUpload />
        <FileDownload />
        <StudentList />
        <GenderComponent />
        <AuthComponent />
        <FilesList/>
      </div>
    </div>
    )
}