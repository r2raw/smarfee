import _ from 'lodash';
import {titleCase} from 'title-case';
export default async (db, data, uid)=>{
    try {
        const sql = "UPDATE userProfile set firstname=$1, lastname=$2, birthdate=$3, phone=$4, sex=$5 WHERE id=$6"

        const result = await db.query(sql, [titleCase(_.toLower(_.trim(data.firstname))), titleCase(_.toLower(_.trim(data.lastname))), data.birthdate, data.phone, data.sex, uid])

        if(result.rowCount > 0){
            return true
        }
         return false
    } catch (error) {
        console.error("update user profile error: "+ error.message)
    }
}