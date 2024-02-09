import monogoose from "mongoose";

const dbConnect = ()=>{
    if(monogoose.connection.readyState>=1){
        return;
    }
    monogoose.set("strictQuery",false);
    monogoose.connect(process.env.DB_URL);
}

export default dbConnect;