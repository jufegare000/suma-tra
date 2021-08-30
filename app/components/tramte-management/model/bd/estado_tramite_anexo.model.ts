import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, NotEmpty } from "sequelize-typescript";
import { AnexoEstadoTramiteI } from "../interface/estado_tramite_anexo.interface";
@Table(
    {
        tableName: "estado_tramite_anexo",
        timestamps: false
    }
)
export class TramiteStateDetailAnnexModel extends Model implements AnexoEstadoTramiteI {

    @AutoIncrement
    @PrimaryKey
    @Column
    id?:number;

    @AllowNull(false)
    @NotEmpty
    @Column
    id_detalle!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    url_anexo!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    descripcion_anexo!: string;

    @AllowNull(true)
    @Column
    comentario?: string;


}