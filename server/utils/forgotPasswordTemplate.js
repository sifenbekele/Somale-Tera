const forgotPasswordTemplate = ({ name, otp })=>{
    return `
<div>
    <p>Yo, ${name}</p>
    <p>You've requested a password reset. Please use following OTP code to reset your password.</p>
    <div style="background: #f35308; font-size:20px;padding:20px;text-align:center;font-weight : 800;">
        ${otp}
    </div>
    <p>This otp is valid for 1 hour only. Enter this otp in the SomaleTera website to proceed with resetting your password nigga, and don't lazy up and ask for another! .</p>
    <br/>
    </br>
    <p>Thanks</p>
    <p>A nigga from SomaleTera</p>
</div>
    `
}

export default forgotPasswordTemplate
