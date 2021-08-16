import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, NotEmpty } from "sequelize-typescript";
import { ExpenditureConceptI } from "../interface/expenditure-concept.interface";

@Table(
    {
        tableName: "concepto_gasto",
        timestamps: false
    }
)
export class ExpenditureConceptModel extends Model implements ExpenditureConceptI {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;    

    @AllowNull(true)
    @NotEmpty
    @Column
    descripcion!: string;
}