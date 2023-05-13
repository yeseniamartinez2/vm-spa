import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { IAdoptionRequest } from '../../models/adoptionRequest.interface'
import AdoptionRequestService from '../../services/adoptionRequest.service'

export type Props = {
    adoptionRequests: IAdoptionRequest[]
    loading?: boolean
    error?: boolean
}

export const AdoptionRequestTableComponent: FunctionComponent<Props> = ({
    adoptionRequests,
    loading,
    error,
}) => {
    const api_url = process.env.VM_API_URL || 'http://localhost:3001'
    const ars = new AdoptionRequestService()
    const [rows, setRows] = useState<IAdoptionRequest[]>([])
    const [token, settoken] = React.useState('') // to be removed and use actual token
    const [sortModel, setSortModel] = React.useState([
        {
            field: 'last_modified',
            sort: 'desc',
        },
    ])

    // const handleDelete = (id: string, token: string) => {
    //     ps.deletePetById(id, token).then((res) => {
    //         if (res.status === 202) {
    //             setRows((prevRows) => prevRows.filter((row) => id !== row._id))
    //         }
    //     })
    // }

    const booleanToIcon = (bool: string) => {
        if (bool === 'true') return <CheckCircleIcon color="primary" />
        else return <CancelIcon color="error" />
    }

    useEffect(() => {
        setRows(adoptionRequests)
    }, [adoptionRequests])

    const columns: GridColDef[] = [
        {
            field: 'pet',
            headerName: 'Pet Name',

            renderCell: (params: any) => {
                if ((params as GridValueGetterParams).value) {
                    return <p>{params.value[0].name}</p>
                }
            },
            width: 120,
            align: 'left',
            disableColumnMenu: true,
        },
        {
            field: 'user_fullname',
            headerName: 'Name',
            width: 220,
            align: 'left',
        },
        {
            field: 'user_email',
            headerName: 'Email',
            width: 220,
            align: 'left',
        },
        {
            field: 'phone_number',
            headerName: 'Telephone',
            width: 120,
            align: 'left',
            renderCell: (params: any) => {
                return (
                    <p>
                        ({params.value.substring(0, 3)}) {params.value.substring(3, 6)}-
                        {params.value.substring(6, 10)}
                    </p>
                )
            },
        },
        {
            field: 'has_other_pets',
            headerName: 'Other Pets',
            width: 90,
            align: 'center',
            renderCell: (params: any) => booleanToIcon(params.value),
        },
        {
            field: 'has_kids',
            headerName: 'Kids',
            width: 65,
            align: 'center',
            renderCell: (params: any) => booleanToIcon(params.value),
        },
        {
            field: 'experience_description',
            headerName: 'Experience',
            width: 150,
            align: 'left',
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            align: 'left',
            renderCell: (params: any) => {
                if (params.value === 'null') return null
                else return params.value.charAt(0).toUpperCase() + params.value.slice(1)
            },
        },
        {
            field: 'date_submitted',
            headerName: 'Date Submitted',
            width: 150,
            align: 'left',
            renderCell: (params: any) => {
                if (params.value) {
                    return <p>{dayjs(params.value).format('DD-MM-YYYY HH:MM')}</p>
                } else return null
            },
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => {}} />,
                <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => {}} />,
            ],
        },
    ]

    if (loading) {
        return <p role="feedback">Loading...</p>
    }
    if (error) {
        return <p role="feedback">Error...</p>
    }

    return (
        <section className="pets-table">
            <h2>Adoption Requests</h2>

            <div className="datagrid_wrapper">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    getRowId={(row) => row._id}
                    sx={{ width: '100%', backgroundColor: '#ffffff' }}
                />
            </div>
        </section>
    )
}
