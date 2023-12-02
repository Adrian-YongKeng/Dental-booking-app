import { FacebookAuthProvider, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    getAuth, sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber
 } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import {Col, Image, Row,  Modal, Form, Button, Alert} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import Header from "../components/Header";

export default function AuthPage () {
   
    //possible values: null(no modal show, login , signup)
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const [signupMessage, setSignupMessage] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(null); // Password strength error message
    //login error state
    const [loginMessage, setLoginMessage] = useState(null);
    const [showSuccess, setShowSuccess] = useState(null);
    //firebase auth
    const auth = getAuth();
    const {currentUser} = useContext(AuthContext);
    const provider = new GoogleAuthProvider();
    const fbProvider = new FacebookAuthProvider();

    const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
    const [resetEmail, setResetEmail] = useState("");

    const [showPhoneLoginModal, setShowPhoneLoginModal] = useState(false);
    const [phoneNumber, setPhoneNumber] =useState("");
    const [otp, setOtp] =useState("");
    const [error, setError] = useState("");
    const [flag, setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState("");

    const blueteeth = 'https://firebasestorage.googleapis.com/v0/b/booking-app-b1b60.appspot.com/o/blueteethh.jpg?alt=media&token=f4d262a7-db30-40ad-81e0-597b241a7804';
    const teethgif = 'https://firebasestorage.googleapis.com/v0/b/booking-app-b1b60.appspot.com/o/teeth.gif?alt=media&token=055a6cd1-9d49-4fa1-afc6-31de4aaf2752'

    
    const handleShowPhoneLogin = () => setShowPhoneLoginModal(true);
    const setUpRecaptha = (phoneNumber) => {
        const recaptchaVerifier = new RecaptchaVerifier(
            auth, 'recaptcha-container', {}
        );
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    }
    const getOtp = async (e) => {
        e.preventDefault();
        setError("")
        if(phoneNumber === "" || phoneNumber === undefined)
            return setError("Please enter a valid Phone Number.");
        try {
            const response = await setUpRecaptha(phoneNumber);
            console.log(response);
            setConfirmObj(response);
            setFlag(true);
        } catch (err) {
            setError(err.message)
        }
        console.log(phoneNumber);
    }
    //const getOtp = async (phoneNumber) => {
    //    try {
    //        const verifier = setUpRecaptha();
    //        await signInWithPhoneNumber(auth, phoneNumber, verifier);
            // rest of the code
    //    } catch (error) {
    //        console.error(error);
            // handle error
    //    }
    //};
    const verifyOtp = async (e) => {
        e.preventDefault();
        if (otp === "" || otp === null) return;
        try {
            setError("");
            await confirmObj.confirm(otp);
            navigate("/profile");
        } catch (err) {
            setError(err.message)
        }
    }

        useEffect(() => {
        console.log(currentUser)
        if(currentUser) navigate("/profile");
        }, [currentUser, navigate])

    const isStrongPassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        return passwordRegex.test(password);
    }

    const handleSignUp = async (e) =>  {
        e.preventDefault();
        setSignupMessage(null); // Clear the username error message
        if (!isStrongPassword(password)){
            setPasswordStrength("Your password must be at least 8 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character (e.g., !, @, #, $).");
            return; // Don't proceed with the signup
        }
        try {
            const res = await createUserWithEmailAndPassword(auth, username, password);
            console.log(res.user);
        } catch (error) {
            console.error(error);
            //setSignupMessage(error.response.data.message);
        }
    };

    const handleLogin = async (e) =>  {
        e.preventDefault();
        setLoginMessage(null)
        try {
            await signInWithEmailAndPassword(auth, username, password);
            console.log(currentUser)
        } catch (error) {
            console.error(error);

            if (error.code === 'auth/invalid-email') {
                setLoginMessage("Invalid email format.");
            } else if (error.code === 'auth/user-disabled') {
                setLoginMessage("This user account has been disabled.");
            } else if (error.code === 'auth/user-not-found') {
                setLoginMessage("User not found. Please check your email.");
            } else if (error.code === 'auth/wrong-password') {
                setLoginMessage("Incorrect password. Please try again.");
            }  else {
                setLoginMessage("Login failed. Please try again.");
            }
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try{
            await signInWithPopup(auth, provider);
        }catch(error) {
            console.error(error)
        }
    }
    const handleFacebookLogin = async (e) => {
        e.preventDefault();
        try{
            await signInWithPopup(auth, fbProvider);
        }catch(error) {
            console.error(error)
        }
    }

    const showResetModal = () => {
        setShowPasswordResetModal(true);
        setModalShow(null);
    };
    const handlePasswordReset = (email) => {
        sendPasswordResetEmail(auth, email)
        .then (() => {
            // Inform the user that the email has been sent
            alert("Password reset email sent!");
            setShowPasswordResetModal(false);
            setResetEmail("");
            setModalShow(true);
        })
        .catch((error) => {
            console.error("Error sending password reset email: ", error);
            alert("Failed to send password reset email. Please try again.");
        })
    }


    const handleClose = () => {
        setModalShow(null);
        setSignupMessage(null);
        setPasswordStrength(null);
        setLoginMessage(null);
        setShowSuccess(null);
    };

    return (
        <>
        <Header/>
        <Row>
            <Col>
            <Image src={teethgif} fluid />
            </Col>
            <Col sm={6} className="p-3"> 
                <Image src={blueteeth} style={{ width: '50px', height: '50px' }}/>

                <p className="mt-1" style={{fontSize: 60}}>Brighten Your Smile</p>
                <h2 className="my-2" style={{fontSize: 30}}>Get Started with Your Dental Health</h2>

                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleGoogleLogin}>
                        <i className="bi bi-google"></i> Sign Up with Google
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleFacebookLogin}>
                        <i className="bi bi-facebook"></i> Sign Up with Facebook
                    </Button>
                    <p style={{textAlign: "center"}}>or</p>
                    <Button className="rounded-pill" onClick={handleShowSignUp}>
                        Create an account
                    </Button>
                    <p style={{fontSize: "12px"}}>
                        By signing up, you agree to the Terms of Service and Privay Policy including Cookie Use.
                    </p>

                    <p className="mt-2" style={{fontWeight: "bold"}}>
                        Already have an account?
                    </p>
                    <Button 
                        className="rounded-pill" 
                        variant="outline-primary"
                        onClick={handleShowLogin}
                    >
                        Sign In
                    </Button>
                    <Button 
                        className="rounded-pill" 
                        variant="outline-primary"
                        onClick={handleShowPhoneLogin}
                    >
                        <i className="bi bi-telephone-fill"></i> Sign In with Phone
                    </Button>
                </Col>
                <Modal 
                    show={modalShow !== null}
                    onHide={handleClose} 
                    animation= {false}
                    centered
                >
                    <Modal.Body>
                        <h2 className="mb-4" style={{fontWeight: "bold"}}>
                            {modalShow === "SignUp"
                            ? "Create your account"
                            : "Log in to your account"}
                        </h2>
                        
                        <Form 
                            className="d-grid gap-2 px-5" 
                            onSubmit={modalShow === "SignUp" ? handleSignUp: handleLogin}
                        > 
                            <Form.Group className="mb-3" controlId= "formBasicEmail">
                                <Form.Control 
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="email" 
                                    placeholder="Enter Username"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId= "formBasicPassword">
                                <Form.Control 
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" 
                                    placeholder="Password"
                                />
                                {modalShow === "Login" && (
                                    <p onClick={showResetModal} className="text-primary" style={{ cursor: "pointer" }}>
                                        Forgot password?
                                    </p>
                                )}
                            </Form.Group>
                            
                            {showSuccess ? (
                                <Alert variant="success">
                                    {showSuccess}
                                </Alert>
                            ) : (
                                <div>
                                    {modalShow === "SignUp" && signupMessage && (
                                        <Alert variant="danger">
                                            {signupMessage}
                                        </Alert>
                                    )}
                                    {modalShow === "SignUp" && passwordStrength && (
                                        <Alert variant="danger">
                                            {passwordStrength}
                                        </Alert>
                                    )}
                                 
                                </div>
                            )}
                            
                            {modalShow === "Login" && loginMessage && ( //display error only in loginModal
                                <div className="alert alert-danger" role="alert">
                                    <img src="./src/assets/!image.png" style={{ width: '25px', height: '25px' }} className="mx-2"/> 
                                    {loginMessage}
                                </div>
                            )}
                        
                            <p style={{fontSize: "12px"}}>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. 
                                SigmaTweets may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy,
                                like keeping your account seceure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, 
                                when provided, unless you choose otherwise here.
                            </p>

                            <Button className="rounded-pill" type="submit">
                                {modalShow === "SignUp" ? "Sign up": "Log in"}
                            </Button>
                            
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={showPasswordResetModal} onHide={() => setShowPasswordResetModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        handlePasswordReset(resetEmail);
                    }}>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter your email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                required 
                                className="mb-4"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Send Reset Email
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showPhoneLoginModal} onHide={() => setShowPhoneLoginModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Phone Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group  
                            controlId="formBasicEmail"
                        >
                            <Form.Label>Phone Number</Form.Label>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <PhoneInput
                                defaultCountry={"my"}
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(phoneNumber) => setPhoneNumber("+" + phoneNumber)}
                            />
                            <div id="recaptcha-container"/>
                            <Button 
                                variant="primary" 
                                type="submit" className="my-2"
                                onClick={getOtp}
                            >Send OTP</Button>
                            </Form.Group>
                        
                            <Form.Group  
                                style={{ display: flag ? "block" : "none" }} 
                                controlId="formBasicOtp"
                            >
                                <Form.Label>Verify OTP</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <Button 
                                    variant="primary" 
                                    onClick={verifyOtp}
                                    className="my-2"
                                >Verify</Button>
                            </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>

            </Col>
        </Row>
        </>
    )
}