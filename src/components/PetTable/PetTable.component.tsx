import AddIcon from '@mui/icons-material/Add'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Pet from '../../models/pet.interface'
import PetService from '../../services/pets.service'
import PetForm from '../PetForm/PetForm'

const moment = require('moment')
export type Props = {
    pets: Pet[]
    loading?: boolean
    error?: boolean
}

export const PetTable: FunctionComponent<Props> = ({ pets, loading, error }) => {
    const api_url = process.env.VM_API_URL || 'http://localhost:3001'
    const ps = new PetService()
    const [rows, setRows] = useState<Pet[]>([])
    const [modalPetId, setModalPetId] = React.useState<string>('')
    const [openModal, setOpenModal] = React.useState(false)
    const [token, settoken] = React.useState('') // to be removed and use actual token
    const [sortModel, setSortModel] = React.useState([
        {
            field: 'last_modified',
            sort: 'desc',
        },
    ])

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    const handleDelete = (id: string, token: string) => {
        ps.deletePetById(id, token).then((res) => {
            if (res.status === 202) {
                setRows((prevRows) => prevRows.filter((row) => id !== row._id))
            }
        })
    }

    const handleEdit = (id: string) => {
        setModalPetId(id)
        setOpenModal(true)
    }

    const handleAddPet = () => {
        setModalPetId('')
        setOpenModal(!openModal)
    }

    const booleanToIcon = (bool: string) => {
        if (bool === 'true') return <CheckCircleIcon color="primary" />
        else return <CancelIcon color="error" />
    }

    const genderIcon = (gender: string) => {
        if (gender === 'female') return <FemaleIcon sx={{ color: '#ff8aa7' }} />
        if (gender === 'male') return <MaleIcon color="primary" />
        else return <p>Other</p>
    }

    useEffect(() => {
        setRows(pets)
    }, [pets])

    const columns: GridColDef[] = [
        {
            field: 'filename',
            headerName: '',

            renderCell: (params: any) => {
                if ((params as GridValueGetterParams).value) {
                    const dob = new Date(params.row.dob)
                    return (
                        <Tooltip
                            title={
                                <img
                                    height="150"
                                    width="150"
                                    src={
                                        api_url +
                                        params.row.name +
                                        '_' +
                                        dob!.getMonth() +
                                        dob!.getFullYear() +
                                        '_thumbnail.avif'
                                    }
                                />
                            }
                        >
                            <img height="40" width="40" src={api_url + params.value} />
                        </Tooltip>
                    )
                } else return null
            },
            width: 70,
            align: 'center',
            disableColumnMenu: true,
        },
        { field: 'name', headerName: 'Name', width: 100, align: 'left' },
        {
            field: 'dob',
            headerName: 'DOB',
            renderCell: (params: any) => {
                if (params.value) {
                    return <p>{dayjs(params.value).format('DD-MM-YYYY')}</p>
                } else return null
            },
            width: 90,
            align: 'left',
        },

        {
            field: 'species',
            headerName: 'Spayed/Neutered',
            width: 120,
            align: 'center',
            renderCell: (params: any) => booleanToIcon(params.value),
        },
        {
            field: 'kids_comp',
            headerName: 'Vaccinated',
            width: 90,
            align: 'center',
            renderCell: (params: any) => booleanToIcon(params.value),
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 70,
            align: 'center',
            renderCell: (params: any) => genderIcon(params.value),
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 200,
            align: 'left',
        },
        {
            field: 'last_modified',
            headerName: 'Last Modified',
            width: 130,
            align: 'left',
            renderCell: (params: any) => {
                if (params.value) {
                    return <p>{dayjs(params.value).format('DD-MM-YYYY')}</p>
                } else return null
            },
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDelete(params.row._id, token)}
                />,
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => handleEdit(params.row._id)}
                />,
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
            <h2>Pets</h2>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row._id}
                autoHeight
                sx={{ width: '100%' }}
            />

            <Button
                className="btn-add-pet"
                variant="contained"
                onClick={handleAddPet}
                endIcon={<AddIcon />}
            >
                Add Pet
            </Button>

            {openModal && (
                <PetForm
                    toggleModal={handleOpenModal}
                    petId={modalPetId}
                    setPetId={setModalPetId}
                    setRows={setRows}
                />
            )}
        </section>
    )
}
