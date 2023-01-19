const KakaoStrategy = require('passport-kakao').Strategy

const passportConfig = {
    clientID: '36025f5d8c9f567106956ae12f1bccc6',
    clientSecret: 'LwMxTyksQfbgCCG2f5QXxTa9xjdNTle8',
    callbackURL: 'http://localhost:3000/oauth/kakao',
}

const Strategy = (accessToken, refreshToken, profile, done) => {}
module.exports = new KakaoStrategy(passportConfig, Strategy(User))
