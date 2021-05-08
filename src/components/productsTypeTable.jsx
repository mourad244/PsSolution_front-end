import React from 'react';
import Table from '../common/table';
import { Link } from 'react-router-dom';

function ProductsTypeTable(props) {
	const columns = [
		{
			path: 'name',
			label: 'name',
			content: (productType) => <Link to={`/productsType/${productType._id}`}>{productType.name}</Link>
		},
		{ path: 'categorie.name', label: 'Categorie' },
		{ path: 'description', label: 'Description' },
		{ path: 'images', label: 'Images' },
		{
			key: 'delete',
			content: (productType) => (
				<button onClick={() => props.onDelete(productType)} className="btn btn-danger btn-sm">
					Supprimer
				</button>
			)
		}
	];

	const { productsType, onSort, sortColumn } = props;
	return <Table columns={columns} data={productsType} sortColumn={sortColumn} onSort={onSort}></Table>;
}

export default ProductsTypeTable;
