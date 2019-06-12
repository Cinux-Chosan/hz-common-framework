import resourceTreeSagas from '../components/resource.tree/sagas'
import commonLayoutSagas from '../components/common.layout/sagas'
export default function * rootSaga() {
    yield *resourceTreeSagas()
    yield *commonLayoutSagas()
}
