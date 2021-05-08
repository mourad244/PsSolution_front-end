import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Joi from 'joi-browser';
import Form from '../common/form';
import { getProductsType } from '../services/productTypeService';
import { getProduct, saveProduct } from '../services/productService';

class ProductForm extends Form {
	state = {
		data: {
			name: '',
			type: '',
			description: [],
			avis: [],
			images: []
		},
		errors: {},
		types: [],
		form: 'products'
	};
	schema = {
		_id: Joi.string(),
		name: Joi.string().required().label('Nom'),
		avis: Joi.array().label('avis'),
		images: Joi.label('images').optional(),
		description: Joi.label('description'),
		type: Joi.string().required().label('type de produit')
	};

	async populateTypes() {
		const { data: types } = await getProductsType();
		this.setState({ types });
	}

	async populateProducts() {
		try {
			const productId = this.props.match.params.id;
			if (productId === '') return;

			const { data: product } = await getProduct(productId);
			this.setState({ data: this.mapToViewModel(product) });
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				this.props.history.replace('/not-found');
			}
		}
	}

	async componentDidMount() {
		await this.populateProducts();
		await this.populateTypes();
	}

	mapToViewModel(product) {
		return {
			_id: product._id,
			name: product.name,
			avis: product.avis,
			images: product.images,
			description: product.description,
			type: product.type._id
		};
	}
	doSubmit = async () => {
		// call the server
		await saveProduct(this.state.data);
		if (this.props.match) this.props.history.push('/products');
		else {
			window.location.reload();
		}
	};

	render() {
		const { types } = this.state;
		let productId;
		try {
			productId = this.props.match.params.id;
		} catch {}
		return (
			<div className={'card textcenter mt-3 ' + (this.props.formDisplay || productId ? '' : 'add-item')}>
				<div className="apt-addheading card-header bg-primary text-white" onClick={this.props.toggleForm}>
					<FaPlus /> Ajouter produit
				</div>
				<div className="card-body">
					<form id="aptForm" noValidate onSubmit={this.handleSubmit}>
						{this.renderInput('name', 'Nom')}
						{this.state.data.images.length !== 0 && this.renderImage('images', 'Image')}
						{this.renderUpload('image', 'upload image')}
						{this.renderList('description', 'Description')}
						{this.renderInputList('description', 'Description')}
						{this.renderSelect('type', 'Type de produit', types)}
						{this.renderButton('Sauvegarder')}
					</form>
				</div>
			</div>
		);
	}
}

// hooks
function ProductForm2(props) {
	const [data, setData] = useState({
		type: '',
		name: '',
		description: [],
		avis: [],
		images: []
	});
	const [errors, setErrors] = useState({});
	const [types, setTypes] = useState([]);
	const form = 'products';
	const schema = {
		_id: Joi.string(),
		name: Joi.string().required().label('Nom'),
		avis: Joi.array().label('avis'),
		images: Joi.label('images').optional(),
		description: Joi.label('description'),
		type: Joi.string().required().label('type de produit')
	};
	const productId = props.match.params.id;

	useEffect(() => {
		const populateTypes = async () => {
			const { data } = await getProductsType();
			setTypes(data);
		};
		populateTypes();
	}, []);

	useEffect(() => {
		const populateProducts = async () => {
			try {
				if (productId === '') return;

				const { data } = await getProduct(productId);
				setData(mapToViewModel(data));
			} catch (ex) {
				if (ex.response && ex.response.status === 404) {
					props.history.replace('/not-found');
				}
			}
		};
		populateProducts();
	}, [productId, props.history]);

	const mapToViewModel = (product) => {
		return {
			_id: product._id,
			name: product.name,
			avis: product.avis,
			images: product.images,
			description: product.description,
			type: product.type
		};
	};
	const doSubmit = async () => {
		// call the server
		await saveProduct(data);
		if (props.match) props.history.push('/products');
		else {
			window.location.reload();
		}
	};

	return (
		<div className={'card textcenter mt-3 ' + (props.formDisplay || productId ? '' : 'add-item')}>
			<div className="apt-addheading card-header bg-primary text-white" onClick={props.toggleForm}>
				<FaPlus /> Ajouter produit
			</div>
			<div className="card-body">
				{/* <Form id="aptForm" noValidate onSubmit={handleSubmit}>
					{renderInput('name', 'Nom')}
					{data.images.length !== 0 && this.renderImage('images', 'Image')}
					{renderUpload('image', 'upload image')}
					{renderList('description', 'Description')}
					{renderInputList('description', 'Description')}
					{renderSelect('type', 'Type de produit', types)}
					{renderButton('Sauvegarder')}
			</Form> */}
			</div>
		</div>
	);
}

export default ProductForm;
