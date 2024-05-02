import axios from "axios";

export default (values)=>{

    console.log(values)



    const passPatern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|<>?]).{8,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let error = {};

    if(values.email === ""){
        error.email = "Email should not be empty";
    }
    else if(!emailPattern.test(values.email)){
        error.email = "Invalid email format";
    }else{
        error.email = ""
    }
  
    if(values.password === ""){
        error.password = "Password should not be empty";
    }
    else if (!passPatern.test(values.password)) {
      error.password = "Invalid password format.";
    } else {
      error.password = "";
    }
  
    if(values.confirmpassword === ""){
        error.confirmpassword = "Field should not be empty";
    }
    else if (!passPatern.test(values.confirmpassword)) {
      error.confirmpassword = "Invalid password format.";
    } else if (values.password !== values.confirmpassword) {
      error.confirmpassword = "Password does not match.";
    } else {
      error.confirmpassword = "";
    }

    console.log(error)
    return error;
};