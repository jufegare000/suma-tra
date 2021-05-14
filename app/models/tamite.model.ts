import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, NotEmpty } from "sequelize-typescript";
import { TramiteI } from "../components/transactProcedure/model/interface/tramite.interface";

@Table(
    {
        tableName: "trami_user",
        timestamps: false
    }
)
export class Tramite extends Model implements TramiteI{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    solicitante_id!: string;

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
    modelo!: string;

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
}