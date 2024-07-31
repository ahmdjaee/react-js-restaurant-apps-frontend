import React, { Fragment } from 'react'
import { useNavigation } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'

TopBarProgress.config({

})

function TopProgressBar() {
    const navigation = useNavigation()
    return (
        <Fragment>
            {navigation.state === 'loading' && <TopBarProgress />}
        </Fragment>
    )
}

export default TopProgressBar