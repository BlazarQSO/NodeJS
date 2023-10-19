import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

const UserDb = sequelize.define(
  'user',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
  },
);

const CartDb = sequelize.define(
  'cart',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
);

const CartItemDb = sequelize.define(
  'cart_item',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    count: { type: DataTypes.INTEGER },
  },
);

const ProductDb = sequelize.define(
  'product',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING },
  },
);

const OrderDb = sequelize.define(
  'order',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    paymentType: { type: DataTypes.STRING },
    deliveryType: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING, allowNull: false },
    comments: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    total: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE },
  },
);

UserDb.hasOne(CartDb);
CartDb.belongsTo(UserDb);

CartDb.hasMany(CartItemDb);
CartItemDb.belongsTo(CartDb);

UserDb.hasMany(OrderDb);
OrderDb.belongsTo(UserDb);

export { UserDb, CartDb, CartItemDb, OrderDb, ProductDb };
