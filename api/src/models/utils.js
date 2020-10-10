export const upsert = async (model, where, newItem) => {
		const item = await model.findOne({ where });

		return !item ?
				{
						item: await model.create(newItem),
						isCreated: true
				} :
				{
						item: await model.update(newItem, { where }),
						isCreated: false
				};
};