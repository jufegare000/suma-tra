import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, NotEmpty } from "sequelize-typescript";
import { TramiteDocumentoI } from "../interface/document-tramite.interface";
@Table(
    {
        tableName: "documento_tramite",
        timestamps: false
    }
)
export class DocumentoTramiteModel extends Model implements TramiteDocumentoI{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    url!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    descripcion!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    tramite_id!: number;
}