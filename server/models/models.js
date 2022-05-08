const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    inCart: {type: DataTypes.BOOLEAN, defaultValue: true}
})

const Statuses = sequelize.define('statuses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false}
})

const CartProducts = sequelize.define('cart_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
    price: {type: DataTypes.INTEGER}
})

const Images = sequelize.define('images', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    scr: {type: DataTypes.STRING, unique: true}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.FLOAT},
    raiting: {type: DataTypes.FLOAT}
})

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false}
})

const CatalogsInfo = sequelize.define('catalogs_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: true}
})

const Raiting = sequelize.define('raiting', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER},
    review: {type: DataTypes.STRING}
})

const Gender = sequelize.define('gender', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const Catalogs = sequelize.define('catalogs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    isNew: {type: DataTypes.BOOLEAN},
    scr: {type: DataTypes.STRING, unique: true}
})

const Property = sequelize.define('property', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Profile = sequelize.define('profile', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING},
    secondName: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING}
})

User.hasOne(Profile)
Profile.belongsTo(User)

User.hasMany(Cart)
Cart.belongsTo(User)

Statuses.hasMany(Cart)
Cart.belongsTo(Statuses)

User.hasMany(Raiting)
Raiting.belongsTo(User)

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

Product.hasMany(CatalogsInfo, {as: 'catalogs_info'})
CatalogsInfo.belongsTo(Product)

Cart.hasMany(CartProducts)
CartProducts.belongsTo(Cart)

Type.hasMany(Product)
Product.belongsTo(Type)

Gender.hasMany(Product)
Product.belongsTo(Gender)

Property.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Property)

Catalogs.hasMany(CatalogsInfo, {as: 'catalogs_info'})
CatalogsInfo.belongsTo(Catalogs)

Product.hasMany(Images, {as: 'images'})
Images.belongsTo(Product)

Product.hasMany(Raiting)
Raiting.belongsTo(Product)

Product.hasMany(CartProducts)
CartProducts.belongsTo(Product)

module.exports = {
    User,
    Product,
    ProductInfo,
    Cart,
    CartProducts,
    Type,
    Gender,
    Images,
    Property,
    Raiting,
    Catalogs,
    CatalogsInfo,
    Statuses,
    Profile
}
