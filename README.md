---
title: Single Sign-On Server Backend
---

# Single Sign-On Server

The Single Sign-On Server is a powerful authentication/authorization solution built using Node.js and React.js that enables JWT (JSON Web Token) based Single Sign-On (SSO) for different applications within corporate environments. This project allows corporations to manage clients, set up various applications, and provide seamless authentication experiences for their users.

## Demo
![alt text](https://github.com/viragjain503/Single-Sign-On-Frontend/blob/main/Demo.gif)

## Features

- **Corporate Sign Up**: Corporations can sign up on the application to create an account.
- **Email Verification**: After signing up, email verification is required via an OTP (One-Time Password) sent to the registered email address.
- **Client Configuration**: Corporations can add new clients by providing details such as `clientId` (public), `clientSecret` (private between corporation and server), `expiresIn`, `Redirect URL`, and `Permissions`.
- **Client Management**: A client management page is available to view and delete existing clients.
- **Demo Page**: Explore a demo page that showcases how the Single Sign-On works.
- **Easy Integration**: A simple flow to integrate Single Sign-On into your application.
- **JWT-based Authentication**: Secure authentication using JWT tokens, signed with the shared `clientSecret` key.

## Getting Started

Follow these steps to get started with the Single Sign-On Server:

1. **Corporate Sign Up**: Sign up your corporation on the application.
2. **Email Verification**: Verify your email by entering the OTP received in your inbox.
3. **Client Configuration**: Provide client details like `clientId`, `clientSecret`, `expiresIn`, `Redirect URL`, and `Permissions`.
4. **Client Management**: Manage your clients on the client management page, including deletion.
5. **Demo Page**: Check out the demo page to understand the Single Sign-On process.

## Single Sign-On Flow

Integrating Single Sign-On into your application is straightforward:

1. **Add SSO Button**: Add a Single Sign-On button to your application.
2. **Initiate Sign-On**: When the button is clicked, open the Single Sign-On page with the valid `clientId` as a URL parameter.
3. **User Authentication**: Once a user signs in with the correct credentials, our server generates a JWT token signed with the shared `clientSecret` key.
4. **Token Usage**: Use the generated JWT token in the header of your service calls. This way, each service call can be verified using the `clientSecret` key.

## Technologies Used

- **Node.js**: Backend server logic is implemented using Node.js.
- **React.js**: User interfaces and frontend components are developed using React.js.

## Contributing

Contributions are welcome! If you'd like to enhance this Single Sign-On Server or fix any issues, feel free to open pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

---

Give your applications the advantage of Single Sign-On with our Node.js and React.js based solution. Manage clients, provide seamless authentication, and enhance your corporate security. Try it out today!

