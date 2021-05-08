import React, { useState, useEffect } from 'react';
import { getProductsType, deleteProductType } from '../services/productTypeService';
import ProductsTypeTable from './productsTypeTable';
import { getProductsCategorie } from '../services/productCategorieService';
import ProductTypeForm from './productTypeForm';
import ListGroup from '../common/listGroup';
import Pagination from '../common/pagination';
import SearchBox from '../common/searchBox';
import { paginate } from '../utils/paginate';
import { toast } from 'react-toastify';
import _ from 'lodash';

function ProductsType(props) {
	const [productsType, setProductsType] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategorie, setSelectedCategorie] = useState(null);
	const [filteredTypes, setFilteredTypes] = useState([]);

	const [formDisplay, setFormDisplay] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' });
	const [totalCount, setTotalCount] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const pageSize = 10;

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await getProductsCategorie();
			const categories = [{ _id: '', name: 'Tous les categories' }, ...data];
			const { data: productsType } = await getProductsType();
			setProductsType(productsType);
			setCategories(categories);
		};
		fetchData();
	}, []);

	useEffect(() => {
		let filtered = productsType;
		const getData = async () => {
			if (searchQuery)
				filtered = productsType.filter((m) => m.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
			else if (selectedCategorie && selectedCategorie._id) {
				filtered = productsType.filter((m) => m.categorie._id === selectedCategorie._id);
			}
			const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

			const filteredTypes = paginate(sorted, currentPage, pageSize);

			setFilteredTypes(filteredTypes);
		};
		getData();
		setTotalCount(filtered.length);
	}, [selectedCategorie, currentPage, productsType, searchQuery, sortColumn.order, sortColumn.path]);

	const handleDelete = async (product) => {
		const originalProductsType = productsType;
		setProductsType(productsType.filter((m) => m._id !== product._id));

		try {
			await deleteProductType(product._id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) toast.error('product déja supprimé');
			setProductsType(originalProductsType);
		}
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleCategorieSelect = (categorie) => {
		setSelectedCategorie(categorie);
		setSearchQuery('');
		setCurrentPage(1);
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
		setSelectedCategorie(null);
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
					<ListGroup
						items={categories}
						selectedItem={selectedCategorie}
						onItemSelect={handleCategorieSelect}
					></ListGroup>
				</div>
				<div className="col">
					<h2>aucun type de produit dans la base de donnée</h2>
					{user && <ProductTypeForm formDisplay={formDisplay} toggleForm={toggleForm} />}
					<SearchBox value={searchQuery} onChange={handleSearch}></SearchBox>
				</div>
			</div>
		);
	}

	return (
		<div className="row">
			<div className="col-3">
				<ListGroup
					items={categories}
					selectedItem={selectedCategorie}
					onItemSelect={handleCategorieSelect}
				></ListGroup>
			</div>
			<div className="col">
				<h3>il ya {totalCount} types de produit dans la base de données</h3>
				{user && <ProductTypeForm formDisplay={formDisplay} toggleForm={toggleForm} />}
				<SearchBox value={searchQuery} onChange={handleSearch}></SearchBox>
				<ProductsTypeTable
					productsType={filteredTypes}
					sortColumn={sortColumn}
					onDelete={handleDelete}
					onSort={handleSort}
				></ProductsTypeTable>
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

export default ProductsType;
