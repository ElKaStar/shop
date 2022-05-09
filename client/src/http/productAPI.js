import { $host, $authhost} from './index'
import jwt_decode from 'jwt-decode'

export const createType = async (type) => {
    console.log(type)
    const {data} = await $authhost.post('api/type', type)
    return data
}
export const createCatalog = async (name, scr) => {
    const {data} = await $authhost.post('api/catalogs', {name, scr})
    return data
}

export const fetchTypes = async (email, password) => {
    const {data} = await $host.get('api/type')
    return data
}

export const fetchTypeById = async (id) => {
    const {data} = await $host.get('api/type/find-by-id/'+id)
    //console.log('fetchTypeById', data)
    return data
}

export const createProperty = async (property) => {
    const {data} = await $authhost.post('api/property', property)
    return data
}

export const fetchProperties = async (email, password) => {
    const {data} = await $host.get('api/property')
    return data
}

export const createGender = async (gender) => {
    const {data} = await $authhost.post('api/gender', gender)
    return data
}

export const createStatus = async (title) => {
    const {data} = await $authhost.post('api/statuses', title)
    return data
}

export const fetchGenders = async (email, password) => {
    const {data} = await $host.get('api/gender')
    return data
}
export const createProduct = async (name, price, typeId, genderId) => {
    const {data} = await $authhost.post('api/product', {name, price, typeId, genderId})
    return data
}

export const fetchProducts = async (typeId, genderId, limit, page) => {
    const {data} = await $host.get('api/product')

    return data
}
export const fetchCatalogs = async () => {
    const {data} = await $host.get('api/catalogs')
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    console.log({data})
    return data
}
export const fetchNewCatalogsInfo = async () => {
    const {data} = await $host.get('api/catalogs-info/find-new')
    console.log(data)
    return data
}
export const fetchCatalogsInfoById = async (id) => {
    const {data} = await $host.get('api/catalogs-info/find/' + id)
    console.log({data})
    return data
}

export const uploadImage = async (productId, scr) => {
    const {data} = await $authhost.post('api/images', {productId, scr})
    return data
}
export const uploadProductInfo = async (productId, propertyId, description) => {
    const {data} = await $authhost.post('api/product-info', {productId, propertyId, description})
    return data
}

export const createCatalogsInfo = async (description, catalogId, productId) => {
    const {data} = await $authhost.post('api/catalogs-info', {description, catalogId, productId})
    return data
}

export const createCart = async (userId, statusId, isCart) => {
    const {data} = await $authhost.post('api/cart', {userId, statusId, inCart: true})
    return data
}

export const createCartProducts = async (cartId, productId, price, quantity) => {
    const {data} = await $authhost.post('api/cart-products', {cartId, productId, price, quantity})
    return data
}

export const fetchCart = async (userId) => {
    const {data} = await $authhost.get('api/cart/?userId='+ userId)
    return data
}

export const sendCart = async (cartId) => {
    console.log(cartId)
    const {data} = await $authhost.post('api/cart/send', {cartId})
    return data
}

export const fetchCartProductsByCartIdAndProductId = async (cartId, productId) => {
    const {data} = await $authhost.get(`api/cart-products/?cartId=${cartId}&productId=${productId}`)
    return data 
} 

export const fetchCartProductsByCartId = async (cartId) => {
    console.log('here fetchCartProductsByCartId')
    const {data} = await $authhost.get(`api/cart-products/whole-cart/?cartId=${cartId}`)
    return data 
} 

export const fetchImagesCartProducts = async (productsIds) => {
    const {data} = await $authhost.post('api/cart-products/get-images', {productsIds})
    return data
}

export const deleteProductFrCartProducts = async (cartId, productId) => {
    const {data} = await $authhost.delete(`api/cart-products/delete/?cartId=${cartId}&productId=${productId}`)
    return data
}

export const changeCartProducts = async (cartId, productId, quantity) => {
    const {data} = await $authhost.post(`api/cart-products/change-cart`, {cartId, productId, quantity})
    return data 
} 
export const getOrders = async (id) => {
    const {data} = await $authhost.get('api/profile/orders/'+ id) 
    return data
}

export const sendTestEmailApi = async () => {
    const {data} = await $authhost.get('api/email/send') 
    return data
}






