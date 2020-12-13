import { DataTypes } from 'sequelize'

export default sequelize => {
	const Order = sequelize.define('order', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},

		paymentData: {
			type: DataTypes.TEXT({ length: 'long' }),
			allowNull: false
		}
	})

	Order.associate = models => {
		const { Course, User } = models
		Course.belongsToMany(User, {
			as: 'userOrders',
			through: Order
		})
		User.belongsToMany(Course, {
			as: 'courseOrders',
			through: Order
		})
	}

	return Order
};