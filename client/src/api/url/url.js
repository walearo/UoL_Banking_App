const baseUrl = 'http://localhost:8001'

export const RegisterEndpoint =  `${baseUrl}/register` 
export const loginEndpoint = `${baseUrl}/login` 
export const VerifyEmailOtpEndpoint = `${baseUrl}/verify-email-otp` 
export const ProfileEndpoint = `${baseUrl}/profile`
export const TransactionHistoryEndpoint = `${baseUrl}/account-statement`
export const createBankUserEndpoint = `${baseUrl}/createuser`
export const GetAccountDetailsEndpoint = `${baseUrl}/account/details`
export const DepositCashEndpoint = `${baseUrl}/account/deposit`
export const WithdrawCashEndpoint = `${baseUrl}/account/withdraw`
export const TransferFundEndpoint = `${baseUrl}/account/transfer`
export const GetCustomerDetailsEndpoint = `${baseUrl}/customers`
export const logoutEndpoint = `${baseUrl}/logout`