import { useAdoptionRequestsService } from '../../hooks/adoptionRequest.hook'
import { AdoptionRequestTableComponent } from './AdoptionRequestTable.component'
export const AdoptionRequestTableContainer = () => {
    const { data, loading, error } = useAdoptionRequestsService([], null)

    return <AdoptionRequestTableComponent adoptionRequests={data} loading={loading} error={error} />
}
