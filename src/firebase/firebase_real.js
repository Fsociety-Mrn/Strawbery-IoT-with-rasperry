import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { app } from './firebase'

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);


// create data
export const createReal = () => {
    set(ref(database, "/LED"), 
    { 
        turnOn: false
    }
    )
}

//Read data 
//Note: read the specific field of data
export const readReal = (fieldName, ValueName) => {
    let a = false
    onValue(ref(database , '/' + fieldName), e => {
        a = e.child(ValueName).val() 
    })
    return a
}

// Update data
export const updateReal = async (fieldName,value) => {
    await update(ref(database, '/' + fieldName), value).then(e=>console.log("goods")).catch(e=>console.log("not good"))
}