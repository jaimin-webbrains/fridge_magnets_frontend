import React, {  useState } from "react";
import NavigationActions from "redux/navigation/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { ModalHeader, ModalBody, Button } from "reactstrap";
import "../../../assets/css/products_css.css";
import { importFiles } from "services/productServices";
// import {
//   addColor,
//   updateColor,
// } from "services/colorServices";

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const ImportProductsmodal = (props) => {
  //VARIABLES
  const {
    token,
    success,
    // fetching,
    isFetching,
    toggleRefresh,
    onClose,
    // values,
    // handleChange,
    // handleSubmit,
    // handleBlur
  } = props;

  const [file, setFile] = useState();

  const [errMsg, setErrMsg] = useState("");

  // const handleSubmit = () => {
  //   var formData = new FormData();
  //   formData.append("file", file);
  //   // formData.append("type", selectedChartType);
  //   importFile(token, formData).then(
  //     (data) => {
  //       if (data.code === 5) {
  //         toast.success(data.message);
  //         setRefreshUserTable(true);
  //         onClose();
  //       } else {
  //         toast.error(data.message);
  //         onClose();
  //       }
  //     },
  //     (err) => toast.error(err)
  //   );
  // };

  const handleProductsFile = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("file", file);
    // var formData = new FormData();
    // formData.append("file",file);

    // formData.append("type", selectedChartType);
    importFiles(token, formData).then((data) => {
      if (data?.success) {
        success(data.message);
        toggleRefresh(true);
        onClose();
      } else {
        error(data.message);
      }
    });
    // importFile(token, formData).then(
    //   (data) => {
    //     if (data.code === 5) {
    //       toast.success(data.message);
    //       setRefreshUserTable(true);
    //       onClose();
    //     } else {
    //       toast.error(data.message);
    //       onClose();
    //     }
    //   },
    //   (err) => toast.error(err)
    // );
    // handleSubmit();
    // var colorData = {
    //   id:editData.id,
    //   color: values.color,
    // };
    // if (isValid) {
    //   fetching();
    //   isEdit
    //     ? updateColor(token, colorData).then((data) => {
    //         if (data.success) {
    //           success(data.message);
    //           onClose();
    //           toggleRefresh(true);
    //         } else {
    //           error(data.message);
    //         }
    //       })
    //     :
    //  importFiles().then((data) => {
    //         if (data.success) {
    //           success(data.message);
    //           toggleRefresh(true);
    //           onClose();
    //         } else {
    //           error(data.message);
    //         }
    //       });
    // }
  };

  //USEEFFECTS

  return (
    <>
      <ModalHeader toggle={() => onClose()}>
        <span className="text-bolder"> Import File </span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>
            Upload File <span className="error-msg">*</span>
          </label>

          <input
            className="form-control"
            type="file"
            id="formFile"
            accept=".csv"
            // style  ={themeColor ? themeStyle : themeStyle1}
            onChange={(e) => {
              if (e.target.files[0]) {
                var fileName = e.target.files[0].name;
                var ext = fileName.split(".").pop();
                if (ext !== "csv") {
                  setErrMsg(
                    "File type Not Valid. Please upload only .csv File"
                  );
                } else {
                  setErrMsg("");
                  setFile(e.target.files[0]);
                }
              }
            }}
          />

          {/* <input
            type="file"
            className="form-control react-form-input"
            id="Import_Products"
            accept=".csv"
            // onBlur={handleBlur}
            onChange={e=>setFile(e.target.files[0])}
            // value={values.csv_file}
          /> */}
          <div>
            <span style={{ fontSize: "14px" }}>Allow Only .csv Files</span>
          </div>
        </div>

        <div>
          <a
            href={`${process.env.REACT_APP_BACKEND_CSV_PATH}/productData.csv`}
            download={`${process.env.REACT_APP_BACKEND_CSV_PATH}/productData.csv`}
            // target="_blank"
          >
            Download Sample File
          </a>
        </div>

        <div className="import_btn">
          <Button
            className="bg-white text-dark"
            x
            onClick={() => onClose()}
            type="button"
            disabled={isFetching}
            style={{ marginRight: "12px" }}
          >
            cancel
          </Button>

          <Button
            className="btn c-primary"
            onClick={(e) => handleProductsFile(e)}
            type="button"
            disabled={isFetching}
          >
            import
          </Button>
        </div>
      </ModalBody>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.themeChanger,
    token: state.auth.token,
    user: state.auth.user,
    isFetching: state.navigation.isFetching,
  };
};

export default compose(
  withRouter,
  //   enhancer,
  connect(mapStateToProps, { success, error, fetching, setuser })
)(ImportProductsmodal);
