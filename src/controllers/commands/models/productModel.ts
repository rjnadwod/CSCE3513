import Sequelize from "sequelize";
import { DatabaseConnection } from "./databaseConnection";
import { ProductFieldName, DatabaseTableName } from "./constants/databaseNames";
import { Model, DataTypes, InitOptions, ModelAttributes, ModelAttributeColumnOptions } from "sequelize";

export class ProductModel extends Model {
	public count!: number;
	public lookupCode!: string;

	public readonly id!: string;
	public readonly createdOn!: Date;
}

ProductModel.init(
	<ModelAttributes>{
		id: <ModelAttributeColumnOptions>{
			field: ProductFieldName.ID,
			type: DataTypes.UUID,
			autoIncrement: true,
			primaryKey: true
		},
		count: <ModelAttributeColumnOptions>{
			field: ProductFieldName.COUNT,
			type: DataTypes.INTEGER,
			allowNull: true
		},
		createdOn: <ModelAttributeColumnOptions>{
			field: ProductFieldName.CREATED_ON,
			type: new DataTypes.DATE(),
			allowNull: true
		},
		lookupCode: <ModelAttributeColumnOptions>{
			field: ProductFieldName.LOOKUP_CODE,
			type: new DataTypes.STRING(32),
			allowNull: true
		}
	}, <InitOptions>{
		timestamps: false,
		freezeTableName: true,
		sequelize: DatabaseConnection,
		tableName: DatabaseTableName.PRODUCT
	});


// Database interaction
export const queryById = async (
	id: string,
	queryTransaction?: Sequelize.Transaction
): Promise<ProductModel | null> => {

	return ProductModel.findOne(<Sequelize.FindOptions>{
		transaction: queryTransaction,
		where: <Sequelize.WhereAttributeHash>{ id: id }
	});
};

export const queryByLookupCode = async (
	lookupCode: string,
	queryTransaction?: Sequelize.Transaction
): Promise<ProductModel | null> => {

	return ProductModel.findOne(<Sequelize.FindOptions>{
		transaction: queryTransaction,
		where: <Sequelize.WhereAttributeHash>{ lookupCode: lookupCode }
	});
};

export const queryAll = async (): Promise<ProductModel[]> => {
	return ProductModel.findAll(<Sequelize.FindOptions>{
		order: [ [ ProductFieldName.CREATED_ON, "ASC" ] ]
	});
};
