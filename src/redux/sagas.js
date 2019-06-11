import resourceTreeSagas from '../components/resource.tree/sagas';

export default function * rootSaga() {
    yield *resourceTreeSagas();
}