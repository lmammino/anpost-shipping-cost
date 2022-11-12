import { request } from 'undici'
import { countries } from './countries.js'
import { config } from './config.js'

const weights = ['0.25', '0.5']

const headers = {
  authority: 'www.anpost.com',
  accept: 'application/json',
  authorization: 'Bearer',
  cookie: config.cookie,
  'x-requestverificationtoken': config.authorizationCode
}

function makeUrl (countryCode, weight) {
  return `https://www.anpost.com/selfserviceapi/rates?countryCode=${countryCode}&weight=${weight}&mailType=FLAT&goods=true`
}

console.log('countryCode,countryRegion,countryName,weight,standard_price,registered_price')
for (const { code, region, name } of countries) {
  for (const weight of weights) {
    const url = makeUrl(code, weight)
    const { body } = await request(url, { headers })
    const data = await body.json()

    if (data.Message === 'Unauthorized request.') {
      console.error('Unauthorized request. You need to update the `cookie` and the `x-requestverificationtoken` headers')
      process.exit(1)
    }

    if (data.ErrorMessage) {
      console.error(data.ErrorMessage)
      continue
    }

    const regShipping = data.Response.MailServices.find((service) => service.ServiceCode === 'REGINT' || service.ServiceCode === 'REGNAT')
    const stdShipping = data.Response.MailServices.find((service) => service.ServiceCode === 'STDINT' || service.ServiceCode === 'STDNAT')

    console.log(`${code},${region},"${name}",${weight},${stdShipping?.Rate || 'na'},${regShipping?.Rate || 'na'}`)
  }
}
