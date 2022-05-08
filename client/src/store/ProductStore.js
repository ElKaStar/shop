import { makeAutoObservable } from 'mobx'

export default class ProductStore {
    constructor() {
        this._types = []
        this._genderes = []
        this._products = []
        this._catalogs = []
        this._catalogsInfo = []
        this._statuses = []
        this._cart = []
        this._cartProducts = []
        this._orders = []
        this._newProducts = []
        this._properties = []
        this._selectedType = {}
        this._selectedGender = {} 
        this._selectedProduct = {}
        this._selectedCatalog = {}
        this._page = 1
        this._totalCount = 1
        this._limit = 5
        makeAutoObservable(this)
    }
    setTypes(types) {
        this._types = types
    }
    setPage(page) {
        this._types = page
    }
    setStatuses(statuses) {
        this._statuses = statuses
    }
    setCart(cart) {
        this._cart = cart
    }
    setCartProducts(cartProducts) {
        this._cartProducts = cartProducts
    }
    setOrders(orders) {
        this._orders = orders
    }
    setCatalogsInfo(catalogsInfo) {
        this._catalogsInfo = catalogsInfo
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }
    setNewProducts(newProducts) {
        console.log('prodStore', newProducts)
        this._newProducts = newProducts
    }
    setLimit(lim) {
        this._limit = lim
    }
    setProperties(properties) {
        this._properties = properties
    }
    setGenders(genderes) {
        this._genderes = genderes
    }
    setProducts(products) {
        this._products = products
    }
    setCatalogs(catalogs) {
        this._catalogs = catalogs
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedCatalog(catalog) {
        this._selectedCatalog = catalog
    }
    setSelectedProperty(property) {
        this._selectedProperty = property
    }
    setSelectedGender(gender) {
        this._selectedGender = gender
    }
    setSelectedProduct(product) {
        this._selectedProduct = product
    }
    get selectedProduct() {
        return this._selectedProduct 
    }
    get selectedGender() {
        return this._selectedGender 
    }
    get selectedType() {
        return this._selectedType 
    }
    get selectedCatalog() {
        return this._selectedCatalog 
    }
    get selectedProperty() {
        return this._selectedProperty 
    }
    get types() {
        return this._types
    }
    get newProducts() {
        return this._newProducts
    }
    get catalogsInfo() {
        return this._catalogsInfo
    }
    get genders() {
        return this._genderes
    }
    get statuses() {
        return this._statuses
    }
    get cart() {
        return this._cart
    }
    get orders() {
        return this._orders
    }
    get cartProducts() {
        return this._cartProducts
    }
    get products() {
        return this._products
    }
    get catalogs() {
        return this._catalogs
    }
    get properties() {
        return this._properties
    }
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }
}