import { connect } from 'react-redux'
import { search } from '../actions/listingActions'
import PreferencesForm from '../PreferencesForm'
import {requestListings, requestRedirect} from '../actions/listingActions'

const mapDispatchToProps = dispatch => {
  return {
    onCheck: (criteria, radius, location) => {
      dispatch(search(criteria, radius, location))
    },
    requestListings: () => {
        dispatch(requestListings())
    },
    requestRedirect: () => {
        dispatch(requestRedirect())
    },
  }
}

const mapStateToProps = state => {
    return {
      homeListings: state.listingsForm,
      requests: state.requests,
    }
  }


let PreferencesContainer = connect(mapStateToProps, mapDispatchToProps)(PreferencesForm)
export default PreferencesContainer
