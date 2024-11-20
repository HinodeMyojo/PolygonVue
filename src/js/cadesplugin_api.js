// import cadesplugin from 'crypto-pro-cadesplugin'

// export function run() {
//   cadesplugin.async_spawn(function* (args) {
//     var ProviderName = 'Crypto-Pro GOST R 34.10-2012 Cryptographic Service Provider'
//     var ProviderType = 80
//     try {
//       var oAbout = yield cadesplugin.CreateObjectAsync('CAdESCOM.About')
//       oVersion = yield oAbout.CSPVersion(ProviderName, parseInt(ProviderType, 10))

//       var Minor = yield oVersion.MinorVersion
//       var Major = yield oVersion.MajorVersion
//       var Build = yield oVersion.BuildVersion
//       var Version = yield oVersion.toString()
//       alert(Version)
//     } catch (er) {
//       err = cadesplugin.getLastError(er)
//       if (err.indexOf('0x80090019') + 1) return 'Указанный CSP не установлен'
//       else return err
//     }
//   })
// }
