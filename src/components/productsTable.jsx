import React from 'react';
import Table from '../common/table';
import { Link } from 'react-router-dom';

function ProductsTable(props) {
	const columns = [
		{
			path: 'name',
			label: 'name',
			content: (product) => <Link to={`/products/${product._id}`}>{product.name}</Link>
		},
		{ path: 'type.name', label: 'Type' },
		{ path: 'images', label: 'Images' },

		{
			key: 'delete',
			content: (product) => (
				<button onClick={() => props.onDelete(product)} className="btn btn-danger btn-sm">
					Supprimer
				</button>
			)
		}
	];

	const { products, onSort, sortColumn } = props;

	return <Table columns={columns} data={products} sortColumn={sortColumn} onSort={onSort}></Table>;
}

export default ProductsTable;
