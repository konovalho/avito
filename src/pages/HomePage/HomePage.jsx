import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import selectors from '_selectors';
import { connect } from 'react-redux';
import LayoutContent from '_components/LayoutContent';
import FormContainer from '_containers/FormContainer';

import {
  fetchProducts,
} from '_actions/products';

import ProductsList from './ProductsList';
import styles from './HomePage.scss';

@CSSModules(styles, { allowMultiple: true })
class HomePage extends PureComponent {
  componentDidMount() {
    this.props.onFetchProducts();
  }

  render() {
    const { products } = this.props;
    console.log('products', products);
    return (
      <div>
        <Helmet title="Интернет-магазин" />
        <LayoutContent
          leftContent={
            <ProductsList
              data={products}
            />
          }
          rightContent={
            <FormContainer
              styleName="products-filter"
            />
          }
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  products: PropTypes.array,
  onFetchProducts: PropTypes.func,
};

const { sortedProducts } = selectors;

const mapStateToProps = state => ({
  products: sortedProducts(state),
});


const mapDispatchToProps = dispatch => ({
  onFetchProducts() {
    dispatch(fetchProducts());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
