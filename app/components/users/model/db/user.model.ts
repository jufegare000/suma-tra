import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, NotEmpty } from "sequelize-typescript";
import { UserI } from "../interfaces/tramiUser.interface"; 
@Table(
    {
        tableName: "trami_user",
        timestamps: false
    }
)
export class UserModel extends Model implements UserI{
    
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