import React from 'react';

export const FilterableProductTable = React.createClass({
    getInitialState() {
        return {
            filterText: '',
            inStockOnly: false
        }
    },

    
    render() {
        const products = this.props.products;
        return (
            <div>
                <SearchBar/>
                <ProductTable products={products}/>
            </div>
		    )
    }
});

export const SearchBar = React.createClass({
    render() {
        const { filterText, inStockOnly } = this.props;
        return (
            <form>
                <input type="search"/>
                <label>
                    <input type="checkbox" value={inStockOnly}/>
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

        products.forEach((product) => {
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
                <ProductRow key={product.name} product={product.name}/>
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
        )
    }
});

export const ProductCategoryRow = React.createClass({
    render() {
        return (
            <tr>
                <th colSpan={2}>{this.props.category}</th>
            </tr>
        )
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
        )
    }
});
