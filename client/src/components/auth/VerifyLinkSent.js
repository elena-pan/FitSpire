import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resendLink } from "../../actions/authActions";
import classnames from "classnames";
import validate from "./Validate";

class VerifyLinkSent extends Component {
    state = { 
        email:"",
        errors: {} 
    }

    componentDidMount() {
        // If logged in and user navigates to page, redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.replace("/dashboard");
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.errors !== prevProps.errors && this.props.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
    }

    onChangeEmail = e => {
        this.setState({ email: e.target.value });
        const validated = validate({ email: e.target.value });
        this.setState({errors: validated.errors});
    }

    onResendClick = () => {
        this.props.resendLink(this.state.email, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="row">
                <div style={{ marginTop: "7rem", marginBottom:"5rem", minHeight:"75vh" }} className="col s6 offset-s3 center grey-text">
                <h5 style={{lineHeight:"170%"}}>
                    <b>A verification link has been sent to your email. The link will expire in 12 hours. 
                        Please double-check your spam folder if you have not received anything within 20 minutes. 
                        If you require a new link, please click below. </b></h5>
                        <div style={{marginTop:"2rem"}}>
                            <div className="input-field" style={{display: "inline-block", width:"15rem", marginRight:"2rem", verticalAlign:"top"}}>
                                <input
                                    onChange={this.onChangeEmail}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email || errors.emailnotfound
                                })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text left">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <div style={{display: "inline-block"}}>
                                <Link to="#" 
                                    style={{
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    onClick={this.onResendClick}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">Resend Link</Link>
                            </div>
                            </div>
                </div>
            </div>
        );
    }
}

VerifyLinkSent.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { resendLink }
)(VerifyLinkSent);