import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey   } from "typeorm";

export default class AddProductIdToOrdersProducts1598045740276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'order_products',
            new TableColumn ({
                name: 'product_id',
                type: 'uudi',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'orders_products',
            new TableForeignKey({
                name:'OrdersProductsProduct',
                columnNames:['product_id'],
                referencedColumnNames:['id'],
                referencedTableName: 'products',
                onDelete: 'SET NULL',
            }),
        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'orders_products', 
            'OrdersProductsProduct');
        await queryRunner.dropColumn('orders_products', 'product_id');
    }

}
