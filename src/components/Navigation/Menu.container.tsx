import { useAdoptionRequestsService } from '../../hooks/adoptionRequest.hook'
import { Menu } from './Menu.component'

export interface IMenuProps {
    roles: string
    email: string | undefined
}
export const MenuContainer = ({ roles, email }: IMenuProps) => {
    const { data, loading, error } = useAdoptionRequestsService([], email)

    return <Menu roles={roles} requests={data} />
}
