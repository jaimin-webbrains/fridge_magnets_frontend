import React, { useCallback, useEffect, useMemo, useState } from "react";
import NavigationActions from "redux/navigation/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
// import { Modal } from "reactstrap";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import classNames from "classnames";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import Pagination from "components/common/Pagination";
import { getInquiries } from "services/inquiryServices";
// import ConformationModal from "components/common/ConformationModal";
// import { Edit3, Plus, Trash } from "react-feather";
import moment from "moment";
// import InquiriesAddModal from "./inquiriesAddModal";

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const Inquiries = (props) => {
  const { token, success, error, fetching } = props;
  // const [isOpen, setOpenModal] = useState();
  // const [isEdit, setIsEdit] = useState(false);
  // const [editData, setEditData] = useState({});
  const [refresh, toggleRefresh] = useState(true);
  const [inquiriesList, setInquiriesList] = useState([]);
  
  // const [openDeleteModal, toggleDeleteModalOpen] = useState();
  // const [deleteId, setDeleteID] = useState("");

  const HeaderComponent = (props) => {
    let classes = {
      "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
      "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc,
    };
    return <div className={classNames(classes)}>{props.title}</div>;
  };
  const getInquiriesList = useCallback(async () => {
    fetching();
    await getInquiries(token).then((data) => {
      if (data.success) {
        setInquiriesList(data.data);
        success();
        toggleRefresh(false);
      } else {
        error(data.message);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    refresh && getInquiriesList();
    // eslint-disable-next-line
  }, [refresh]);

  const columns = useMemo(
    () => [
      // {
      //   Header: (tableInstance) => {
      //     return (
      //       <HeaderComponent
      //         isSortedDesc={tableInstance.column.isSortedDesc}
      //         title="Index"
      //       />
      //     );
      //   },
      //   // Filter: FilterComponent,
      //   placeholder: "Index",
      //   disableFilters: true,
      //   accessor: "index",
      //   Cell: (tableInstance) => (
      //     <span className="text-capitalize">{tableInstance.row.index + 1}</span>
      //   ),
      // },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Customer Name"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Customer Name",
        disableFilters: true,
        accessor: "name",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {tableInstance.row.original.name}
          </span>
        ),
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Categories"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Categories",
        disableFilters: true,
        accessor: "category",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {tableInstance.row.original.category}
          </span>
        ),
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Company"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Company",
        disableFilters: true,
        accessor: "company",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {tableInstance.row.original.company}
          </span>
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
          <span className="text-capitalize">
            {tableInstance.row.original.color}
          </span>
        ),
      },


      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Paper Choice"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Paper Choice",
        disableFilters: true,
        accessor: "paper_choice",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {tableInstance.row.original.paper_choice}
          </span>
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
          <span className="text-capitalize">
            {tableInstance.row.original.marker}
          </span>
        ),
      },

      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Shape"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Shape",
        disableFilters: true,
        accessor: "shape",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {tableInstance.row.original.shape}
          </span>
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
          <span className="text-capitalize">
            {tableInstance.row.original.size}
          </span>
        ),
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Size Availablity"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Size Availablity",
        disableFilters: true,
        accessor: "cant_find_your_size",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {tableInstance.row.original.cant_find_your_size === "true" ? "yes":"no"}
          </span>
        ),
      },

      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="ArtWork"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "ArtWork",
        disableFilters: true,
        accessor: "artwork",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {tableInstance.row.original.artwork && tableInstance.row.original.artwork !== ""?tableInstance.row.original.artwork:"No"}
          </span>
        ),
      },

      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Quantity"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Quantity",
        disableFilters: true,
        accessor: "quantity",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {tableInstance.row.original.quantity}
          </span>
        ),
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Customer Notes"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Customer Notes",
        disableFilters: true,
        accessor: "customer_notes",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {tableInstance.row.original.customer_notes}
          </span>
        ),
      },


      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Email"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Email",
        disableFilters: true,
        accessor: "email",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {tableInstance.row.original.email}
          </span>
        ),
      },

      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="PostCode"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "PostCode",
        disableFilters: true,
        accessor: "postcode",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {tableInstance.row.original.postcode}
          </span>
        ),
      },

     

      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Date"
            />
          );
        },
        // Filter: FilterComponent,
        placeholder: "Date",
        disableFilters: true,
        accessor: "created_at",
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {moment(tableInstance.row.original.created_at).format("DD/MM/YYYY")}
          </span>
        ),
      },


      // {
      //   Header: tableInstance => {
      //     return (
      //       <HeaderComponent
      //         isSortedDesc={tableInstance.column.isSortedDesc}
      //         title="Action"
      //       />
      //     );
      //   },
      //   accessor: "id",
      //   disableSortBy: true,
      //   disableFilters: true,
      //   Cell: tableInstance => {
      //     return (
      //       <div className="react-action-class">
      //         <button
      //           className="table-action action-edit"
      //           onClick={() => {
      //             setEditData(tableInstance.row.original);
      //             setIsEdit(true);
      //             setOpenModal(true);
      //           }}
      //         >
      //           <Edit3 className="table-icon-edit" />
      //         </button>
      //         <button
      //           className="table-action action-delete"
      //           onClick={() => {
      //             toggleDeleteModalOpen(true);
      //             setDeleteID(tableInstance.row.original.id);
      //           }}
      //         >
      //           <Trash className="table-icon-edit" />
      //         </button>
      //       </div>
      //     );
      //   }
      // }
    ],
    // eslint-disable-next-line
    [getInquiriesList]
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
      data: inquiriesList,
      columns: columns,
      initialState: {
        pageInquiry: 10,
        pageIndex: 0,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );
  // const deleteClick = () => {

  //   deleteInquiry(token, { id: deleteId }).then(res => {
  //     if (res.success) {
  //       toggleRefresh(true);
  //       toggleDeleteModalOpen(false);
  //       success(res.message);
  //     } else {
  //       error(res.message);
  //     }
  //   });
  // };
  return (
    <div className="card m-2 p-2">
      <div className="container-fluid">
        <div className="row title-sec align-items-center">
          <div className="col-sm headline">Inquiries</div>
          {/* <div className="col-sm-auto ml-auto">
          <button className="btn btn-blue" onClick={() => setOpenModal(true)}>
            <Plus className="mr-2" /> Add Inquiry
          </button>
        </div> */}
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
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
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
          <InquiriesAddModal
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
        {/* <Modal isOpen={openDeleteModal} backdrop={true}>
      {openDeleteModal && (
        <ConformationModal
          isOpen={openDeleteModal}
          onClose={() => toggleDeleteModalOpen(false)}
          confirmText={"Delete"}
          message={"Are you sure to delete inquiry ?"}
          handleConfirm={() => deleteClick()}
        />
      )}
      </Modal> */}
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
)(Inquiries);
