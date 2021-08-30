import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, NotEmpty } from "sequelize-typescript";
import { TramiteStateDetailI } from "../interface/detalle-estado-tramite.interface";
@Table(
    {
        tableName: "estado_tramite_detalle",
        timestamps: false
    }
)
export class TramiteStateDetailModel extends Model implements TramiteStateDetailI {

    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    id_tramite!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    id_estado_anterior!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    id_estado_actual!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    id_informador!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    fecha_cambio_estado!: Date;

    @AllowNull(true)
    @Column
    observaciones?: String;

}