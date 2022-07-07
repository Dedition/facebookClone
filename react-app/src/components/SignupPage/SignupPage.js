import LoginForm from '../auth/LoginForm';
import SignUpModal from '../auth/SignUpModal';
import { ExternalLink } from 'react-external-link';
import "./SignupPage.css";


function SignupPage() {

    return (
        <div className="signup__container">
            <div>
                <div className="signup__main__container">
                    <div className="signup__main__text">
                        <span className="fb__logo">facebook</span>
                        <span className="signup__text">
                            Facebook helps you connect and share with the people in your life.
                        </span>
                    </div>
                    <div className="signup__login__comp">
                        <LoginForm />
                        <SignUpModal />
                    </div>
                </div>
            </div>
            <footer className="footer">
                <ExternalLink
                    className="external_link"
                    href="https://www.linkedin.com/in/leo-l-79a260b0/"
                >
                    <div className="linkedIn"></div>
                    LinkedIn
                </ExternalLink>
                <ExternalLink
                    className="external_link"
                    href="https://github.com/Dedition"
                >
                    <div className="github"></div>
                    Github
                </ExternalLink>
            </footer>
        </div>

    );
}

export default SignupPage;
