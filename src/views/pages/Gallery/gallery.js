import React, { useCallback, useEffect, useMemo, useState } from "react";
import NavigationActions from "redux/navigation/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { Modal } from "reactstrap";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import classNames from "classnames";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import Pagination from "components/common/Pagination";
import { deleteGallery, getGallerys } from "services/galleryServices";
import ConformationModal from "components/common/ConformationModal";
import {  Plus, Trash } from "react-feather";
import GallerysAddModal from "./gallerysAddModal";
// import { getCategories } from "services/categoryServices";


const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;


const Gallerys = props => {
  const { token, success, error, fetching } = props;
  const [isOpen, setOpenModal] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [refresh, toggleRefresh] = useState(true);
  const [gallerysList, setGallerysList] = useState([]);
  const [openDeleteModal, toggleDeleteModalOpen] = useState();
  const [deleteId, setDeleteID] = useState("");


  const HeaderComponent = props => {
    let classes = {
      "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
      "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
    };
    return <div className={classNames(classes)}>{props.title}</div>;
  };

   const getGallerysList = useCallback(async () => {
    fetching();
    await getGallerys(token).then(data => {
      if (data.success) {
        setGallerysList(data.data);
        success();
        toggleRefresh(false);
      } else {
        error(data.message);
      }
    });
  
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    refresh && getGallerysList();
    // eslint-disable-next-line
  }, [refresh]);
  const columns = useMemo(
    () => [
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Category Name"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Category Name",
        disableFilters: true,
        accessor: "category_id",
        Cell: tableInstance => (
          <span className="text-capitalize">
          {tableInstance.row.original.category_name}

          </span>
        )
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Product Image"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Product Image",
        disableFilters: true,
        accessor: "product_images",
        Cell: (tableInstance) => (
          <div className="thumbnail_img">
        {/* eslint-disable-next-line */}         
          <img src={`${process.env.REACT_APP_BACKEND_UPLOAD_PATH}/${tableInstance.row.original.product_Images}`}  alt ="Image Not Found"></img> 
          </div>
        
        ),
      },
     
      
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Action"
            />
          );
        },
        accessor: "id",
        disableSortBy: true,
        disableFilters: true,
        Cell: tableInstance => {
          return (
            <div className="react-action-class">
              {/* <button
                className="table-action action-edit"
                onClick={() => {
                  setEditData(tableInstance.row.original);
                  setIsEdit(true);
                  setOpenModal(true);
                }}
              >
                <Edit3 className="table-icon-edit" />
              </button> */}
              <button
                className="table-action action-delete"
                onClick={() => {
                  toggleDeleteModalOpen(true);
                  setDeleteID(tableInstance.row.original.id);
                }}
              >
                <Trash className="table-icon-edit" />
              </button>
            </div>
          );
        }
      }
    ],
    // eslint-disable-next-line
    [getGallerysList]
  );
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    page,
    headerGroups,
    pageCount,
    gotoPage,
    state: { pageIndex }
  } = useTable(
    {
      data: gallerysList,
      columns: columns,
      initialState: {
        pageSize: 10,
        pageIndex: 0
      }
    },
    useFilters,
    useSortBy,
    usePagination
  );
  const deleteClick = () => {
    
    deleteGallery(token, { id: deleteId }).then(res => {
      if (res.success) {
        toggleRefresh(true);
        toggleDeleteModalOpen(false);
        success(res.message);
      } else {
        error(res.message);
      }
    });
  };
  return (
    <div className="card m-2 p-2">
    <div className="container-fluid">
      <div className="row title-sec align-items-center">
        <div className="col-sm headline">Gallery</div>
        <div className="col-sm-auto ml-auto">
          <button className="btn btn-blue" onClick={() => setOpenModal(true)}>
            <Plus className="mr-2" /> Add Gallery
          </button>
        </div>
      </div>
      <div className="div-container">
        <ReactTableWrapper {...props}>

          <div className="table-responsive common-table">
            <table className="table border-0" {...getTableProps()}>
              <thead className="thead-dark">
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(header => (
                      <th
                        {...header.getHeaderProps(
                          header.getSortByToggleProps()
                        )}
                      >
                        <div>{header.render("Header")}</div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {/* {headerGroups.map((headerGroup) => (
                                  <tr {...headerGroup.getHeaderGroupProps()}>
                                      {headerGroup.headers.map((header) => {
                                          return (
                                              <td
                                                  {...header.getHeaderProps(
                                                      header.getSortByToggleProps()
                                                  )}
                                              >
                                                  <div>
                                                      {header.canFilter
                                                          ? header.render(
                                                                "Filter"
                                                            )
                                                          : null}
                                                  </div>
                                              </td>
                                          );
                                      })}
                                  </tr>
                              ))} */}
                {page.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            onPageChange={gotoPage}
            pages={pageCount}
            page={pageIndex}
          />
        </ReactTableWrapper>
      </div>
      <Modal isOpen={isOpen} backdrop={true}>
        {isOpen && (
          <GallerysAddModal
            onClose={() => {
              setOpenModal(false);
              setIsEdit(false);
              setEditData({});
            }}
            isEdit={isEdit}
            editData={editData}
            toggleRefresh={e => toggleRefresh(e)}
          />
        )}
      </Modal>
      <Modal isOpen={openDeleteModal} backdrop={true}>
      {openDeleteModal && (
        <ConformationModal
          isOpen={openDeleteModal}
          onClose={() => toggleDeleteModalOpen(false)}
          confirmText={"Delete"}
          message={"Are you sure to delete Images?"}
          handleConfirm={() => deleteClick()}
        />
      )}
      </Modal>
    </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger,
    token: state.auth.accessToken,
    user: state.auth.user
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, { success, error, fetching, setuser })
)(Gallerys);