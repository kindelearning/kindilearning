// Sign-up mutation (create account)
export const CREATE_ACCOUNT_MUTATION = `
  mutation CreateAccount($email: String!, $password: String!) {
    createAccount(data: { email: $email, password: $password, emailVerified: false }) {
      id
      email
    }
  }
`;

// Find account query (for login)
export const FIND_ACCOUNT_QUERY = `
  query Account($email: String!) {
    account(where: { email: $email }) {
      id
      email
      password
      emailVerified
    }
  }
`;
