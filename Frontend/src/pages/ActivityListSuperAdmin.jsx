import React, { useMemo, useEffect, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useFilters } from 'react-table';
import { getAllActivities, deleteActivity } from '../services/activities.service';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './ActivityListSuperAdmin.css';
import { useAuth } from '../context/authContext';



export const ActivityListSuperAdmin = () => {

  const {user} = useAuth();
  // Estado local para almacenar las actividades.
  const [activities, setActivities] = useState([]);
  // Estado local para controlar si los datos están cargando.
  const [loading, setLoading] = useState(true);
  

  // `useEffect` para cargar las actividades cuando el componente se monta.
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getAllActivities();
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const paginationOptions = {
    // Página inicial
    initialState: { pageIndex: 0, pageSize: 5 }, // Muestra 5 elementos por página
  };
  

  // Configuración de columnas para `react-table`.
  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'name', // Accede a la propiedad `name` en los datos.
        canSort: true,
      },
      {
        Header: 'Plazas',
        accessor: 'spots', // Accede a la propiedad `spots` en los datos.
      },
      {
        Header: 'Status',
        accessor: 'status', // Accede a la propiedad `status` en los datos.
        Cell: ({ value }) => (value ? 'Activa' : 'Inactiva'),
        
      },
      {
        Header: 'Fecha y hora creación',
        accessor: 'createdAt', // Accede a la propiedad `createdAt` en los datos.
      },
      {
        Header: 'Tipo',
        accessor: 'type', // Accede a la propiedad `createdAt` en los datos.
      },
      {
        Header: 'Likes',
        accessor: (row) => row.like.length, // Accede a la propiedad `createdAt` en los datos.
      },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <div className="action-buttons">
            <button >
              <Link to={`/activities/update/${row.original._id}`}>
                <span className="material-symbols-outlined">edit</span>
              </Link>
            </button>
            <button onClick={() => handleDelete(row.original)}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  // Configuración de la tabla usando `useTable` y los hooks adicionales.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex },
    gotoPage,
    pageCount,
  } = useTable(
    {
      columns,
      data: activities,
      ...paginationOptions,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
  );

  const handleDelete = (activity) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteActivity(activity._id);
          setActivities(activities.filter((a) => a._id !== activity._id));
          Swal.fire('¡Borrado!', 'La actividad ha sido borrada.', 'success');
        } catch (error) {
          Swal.fire('Error', 'Hubo un problema al borrar la actividad.', 'error');
        }
      }
    });
  };

  if (loading) {
    return <div>Cargando actividades...</div>;
  }

  return (
    <div className='list-container3'>
      <h1>Lista de Actividades</h1>
      <div className="table-container">
        <table {...getTableProps()} className="activity-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="centered-column"
                    {...column.getHeaderProps()}
                    key={column.id}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.original.id}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="pagination-container">
        <button onClick={() => gotoPage(0)} disabled={pageIndex === 0}>
          {'<<'}
        </button>
        <button onClick={() => gotoPage(pageIndex - 1)} disabled={pageIndex === 0}>
          {'<'}
        </button>
        <button
          onClick={() => gotoPage(pageIndex + 1)}
          disabled={pageIndex === pageCount - 1}
        >
          {'>'}
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={pageIndex === pageCount - 1}
        >
          {'>>'}
        </button>
        <span>
          Página
          <strong>
            {pageIndex + 1} de {pageCount}
          </strong>
        </span>
      </div>
    </div>
  );
};
