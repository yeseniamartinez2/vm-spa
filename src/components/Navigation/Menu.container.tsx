import { Menu } from './Menu.component'

export interface IMenuProps {
    roles: string
}
export const MenuContainer = ({ roles }: IMenuProps) => {
    return <Menu roles={roles} />
}
