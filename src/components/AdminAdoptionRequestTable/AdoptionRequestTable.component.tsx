import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
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

    const handleDelete = (id: string) => {
        ars.deleteAdoptionRequestById(id).then((res) => {
            if (res.status === 202) {
                setRows((prevRows) => prevRows.filter((row) => id !== row._id))
            }
        })
    }

    const updateStatusUI = (status: string, id: string) => {
        let adoptionRequest = rows.filter((item: IAdoptionRequest) => item._id === id)[0]
        let newRows = rows
        let index = rows.indexOf(adoptionRequest)
        let updatedRequest = adoptionRequest
        updatedRequest.status = status
        newRows[index] = updatedRequest
        setRows(newRows)
    }

    const handleApprove = (id: string) => {
        const body = {
            id: id,
            status: 'approved',
        }
        updateStatusUI('approved', id)
        ars.updateAdoptionRequestStatus(body).then((res) => {
            if (res.status !== 200) {
            }
        })
    }

    const handleReject = (id: string) => {
        const body = {
            id: id,
            status: 'rejected',
        }
        updateStatusUI('rejected', id)
        ars.updateAdoptionRequestStatus(body).then((res) => {
            if (res.status !== 200) {
            }
        })
    }

    const booleanToIcon = (bool: string) => {
        if (bool === 'true') return <CheckCircleIcon color="primary" />
        else return <CancelIcon color="error" />
    }

    const columnActions = (row: IAdoptionRequest) => {
        let actions = [
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleDelete(row._id)}
            />,
        ]
        if (row.status === 'submitted') {
            actions = actions.concat([
                <GridActionsCellItem
                    icon={<DoneOutlineIcon sx={{ color: 'green' }} />}
                    label="Approve"
                    onClick={() => handleApprove(row._id)}
                />,
                <GridActionsCellItem
                    icon={<HighlightOffIcon sx={{ color: 'red' }} />}
                    label="Reject"
                    onClick={() => handleReject(row._id)}
                />,
            ])
        }

        return actions
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
            width: 150,
            align: 'left',
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
            width: 100,
            getActions: (params) => columnActions(params.row),
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
                {rows && (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        autoHeight
                        getRowId={(row) => row._id}
                        sx={{ width: '100%', backgroundColor: '#ffffff' }}
                    />
                )}
            </div>
        </section>
    )
}
