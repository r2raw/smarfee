import _ from 'lodash';
import {titleCase} from 'title-case';
export default async (db, data, id)=>{
    try {
        const sql = 'INSERT INTO userProfile(id,firstname, lastname, birthdate, phone, sex) VALUES($1,$2,$3,$4,$5,$6)'

        const result = await  db.query(sql,[id, titleCase(_.toLower(_.trim(data.firstname))), titleCase(_.toLower(_.trim(data.lastname))), data.birthdate, data.phone, data.sex])

        if(result.rowCount > 0){
            return true
        }

        return false
    } catch (error) {
        console.error("insert profile error: " + error.message)
    }
}