import React, { useCallback, useEffect, useMemo, useState } from "react";
// import enhancer from "enhancer/categoryenhancer"
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
import { deleteCategory, getCategories } from "services/categoryServices";
import ConformationModal from "components/common/ConformationModal";
import { Edit3, Plus, Trash } from "react-feather";
// import CategoriesAddModal from "./categoriesAddModal";


const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;


const Categories = props => {
  const { token, success, error, fetching } = props;
  // const [isOpen, setOpenModal] = useState();
  // const [isEdit, setIsEdit] = useState(false);
  // const [editData, setEditData] = useState({});
  const [refresh, toggleRefresh] = useState(true);
  const [categorysList, setCategoriesList] = useState([]);
  const [openDeleteModal, toggleDeleteModalOpen] = useState();
  const [deleteId, setDeleteID] = useState("");


  const HeaderComponent = props => {
    let classes = {
      "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
      "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
    };
    return <div className={classNames(classes)}>{props.title}</div>;
  };

  const getCategoriesList = useCallback(async () => {
    fetching();
    await getCategories(token).then(data => {
      if (data?.success) {
        setCategoriesList(data.data);
        success();
        toggleRefresh(false);
      } else {
        error(data?.message);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    refresh && getCategoriesList();
    // eslint-disable-next-line
  }, [refresh]);

  console.log("categorysList",categorysList)

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
        accessor: "name",
        Cell: tableInstance => (
          <span className="text-capitalize">
            {tableInstance.row.values.name}
          </span>
        )
      },
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Parent Category"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Category Name",
        disableFilters: true,
        accessor: "parent_category_name",
        Cell: tableInstance => (
          
          <span className="text-capitalize">
            {tableInstance.value}
          </span>
        )
      },
     
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Description"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Description",
        disableFilters: true,
        accessor: "description",
        Cell: tableInstance => (
          <span className="text-capitalize">
            <div
          dangerouslySetInnerHTML={{
            __html: tableInstance.row.values.description
          }}
          className="notes-text"
        />            
          </span>
        )
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
              <button
                className="table-action action-edit"
               
                // style={tableInstance.row.original.id !== 2 || tableInstance.row.original.id !== 1?{color:"red"}:null}

                disabled={tableInstance.row.original.id > 2 ? false:true}

                onClick={() => {
                 console.log("tableInstance.row.original.id",tableInstance.row.original.id,typeof tableInstance.row.original.id )
                  
                   if(tableInstance.row.original.id !== 2 && tableInstance.row.original.id !== 1){
                       props.history.push( `/Categories/Edit/${tableInstance.row.original.id}`)
                     }
                  // setEditData(tableInstance.row.original);
                  // setIsEdit(true);
                  // setOpenModal(true);
                }}
              >
                <Edit3 className="table-icon-edit"
                />
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
        }
      }
    ],
    // eslint-disable-next-line
    [getCategoriesList]
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
      data: categorysList,
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
    
    deleteCategory(token, { id: deleteId }).then(res => {
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
    <div className="card">
    <div className="container-fluid">
      <div className="row title-sec align-items-center">
        <div className="col-sm headline">Categories</div>
        <div className="col-sm-auto ml-auto">
          <button className="btn btn-blue" onClick={() => props.history.push("/Categories/Add")}>

            <Plus className="mr-2" /> Add Category
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
      {/* <Modal isOpen={isOpen} backdrop={true}>
        {isOpen && (
          <CategoriesAddModal
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
      </Modal> */}
      <Modal isOpen={openDeleteModal} backdrop={true}>
      {openDeleteModal && (
        <ConformationModal
          isOpen={openDeleteModal}
          onClose={() => toggleDeleteModalOpen(false)}
          confirmText={"Delete"}
          message={"Are you sure you want to delete category ?"}
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
  // enhancer,
  connect(mapStateToProps, { success, error, fetching, setuser })
)(Categories);