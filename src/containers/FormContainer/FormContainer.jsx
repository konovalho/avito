import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import selectors from '_selectors';
import Form from '_components/Form';
import { queryStringToObject, objectToQueryString } from '_utils/query';
import { formValueSelector } from 'redux-form';
import { push } from 'react-router-redux';

import { changeFilter } from '_actions/filter';

class FormContainer extends PureComponent {
  getInitialValues = state =>
    (
      { ...state, ...queryStringToObject(location.search) }
    );
  handleSubmit = (values) => {
    const { onPushHistory, location, onChangeFilter } = this.props;
    const query = objectToQueryString(values);

    onPushHistory({
      ...location,
      search: query,
    });

    onChangeFilter(values);
  }

  render() {
    const {
      className,
      filterValue,
      maxPrice,
      category,
    } = this.props;
    const initialValues = !__SERVER__ ? this.getInitialValues(filterValue) : filterValue;
    return (
      <div>
        <Form
          className={className}
          dataForInitialize={initialValues}
          onSubmit={this.handleSubmit}
          maxPrice={maxPrice}
          category={category}
        />
      </div>
    );
  }
}

FormContainer.propTypes = {
  className: PropTypes.string,
  location: PropTypes.any,
  maxPrice: PropTypes.number,
  filterValue: PropTypes.object,
  category: PropTypes.string,
  onPushHistory: PropTypes.func,
  onChangeFilter: PropTypes.func,
};

const { filterSelector, maxPriceOfProducts } = selectors;
const serchFormSelector = formValueSelector('search');
const mapStateToProps = state => ({
  filterValue: filterSelector(state),
  maxPrice: maxPriceOfProducts(state),
  category: serchFormSelector(state, 'category'),
});

const mapDispatchToProps = dispatch => ({
  onPushHistory(params) {
    dispatch(push(params));
  },
  onChangeFilter(filters) {
    dispatch(changeFilter(filters));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
