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
import { deleteProduct, getProductsTable } from "services/productServices";
import ConformationModal from "components/common/ConformationModal";
import { Edit3, Plus, Trash } from "react-feather";
import ImportProductsmodal from "./importProductsmodal";
import "../../../assets/css/products.css"
import "../../../assets/css/thumbnail.css"

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const Products = (props) => {
  const { token, success, error, fetching } = props;
  // const [isOpen, setOpenModal] = useState();
  // const [isEdit, setIsEdit] = useState(false);
  // const [editData, setEditData] = useState({});
  const [refresh, toggleRefresh] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [openDeleteModal, toggleDeleteModalOpen] = useState();
  const [deleteId, setDeleteID] = useState("");
  const [isOpen, setOpenModal] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});


  const HeaderComponent = (props) => {
    let classes = {
      "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
      "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc,
    };
    return <div className={classNames(classes)}>{props.title}</div>;
  };
  
  const getProductsList = useCallback(async () => {
    fetching();
    await getProductsTable(token).then((data) => {
      if (data?.success) {
        setProductsList(data.data);
        success();
        toggleRefresh(false);
      } else {
        error(data?.message);
      }
    });
   
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    refresh && getProductsList();
    // eslint-disable-next-line
  }, [refresh]);

  
  const columns = useMemo(
    () => [
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Product Name"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Product Image",
        disableFilters: true,
        accessor: "product_name",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {tableInstance.row.values.product_name}
          </span>
        ),
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
        accessor: "product_image",
        Cell: (tableInstance) => (
          <div className="thumbnail_img">
        {/* eslint-disable-next-line */}         
          <img src={`${process.env.REACT_APP_BACKEND_UPLOAD_PATH}/${tableInstance.row.values.product_image}`}  alt ="Image Not Found"></img> 
          </div>
        
        ),
      },
      {
        Header: (tableInstance) => {
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
        Cell: (tableInstance) => (
          <div>
             <span className="text-capitalize">
            {tableInstance.row.original?.category_name && tableInstance.row.original?.category_name !== null?tableInstance.row.original?.category_name:tableInstance.row.original?.parent_category_name}
          </span>
    
          {/* {console.log(tableInstance.row)}  */}
          </div>
        
        ),
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Color"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Color",
        disableFilters: true,
        accessor: "color",
        Cell: (tableInstance) => (
          <div>
             <span className="text-capitalize">
            {tableInstance.row.original.color}
          {/* {console.log(tableInstance.row)}  */}
          </span>    
          </div>
        
        ),
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Size"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Size",
        disableFilters: true,
        accessor: "size",
        Cell: (tableInstance) => (
          <div>
             <span className="text-capitalize">
            {tableInstance.row.original.size}
          {/* {console.log(tableInstance.row)}  */}
          </span>    
          </div>
        
        ),
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Paper"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Paper",
        disableFilters: true,
        accessor: "paper",
        Cell: (tableInstance) => (
          <div>
             <span className="text-capitalize">
            {tableInstance.row.original.paper}
          {/* {console.log(tableInstance.row)}  */}
          </span>    
          </div>
        
        ),
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Marker"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Marker",
        disableFilters: true,
        accessor: "marker",
        Cell: (tableInstance) => (
          <div>
             <span className="text-capitalize">
            {tableInstance.row.original.marker}
          </span>    
          </div>
        
        ),
      },


      {
        Header: (tableInstance) => {
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
        Cell: (tableInstance) => {
          return (
            <div className="react-action-class">
              <button
                className="table-action action-edit"
                onClick={() => {                  
                  props.history.push(
                    `/products/Edit/${tableInstance.row.original.id}`
                  );
                }}
              >
                <Edit3 className="table-icon-edit" />
              </button>
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
        },
      },
    ],
    // eslint-disable-next-line
    [getProductsList]
  );
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    page,
    headerGroups,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      data: productsList,
      columns: columns,
      initialState: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );
  const deleteClick = () => {
    deleteProduct(token, { id: deleteId }).then((res) => {
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
        <div className="col-sm headline">Products</div>
        <div className="col-sm-auto ml-auto">

        {/* <button
            className="btn btn-blue"
            onClick={() => {
                  // setEditData(tableInstance.row.original);
                  setIsEdit(true);
                  setOpenModal(true);             
            }}
          >
           <span><Plus className="mr-2" /> Import  </span>            
          </button> */}
          <button
            className="btn btn-blue"
            onClick={() => {
              props.history.push("/Products/Add");
            }}
          >            
            <Plus className="mr-2" /> Add Product
          </button>
        </div>
      </div>
      <div className="div-container">
        <ReactTableWrapper {...props}>
          <div className="table-responsive common-table">
            <table className="table border-0" {...getTableProps()}>
              <thead className="thead-dark">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((header) => (
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
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
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
      <Modal style={{maxWidth:"400px"}}isOpen={isOpen} backdrop={true}>
        {isOpen && (
          <ImportProductsmodal
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
            message={"Are you sure to delete product ?"}
            handleConfirm={() => deleteClick()}
          />
        )}
      </Modal>
    </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.themeChanger,
    token: state.auth.accessToken,
    user: state.auth.user,
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, { success, error, fetching, setuser })
)(Products);
