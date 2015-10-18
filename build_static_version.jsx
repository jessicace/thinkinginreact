import React from 'react';
import ReactDOM from 'react-dom';

export const FilterableProductTable = React.createClass({
    getInitialState() {
        return {
            filterText: '',
            inStockOnly: false
        }
    },

    handleUserInput(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    },

    
    render() {
        const products = this.props.products;
        const { filterText, inStockOnly } = this.state;
        
        return (
            <div>
                <SearchBar
                    filterText={filterText}
                    inStockOnly={inStockOnly}
                    onUserInput={this.handleUserInput}
                />
                <ProductTable
                    products={products}
                    filterText={filterText}
                    inStockOnly={inStockOnly}
                />
            </div>
		    )
    }
});

export const SearchBar = React.createClass({
    handleChange() {
        const filterText = ReactDOM.findDOMNode(this.refs.filterText).value;
        const inStockOnly = ReactDOM.findDOMNode(this.refs.inStockOnly).checked;

        this.props.onUserInput(filterText, inStockOnly);
    },

    render() {
        const { filterText, inStockOnly } = this.props;
        return (
            <form>
                <input type="search"
                       ref="filterText"
                       value={filterText}
                       onChange={this.handleChange}
                />
                <label>
                    <input type="checkbox"
                           ref="inStockOnly"
                           checked={inStockOnly}
                           onChange={this.handleChange}
                    />
                    Show products in stock
                </label>
            </form>
        )
    }
});

export const ProductTable = React.createClass({
    render() {
        const { products, filterText, inStockOnly } = this.props;
        const rows = [];
        let currentCategory;

        products.filter((product) => {
            const stockCondition = !inStockOnly || inStockOnly && product.stocked;
            const nameCondition = product.name.toLowerCase().indexOf(filterText) !== -1;
            return stockCondition && nameCondition;
        }).forEach((product) => {
            if (product.category !== currentCategory) {
                currentCategory = product.category;

                rows.push((
                    <ProductCategoryRow
                    key={currentCategory}
                    category={currentCategory}
                    />
                ));
            }
            rows.push((
                <ProductRow key={product.name} product={product}/>
            ));
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
});

export const ProductCategoryRow = React.createClass({
    render() {
        return (
            <tr>
                <th colSpan={2}>{this.props.category}</th>
            </tr>
        );
    }
});

export const ProductRow = React.createClass({
    render() {
        const product = this.props.product;
        return (
            <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
});
