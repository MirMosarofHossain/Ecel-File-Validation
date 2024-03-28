import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function Login(){
    const navigate = useNavigate()
    const emailElm = useRef()   
    const passwordElm = useRef()
    const checkPasswordValid = (password)=>{
         if(password.length<8){
            return false;
         }
         if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return false;
        }
        if (!/\d/.test(password)) {
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            return false;
        }
        if (!/[a-z]/.test(password)) {
            return false;
        }
        return true;
    }
    const submitBtnHandler = ()=>{
        if(passwordElm.current.value == "" ||emailElm.current.value==""){
            alert("all field are require")
        }
        else{
            const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[\w\W].+$/
        let passwordValid = checkPasswordValid(passwordElm.current.value)
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const emailRegex= /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
        let emailValid = emailRegex.test(emailElm.current.value)
        if(emailValid){
          if(passwordValid){
            let obj = {
                email:emailElm.current.value,
                password:passwordElm.current.value
            }
            localStorage.setItem("user",JSON.stringify(obj))
         navigate('/')
          }
          else{
            alert("Invalid Password ! \n password should have minimum 8 digits,one special,one special symbol,one numeric,one Uppercase,one character ")
          }
        }
        else{
            alert("not valid email")
        }

        
        }
        
    }

    return <div className="login">
        <form action="">
            <label htmlFor="email">Email Address</label><br />
            <input ref={emailElm} type="email" /><br />
            <label htmlFor="password">Password</label><br />
            <input ref={passwordElm} type="password" /><br />
            <button onClick={submitBtnHandler} type="button">Submit</button>
        </form>
    </div>
}