const { Db, Form, Misc, Password } = require('../../middleware/index')
const dotenv = require('dotenv')
dotenv.config()

/**
 *
 * @param {Object} _
 * @returns
 */
module.exports = async function (_ = { params }) {
  let data

  Form.sanitizeEachData(_.params, ['access_token', 'password1', 'password2'])
  _.params.firstname = Misc.capitalize(_.params.firstname)
  _.params.lastname = Misc.upperCase(_.params.lastname)

  console.warn(_.params)

  //AvailableUsername
  data = await this.isUserAvailable({
    username: _.params.user,
  })
  let AvailableUsername = data.isAvailable
  //AvailableUsername

  // SamePassword
  let SamePassword = _.params.password1 === _.params.password2
  // SamePassword

  // StrongPassword
  let StrongPassword = Password.isStrong(_.params.password1)
  // StrongPassword

  // SameMail
  let SameMail = _.params.email1 === _.params.email2
  // SameMail

  // CorrectFormatMail
  let CorrectFormatMail = Form.isValidMail(_.params.email1)
  // CorrectFormatMail

  const is = {
    AvailableUsername,
    SamePassword,
    StrongPassword,
    SameMail,
    CorrectFormatMail,
  }

  // console.log(is)
  const insert = {
    username: _.params.user,
    password: await Password.hash(_.params.password1),
    mail: _.params.email1,
    firstname: _.params.firstname,
    lastname: _.params.lastname,
  }

  // Vérifie si existe en base de données pour eviter une erreur
  const select = await Db.get({
    query:
      'SELECT id, username, mail FROM account WHERE username = ? OR mail = ? LIMIT 1',
    preparedStatement: [_.params.user, _.params.email1],
  })
  data =
    select[0] && select[0].id
      ? select[0]
      : { id: null, username: null, mail: null }

  const isRegistered = data.id ? false : true
  // Vérifie si existe en base de données pour eviter une erreur
  const toastMessage = []

  if (isRegistered) {
    Db.withTransaction() // prochaine requete SQL en transaction
    const identifier = await Db.commit({
      query: 'INSERT INTO account SET ?',
      preparedStatement: [
        // SET
        insert,
      ],
    })
    console.log(12345969788 + ' ' + identifier)
  } else {
    if (data.username === _.params.user) {
      toastMessage.push({ msg: "Le nom d'utilisateur est déja pris" })
    }
    if (data.mail === _.params.email1) {
      toastMessage.push({ msg: "L'adresse de courriel est déja prise" })
    }
  }

  return { isRegistered, toastMessage }
}
