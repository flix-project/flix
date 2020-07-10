import React from 'react';
    {
        {(isSignIn, isSignUp, handleSignIn, handleSignUp) => (
            <React.Fragment>
                <DoubleSliderSign.SignIn>
                    {isSignIn && <SignIn />} // Your Sign In Component
                </DoubleSliderSign.SignIn>
                <DoubleSliderSign.SignUp>
                    {isSignUp && <SignUp />} // Your Sign Up Component
                </DoubleSliderSign.SignUp>
                <DoubleSliderSign.Overlay>
                    <DoubleSliderSign.Overlay.Left>
                        <WelcomeToSignIn handleSignIn={handleSignIn} /> // Your Welcome Sign In Component
                    </DoubleSliderSign.Overlay.Left>
                    <DoubleSliderSign.Overlay.Right>
                        <WelcomeToSignUp handleSignUp={handleSignUp} /> // Your Welcome Sign Up Component
                    </DoubleSliderSign.Overlay.Right>
                </DoubleSliderSign.Overlay>
                </React.Fragment>
            
        )
    }}
export default DoubleSliderSign;