import PhotoCamera from '@mui/icons-material/PhotoCamera'
import SaveIcon from '@mui/icons-material/Save'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Modal from '@mui/material/Modal'
import { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import React, { FunctionComponent } from 'react'
import IPet from '../../models/pet.interface'
import PetService from '../../services/pets.service'
import GenderSelect from '../AdminFormFields/GenderSelect'
import NameTextfield from '../AdminFormFields/NameTextfield'
import SpeciesSelect from '../AdminFormFields/SpeciesSelect'
type Props = {
    petId: string
    toggleModal: () => void
    setPetId: React.Dispatch<React.SetStateAction<string>>
    setRows: React.Dispatch<React.SetStateAction<any>>
}
const PetForm: FunctionComponent<Props> = ({ toggleModal, petId, setPetId, setRows }) => {
    const ps = new PetService()
    const [isOpen, setIsOpen] = React.useState(true)
    const [species, setSpecies] = React.useState('')
    const [gender, setGender] = React.useState('')
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [dob, setDOB] = React.useState<Dayjs | null>(null)
    const [petPhotoFile, setPetPhotoFile] = React.useState<File>()
    const [petPhotoFilename, setPetPhotoFilename] = React.useState('')
    const [spayedNeutChecked, setSpayedNeutChecked] = React.useState(false)
    const [vaxxedChecked, setVaxxedChecked] = React.useState(false)
    const [updatedPet, setUpdatedPet] = React.useState<null | IPet>(null)
    React.useEffect(() => {
        if (petId !== '') {
            ps.getPetById(petId).then((res) => {
                let spayedNeutBool = res.data[0].spay_neut === 'true'
                let vaxxedBool = res.data[0].vaxxed === 'true'
                setName(res.data[0].name)
                setDOB(dayjs(res.data[0].dob))
                setDescription(res.data[0].description)
                setGender(res.data[0].gender)
                setSpecies(res.data[0].species)
                setPetPhotoFilename(res.data[0].filename)
                setSpayedNeutChecked(spayedNeutBool)
                setVaxxedChecked(vaxxedBool)
            })
        }
    }, [petId])

    const handleSpeciesChange = (event: SelectChangeEvent) => {
        setSpecies(event.target.value as string)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleGenderChange = (event: SelectChangeEvent) => {
        setGender(event.target.value as string)
    }

    const handleSpayedNeutCheckbox = () => {
        setSpayedNeutChecked(!spayedNeutChecked)
    }

    const handleVaxxedCheckbox = () => {
        setVaxxedChecked(!vaxxedChecked)
    }

    const handleDateChange = (value: any) => {
        setDOB(value)
    }

    const toggleIt = () => {
        setPetId('')
        setIsOpen(!isOpen)
        toggleModal()
    }

    const appendFormData = () => {
        let formData = new FormData()
        const dobString = dob?.format('YYYY-MM-DDTHH:mm:ss') || ''
        formData.append('name', name)
        formData.append('dob', dobString)
        formData.append('species', species)
        formData.append('gender', gender)
        formData.append('spay_neut', spayedNeutChecked.toString())
        formData.append('vaxxed', vaxxedChecked.toString())
        formData.append('description', description)
        formData.append('filename', petPhotoFilename)
        if (petPhotoFile) {
            formData.append('petPhoto', petPhotoFile)
        }
        return formData
    }

    const handleSubmit = () => {
        const body = appendFormData()
        if (petId === '') {
            ps.addPet(body) //missing token
                .then((res) => {
                    if (res.status === 200) {
                        setRows((prevRows: any) => {
                            const newRows = [...prevRows, res.data.ops[0]]
                            return newRows
                        })
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        } else {
            ps.putPet(petId, body)
                .then((res) => {
                    console.log('🌿 ~ file: PetForm.tsx:124 ~ .then ~ res:', res)
                    if (res.status === 200) {
                        const dobString = dob?.format('YYYY-MM-DDTHH:mm:ss') || ''
                        setRows((prevRows: IPet[]) => {
                            let pet = prevRows.filter((item: IPet) => item._id === petId)[0]
                            console.log('🌿 ~ file: PetForm.tsx:126 ~ setRows ~ pet:', pet)
                            let newRows = prevRows
                            let petIndex = prevRows.indexOf(pet)
                            newRows[petIndex] = {
                                _id: petId,
                                name: 'skhfdkshfkshb',
                                dob: dob?.toDate(),
                                species: species,
                                gender: gender,
                                filename: petPhotoFilename,
                                spay_neut: spayedNeutChecked,
                                vaxxed: vaxxedChecked,
                                description: description,
                                last_modified: Date.now().toString(),
                            }
                            console.log('🌿 ~ file: PetForm.tsx:142 ~ setRows ~ newRows:', newRows)
                            return newRows
                        })
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }
        toggleIt()
        setPetId('')
    }

    return (
        <Modal open={isOpen}>
            <form className="pet-form" encType="multipart/form-data">
                <h2>Add pet</h2>
                <NameTextfield handleNameChange={handleNameChange} name={name} />
                <div className="form-row">
                    <SpeciesSelect handleSpeciesChange={handleSpeciesChange} species={species} />
                    <GenderSelect handleGenderChange={handleGenderChange} gender={gender} />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        format={'DD/MM/YYYY'}
                        value={dob}
                        onChange={(newValue: any) => {
                            handleDateChange(newValue)
                        }}
                        slotProps={{ textField: { size: 'small' } }}
                    />
                </LocalizationProvider>

                <FormGroup>
                    <div className="form-row">
                        <p className="fullwidth">Health State:</p>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={spayedNeutChecked}
                                    onChange={handleSpayedNeutCheckbox}
                                />
                            }
                            label="Spayed/Neutered"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={vaxxedChecked} onChange={handleVaxxedCheckbox} />
                            }
                            label="Vaccinated"
                        />
                    </div>
                </FormGroup>

                <TextField
                    required
                    id="filled-description"
                    multiline
                    label="Pet description..."
                    variant="outlined"
                    rows={3}
                    size="small"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                />
                <div className="form-row">
                    <div className="stack">
                        <p>Choose a picture*:</p>{' '}
                        {petPhotoFilename !== '' ? (
                            <div className="truncatetext">
                                <Tooltip title={petPhotoFilename}>
                                    <span className="filename">{petPhotoFilename}</span>
                                </Tooltip>
                            </div>
                        ) : null}
                    </div>

                    <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                        Upload
                        <input
                            hidden
                            onChange={(event) => {
                                const month = dob!.month()
                                const year = dob!.year()
                                const filename = name + '_' + month + year
                                if (event.target.files !== null) {
                                    const file = event.target.files[0]
                                    setPetPhotoFile(file)
                                    setPetPhotoFilename(filename)
                                }
                            }}
                            accept="image/*"
                            type="file"
                            name="petPhoto"
                            id="petPhoto"
                        />
                    </Button>
                </div>

                <Button variant="outlined" onClick={toggleIt}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} startIcon={<SaveIcon />}>
                    Save
                </Button>
            </form>
        </Modal>
    )
}

export default PetForm
