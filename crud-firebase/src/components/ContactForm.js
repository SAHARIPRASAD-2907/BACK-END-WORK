import React,{useState,useEffect, useRef} from "react";




const ContatctsForm = () => {
    const initialFieldValues = {
        fullname: '',
        mobile: '',
        email: '',
        address:''
    }
    const [value,setvalue] = useState(initialFieldValues)
    return (
        <div className="row">
            <form autoComplete="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ContatctsForm;