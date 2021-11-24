import "./moviesList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MoviesListContext } from "../../context/listContext/MoviesListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";

export default function MoviesList() {
    const {lists, dispatch} = useContext(MoviesListContext)
  useEffect(() => {
    getLists(dispatch)

  }, [dispatch])

  const handleDelete = (id) => {
    console.log(id)
    deleteList(id, dispatch)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "genre", headerName: "Genre", width: 200 },
    { field: "type", headerName: "Type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: "/list/" + params.row._id, list: params.row}} onClick={() => console.log(params.row._id)}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r) => r._id}
        style={{height: 700}}
      />
    </div>
  );
}
