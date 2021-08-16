import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, NotEmpty } from "sequelize-typescript";
import { TramiteI } from "../interface/tramite.interface";
@Table(
    {
        tableName: "tramite",
        timestamps: false
    }
)
export class TramiteModel extends Model implements TramiteI{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    fecha_creacion: Date = new Date();

    @AllowNull(false)
    @NotEmpty
    @Column
    solicitante_id!: number;

    @AllowNull(true)
    @Column
    tramitador_id?: number;

    @AllowNull(false)
    @Column
    tipo_vehiculo!: number;

    @AllowNull(false)
    @Column
    placa!: string;

    @AllowNull(false)
    @Column
    modelo!: number;

    @AllowNull(false)
    @Column
    organismo_transito_id!: number;

    @AllowNull(false)
    @Column
    direccion_solicitante!: string;

    @AllowNull(false)
    @Column
    cedula_comprador!: string;

    @AllowNull(false)
    @Column
    cedula_vendedor!: string;

    @AllowNull(false)
    @Column
    estado_id!: number;


    @AllowNull(true)
    @Column
    observaciones?: string;

    @AllowNull(true)
    @Column
    valor_total?: number;
}