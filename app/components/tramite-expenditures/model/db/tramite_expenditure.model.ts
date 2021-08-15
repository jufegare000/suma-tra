import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, NotEmpty } from "sequelize-typescript";
import { TramiteExpenditureI } from "../interface/tramite_expenditure.interface";

@Table(
    {
        tableName: "tramite_expenditure",
        timestamps: false
    }
)
export class TramiteExpenditureModel extends Model implements TramiteExpenditureI {

    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    tramite_id!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    gasto_id!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    valor!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    soporte_url?: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    fecha_creacion!: Date;

    @AllowNull(false)
    @NotEmpty
    @Column
    fecha_actualizacion?: Date;

    @AllowNull(true)
    @NotEmpty
    @Column
    descripcion?: string;
}