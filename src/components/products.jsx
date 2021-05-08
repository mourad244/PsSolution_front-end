import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../services/productService';
import { getProductsType } from '../services/productTypeService';
import ProductsTable from './productsTable';
import ProductForm from './productForm';
import Pagination from '../common/pagination';
import ListGroup from '../common/listGroup';
import SearchBox from '../common/searchBox';
import { paginate } from '../utils/paginate';
import { toast } from 'react-toastify';
import _ from 'lodash';

function Products(props) {
	const [products, setProducts] = useState([]);
	const [types, setTypes] = useState([]);

	const [formDisplay, setFormDisplay] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedType, setSelectedType] = useState(null);
	const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' });
	const [totalCount, setTotalCount] = useState(0);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			console.log('fetch data');
			const { data } = await getProductsType();
			const types = [{ _id: '', name: 'Tous les types' }, ...data];
			const { data: products } = await getProducts();
			setTypes(types);
			setProducts(products);
		};
		fetchData();
	}, []);

	useEffect(() => {
		let filtered = products;
		const getData = async () => {
			if (searchQuery)
				filtered = products.filter((m) => m.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
			else if (selectedType && selectedType._id) {
				filtered = products.filter((m) => m.type._id === selectedType._id);
			}
			const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

			const filteredProducts = paginate(sorted, currentPage, pageSize);

			setFilteredProducts(filteredProducts);
		};
		getData();
		setTotalCount(filtered.length);
	}, [selectedType, currentPage, products, searchQuery, sortColumn.order, sortColumn.path]);
	const handleDelete = async (product) => {
		const originalProducts = products;
		setProducts(products.filter((m) => m._id !== product._id));

		try {
			await deleteProduct(product._id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) toast.error('product déja supprimé');
			setProducts(originalProducts);
		}
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
	const handleTypeSelect = (type) => {
		setSelectedType(type);
		setSearchQuery('');
		setCurrentPage(1);
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
		setSelectedType(null);
		setCurrentPage(1);
	};

	const handleSort = (sortColumn) => {
		setSortColumn(sortColumn);
	};

	const toggleForm = () => {
		setFormDisplay(!formDisplay);
	};

	const { user } = props;
	if (totalCount === 0) {
		return (
			<div className="row">
				<div className="col-3">
					<ListGroup items={types} selectedItem={selectedType} onItemSelect={handleTypeSelect}></ListGroup>
				</div>
				<div className="col">
					<h2>aucun produit dans la base de donnée</h2>
					{user && <ProductForm formDisplay={formDisplay} toggleForm={toggleForm} />}
					<SearchBox value={searchQuery} onChange={handleSearch}></SearchBox>
				</div>
			</div>
		);
	}
	console.log('total count :	' + totalCount);

	return (
		<div className="row">
			<div className="col-3">
				<ListGroup items={types} selectedItem={selectedType} onItemSelect={handleTypeSelect}></ListGroup>
			</div>
			<div className="col">
				<h3>il ya {totalCount} produits dans la base de données</h3>
				{user && <ProductForm formDisplay={formDisplay} toggleForm={toggleForm} />}
				<SearchBox value={searchQuery} onChange={handleSearch}></SearchBox>
				<ProductsTable
					products={filteredProducts}
					sortColumn={sortColumn}
					onDelete={handleDelete}
					onSort={handleSort}
				></ProductsTable>
				<Pagination
					itemsCount={totalCount}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				></Pagination>
			</div>
		</div>
	);
}
export default Products;
