module.exports = {
  dashboardPassword: require('./account/dashboardPassword'),
  dashboardPersonnal: require('./account/dashboardPersonnal'),
  getPasswordCheckRequirement: require('./account/getPasswordCheckRequirement'),
  isUserAvailable: require('./account/isUserAvailable'),
  isMailAvailable: require('./account/isMailAvailable'),
  passwordRecovery: require('./account/passwordRecovery'),
  stateAccount: require('./account/stateAccount'),
  toLogin: require('./account/toLogin'),
  toLogout: require('./account/toLogout'),
  toRegister: require('./account/toRegister'),
}
