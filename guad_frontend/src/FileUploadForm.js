import axios from "axios";


function FileUploadForm({history}) {
  const formData = new FormData();

  const handlerUpLoad = (e) => {
    // setData(e.target.files[0])
    for ( var i = 0; i<e.target.files.length; i++){
      formData.append("uploadFileMulti", e.target.files[i])
    }
  };
  
  const handlerClickSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/upload/fileUploadMultiple`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log(response)
      alert("파일업로드가 완료되었습니다.");
    })
    .catch((error) => {console.log(error)
    alert("파일업로드에 실패했습니다.")
    });
  }


  return (
    <>
      <h3>파일 업로드 (여러 개 파일 업로드) </h3>
      <form>
        파일 :{" "}
        <input
          type="file"
          id="uploadFileMulti"
          name="uploadFileMulti"
          onChange={handlerUpLoad}
          multiple="multiple"
        />
        <button type="button" onClick={handlerClickSubmit}>
          파일업로드
        </button>
      </form>
    </>
  );
}

export default FileUploadForm;
