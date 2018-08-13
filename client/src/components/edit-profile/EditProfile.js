import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      octopus: "",
      contact: "",
      location: "",
      facebook: "",
      instagram: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // If profile field doesnt exist, make empty string
      profile.octopus = !isEmpty(profile.octopus) ? profile.octopus : "";
      profile.contact = !isEmpty(profile.contact) ? profile.contact : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        octopus: profile.octopus,
        contact: profile.contact,
        location: profile.location,
        facebook: profile.facebook,
        instagram: profile.instagram
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      octopus: this.state.octopus,
      contact: this.state.contact,
      location: this.state.location,
      facebook: this.state.facebook,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          />
          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    // Select options for location
    const options = [
      { label: "* Select your most used outlet", value: 0 },
      { label: "Weave on Boundary", value: "Weave on Boundary" },
      { label: "To Kwa Wan", value: "To Kwa Wan" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="username"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Choose a username for yourself"
                />

                <TextFieldGroup
                  placeholder="Octopus Card Number"
                  name="octopus"
                  value={this.state.octopus}
                  onChange={this.onChange}
                  error={errors.octopus}
                  info="Share with us your octopus card number so that you can accumulate points when you use our services."
                />
                <TextFieldGroup
                  placeholder="Contact Number"
                  name="contact"
                  value={this.state.contact}
                  onChange={this.onChange}
                  error={errors.contact}
                  info="You can share your contact number to receive special offers from us."
                />
                <SelectListGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  options={options}
                  error={errors.location}
                  info="Choose your regular location so that we can inform you of promotions at the outlet."
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
