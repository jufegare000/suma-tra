import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, NotEmpty } from "sequelize-typescript";
import { UserI } from "../components/users/model/interfaces/tramiUser.interface";

@Table(
    {
        tableName: "trami_user",
        timestamps: false
    }
)
export class TramiUserModel extends Model implements UserI{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    email!: string;

    @AllowNull(true)
    @Column
    pass?: string;

    @AllowNull(false)
    @Column
    role!: string;
}