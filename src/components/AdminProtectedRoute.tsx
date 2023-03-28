import { useNavigate } from 'react-router-dom'
interface ProtectedRouteProps {
    Component: any
    roles: string
}
export const AdminProtectedRoute: any = (props: ProtectedRouteProps) => {
    const { Component, roles } = props
    let navigate = useNavigate()

    if (roles?.includes('admin')) return <Component />
    else return <p>not authorized</p>
    //navigate('../not-authorized', { replace: true })
}
