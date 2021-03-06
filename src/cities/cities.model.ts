import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table

export default class City extends Model<City> {

    @Column({
        type: DataType.TEXT,
    })
    public country!: string;

    @Column({
        type: DataType.TEXT,
    })
    public name!: string;
    @Column({
        type: DataType.INTEGER,
    })
    public populationDensity!: number;
}
