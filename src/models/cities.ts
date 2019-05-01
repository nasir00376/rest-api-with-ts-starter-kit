import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
// tslint:disable-next-line:no-default-export
export default class City extends Model<City> {

    @Column({
        type: DataType.TEXT,
    })
    public name!: string;
}
